import React, { FC, useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect, TableOptions } from "react-table";
import cn from "classnames";

import { SelectionColumn } from "shareComponents/common/Table/components/SelectionColumn";
import { TableWithoutContext } from "shareComponents/common/Table";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import iconSlider from "assets/images/icons8-slider-32.png";
import { useModal } from "services/hooks/useModal";
import { UseMainSearch } from "services/hooks/useMainSearch";
import { debounce } from "lodash";
import { MainSearchFilter } from "shareComponents/common/MainSearchFilter";
import Dot from "./Dot";

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

function getColumnsMember(): TableOptions<IMember>["columns"] {
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
      Header({ length, selectedFlatRows }) {
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
              <span className="mr-4">1-50 trong số rất nhiều</span>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border">
                <img
                  alt="Next"
                  src={iconChevronRight}
                  className="w-4 filter-primary-gray rotate-180"
                />
              </button>
              <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-transparent hover:border-cbs-border">
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
        return (
          <div>
            <p className="text-cbs-highlight-color">Trương Việt Anh (Phó Tổng giám đốc)</p>
            <p className="text-cbs-subtext">
              <span>Điện thoại: 0922556773 </span>
              <Dot />
              <span> Email: vietanht@gmail.com </span>
              <Dot />
              <span> Ngày sinh: 15/3/1988 </span>
              <Dot />
              <span> Cập nhật gần đây: 21/4/2022 (8 ngày)</span>
            </p>
          </div>
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

  const {
    searchResultList,
    fetchSearchResultList,
    totalRecord,
    nextCursor,
    isLoadingSearchResultList,
  } = UseMainSearch("search_results", {
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
    setCurrentID(nextCursor || "");
    setIsResultNavigation(true);
  };

  // handle data from filter tab
  const onHandleFilterData = (filterData: any) => {
    setFilterParam(filterData);
  };
  const columns = useMemo(getColumnsMember, []);
  const instance = useTable({ columns, data, getRowId: (row) => row._id }, useRowSelect);

  return (
    <div>
      <div className="pt-4 pl-8 pr-8 pb-3 relative">
        <input
          onChange={handleSearchInput}
          type="search"
          placeholder="Tìm kiếm"
          className="w-full focus:outline-none h-11 border border-solid border-primary-border pl-3 pr-16 rounded-md"
        />
        <button
          onClick={toggleSearchFilter}
          className="absolute top-5 right-12 w-9 h-9 flex items-center justify-center bg-lighter-gray hover:bg-primary-border transition duration-150 rounded-full focus:outline-none ml-6"
        >
          <img src={iconSlider} alt="Filter" className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      {!isVisibleSearchFilter && (
        <div className="h-[480px] overflow-auto">
          <TableWithoutContext
            instance={instance}
            tableProps={{ className: "w-full" }}
            props={{ length: 123 }}
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
