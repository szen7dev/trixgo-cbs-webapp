import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

import TriangleDown from "assets/icons/TriangleDown";
import VerifyIcon from "assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg";

import { Paginate } from "shareComponents/common/Paginate";
import debounce from "lodash/debounce";

import {
  SearchInput,
  DialogForm,
  ActionGroupButton,
  FilterButton,
} from "views/timesheet/shareComponents/common";

import { useModal } from "services/hooks/useModal";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import {
  useQueryListTimeSheetParent,
  useMutationTimeSheetParent,
} from "services/hooks/useTimeSheet";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";

enum TYPE {
  "Chuyên gia" = 1,
}

const TimeSheetHomePage: FC = () => {
  const [recordSelected, toggleRecord] = React.useState<any>({});
  const [keyword, setKeyword] = React.useState("");

  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
  const {
    data,
    refetch: refreshListTimeSheet,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    loading,
    hasNextPage,
  } = useQueryListTimeSheetParent({ keyword });

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
        // console.error(err);
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
          <div className={"text-lg"}>Bảng chấm công</div>
          <SearchInput
            classNameWrapper={"ml-4"}
            onChange={debounce((e) => {
              setKeyword(e.target.value);
            }, 1000)}
          />
          {Object.keys(recordSelected).length > 1 && (
            <>
              <FilterButton />
              <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
              <ActionGroupButton
                recordSelected={recordSelected}
                onUpdateTimeSheet={handleUpdateTimeSheet}
                onDeleteTimeSheet={handleClickDeleteTimeSheet}
              />
            </>
          )}
        </div>
        <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={() =>
            openModal(
              <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                <DialogForm
                  title="Tạo mới"
                  onSubmit={handleCreateTimeSheet}
                  projectName={""}
                  assigneeName={""}
                />
              </div>
            )
          }
        >
          Tạo mới
        </button>
        {/* <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
          <img alt={"Icon"} src={ThreeDotsVertical} />
        </button> */}
      </div>
      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "px-6 py-4 table-cell box-border border-b align-middle w-3"
              }
            >
              <div className={"flex items-center"}>
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <TriangleDown />
              </div>
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle w-2/12 text-gray-500"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Phân loại
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Dự án/phòng ban
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Tổng thời gian (giờ)
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Tổng chi phí (VND)
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi chú
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Trạng thái/Phê duyệt
            </div>
          </div>
          {data.map((timeSheetParent) => (
            <div className={"body-table table-row"} key={timeSheetParent._id}>
              <div
                className={
                  "px-6 py-4 table-cell box-border border-b align-middle w-3"
                }
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={recordSelected?._id === timeSheetParent._id}
                  onChange={(e) => {
                    // chỉ cho chọn 1
                    if (e.target.checked) {
                      toggleRecord(timeSheetParent);
                      return null;
                    }
                    toggleRecord({});
                    return null;
                  }}
                />
              </div>
              <div
                className={
                  "px-2 py-4 table-cell box-border border-b align-middle w-2/12"
                }
              >
                <NavLink to={`/timesheet/home/${timeSheetParent._id}`}>
                  {timeSheetParent.name}
                </NavLink>
                <p className={"mt-1 text-gray-500"}>
                  {timeSheetParent?.userCreate?.fullname}
                  {moment(timeSheetParent.createAt).isValid() &&
                    moment(timeSheetParent.createAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {TYPE[timeSheetParent.type]}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {timeSheetParent?.project?.name}
              </div>
              <div
                className={
                  "px-2 py-4 table-cell box-border border-b text-right"
                }
              >
                {timeSheetParent?.hours}
              </div>
              <div
                className={
                  "px-2 py-4 table-cell box-border border-b text-right"
                }
              >
                {`${timeSheetParent?.amount}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {timeSheetParent.note}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                <div className={"flex items-center text-primary"}>
                  <span className={"mr-3"}>
                    {timeSheetParent.timeApproved
                      ? "Đã phê duyệt"
                      : "Chưa phê duyệt"}
                  </span>
                  {timeSheetParent.timeApproved && (
                    <img src={VerifyIcon} alt={"icon"} />
                  )}
                </div>
                <p className={"mt-1 text-gray-500"}>
                  {moment(timeSheetParent.timeApproved).isValid() &&
                    moment(timeSheetParent.timeApproved).format(DATE_FORMAT)}
                </p>
                {/* <p className={"mt-1 text-gray-500"}>
                  Nguyễn Hữu Hiệp-PG 12/12/2021 15:45
                </p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Paginate
        totalPages={totalPages}
        totalRecord={totalRecord}
        nextPageAction={fetchNextPage}
        prevPageAction={fetchPrevPage}
        isFetching={loading}
        hasNextPage={hasNextPage}
      />
    </div>
  );
};

export default TimeSheetHomePage;
