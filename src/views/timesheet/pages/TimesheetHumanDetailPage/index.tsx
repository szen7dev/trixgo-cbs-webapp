import React, { FC, useRef, useState } from "react";
import moment from "moment";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { NavLink, useParams } from "react-router-dom";
import { useQueryListTimeSheetParent } from "services/hooks/useTimeSheet";
import { DAYOFWEEKS, TIMESHEET_SUBTYPES } from "apis/localdb/index";
import { convertCurrency } from "utils/converter";
import { createLinkAndClick } from "utils";
import { toast } from "react-toastify";
import { useCashBook } from "services/hooks/financial/useCashBook";

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
      sortOption: 3,
      year,
      month
  })

  let quantity = 0, amount = 0
  if(dataNotFilter.length){
    for(const item of dataNotFilter[0]){
      quantity = Number(quantity) + Number(item.hours)
      amount = Number(amount) + Number(item.amount)
    }
  }
  
  //_____Import, export excel
  const [, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  });

  const { exportExcelAsync } = useCashBook({});

  const handleDownloadExcel = async (param: any) => {
    try {
      setStateExport({ isExporting: true });
      const { error, data } = await exportExcelAsync({
        option: param.option,
        humanID,
        year,
        month
      });

      if (error) {
        return toast.warn(data?.message);
      }

      data && createLinkAndClick(data, "_self");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setStateExport({ isExporting: false });
    }
  };

  return (
    <div className={"financial-planning-detail"}>
      <div
        className={
          "financial-planning-header flex p-4 sticky top-0 z-10 bg-white"
        }
      >
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Chi tiết chấm công Tháng {month} Năm {year}</div>
          <button className={"ml-5 text-primary"} onClick={() => handleDownloadExcel({option: 1})}>
            Tải dữ liệu
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
      </div>

      <div className={"financial-planning-table"}>
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

          <div className="header table-row font-bold">
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-3"
              }
            >
              {"A"}
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-1/6"
              }
            >
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-1/6"
              }
            ></div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
              }
            >
              <div className="flex justify-end">
                {convertCurrency(Number(quantity).toFixed(0))}
              </div>
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
              }
            >
              <div className="flex justify-end">
                {convertCurrency(Number(amount/quantity).toFixed(0))}
              </div>
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
              }
            >
              <div className="flex justify-end">
                {convertCurrency(Number(amount).toFixed(0))}
              </div>
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
              }
            ></div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
              }
            ></div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100"
              }
              style={{width: "100px"}}
            ></div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-blue-100 w-1/6"
              }
            ></div>
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
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 align-middle bg-white"
                  }
                >
                   {index + 1}
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 align-middle bg-white"
                  }
                >
                  {item.name}
                  <NavLink  to={`/timesheet/home/${item?.parent?._id}`}>
                    <p><i>{item?.parent?.name}</i></p>
                  </NavLink>
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
                  }
                >
                  {moment(item.date).format("DD/MM/YY")}
                  <p className="text-gray-400 text-[10px]"><i>Cre: {item?.userCreate?.fullname} {moment(item.createAt).format("DD/MM/YY hh:mm")}</i></p>
                  <p className="text-gray-400 text-[10px]"><i>Mod: {item?.userUpdate?.fullname} {moment(item.modifyAt).format("DD/MM/YY hh:mm")}</i></p>
                  <p className="text-gray-400 text-[10px] text-cbs-highlight-color"><i>{DAYOFWEEKS[Number(new Date(item?.date).getDay())]?.name}</i></p>
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 align-middle bg-white text-right"
                  }
                >
                  {convertCurrency(item.hours)}
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white text-right"
                  }
                >
                  {convertCurrency(item.unitprice)}
                </div>
                <div
                  className={
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white text-right"
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
                    "px-[16px] py-[9px] table-cell relative box-border border border-gray-300 bg-white"
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