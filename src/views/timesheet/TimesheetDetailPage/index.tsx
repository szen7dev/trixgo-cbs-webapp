import React, { FC } from "react";
import { map as _map } from "lodash";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import Thumbnail from "assets/images/thumbnail2.png";

import Paginate from "../shareComponents/common/Paginate";
import { InputWidthAdjust } from "../shareComponents/common/Input";
import { ShareButton } from "../shareComponents/common/Button";

import DetailMainRow from "./components/DetailMainRow";
import AccessingUsers from "./components/AccessingUsers";
import { CreateRow } from "./components/Form";

import { setMainRowCollapsed } from "redux/reducer/Timesheet";

import {
  useQueryDetailTimeSheetParent,
  useQueryListTimeSheetChild,
  useMutationTimeSheetChild,
} from "services/hooks/useTimeSheet";

const TimeSheetDetailPage: FC = () => {
  const params = useParams<{ id: string }>();
  const id = params["id"];

  const { data, refetch } = useQueryDetailTimeSheetParent(id);
  const {
    data: listTimeSheetChild,
    loading: isFetchTimeSheetChild,
    totalPages,
    totalRecord,
    hasNextPage,
    fetchNextPage,
    fetchPrevPage,
    refetch: onRefreshTimeSheetChild,
  } = useQueryListTimeSheetChild(id);
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
          parentID: id,
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
    [id, onCreateTimeSheetAsync, onRefreshTimeSheetChild, refetch]
  );

  const dispatch = useDispatch();

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
              value={data?.name}
            />
            <img alt={"star-icon"} src={StarIcon} />
          </div>
          <p className={"text-gray-400"}>
            Chỉnh sửa lần cuối cách đây{" "}
            {moment(data?.updatedAt).isValid() &&
              moment(data?.updatedAt).fromNow()}{" "}
            bởi {data?.userCreate?.fullname}
          </p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <p className={"text-gray-400 mr-2"}>Đang truy cập</p>
          <AccessingUsers
            users={[
              {
                _id: 1,
                name: "Trần Thanh Quang",
                avatar: Thumbnail,
              },
              {
                _id: 2,
                name: "Trần Thanh Quang 1",
                avatar: Thumbnail,
              },
              {
                _id: 3,
                name: "Trần Thanh Quang 2",
                avatar: Thumbnail,
              },
              {
                _id: 4,
                name: "Trần Thanh Quang 3",
                avatar: Thumbnail,
              },
              {
                _id: 5,
                name: "Trần Thanh Quang 5",
                avatar: Thumbnail,
              },
              {
                _id: 6,
                name: "Trần Thanh Quang 5",
                avatar: Thumbnail,
              },
            ]}
          />
          <ShareButton />
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
                    dispatch(setMainRowCollapsed({ _id: id, collapsed: true }))
                  }
                >
                  1
                </button>
                <button
                  className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                  onClick={() =>
                    dispatch(setMainRowCollapsed({ _id: id, collapsed: false }))
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
          {data?._id && Array.isArray(listTimeSheetChild) && (
            <DetailMainRow
              timeSheetParentInfo={data}
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
    </div>
  );
};

export default TimeSheetDetailPage;
