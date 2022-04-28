import React, { FC, useMemo, useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useTable, useRowSelect, TableOptions } from "react-table";
import moment from "moment";
import projectImage from "assets/images/project.jpg";
import CustomAutoComplete from "../../Form/CustomForm/CustomAutoComplete";
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { TableWithoutContext } from "shareComponents/common/Table";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

type ProjectProps = {
  //
};
interface IProject {
  _id: string;
}
const { REACT_APP_URL_S3, REACT_APP_URL_S3_PROJECT } = process.env;
// const data = Array.from({ length: 15 }).map((e, i) => ({ _id: "123" + i }));
function getColumnsProject(): TableOptions<any>["columns"] {
  return [
    SelectionColumn({
      tableHeadSelectorProps: {
        className: "px-4 py-2.5 font-normal border-b border-cbs-border w-1",
      },
      tableHeadSelectorInputProps: { className: "cbs-checkbox" },
      tableCellSelectorProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border text-center",
      },
      tableCellSelectorInputProps: { className: "cbs-checkbox" },
    }),
    {
      accessor: "_id",
      Header({ currentPage, currentTotalPage, totalPage, fetchNextPage, fetchPreviousPage }) {
        const isDisablePrevButton = (currentTotalPage === 2 && currentPage === 1) || totalPage === 0;
        const isDisableNextButton = (currentPage === totalPage) || totalPage === 0;
        return (
          <div className="flex justify-between pb-1">
            <span className="bg-[#F6F7F8] bg-opacity-60 rounded-full p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </span>
            <div className="flex items-center">
              {/* <span className="mr-4">10-{length} trong số rất nhiều</span> */}
              <span className="mr-4">Trang {currentPage} trong {totalPage}</span>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border" onClick={fetchPreviousPage} disabled={isDisablePrevButton}>
                <img
                  alt="Previous"
                  src={iconChevronRight}
                  className="w-4 filter-primary-gray rotate-180"
                />
              </button>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border" onClick={fetchNextPage} disabled={isDisableNextButton}>
                <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
              </button>
            </div>
          </div>
        );
      },
      headCellProps: { colSpan: 2, className: "border-b border-cbs-border pl-2 pr-8" },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row, value }: { row: any, value: any}) {
        const infoDepartment = row.original ;
        return (
          <Link to={`/pcm/project/${infoDepartment._id}/home`} target="_blank">
            <p className="text-cbs-highlight-color">
              {infoDepartment?.sign}.{infoDepartment?.name}
            </p>
            <p className="text-cbs-subtext">
            {infoDepartment?.owner}
            </p>
            <p className="text-cbs-subtext">
              Bắt đầu: {moment(infoDepartment?.startTime).format("L")} <span className="inline-block w-1 h-1 rounded-full bg-current" /> Dự kiến kết
              thúc: {moment(infoDepartment?.expiredTime).format("L")}
            </p>
          </Link>
        );
      },
    },
    {
      accessor: "_id",
      id: "he",
      headCellProps: { className: "hidden" },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row, value }: { row: any, value: any}) {
        const infoDepartment = row.original;
        const imgUrl = infoDepartment.image
        ? (infoDepartment.image.startsWith('files/db')
          ? `${REACT_APP_URL_S3}/${infoDepartment.image}`
          : `${REACT_APP_URL_S3_PROJECT}/${infoDepartment.image}`)
        : projectImage;

        return (
          <div>
            <img src={imgUrl} className="h-[60px] w-[60px]" alt="hellu" />
          </div>
        );
      },
    },
  ];
}

const Project: FC<ProjectProps> = (props) => {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(-30)));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [searchDepartmentValue, setSearchDepartmentValue] = useState("");
  const [dataDepartment, setDataDepartment]               = useState<any[]>([]);
  const [count, setCount] = useState(1);
  const [pagesCursor, setPagesCursor]                         = useState<(any)[]>([undefined]);
  const [lastestID, setLastestID] = useState<string>("");

  const { data: listDepartments, loading: isLoading, totalRecord, totalPages: totalPage, nextCursor } = useQueryListDepartmentsIsMember({
    limit: 50,
    keyword: searchDepartmentValue,
    lastestID,
    isFetch: true
  });

  const handleSearchInput = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchDepartmentValue(event.target.value);
    // setIsResultNavigation(false);
  }, 700);

  useEffect(() => {
    if(!listDepartments) return;
    setDataDepartment(listDepartments);
  }, [JSON.stringify(listDepartments)])

  useEffect(() => {
    const checkExistsPage = pagesCursor.find(page => page === nextCursor);

    if(checkExistsPage || !totalPage) return;
    if(!nextCursor && count > 1) return;

    const cursors = [...pagesCursor, nextCursor].filter(Boolean);
    setPagesCursor(cursors);
  }, [nextCursor, count, totalPage])

  const handleNextPageButton = () => {
    setCount(count + 1);
    setLastestID(pagesCursor[pagesCursor.length - 1]);
  };

  const handlePrevPageButton = () => {
    if(pagesCursor.length === 2) return;

    let prevCursor: string | undefined = '';

    if(count === totalPage) {
      prevCursor = pagesCursor[pagesCursor.length - 2];
    } else{
      prevCursor = pagesCursor[pagesCursor.length - 3];
    }

    pagesCursor.splice(-1, 1);

    setPagesCursor(pagesCursor);
    setCount(count - 1);
    setLastestID(`${prevCursor}`);
  };

  const columns = useMemo(getColumnsProject, []);
  const instance = useTable({ columns, data: dataDepartment, getRowId: (row: any) => row._id }, useRowSelect);
  return (
    <div>
      <div className="pt-4 pl-8 pr-8 pb-3 relative flex space-x-3">
        <input
            onChange={handleSearchInput}
            type="search"
            placeholder="Tìm kiếm"
            className="w-full focus:outline-none h-11 border border-solid border-primary-border pl-3 pr-16 rounded-md"
          />
      </div>
      {/* Content */}
      <div className="h-[480px] overflow-auto">
        <TableWithoutContext
          instance={instance}
          tableProps={{ className: "w-full" }}
          props={{
            length: totalRecord,
            currentPage: count,
            currentTotalPage: pagesCursor.length,
            totalPage: totalPage,
            fetchNextPage: handleNextPageButton,
            fetchPreviousPage: handlePrevPageButton
          }}
          isLoading={isLoading}
        />
      </div>
      {/* <div className="flex justify-end pt-3 px-10">
        <button className="text-cbs-subtext px-7 py-3.5 font-bold rounded-cbs-sm">Bỏ qua</button>
        <button className="bg-cbs-primary text-white px-7 py-3.5 font-bold rounded-cbs-sm">
          Tìm kiếm
        </button>
      </div> */}
    </div>
  );
};

export default Project;
