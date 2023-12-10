import React, { FC, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import TriangleDown from "assets/icons/TriangleDown";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { TIMESHEET_TYPES } from "apis/localdb";

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

const TimeSheetHomePage: FC = () => {
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

      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle w-3"
              }
            ></div>
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
              Phân loại
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
              Chi phí
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi chú
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((timeSheetParent: any) => (
            <div className={"body-table table-row"} key={timeSheetParent._id}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle w-3"
                }
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={recordSelected?._id === timeSheetParent._id}
                  onChange={(e) => {
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
                  "px-1 py-1 table-cell box-border border-b align-middle w-2/12"
                }
              >
                <NavLink to={`/timesheet/home/${timeSheetParent._id}`}>
                  {timeSheetParent.name}
                </NavLink>
                <p className={"mt-1 text-gray-500"}>
                  {timeSheetParent?.userCreate?.fullname} | 
                  {moment(timeSheetParent.createAt).isValid() &&
                    moment(timeSheetParent.createAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {TIMESHEET_TYPES[Number(timeSheetParent.type - 1)].text}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {timeSheetParent?.project?.name}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {timeSheetParent?.hours}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {`${timeSheetParent?.amount}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {timeSheetParent.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeSheetHomePage