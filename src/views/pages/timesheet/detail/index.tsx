import { FC } from "react";

import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import Thumbnail from "assets/images/thumbnail2.png";

import InputWidthAdjust from "../components/InputWidthAdjust";
import AccessingUsers from "../components/AccessingUsers";
import ShareButton from "../components/ShareButton";

const TimeSheetDetailPage: FC = () => {
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
              value="Bảng chấm công chuyên gia Lưu Đình Thi-PGI"
            />
            <img alt={"star-icon"} src={StarIcon} />
          </div>
          <p className={"text-gray-400"}>
            Chỉnh sửa lần cuối cách đây 2 giờ bởi Nguyễn Hữu Hiệp
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
                <button className={"rounded bg-gray-600 mb-1 block w-5 h-5"}>
                  1
                </button>
                <button className={"rounded bg-gray-600 mb-1 block w-5 h-5"}>
                  2
                </button>
              </div>
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-3"
              }
            >
              TT
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-2/12"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Ngày tháng
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Hoàn thành
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Số giờ thực hiện
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Đơn giá
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thành tiền
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Người thực hiện
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-2/12"
              }
            >
              Mô tả/ghi chú
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSheetDetailPage;
