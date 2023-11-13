import React, { FC, useMemo, useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import { useTable, useRowSelect, TableOptions } from "react-table";
import debounce from "lodash/debounce";

import CustomAutoComplete from "../../Form/CustomForm/CustomAutoComplete";
import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { TableWithoutContext } from "shareComponents/common/Table";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import CustomField from "shareComponents/common/Form/CustomForm/CustomField";
import Dot from "./Dot";
import { Link } from "react-router-dom";
import { useQueryListDepartments } from "services/hooks/items/useDepartment";

// HOOK
import { useContractIsMembers } from "services/hooks/items/useContract";
import moment from "moment";

type ContractProps = {
  [k: string]: Record<string, any>;
};

function getColumnsContract(): TableOptions<any>["columns"] {
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
        const infoContract = row.original;
        return (
          <Link to={`/cmcs/contract/${infoContract._id}/home`}>
            <p className="text-cbs-highlight-color">
              {infoContract.name}
            </p>
            <p className="text-cbs-subtext">
              <span>{infoContract?.project?.sign} </span>
              <Dot />
              <span> {infoContract?.sign} </span>
              <Dot />
              <span> {moment(infoContract?.date).format("L")} </span>
            </p>
            <p className="text-cbs-subtext">
            <span>{infoContract?.author?.bizfullname}</span>
              <span className="text-cbs-primary"> {moment(infoContract?.date).format("L")}:{moment(infoContract?.date).format("LT")} ({moment(infoContract?.createAt).fromNow()})</span>
            </p>
          </Link>
        );
      },
    },
    {
      accessor: "value",
      id: "he",
      headCellProps: { className: "hidden" },
      cellProps: {
        className:
          "pt-2.5 pb-3 px-2 border-b border-cbs-border text-right pr-6 font-bold align-middle",
      },
      Cell({ row, value }: { row: any, value: any}) {
        const infoContract = row.original;
        return <div>{infoContract?.value.toLocaleString("en")}</div>;
      },
    },
  ];
}

const Contract: FC<ContractProps> = (props) => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [keyword, setKeyword] = useState("");
  const [projectSelected, setProjectSelected] = useState("");
  const [dataContract, setDataContract]                       = useState<any[]>([]);
  const [count, setCount] = useState(1);
  const [pagesCursor, setPagesCursor]                         = useState<(any)[]>([undefined]);
  const [paramsSearch, setParamsSearch]                       = useState<any>({
    keyword: "",
    projectID: "",
    type: "",
    fromDate: "",
    toDate: "",
    lastestID: "",
    limit: "20",
    populates: JSON.stringify({
      path: "project userCreate", select: "sign name bizfullname" 
    })
  });

  const columns = useMemo(getColumnsContract, []);
  const instance = useTable({ columns, data: dataContract, getRowId: (row: any) => row._id }, useRowSelect);
  // Danh sách hợp đồng
  const {
    listContracts, isLoading, totalRecord, totalPage, nextCursor
  } = useContractIsMembers({ params: paramsSearch, isFetch: true });

  const { listDepartments } = useQueryListDepartments({ select:  "name", limit: 20 }, true);
  useEffect(() => {
    if(!listContracts) return;
    setDataContract(listContracts);
  }, [JSON.stringify(listContracts)])

  useEffect(() => {
    const checkExistsPage = pagesCursor.find(page => page === nextCursor);
    if(checkExistsPage || !totalPage) return;
    if(!nextCursor && count > 1) return;

    const cursors = [...pagesCursor, nextCursor].filter(Boolean);
    setPagesCursor(cursors);
  }, [nextCursor, count, totalPage])

  const handleNextPageButton = () => {
    setCount(count + 1);
    setParamsSearch((preValue: any) => ({
      ...preValue,
      lastestID: pagesCursor[pagesCursor.length - 1]
    }));
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
    setParamsSearch((preValue: any) => ({
      ...preValue,
      lastestID: prevCursor
    }));
  };

  const handleSearch = () => {
    setParamsSearch((preValue:any) => ({
      ...preValue,
      keyword,
      projectID: projectSelected,
      fromDate: startDate ? moment(startDate).format('YYYY-MM-DD') : '',
      toDate: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
      lastestID: ''
    }))
  }

  return (
    <div>
      <div className="pt-4 pl-8 pr-8 pb-3">
        <div className="flex space-x-3">
          <CustomField
            name="report"
            placeholder="Nhập tên hoặc mã hợp đồng"
            wrapperClassName="w-4/12"
            className="py-2.5 px-3 focus:outline-none w-full pr-10"
            containerClassName="relative"
            onChange={debounce((e) => setKeyword(e.target.value), 500)}
            icon={() => {
              return (
                <div className="absolute right-2 inset-y-0 flex items-center">
                  {/* <img src={iconSlider} alt="Filter" className="w-6 h-6" /> */}
                </div>
              );
            }}
          />
          <CustomAutoComplete
            data={listDepartments}
            wrapperClassName="w-4/12"
            className="w-full h-full py-2.5 px-3 focus:outline"
            placeholder="Thuộc dự án"
            // onChange={debounce((e) => setKeywordDatahubContact(e), 500)}
            onChangeValue={value => setProjectSelected(value._id)}
          />
          <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
            <ReactDatePicker
              onChange={(date: Date) => setStartDate(date)}
              selected={startDate}
              className="text-small leading-[19.5px] py-2.5 w-full focus:outline-none"
            />
            <div className="w-6 h-6">
              <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
            </div>
            <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Từ ngày</label>
          </div>
          <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
            <ReactDatePicker
              onChange={(date: Date) => setEndDate(date)}
              selected={endDate}
              className="text-small leading-[19.5px] py-2.5 w-full focus:outline-none"
            />
            <div className="w-6 h-6">
              <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
            </div>
            <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Đến ngày</label>
          </div>
        </div>
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
      <div className="flex justify-end pt-3 px-10">
        <button className="text-cbs-subtext px-7 py-3.5 font-bold rounded-cbs-sm">Bỏ qua</button>
        <button className="bg-cbs-primary text-white px-7 py-3.5 font-bold rounded-cbs-sm" onClick={handleSearch}>
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default Contract;
