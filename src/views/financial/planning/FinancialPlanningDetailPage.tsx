import React, { FC, useEffect, useState } from "react";
import FileColorIcon from "assets/icons/FileColor";
import StarIcon from "assets/images/star.svg";
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import { map as _map } from "lodash";
import FinancialPlanningDetailMainRow from "./components/FinancialCashFlowDetail/FinancialPlanningDetailMainRow";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "redux/reducer";
import { setMainRowCollapsed } from "redux/reducer/FinancialPlanningDetailSlice";
import InputWidthAdjust from "./components/FinancialCashFlowDetail/InputWidthAdjust";
import AccessingUsers from "./components/FinancialCashFlowDetail/AccessingUsers";
import ShareButton from "./components/FinancialCashFlowDetail/ShareButton";

const FinancialPlanningDetailPage: FC = () => {
  const params = useParams<{ id: string }>();
  const id = params["id"];
  const mapData = useSelector((state: RootState) => state.financialPlanningDetails.data[id] ?? []);

  const dispatch = useDispatch();

  return (
    <div className={"financial-planning-detail"}>
      <div className={"financial-planning-header flex p-2 sticky top-0 z-10 bg-white"}>
        <FileColorIcon />
        <div className="w-auto">
          <div className={"flex"}>
            <InputWidthAdjust
              className={"text-lg w-auto mr-2"}
              value={"Kế hoạch dòng tiền T12.21"}
            />
            <img alt={"star-icon"} src={StarIcon} />
          </div>
          <p className={"text-gray-400"}>Chỉnh sửa lần cuối cách đây 2 giờ bởi Nguyễn Hữu Hiệp</p>
        </div>
        <div className={"flex-1 flex items-center justify-end"}>
          <p className={"text-gray-400 mr-2"}>Đang truy cập</p>
          <AccessingUsers
            users={[
              {
                _id: 1,
                name: "Trần Thanh Quang",
                avatar: fakeThumbnail,
              },
              {
                _id: 2,
                name: "Trần Thanh Quang 1",
                avatar: fakeThumbnail,
              },
              {
                _id: 3,
                name: "Trần Thanh Quang 2",
                avatar: fakeThumbnail,
              },
              {
                _id: 4,
                name: "Trần Thanh Quang 3",
                avatar: fakeThumbnail,
              },
              {
                _id: 5,
                name: "Trần Thanh Quang 5",
                avatar: fakeThumbnail,
              },
            ]}
          />
          <ShareButton />
        </div>
      </div>
      <div className={"financial-planning-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header flex table-row sticky z-10"}>
            <div
              className={
                "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle"
              }
            >
              <div className={"flex flex-col items-center justify-center"}>
                <button
                  className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                  onClick={() => dispatch(setMainRowCollapsed({ _id: id, collapsed: true }))}
                >
                  1
                </button>
                <button
                  className={"rounded bg-gray-600 mb-1 block w-5 h-5"}
                  onClick={() => dispatch(setMainRowCollapsed({ _id: id, collapsed: false }))}
                >
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
              Ngày dự kiến
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Dự kiến thu
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thực tế thu
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Dự kiến chi
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Thực tế chi
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Ngày thực tế
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Hợp đồng
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-2/12"
              }
            >
              Mô tả/ghi chú
            </div>
          </div>
          {_map(mapData, (row, index) => (
            <FinancialPlanningDetailMainRow
              key={row._id}
              idDetail={id}
              rowData={row}
              index={index}
            />
          ))}
          <div className={"row flex table-row font-semibold total-row"}>
            <div
              className={
                "financial-planning-table-action-sidebar w-6 bg-gray-300 text-white table-cell align-middle border border-gray-300 transition duration-300 ease-in-out"
              }
            ></div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100 w-3"
              }
            ></div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100 w-2/12"
              }
            >
              TỔNG
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"
              }
            ></div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"
              }
            >
              900.000.000.000
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"
              }
            >
              900.000.000.000
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"
              }
            >
              900.000.000.000
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"
              }
            >
              900.000.000.000
            </div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100"
              }
            ></div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100 w-2/12"
              }
            ></div>
            <div
              className={
                "px-2 py-4 table-cell box-border border border-gray-300 align-middle bg-yellow-100 w-2/12"
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialPlanningDetailPage;
