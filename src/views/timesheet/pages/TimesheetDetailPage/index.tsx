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
  useQueryDetailTimeSheetParent,
  useQueryListTimeSheetChild,
  useMutationTimeSheetChild,
} from "services/hooks/useTimeSheet";
import { useCashBook } from 'services/hooks/financial/useCashBook';

import { useAuth } from "services/hooks/auth/useAuth";
// import { setMainRowCollapsed } from "redux/reducer/Timesheet";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";

const TimeSheetDetailPage: FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const timeSheetParentID = params["id"];

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

  const { data: timeSheetInfo, refetch, loading } = useQueryDetailTimeSheetParent(timeSheetParentID);
  // console.log({timeSheetInfo})

  const {
    data: listTimeSheetChild,
    loading: isFetchTimeSheetChild,
    totalPages,
    totalRecord,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    refetch: onRefreshTimeSheetChild,
  } = useQueryListTimeSheetChild(timeSheetParentID);

  // console.log({listTimeSheetChild})

  const { onUpdateTimeSheetAsync, onCreateTimeSheetAsync } = useMutationTimeSheetChild();

  useEffect(() => {
    if(!timeSheetInfo || !user || loading) return;

    const usersShared = [...timeSheetInfo?.admins, ...timeSheetInfo?.members];
    const adminsID    = timeSheetInfo.admins.map(item => item._id);
    const membersID   = timeSheetInfo.members.map(item => item._id);

    const usersIDShared = [
      ...adminsID,
      ...membersID,
    ];
    let authorID = '';

    if(typeof timeSheetInfo.userCreate === 'string') {
      authorID = timeSheetInfo.userCreate;
    } else{
      authorID = timeSheetInfo.userCreate?._id;
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
  }, [JSON.stringify(timeSheetInfo)])

  const handleUpdatedTimeSheet = React.useCallback(
    async (values) => {
      try {
        // console.log(values)
        const isUpdated = await onUpdateTimeSheetAsync({
          ...values,
          expertTimesheetID: values._id,
          hours: `${values.hours}`,
          amount: `${values.amount}`,
          state: `${values.state}`,
          unitprice: `${values.unitprice}`,
          type: `${values.type}`,
          status: `${values.status}`,
        });
        if (!isUpdated.error) {
          onRefreshTimeSheetChild();
          refetch(); // refetch time sheet parent
        }
      } catch (err) {
        console.error(err);
        return null;
      }
    },
    [onRefreshTimeSheetChild, onUpdateTimeSheetAsync, refetch]
  );

  const handleCreateTimeSheet = React.useCallback(
    async (values) => {
      try {
        if (!values.name) {
          throw new Error("Name is required");
        }
        const isCreated = await onCreateTimeSheetAsync({
          name: values.name,
          parentID: timeSheetParentID,
        });
        if (!isCreated.error) {
          refetch();
          onRefreshTimeSheetChild();
          return true;
        }
        throw new Error("ERROR~");
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    [timeSheetParentID, onCreateTimeSheetAsync, onRefreshTimeSheetChild, refetch]
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
            const { error, data } = await downloadTemplateExcelAsync({ parentID: timeSheetParentID, option: '1' });

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

  if(!timeSheetInfo || loading || !user) return <Loader className="border-primary" />

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
              value={timeSheetInfo.name}
            />
            <img alt={"star-icon"} src={StarIcon} />
          </div>
          <p className={"text-gray-400"}>
            Chỉnh sửa lần cuối cách đây{" "}
            {moment(timeSheetInfo.modifyAt).isValid() &&
              moment(timeSheetInfo.modifyAt).fromNow()}{" "}
            bởi {timeSheetInfo.userCreate?.fullname}
          </p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <button className={"mr-2 text-primary"}
            onClick={handleDownloadExcel}
           >
             Tải Excel bảng chấm công
           </button>
          <button
            className="text-gray-400 mr-2"
            onClick={() => {
              toggleModalShare('admins', timeSheetInfo.admins)
            }}
          >Admin ({timeSheetInfo.admins?.length})</button> |
          <button
            className="text-gray-400 mr-2 ml-2"
            onClick={() => {
              toggleModalShare('members', timeSheetInfo.members)
            }}
          >Thành viên ({timeSheetInfo.members?.length})</button>
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
            {/* <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Hoàn thành
            </div> */}
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              KL
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Đơn giá
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thành tiền
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
          {timeSheetInfo?._id && Array.isArray(listTimeSheetChild) && (
            <DetailMainRow
              timeSheetParentInfo={timeSheetInfo}
              listTimeSheetChild={listTimeSheetChild}
              onUpdatedTimeSheetChild={handleUpdatedTimeSheet}
              isFetchTimeSheetChild={isFetchTimeSheetChild}
              hasPermission={permissions.hasPermissionCreateUpdate}
            />
          )}

          {permissions.hasPermissionCreateUpdate && <CreateRow onInsert={handleCreateTimeSheet} />}
        </div>
      </div>
      <Paginate
        totalPages={totalPages}
        totalRecord={totalRecord}
        nextPageAction={fetchNextPage}
        prevPageAction={fetchPrevPage}
        isFetching={isFetchTimeSheetChild}
        hasNextPage={hasNextPage}
      />

      <ModalLarge
        show={modalShare.isShow}
        toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
        className="inline-flex flex-col text-black w-full my-8 overflow-hidden text-left align-middle transition-all transform bg-white max-w-[600px] rounded-cbs-md"
      >
        <ModalShare
          toggle={() => setModalShare(prev => ({ ...prev, isShow: !modalShare.isShow }))}
          refetch={refetch}
          expertTimesheetID={timeSheetParentID}
          users={modalShare.users}
          modalType={modalShare.modalType}
          hasPermission={permissions.hasPermissionShare}
        />
      </ModalLarge>
    </div>
  );
};

export default TimeSheetDetailPage;