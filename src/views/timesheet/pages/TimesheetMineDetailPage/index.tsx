import React, { FC, useRef, useState } from "react";
import moment from "moment";
import PaginateV2, { RefPaginateHandle } from "shareComponents/common/PaginateV2";
import { NavLink, useParams } from "react-router-dom";
import { useQueryListTimeSheetParent } from "services/hooks/useTimeSheet";
import { DAYOFWEEKS } from "apis/localdb/index";
import { createLinkAndClick } from "utils";
import { toast } from "react-toastify";
import { useCashBook } from "services/hooks/financial/useCashBook";

const DATE_FORMAT = "DD/MM/YYYY HH:mm";
interface TimesheetHomePageProps {
  type?: number
}

const TimesheetMineDetailPage: FC<TimesheetHomePageProps> = ({ type = 2 }) => {
  const params = useParams<{ id: string }>();
  const humanID = params["id"];
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
  } = useQueryListTimeSheetParent({ keyword, type, humanID, sortOption: 2 });

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
        // parentID: timeSheetParentID,
        // fromDate: inputFilter.fromDate,
        // toDate: inputFilter.toDate,
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
      
      <div className={"financial-planning-header flex p-4 sticky top-0 z-10 bg-white"}>
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

      <div className={"financial-planning-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header table-row sticky z-10"}>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-3"
              }
            >
                TT
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 text-gray-500 w-1/3"
              }
            >
              Nội dung
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 text-gray-500"
              }
            >
              Dự án/phòng ban
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 text-gray-500"
              }
            >
              Khối lượng
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 text-gray-500"
              }
            >
              Giá trị
            </div>
            <div
              className={
                "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 text-gray-500  w-1/3"
              }
            >
              Ghi chú
            </div>
          </div>
          {dataNotFilter[pageIndex] && dataNotFilter[pageIndex].map((item: any, index: any) => (
            <div className={"body-table table-row"} key={item._id}>
              <div
                className={
                  "p-2 table-cell box-border border border-gray-300 align-middle bg-gray-100 w-3"
                }
              >
                {Number(index + 1)}
              </div>
              <div
                className={
                  "px-1 py-2 table-cell box-border border-b align-middle w-2/12"
                }
              >
                {item.name} - {moment(item.date).format('DD/MM/YYYY')} | {DAYOFWEEKS[Number(new Date(item?.date).getDay())]?.name}
                <p className="text-cbs-highlight-color"><i>{item?.assignee?.fullname}</i></p>
                <NavLink  to={`/timesheet/home/${item?.parent?._id}`}>
                  <p><i>{item?.parent?.name}</i></p>
                  <p className={"mt-1 text-gray-500"}>
                    Tạo: {item?.userCreate?.fullname} {moment(item.createAt).format(DATE_FORMAT)}
                  </p>
                  <p className={"mt-1 text-gray-500"}>
                    Cập nhật: {item?.userUpdate?.fullname} {moment(item.modifyAt).format(DATE_FORMAT)}
                  </p>
                </NavLink>
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