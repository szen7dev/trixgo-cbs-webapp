import React, { FC, useRef, useState, useCallback } from "react";
import { NavLink, useParams } from "react-router-dom";
import moment from "moment";
import debounce from "lodash/debounce";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { TIMESHEET_TYPES } from "apis/localdb";
import { convertCurrency } from "utils/converter";
import { ModalConfirm } from "shareComponents/common";
import API from "apis/repository";
import { toast } from "react-toastify";
import iconRefresh from "assets/images/icons8-refresh.png";

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
  typeTimesheet?: number
}

const TimesheetShiftDetailPage: FC<TimesheetHomePageProps> = ({ typeTimesheet }) => {
  const params = useParams<{ year: string, month: string }>();
  const year = Number(params["year"]);
  const month = Number(params["month"]);
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
  } = useQueryListTimeSheetParent({ 
    keyword, 
    typeTimesheet, 
    year,
    month,
    sortOption: 2 
  })

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
        console.error(err);
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

  const toggleModalOpen = (param: any) => {
      openModal(
          <div
          className={
              "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
          }
          >
          <ModalConfirm
              title="Bạn có muốn xác nhận Đồng bộ không?"
              description= "Dữ liệu từ Bảng chấm công ca làm việc sẽ được đồng bộ"
              onConfirm={() => handleConfirmSync({ option: param.option, timesheetID: param.timesheetID })}
              defaultText={false}
              onCancel={closeModal}
          />
          </div>
      )
  }

  const handleConfirmSync = useCallback(async (param: any) => {
      closeModal();

      const { data, status } = await API.post(
          `/api/timesheet/expert_timesheets/sync-data`, {
              option: param.option,
              timesheetID: param.timesheetID,
          }
      )
      
      if (status !== 200 || data.error) {
          return toast.warn('Đồng bộ thất bại')
      }
      return toast.success('Đồng bộ thành công')
  }, [])

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Bảng chấm công tháng {month} năm {year}</div>
          <SearchInput
            classNameWrapper={"ml-4"}
            onChange={debounce((e) => {
              setKeyword(e.target.value);
            }, 1000)}
          />
          {Object.keys(recordSelected).length > 1 && (
            <>
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
            ></div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ngày ghi nhận
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
              Phân loại
            </div>
            <div
              className={
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Dự án/phòng ban/Cơ sở
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
                "px-2 py-2 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi chú
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any) => (
            <div className={"body-table table-row"} key={item._id}>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b align-middle w-3"
                }
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={recordSelected?._id === item._id}
                  onChange={(e) => {
                    if (e.target.checked) {
                      toggleRecord(item);
                      return null;
                    }
                    toggleRecord({});
                    return null;
                  }}
                />
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {moment(item.date).format('DD/MM/YYYY')}
              </div>
              <div
                className={
                  "px-1 py-2 table-cell box-border border-b align-middle w-2/12"
                }
              >
                <NavLink to={`/timesheet/home/${item._id}`}>
                  {item.name}
                </NavLink>
                <p className={"mt-1 text-gray-500"}>
                  Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}
                </p>
                <p className={"mt-1 text-gray-500"}>
                  Cập nhật: {item?.userUpdate?.fullname} {moment(item.modifyAt).format(DATE_FORMAT)}
                </p>
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {TIMESHEET_TYPES[Number(item.type - 1)].text}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item?.project?.name}
                <p className="text-cbs-highlight-color"><i>{item?.funda ? `Cơ sở: ${item?.funda?.name}` : ''}</i></p>
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(item?.hours)}
              </div>
              <div
                className={
                  "px-2 py-2 table-cell box-border border-b text-right"
                }
              >
                {convertCurrency(item?.amount)}
              </div>
              <div className={"px-2 py-2 table-cell box-border border-b"}>
                {item.note}
                <div>
                  <button className={"flex text-primary-gray items-center rounded hover:bg-cbs-form-input-bg px-3 h-[30px] mr-2"} onClick={() => toggleModalOpen({ option: 1, timesheetID: item?._id })}>
                        <img src={iconRefresh} title={'Đồng bộ chấm công'} className={"w-[24px] h-[24px]"} />
                        <span>Kết chuyển chấm công từ Ca làm việc</span>
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimesheetShiftDetailPage