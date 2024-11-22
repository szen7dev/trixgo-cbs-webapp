import React, { FC, useRef, useState } from "react";
import moment from "moment";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { NavLink, useParams } from "react-router-dom";
import { useQueryListTimeSheetParent } from "services/hooks/useTimeSheet";
import { DAYOFWEEKS, TIMESHEET_SUBTYPES } from "apis/localdb/index";
import { convertCurrency } from "utils/converter";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface TimesheetHomePageProps {
  type?: number
}

const TimesheetHumanDetailPage: FC<TimesheetHomePageProps> = ({ type = 2 }) => {
  const params = useParams<{ id: string, year: string, month: string}>();
  const humanID = params["id"];
  const year = Number(params["year"]);
  const month = Number(params["month"]);
  const [keyword, setKeyword] = React.useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const ref = useRef<RefPaginateHandle>(null);

  const {
    dataNotFilter,
    refetch,
    totalPages,
    totalRecord,
    fetchNextPage,
    fetchPrevPage,
    limit,
    loading,
    hasNextPage,
  } = useQueryListTimeSheetParent({ 
    keyword, 
    type, 
    humanID, 
    sortOption: 2,
    year,
    month
})

  return (
    <div className={"financial-cashflow-listing paginate-wrapper relative"}>
      <div
        className={
          "financial-cashflow-listing-heading flex items-center border-b py-2"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Chi tiết chấm công</div>
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

      <div className={"financial-planning-table mt-2"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              TT
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-1/6"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100  w-1/6"
              }
            >
              Ngày
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              KL
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
              Phân loại
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100"
              }
            >
              Công việc/Bill
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-1/6"
              }
            >
              Mô tả/ghi chú
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
            <div
                key={item._id}
                style={{}}
                className={"transition duration-300 ease-in-out child-row table-row "}
                data-row-index={item._id}
              >
                <div
                  className={
                    "table-cell relative box-border border border-gray-300 align-middle bg-white"
                  }
                >
                   {index + 1}
                </div>
                <div
                  className={
                    "table-cell relative box-border border border-gray-300 align-middle bg-white"
                  }
                >
                  {item.name}
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
                  }
                >
                  {moment(item.date).format("DD/MM/YY hh:mm")}
                  <p className="text-gray-400 text-[10px]"><i>Cre: {item?.userCreate?.fullname} {moment(item.createAt).format("DD/MM/YY hh:mm")}</i></p>
                  <p className="text-gray-400 text-[10px]"><i>Mod: {item?.userUpdate?.fullname} {moment(item.modifyAt).format("DD/MM/YY hh:mm")}</i></p>
                  <p className="text-gray-400 text-[10px] text-cbs-highlight-color"><i>{DAYOFWEEKS[Number(new Date(item?.date).getDay())]?.name}</i></p>
                </div>
                <div
                  className={
                    "table-cell relative box-border border border-gray-300 align-middle bg-white text-right"
                  }
                >
                  {convertCurrency(item.hours)}
                </div>
                <div
                  className={
                    "table-cell relative box-border border border-gray-300 bg-white text-right"
                  }
                >
                  {convertCurrency(item.unitprice)}
                </div>
                <div
                  className={
                    "table-cell relative box-border border border-gray-300 bg-white text-right"
                  }
                >
                  {convertCurrency(item.amount)}
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
                  }
                >
                    {item?.assignee?.fullname}
                </div>
          
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
                  }
                >
                  {TIMESHEET_SUBTYPES[Number(item?.subtype)-1].name}
                </div>
          
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
                  }
                >
                  {item?.work?.name}
                </div>
          
                <div
                  className={
                    "table-cell relative box-border border border-gray-300 bg-white"
                  }
                >
                  {item.note}
                </div>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimesheetHumanDetailPage