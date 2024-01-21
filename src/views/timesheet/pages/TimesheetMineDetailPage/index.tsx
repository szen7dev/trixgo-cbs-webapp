import React, { FC, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { TIMESHEET_TYPES } from "apis/localdb";

import {
  SearchInput,
  DialogForm,
  ActionGroupButton,
} from "views/timesheet/shareComponents/common";

import { useModal } from "services/hooks/useModal";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import {
  useQueryListTimeSheetParent,
  useMutationTimeSheetParent,
} from "services/hooks/useTimeSheet";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface TimesheetHomePageProps {
  type?: number
}

const TimesheetMineDetailPage: FC<TimesheetHomePageProps> = ({ type = 2 }) => {
  const [recordSelected, toggleRecord] = React.useState<any>({});
  const [keyword, setKeyword] = React.useState("");
  const [pageIndex, setPageIndex] = useState(0);

  const ref = useRef<RefPaginateHandle>(null);

  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
  const {
    dataNotFilter,
    refetch: refreshListTimeSheet,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    limit,
    loading,
    hasNextPage,
  } = useQueryListTimeSheetParent({ keyword, type, sortOption: 2 });

  const {
    onCreateTimeSheetParentAsync,
    onUpdateTimeSheetParentAsync,
    onDeleteTimeSheetParentAsync,
  } = useMutationTimeSheetParent();

  const handleCreateTimeSheet = React.useCallback(
    async (values) => {
      try {
        const isCreated = await onCreateTimeSheetParentAsync(values);
        if (!isCreated.error) {
          refreshListTimeSheet();
          closeModal();
          return null;
        }
        throw new Error("Can not create!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, onCreateTimeSheetParentAsync, refreshListTimeSheet]
  );

  const handleUpdateTimeSheet = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateTimeSheetParentAsync(values);
        if (!isUpdated.error) {
          refreshListTimeSheet();
          closeModal();
          return null;
        }
        throw new Error("Can not create!");
      } catch (err) {
        // console.error(err);
        return null;
      }
    },
    [closeModal, onUpdateTimeSheetParentAsync, refreshListTimeSheet]
  );

  const handleClickDeleteTimeSheet = React.useCallback(
    (timeSheetID) => {
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await onDeleteTimeSheetParentAsync({
            expertTimesheetID: timeSheetID,
          });
          if (res.status === 200) {
            refreshListTimeSheet();
          }
        },
      });
    },
    [onDeleteTimeSheetParentAsync, refreshListTimeSheet, openDeleteConfirm]
  );

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Chi tiết chấm công của tôi</div>
        </div>
        <PaginateV2
          ref={ref}
          totalRecord={totalRecord}
          totalPages={totalPages}
          limit={limit}
          hasNextPage={hasNextPage}
          isFetching={loading}
          nextPageAction={() => {
            setPageIndex((oldState) => oldState + 1);
            fetchNextPage();
          }}
          prevPageAction={() => {
            setPageIndex((oldState) => oldState - 1);
            fetchPrevPage();
          }}
        />
      </div>

      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle w-3"
              }
            >
                TT
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500 w-1/3"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Dự án/phòng ban
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Khối lượng
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Giá trị
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500  w-1/3"
              }
            >
              Ghi chú
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
            <div className={"body-table table-row"} key={item._id}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle w-3"
                }
              >
                {Number(index + 1)}
              </div>
              <div
                className={
                  "px-1 py-2 table-cell box-border border-b align-middle w-2/12"
                }
              >
                {item.name} - {moment(item.date).format('MM/YYYY')}-{item._id}
                <p className={"mt-1 text-gray-500"}>
                  Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}
                </p>
                <p className={"mt-1 text-gray-500"}>
                  Cập nhật: {item?.userUpdate?.fullname} {moment(item.modifyAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item?.project?.name}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {item?.hours}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {`${item?.amount}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimesheetMineDetailPage