import React, { FC, useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

/**
 * Components, Assets
 */
import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { InputWidthAdjust } from "views/timesheet/shareComponents/common";
import { createLinkAndClick } from "utils";

import { DetailMainRow, ModalShare } from "./components";
// import { CreateRow } from "./components/Form";

import {
  useQueryDetailSalaryParent,
  useQueryListSalaryChild,
  useMutationSalaryChild,
} from "services/hooks/useSalary";

import { useCashBook } from "services/hooks/financial/useCashBook";

import { useAuth } from "services/hooks/auth/useAuth";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

type PaginateHandle = React.ElementRef<typeof PaginateV2>;

const SalaryDetailPage: FC = () => {
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const [pageIndex, setPageIndex] = useState(0);

  const ref = useRef<PaginateHandle>(null);

  const salaryParentID = params["id"];

  const [modalShare, setModalShare] = useState<{
    isShow: boolean;
    users: User[] | undefined;
    modalType: "members" | "admins";
  }>({
    isShow: false,
    users: [],
    modalType: "members",
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

  const {
    data: salaryInfo,
    refetch,
    loading,
  } = useQueryDetailSalaryParent(salaryParentID);

  const {
    dataNotFilter: listSalaryChild,
    loading: isFetchSalaryChild,
    refetch: onRefreshSalaryChild,
    hasNextPage,
    totalPages,
    totalRecord,
    limit,
    fetchNextPage,
    fetchPrevPage,
  } = useQueryListSalaryChild(salaryParentID);

  const { onUpdateSalaryAsync, onCreateSalaryAsync } = useMutationSalaryChild();

  useEffect(() => {
    if (!salaryInfo || !user) return;

    const usersShared = [...salaryInfo?.admins, ...salaryInfo?.members];
    const adminsID = salaryInfo.admins.map((item) => item._id);
    const membersID = salaryInfo.members.map((item) => item._id);

    const usersIDShared = [...adminsID, ...membersID];
    let authorID = "";

    if (typeof salaryInfo.userCreate === "string") {
      authorID = salaryInfo.userCreate;
    } else {
      authorID = salaryInfo.userCreate?._id;
    }

    usersIDShared.push(authorID);

    if (!usersIDShared.includes(user._id)) {
      toast.warn("Bạn đang không có quyền truy cập");
      history.push("/timesheet/home");
    }

    const hasPermissionCreateUpdate =
      adminsID.includes(user._id) || authorID === user._id;
    const hasPermissionShare = authorID === user._id;
    const onlyView =
      membersID.includes(user._id) &&
      !adminsID.includes(user._id) &&
      authorID !== user._id;

    setPermissions({
      usersShared,
      onlyView,
      hasPermissionCreateUpdate,
      hasPermissionShare,
    });
  }, [JSON.stringify(salaryInfo), JSON.stringify(user)]);

  const handleUpdatedSalary = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateSalaryAsync({
          ...values,
          expertSalaryID: values._id,
          state: `${values.state}`,
          type: `${values.type}`,
          status: `${values.status}`,
          salary: `${values.salary}`,
          reward: `${values.reward}`,
          punishment: `${values.punishment}`,
          revenueBonus: `${values.revenueBonus}`,
          mealAllowance: `${values.mealAllowance}`,
          insurance: `${values.insurance}`,
          pitax: `${values.pitax}`,
        });
        if (!isUpdated.error) {
          onRefreshSalaryChild();
          refetch(); // refetch time sheet parent
        }
      } catch (err) {
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
          paid: "",
        });
        if (isCreated.error) {
          throw new Error("ERROR~");
        }

        refetch();
        onRefreshSalaryChild();
        return true;
      } catch (err) {
        return false;
      }
    },
    [salaryParentID, onCreateSalaryAsync, onRefreshSalaryChild, refetch]
  );

  const toggleModalShare = (
    modalType: "admins" | "members",
    users: User[] | undefined
  ) => setModalShare({ isShow: !modalShare.isShow, users, modalType });

  //_____Import, export excel
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { downloadTemplateExcelAsync } = useCashBook({});

  const handleDownloadExcel = async () => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await downloadTemplateExcelAsync({
        parentID: salaryParentID,
        option: "2",
      });

      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, "_self");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateExport({ isExporting: false });
    }
  };

  if (!salaryInfo || loading || !user)
    return <Loader className="border-primary" />;

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
          <button className={"mr-2 text-primary"} onClick={handleDownloadExcel}>
            Tải Bảng lương
          </button>
          <button
            className="text-gray-400 mr-2"
            onClick={() => {
              toggleModalShare("admins", salaryInfo.admins);
            }}
          >
            Admin ({salaryInfo.admins?.length})
          </button>{" "}
          |
          <button
            className="text-gray-400 mr-2 ml-2"
            onClick={() => {
              toggleModalShare("members", salaryInfo.members);
            }}
          >
            Thành viên ({salaryInfo.members?.length})
          </button>
          {/* <AccessingUsers users={permissions.usersShared} /> */}
          {/* <ShareButton /> */}
        </div>
      </div>

      <PaginateV2
        ref={ref}
        totalRecord={totalRecord}
        totalPages={totalPages}
        limit={limit}
        hasNextPage={hasNextPage}
        isFetching={isFetchSalaryChild}
        nextPageAction={() => {
          setPageIndex((oldState) => oldState + 1);
          fetchNextPage();
        }}
        prevPageAction={() => {
          setPageIndex((oldState) => oldState - 1);
          fetchPrevPage();
        }}
      />

      <div className={"financial-planning-table mt-2"}>
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
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-1/8"
              }
            >
              Nhân sự
            </div>
            {/* <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-50"
              }
            >
              Ngày ghi nhận
            </div> */}
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
              Thưởng hiệu quả
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thưởng đóng góp
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Phụ cấp tiền ăn
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Trừ vi phạm
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Trừ bảo hiểm
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Trừ thuế TNCN
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Đã tạm ứng
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Còn lại phải trả
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Đã chi trả
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Ghi chú
            </div>
          </div>
          {salaryInfo?._id && Array.isArray(listSalaryChild) && (
            <DetailMainRow
              salaryParentInfo={salaryInfo}
              listSalaryChild={listSalaryChild}
              onUpdatedSalaryChild={handleUpdatedSalary}
              isFetchSalaryChild={isFetchSalaryChild}
              hasPermission={permissions.hasPermissionCreateUpdate}
              pageIndex={pageIndex}
            />
          )}
        </div>
      </div>

      <ModalLarge
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
      </ModalLarge>
    </div>
  );
};

export default SalaryDetailPage;