import React, { FC, useState } from "react";
import { map as _map } from "lodash";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

/**
 * Components, Assets
 */
import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import { Paginate } from "shareComponents/common/Paginate";
import ModalLarge from "shareComponents/common/ModalContainer/components/ModalLarge";
import { InputWidthAdjust, ShareButton } from "views/timesheet/shareComponents/common";

import {
  DetailMainRow,
  AccessingUsers,
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
import { setMainRowCollapsed } from "redux/reducer/Timesheet";
import { User } from "typings/user";
import { Loader } from "shareComponents/common";

const TimeSheetDetailPage: FC = () => {
  const params = useParams<{ id: string }>();
  const timeSheetParentID = params["id"];
  const [modalShare, setModalShare] = useState<{ isShow: boolean, users: User[] | undefined, modalType: 'members' | 'admins' }>({
    isShow: false,
    users: [],
    modalType: 'members'
  });

  const { data: timeSheetInfo, refetch, loading } = useQueryDetailTimeSheetParent(timeSheetParentID);
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

  const { onUpdateTimeSheetAsync, onCreateTimeSheetAsync } =
    useMutationTimeSheetChild();

  const handleUpdatedTimeSheet = React.useCallback(
    async (values) => {
      try {
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

  if(!timeSheetInfo || loading) return <Loader className="border-primary" />

  const usersShared = [...timeSheetInfo.admins, ...timeSheetInfo.members];

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
          <AccessingUsers users={usersShared} />
          {/* <ShareButton /> */}
        </div>
      </div>
      <div className={"financial-planning-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle"
              }
            >
              <div className={"flex flex-col items-center justify-center"}>
                <button
                  className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                  onClick={() =>
                    dispatch(setMainRowCollapsed({ _id: timeSheetParentID, collapsed: true }))
                  }
                >
                  1
                </button>
                <button
                  className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                  onClick={() =>
                    dispatch(setMainRowCollapsed({ _id: timeSheetParentID, collapsed: false }))
                  }
                >
                  2
                </button>
              </div>
            </div>
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
              Ngày tháng
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Hoàn thành
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Số giờ
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
              Mô tả/ghi chú
            </div>
          </div>
          {timeSheetInfo?._id && Array.isArray(listTimeSheetChild) && (
            <DetailMainRow
              timeSheetParentInfo={timeSheetInfo}
              listTimeSheetChild={listTimeSheetChild}
              onUpdatedTimeSheetChild={handleUpdatedTimeSheet}
              isFetchTimeSheetChild={isFetchTimeSheetChild}
            />
          )}
          <CreateRow onInsert={handleCreateTimeSheet} />
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
        />
      </ModalLarge>
    </div>
  );
};

export default TimeSheetDetailPage;
