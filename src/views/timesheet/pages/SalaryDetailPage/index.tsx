import React, { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

/**
 * Components, Assets
 */
import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import { Paginate } from "shareComponents/common/Paginate";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { InputWidthAdjust } from "views/timesheet/shareComponents/common";
import { createLinkAndClick } from "utils";

import {
  DetailMainRow,
  // AccessingUsers,
  ModalShare
} from "./components";
import { CreateRow } from "./components/Form";

/**
 * Hooks, Typings
 */
import {
  useQueryDetailSalaryParent,
  useQueryListSalaryChild,
  useMutationSalaryChild,
} from "services/hooks/useSalary";

import { useCashBook } from 'services/hooks/financial/useCashBook';

import { useAuth } from "services/hooks/auth/useAuth";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";

const SalaryDetailPage: FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const salaryParentID = params["id"];

  const [modalShare, setModalShare] = useState<{ isShow: boolean, users: User[] | undefined, modalType: 'members' | 'admins' }>({
    isShow: false,
    users: [],
    modalType: 'members'
  });

  const [permissions, setPermissions] = useState<{
    usersShared: User[];
    onlyView: boolean;
    hasPermissionCreateUpdate: boolean;
    hasPermissionShare: boolean;
  }>({
    usersShared: [],
    onlyView: true,
    hasPermissionCreateUpdate: false,
    hasPermissionShare: false,
  });

  const { user } = useAuth();

  const { data: salaryInfo, refetch, loading } = useQueryDetailSalaryParent(salaryParentID);
  // console.log({salaryInfo})
  const {
    data: listSalaryChild,
    loading: isFetchSalaryChild,
    totalPages,
    totalRecord,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    refetch: onRefreshSalaryChild,
  } = useQueryListSalaryChild(salaryParentID);

  // console.log({listSalaryChild})

  const { onUpdateSalaryAsync, onCreateSalaryAsync } = useMutationSalaryChild();

  useEffect(() => {
    if(!salaryInfo || !user || loading) return;

    const usersShared = [...salaryInfo?.admins, ...salaryInfo?.members];
    const adminsID    = salaryInfo.admins.map(item => item._id);
    const membersID   = salaryInfo.members.map(item => item._id);

    const usersIDShared = [
      ...adminsID,
      ...membersID,
    ];
    let authorID = '';

    if(typeof salaryInfo.userCreate === 'string') {
      authorID = salaryInfo.userCreate;
    } else{
      authorID = salaryInfo.userCreate?._id;
    }

    usersIDShared.push(authorID);

    if(!usersIDShared.includes(user._id)) {
      toast.warn('Bạn đang không có quyền truy cập');
      history.push('/timesheet/home');
    }

    const hasPermissionCreateUpdate = adminsID.includes(user._id) || authorID === user._id;
    const hasPermissionShare = authorID === user._id;
    const onlyView = membersID.includes(user._id) && !adminsID.includes(user._id) && authorID !== user._id;

    setPermissions({
      usersShared,
      onlyView,
      hasPermissionCreateUpdate,
      hasPermissionShare
    })
  }, [JSON.stringify(salaryInfo)])

  const handleUpdatedSalary = React.useCallback(
    async (values) => {
      try {
        // console.log(values)
        const isUpdated = await onUpdateSalaryAsync({
          ...values,
          expertSalaryID: values._id,
          state: `${values.state}`,
          type: `${values.type}`,
          status: `${values.status}`,
          salary: `${values.salary}`,
          reward: `${values.reward}`,
          punishment: `${values.punishment}`,
        });
        if (!isUpdated.error) {
          onRefreshSalaryChild();
          refetch(); // refetch time sheet parent
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    [onRefreshSalaryChild, onUpdateSalaryAsync, refetch]
  );

  const handleCreateSalary = React.useCallback(
    async (values) => {
      try {
        // if (!values.name) {
        //   throw new Error("Name is required");
        // }
        const isCreated = await onCreateSalaryAsync({
          name: values.name,
          parentID: salaryParentID,
          salary: "",
          reward: "",
          punishment: "",
          advance: "",
          remaining: "",
          paid: ""
        });
        if (!isCreated.error) {
          refetch();
          onRefreshSalaryChild();
          return true;
        }
        throw new Error("ERROR~");
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    [salaryParentID, onCreateSalaryAsync, onRefreshSalaryChild, refetch]
  );

  const toggleModalShare = (modalType: 'admins' | 'members', users: User[] | undefined) =>
    setModalShare({ isShow: !modalShare.isShow, users, modalType });

  const dispatch = useDispatch();

  //_____Import, export excel
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
  });

  const { downloadTemplateExcelAsync, importExcelAsync } = useCashBook({});

  const handleDownloadExcel = async () => {
      try {
            setStateExport({ isExporting: true });
            const { error, data } = await downloadTemplateExcelAsync({ parentID: salaryParentID, option: '1' });

            if(error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
      }
  }

  if(!salaryInfo || loading || !user) return <Loader className="border-primary" />

  return (
    <div className={"financial-planning-detail"}>
      <div
        className={
          "financial-planning-header flex p-2 sticky top-0 z-10 bg-white"
        }
      >
        <FileColorIcon />
        <div className="w-auto">
          <div className={"flex"}>
            <InputWidthAdjust
              className={"text-lg w-auto mr-2"}
              value={salaryInfo.name}
            />
            <img alt={"star-icon"} src={StarIcon} />
          </div>
          <p className={"text-gray-400"}>
            Chỉnh sửa lần cuối cách đây{" "}
            {moment(salaryInfo.modifyAt).isValid() &&
              moment(salaryInfo.modifyAt).fromNow()}{" "}
            bởi {salaryInfo.userCreate?.fullname}
          </p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <button className={"mr-2 text-primary"}
            onClick={handleDownloadExcel}
           >
             Tải Bảng lương
           </button>
          <button
            className="text-gray-400 mr-2"
            onClick={() => {
              toggleModalShare('admins', salaryInfo.admins)
            }}
          >Admin ({salaryInfo.admins?.length})</button> |
          <button
            className="text-gray-400 mr-2 ml-2"
            onClick={() => {
              toggleModalShare('members', salaryInfo.members)
            }}
          >Thành viên ({salaryInfo.members?.length})</button>
          {/* <AccessingUsers users={permissions.usersShared} /> */}
          {/* <ShareButton /> */}
        </div>
      </div>
      <div className={"financial-planning-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              TT
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Ngày
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Lương
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thưởng
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Phạt
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Người thực hiện
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Công việc/Bill
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Mô tả/ghi chú
            </div>
          </div>
          {salaryInfo?._id && Array.isArray(listSalaryChild) && (
            <DetailMainRow
              salaryParentInfo={salaryInfo}
              listSalaryChild={listSalaryChild}
              onUpdatedSalaryChild={handleUpdatedSalary}
              isFetchSalaryChild={isFetchSalaryChild}
              hasPermission={permissions.hasPermissionCreateUpdate}
            />
          )}

          {permissions.hasPermissionCreateUpdate && <CreateRow onInsert={handleCreateSalary} />}
        </div>
      </div>
      {/* <Paginate
        totalPages={totalPages}
        totalRecord={totalRecord}
        nextPageAction={fetchNextPage}
        prevPageAction={fetchPrevPage}
        isFetching={isFetchSalaryChild}
        hasNextPage={hasNextPage}
      /> */}

      {/* <ModalLarge
        show={modalShare.isShow}
        toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
      >
        <ModalShare
          toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
          refetch={refetch}
          expertSalaryID={salaryParentID}
          users={modalShare.users}
          modalType={modalShare.modalType}
          hasPermission={permissions.hasPermissionShare}
        />
      </ModalLarge> */}
    </div>
  );
};

export default SalaryDetailPage;