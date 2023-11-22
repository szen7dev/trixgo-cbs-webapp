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
  ActionGroupButton2,
  FilterButton,
} from "views/timesheet/shareComponents/common";

import { useModal } from "services/hooks/useModal";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import {
  useQueryListSalaryParent,
  useMutationSalaryParent,
} from "services/hooks/useSalary";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
enum TYPE {
  "Chuyên gia" = 1,
}

const SalaryHomePage: FC = () => {
  const [recordSelected, toggleRecord] = React.useState<any>({});
  const [keyword, setKeyword] = React.useState("");

  const { openModal, closeModal } = useModal();
  const { openDeleteConfirm } = useDeleteConfirm();
  const {
    data,
    refetch: refreshListSalary,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    loading,
    hasNextPage,
  } = useQueryListSalaryParent({ keyword });

  const {
    onCreateSalaryParentAsync,
    onUpdateSalaryParentAsync,
    onDeleteSalaryParentAsync,
  } = useMutationSalaryParent();

  const handleCreateSalary = React.useCallback(
    async (values) => {
      try {
        const isCreated = await onCreateSalaryParentAsync(values);
        if (!isCreated.error) {
          refreshListSalary();
          closeModal();
          return null;
        }
        throw new Error("Can not create!");
      } catch (err) {
        // console.error(err);
        return null;
      }
    },
    [closeModal, onCreateSalaryParentAsync, refreshListSalary]
  );

  const handleUpdateSalary = React.useCallback(
    async (values) => {
      try {
        const isUpdated = await onUpdateSalaryParentAsync(values);
        if (!isUpdated.error) {
          refreshListSalary();
          closeModal();
          return null;
        }
        throw new Error("Can not create!");
      } catch (err) {
        // console.error(err);
        return null;
      }
    },
    [closeModal, onUpdateSalaryParentAsync, refreshListSalary]
  );

  const handleClickDeleteSalary = React.useCallback(
    (SalaryID) => {
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await onDeleteSalaryParentAsync({
            expertSalaryID: SalaryID,
          });
          if (res.status === 200) {
            refreshListSalary();
          }
        },
      });
    },
    [onDeleteSalaryParentAsync, refreshListSalary, openDeleteConfirm]
  );
  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Bảng lương</div>
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
              <ActionGroupButton2
                recordSelected={recordSelected}
                onUpdateSalary={handleUpdateSalary}
                onDeleteSalary={handleClickDeleteSalary}
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
                  onSubmit={handleCreateSalary}
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
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Nội dung
            </div>
            {/* <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Phân loại
            </div> */}
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
              Lương
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Ghi chú
            </div>
            {/* <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle text-gray-500"
              }
            >
              Trạng thái
            </div> */}
          </div>
          {data.map((salaryParent) => (
            <div className={"body-table table-row"} key={salaryParent._id}>
              <div
                className={
                  "px-6 py-4 table-cell box-border border-b align-middle w-3"
                }
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexCheckDefault"
                  checked={recordSelected?._id === salaryParent._id}
                  onChange={(e) => {
                    // chỉ cho chọn 1
                    if (e.target.checked) {
                      toggleRecord(salaryParent);
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
                <NavLink to={`/timesheet/salary/${salaryParent._id}`}>
                  {salaryParent.name}
                </NavLink>
                <p className={"mt-1 text-gray-500"}>
                  {salaryParent?.userCreate?.fullname}
                  {moment(salaryParent.createAt).isValid() &&
                    moment(salaryParent.createAt).format(DATE_FORMAT)}
                </p>
              </div>
              {/* <div className={"px-2 py-4 table-cell box-border border-b"}>
                {TYPE[salaryParent.type]}
              </div> */}
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {salaryParent?.project?.name}
              </div>
              <div
                className={
                  "px-2 py-4 table-cell box-border border-b text-right"
                }
              >
                {`${salaryParent?.salary}`.replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                )}
              </div>
              <div className={"px-2 py-4 table-cell box-border border-b"}>
                {salaryParent.note}
              </div>
              {/* <div className={"px-2 py-4 table-cell box-border border-b"}>
                <div className={"flex items-center text-primary"}>
                  <span className={"mr-3"}>
                    {salaryParent.timeApproved
                      ? "Đã phê duyệt"
                      : "Chưa phê duyệt"}
                  </span>
                  {salaryParent.timeApproved && (
                    <img src={VerifyIcon} alt={"icon"} />
                  )}
                </div>
                <p className={"mt-1 text-gray-500"}>
                  {moment(salaryParent.timeApproved).isValid() &&
                    moment(salaryParent.timeApproved).format(DATE_FORMAT)}
                </p>
              </div> */}
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

export default SalaryHomePage;