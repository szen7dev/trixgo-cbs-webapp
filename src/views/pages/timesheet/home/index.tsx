import { FC } from "react";
import { NavLink } from "react-router-dom";
import Paginate from "components/common/Paginate";
import TriangleDown from "assets/icons/TriangleDown";
import VerifyIcon from "assets/images/icons8-verified-check-circle-for-approved-valid-content-96.svg";
import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import SearchInput from "components/common/SearchInput";

import ActionGroupButton from "../components/ActionGroupButton";
import FilterButton from "../components/FilterButton";
import CreateOrEditDialog from "../components/CreateOrEditDialog";

import { useModal } from "services/hooks/useModal";

const TimeSheetHomePage: FC = () => {
  const { openModal } = useModal();

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2 px-6"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Chấm công và tính lương chuyên gia</div>
          <SearchInput
            classNameWrapper={"ml-4"}
            onChange={(event) => console.log(event.target.value)}
          />
          <FilterButton />
          <div className={"mr-3 w-4 border-r border-gray-400 h-[16px]"} />
          <ActionGroupButton />
        </div>
        <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={() =>
            openModal(
              <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                <CreateOrEditDialog />
              </div>
            )
          }
        >
          Tạo mới
        </button>
        <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
          <img alt={"Icon"} src={ThreeDotsVertical} />
        </button>
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
          <div className={"body-table table-row"}>
            <div
              className={
                "px-6 py-4 table-cell box-border border-b align-middle w-3"
              }
            >
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border-b align-middle w-2/12"
              }
            >
              <NavLink to={"/timesheet/home/123"}>
                Bảng chấm công chuyên gia Lưu Đình Thi
              </NavLink>
              <p className={"mt-1 text-gray-500"}>
                Phùng Thị Hà-PG 20/07/2021 15:26
              </p>
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              Chuyên gia
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              Phòng tư vấn giá
            </div>
            <div
              className={"px-2 py-4 table-cell box-border border-b text-right"}
            >
              30
            </div>
            <div
              className={"px-2 py-4 table-cell box-border border-b text-right"}
            >
              7.500.000
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              Mỗi bảng chấm công sẽ được link với 1 task PCM để quản lí/tương
              tác
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b"}>
              <div className={"flex items-center text-primary"}>
                <span className={"mr-3"}>Đã phê duyệt</span>
                <img src={VerifyIcon} alt={"icon"} />
              </div>
              <p className={"mt-1 text-gray-500"}>
                Nguyễn Hữu Hiệp-PG 12/12/2021 15:45
              </p>
            </div>
          </div>
        </div>
      </div>
      <Paginate />
    </div>
  );
};

export default TimeSheetHomePage;
