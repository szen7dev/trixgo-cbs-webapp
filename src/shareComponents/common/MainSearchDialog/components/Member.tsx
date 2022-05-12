import React, { FC, useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect, TableOptions } from "react-table";
import cn from "classnames";

import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { TableWithoutContext } from "shareComponents/common/Table";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import iconSlider from "assets/images/icons8-slider-32.png";
import { debounce } from "lodash";
import { MainSearchFilter } from "shareComponents/common/MainSearchFilter";
import Dot from "./Dot";
import { Link } from "react-router-dom";

// Hook
import { useContact } from "services/hooks/items/useContact";
import { useModal } from "services/hooks/useModal";
import { useMainSearch } from "services/hooks/useMainSearch";
import moment from "moment";

type MemberProps = {
  //
};

interface IMember {
  _id: string;
  value: number;
}

const data = Array.from({ length: 15 }).map((e, i) => ({
  _id: "123" + i,
  value: Math.floor(Math.random() * 1_000_000_000),
}));

// function getColumnsMember(): TableOptions<IMember>["columns"] {
function getColumnsMember(): TableOptions<any>["columns"] {
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
      headCellProps: { className: "border-b border-cbs-border pl-2 pr-8" },
      cellProps: {
        className: "pt-2.5 pb-3 px-2 border-b border-cbs-border",
      },
      Cell({ row, value }) {
        const infoContact = row.original ;
        return (
          <Link to={`/human/home/hid=${infoContact._id}`}>
            <p className="text-cbs-highlight-color">{infoContact?.name} {infoContact?.position && `(${infoContact?.position?.name})`}</p>
            <p className="text-cbs-subtext">
              <span>Điện thoại: {infoContact?.phone} </span>
              <Dot />
              <span> Email: {infoContact?.email} </span>
              <Dot />
              <span> Ngày sinh: {infoContact?.birthday && moment(infoContact?.birthday).format("L") || "Chưa cập nhật" } </span>
              <Dot />
              <span> Cập nhật gần đây: {moment(infoContact?.modifyAt).format("L")} ({moment(infoContact?.modifyAt).fromNow()})</span>
            </p>
          </Link>
        );
      },
    },
  ];
}

const Member: FC<MemberProps> = (props) => {
  const { closeModal } = useModal();
  const [currentID, setCurrentID] = useState("");
  const [filterParam, setFilterParam] = useState({});
  const [searchText, setSearchText] = useState<string>("");
  const [isResultNavigation, setIsResultNavigation] = useState(false);
  const [isVisibleSearchFilter, setIsVisibleSearchFilter] = useState(false);
  const [dataContact, setDataContact]     = useState<any[]>([]);
  const [count, setCount] = useState(1);
  const [pagesCursor, setPagesCursor]                         = useState<(any)[]>([undefined]);
  const [lastestID, setLastestID] = useState<string>("");
  
  const {
    fetchSearchResultList,
    nextCursor,
  } = useMainSearch("search_results", {
    keyword: searchText,
    lastestID: !isResultNavigation ? "" : currentID,
    ...filterParam,
  });

  const handleSearchInput = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setIsResultNavigation(false);
  }, 700);
  const toggleSearchFilter = () => setIsVisibleSearchFilter(!isVisibleSearchFilter);

  useEffect(() => {
    fetchSearchResultList();
  }, [searchText, currentID, isResultNavigation, filterParam]);

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
    // setParamsSearch(preValue => ({
    //   ...preValue,
    //   lastestID: prevCursor
    // }));
  };

  // handle data from filter tab
  const onHandleFilterData = (filterData: any) => {
    setFilterParam(filterData);
  };

  const {
    list: listContact,
    isLoading, totalRecord: totalRecordContact, totalPage, nextCursor: nextCursorContact
  } = useContact({
    params: { keyword: searchText, limit: 20, lastestID },
    isFetchList: true
  })

  const columns = useMemo(getColumnsMember, []);
  const instance = useTable({ columns, data: dataContact, getRowId: (row: any) => row._id }, useRowSelect);
  useEffect(() => {
    if(!listContact) return;
    setDataContact(listContact);
  }, [JSON.stringify(listContact)])

  useEffect(() => {
    const checkExistsPage = pagesCursor.find(page => page === nextCursorContact);

    if(checkExistsPage || !totalPage) return;
    if(!nextCursorContact && count > 1) return;

    const cursors = [...pagesCursor, nextCursorContact].filter(Boolean);
    setPagesCursor(cursors);
  }, [nextCursor, count, totalPage])

  return (
    <div>
      <div className="pt-4 pl-8 pr-8 pb-3 relative">
        <input
          onChange={handleSearchInput}
          type="search"
          placeholder="Tìm kiếm"
          className="w-full focus:outline-none h-11 border border-solid border-primary-border pl-3 pr-16 rounded-md"
        />
        {/* <button
          onClick={toggleSearchFilter}
          className="absolute top-5 right-12 w-9 h-9 flex items-center justify-center bg-lighter-gray hover:bg-primary-border transition duration-150 rounded-full focus:outline-none ml-6"
        >
          <img src={iconSlider} alt="Filter" className="w-6 h-6" />
        </button> */}
      </div>

      {/* Content */}
      {!isVisibleSearchFilter && (
        <div className="h-[480px] overflow-auto">
          <TableWithoutContext
            instance={instance}
            tableProps={{ className: "w-full" }}
            props={{
              length: totalRecordContact,
              currentPage: count,
              currentTotalPage: pagesCursor.length,
              totalPage: totalPage,
              fetchNextPage: handleNextPageButton,
              fetchPreviousPage: handlePrevPageButton
            }}
            isLoading={isLoading}
          />
        </div>
      )}
      {/* SearchMessage filter */}
      <div
        className={cn("t-main-SearchMessage-filter pl-8 pr-8 mb-5", {
          hidden: !isVisibleSearchFilter,
        })}
      >
        <MainSearchFilter
          handleFilterData={onHandleFilterData}
          toggleSearchFilter={toggleSearchFilter}
        />
      </div>
    </div>
  );
};

export default Member;
