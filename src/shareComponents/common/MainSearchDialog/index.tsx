import React, { FC, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import debounce from "lodash/debounce";
import { UseMainSearch } from "services/hooks/useMainSearch";
import moment from "moment";
import { useModal } from "services/hooks/useModal";

import { MainSearchFilter } from "shareComponents/common";

import { Loader } from "shareComponents/common";

import iconSlider from "assets/images/icons8-slider-32.png";
import iconThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import thumbnail from "assets/images/thumbnail2.png";
import classNames from "classnames";
import CustomAutoComplete from "../Form/CustomForm/CustomAutoComplete";
import ReactDatePicker from "react-datepicker";
import CustomField from "../Form/CustomForm/CustomField";

export const MainSearchDialog: FC = () => {
  const { closeModal } = useModal();
  const [currentID, setCurrentID] = useState("");
  const [isResultNavigation, setIsResultNavigation] = useState(false);
  const [isVisibleSearchFilter, setIsVisibleSearchFilter] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filterParam, setFilterParam] = useState({});
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

  const toggleSearchFilter = () => setIsVisibleSearchFilter(!isVisibleSearchFilter);

  const handleSearchInput = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setIsResultNavigation(false);
  }, 700);

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

  const categories = [
    { id: "1", name: "Công việc" },
    { id: "2", name: "File" },
    { id: "3", name: "Hồ sơ" },
    { id: "4", name: "Hợp đồng" },
    { id: "5", name: "Nhân sự" },
    { id: "6", name: "Dự án" },
    { id: "7", name: "Workshop" },
    { id: "8", name: "Chấm công" },
    { id: "10", name: "Chấm công" },
    { id: "11", name: "Chấm công" },
    { id: "12", name: "Chấm công" },
  ];

  const [show, setShow] = useState<"left" | "right" | "both">("right");
  const [activeCategory, setActiveCategory] = useState<string | number>(categories[0].id);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date(new Date().setDate(-30)));

  const handleClickScrollRight = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const scrollElement = e.currentTarget.parentNode as HTMLElement;
      scrollElement.scrollTo({ left: scrollElement.scrollLeft + 320, behavior: "smooth" });
      if (scrollElement.scrollLeft + scrollElement.clientWidth + 320 >= scrollElement.scrollWidth)
        return setShow("left");
      setShow("both");
    },
    []
  );
  const handleClickScrollLeft = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const scrollElement = e.currentTarget.parentNode as HTMLElement;
      scrollElement.scrollTo({ left: scrollElement.scrollLeft - 320, behavior: "smooth" });
      if (scrollElement.scrollLeft - 320 <= 0) return setShow("right");
      setShow("both");
    },
    []
  );

  return (
    <div className="t-main-search-wrapper rounded pb-4">
      <header className="flex pt-3 pl-6 pr-8">
        <span className="mr-5">Vitas</span>
        <div className="flex-grow overflow-hidden relative">
          <div className="flex w-full overflow-auto whitespace-nowrap space-x-2 scrollbar-hide">
            {categories.map((cat, index) => {
              return (
                <span
                  key={cat.id}
                  tabIndex={index}
                  className={classNames(
                    "cursor-pointer px-4 py-2.5 transition-colors hover:bg-cbs-primary hover:text-white  hover:border-cbs-primary border-0.5 rounded-full select-none",
                    activeCategory === cat.id
                      ? "bg-cbs-primary border-cbs-primary text-white"
                      : "text-cbs-subtext border-cbs-border"
                  )}
                  onClick={(e) => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </span>
              );
            })}
            {show !== "right" && (
              <button
                onClick={handleClickScrollLeft}
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 border absolute left-0"
              >
                <img
                  alt="Next"
                  src={iconChevronRight}
                  className="w-4 filter-primary-gray rotate-180"
                />
              </button>
            )}
            {show !== "left" && (
              <button
                onClick={handleClickScrollRight}
                className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 border absolute right-0"
              >
                <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
              </button>
            )}
          </div>
        </div>
      </header>
      {/* Search form */}
      {["1", "5", "6", "7", "8", "10", "11", "12"].includes(String(activeCategory)) && (
        <div className="t-main-search-input pt-4 pl-8 pr-8 pb-3 relative">
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
      )}
      {activeCategory === "2" && (
        <div className="pt-4 pl-8 pr-8 pb-3 relative flex space-x-3">
          <CustomAutoComplete
            data={[{ name: "123" }]}
            wrapperClassName="w-4/12"
            containerClassName="rounded-md overflow-hidden"
            placeholder="Nội dung"
          />
          <CustomAutoComplete
            data={[{ name: "123" }]}
            wrapperClassName="w-4/12"
            containerClassName="rounded-md overflow-hidden"
            placeholder="Nội dung"
          />
          <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
            <ReactDatePicker
              onChange={(date: Date) => setStartDate(date)}
              selected={startDate}
              className="text-small leading-[19.5px] py-1.5 w-full focus:outline-none"
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
              className="text-small leading-[19.5px] py-1.5 w-full focus:outline-none"
            />
            <div className="w-6 h-6">
              <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
            </div>
            <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">Đến ngày</label>
          </div>
        </div>
      )}
      {activeCategory === "3" && (
        <div className="pt-4 pl-8 pr-8 pb-3">
          <div className="flex space-x-3 pb-3">
            <CustomField name="report" placeholder="Báo cáo" wrapperClassName="w-1/2" />
            <CustomField name="contact" placeholder="Danh bạ hệ thống" wrapperClassName="w-1/2" />
          </div>
          <div className="flex space-x-3">
            <CustomAutoComplete
              data={[{ name: "123" }]}
              wrapperClassName="w-4/12"
              containerClassName="rounded-md overflow-hidden"
              placeholder="Phân loại"
            />
            <CustomAutoComplete
              data={[{ name: "123" }]}
              wrapperClassName="w-4/12"
              containerClassName="rounded-md overflow-hidden"
              placeholder="Thuộc hợp đồng"
            />
            <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
              <ReactDatePicker
                onChange={(date: Date) => setStartDate(date)}
                selected={startDate}
                className="text-small leading-[19.5px] py-1.5 w-full focus:outline-none"
              />
              <div className="w-6 h-6">
                <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
              </div>
              <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">
                Từ ngày
              </label>
            </div>
            <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
              <ReactDatePicker
                onChange={(date: Date) => setEndDate(date)}
                selected={endDate}
                className="text-small leading-[19.5px] py-1.5 w-full focus:outline-none"
              />
              <div className="w-6 h-6">
                <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
              </div>
              <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">
                Đến ngày
              </label>
            </div>
          </div>
        </div>
      )}
      {activeCategory === "4" && (
        <div className="pt-4 pl-8 pr-8 pb-3">
          <div className="flex space-x-3">
            <CustomField
              name="report"
              placeholder="Báo cáo"
              wrapperClassName="w-4/12"
              containerClassName="relative"
              icon={() => {
                return (
                  <div className="absolute right-2 top-1">
                    <img src={iconSlider} alt="Filter" className="w-6 h-6" />;
                  </div>
                );
              }}
            />
            <CustomAutoComplete
              data={[{ name: "123" }]}
              wrapperClassName="w-4/12"
              containerClassName="rounded-md overflow-hidden"
              placeholder="Thuộc hợp đồng"
            />
            <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
              <ReactDatePicker
                onChange={(date: Date) => setStartDate(date)}
                selected={startDate}
                className="text-small leading-[19.5px] py-1.5 w-full focus:outline-none"
              />
              <div className="w-6 h-6">
                <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
              </div>
              <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">
                Từ ngày
              </label>
            </div>
            <div className="w-2/12 border-cbs-border pl-4 pr-1.5 border-0.5 relative flex items-center focus-within:text-cbs-primary">
              <ReactDatePicker
                onChange={(date: Date) => setEndDate(date)}
                selected={endDate}
                className="text-small leading-[19.5px] py-1.5 w-full focus:outline-none"
              />
              <div className="w-6 h-6">
                <img src="/images/common/icons8-calendar-100.svg" alt="icon calendar" />
              </div>
              <label className="absolute top-0 left-2 -translate-y-1/2 bg-white py-0">
                Đến ngày
              </label>
            </div>
          </div>
        </div>
      )}

      {/* SearchMessage results */}
      <div
        className={cn("t-main-search-results overflow-auto pb-6 relative", {
          hidden: isVisibleSearchFilter,
        })}
      >
        <div className="flex items-center justify-between pl-8 pr-8 border-b border-solid border-primary-border pb-2 mb-6">
          <div className="flex items-center">
            <input type="checkbox" className="form-check-input mr-5 cursor-pointer" />
            <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-primary-border">
              <img alt="Options" src={iconThreeDotsVertical} className="w-4" />
            </button>
          </div>
          <div className="flex items-center text-primary-gray">
            {searchResultList.length ? (
              <>
                <span className="mr-4">
                  {totalRecord && totalRecord > 10 ? "10" : totalRecord} trong số {totalRecord}
                </span>
                {/* <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-solid border-transparent hover:border-primary-border">
                    <img alt="Previous" src={iconChevronLeft} className="w-4 filter-primary-gray" />
                </button> */}
                {totalRecord && totalRecord > 10 ? (
                  <button
                    onClick={handleNextPageButton}
                    className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-solid border-transparent hover:border-primary-border"
                  >
                    <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* result type: t-main-SearchMessage-result-item-good, t-main-SearchMessage-result-item-incoming, t-main-SearchMessage-result-item-overdue, t-main-SearchMessage-result-item-normal */}
        {isLoadingSearchResultList ? (
          <Loader absolute={true} className="border-primary" />
        ) : (
          <div className="relative">
            {searchResultList.length ? (
              searchResultList.map((searchResultItem) => {
                const progressValue = searchResultItem.amountChecklist
                  ? searchResultItem.amountFinishChecklist || 0 / searchResultItem.amountChecklist
                  : 0;

                return (
                  <Link
                    onClick={() => closeModal()}
                    to={`/pcm/detail/${searchResultItem._id}`}
                    key={searchResultItem._id}
                    className="flex pl-8 pr-8 mb-5"
                  >
                    <input
                      type="checkbox"
                      className="form-check-input mr-5 mt-2 cursor-pointer w-[18px] block"
                    />
                    <div className="flex-grow overflow-hidden">
                      <div className="flex items-center mb-1">
                        <p className="flex-grow text-[14px] truncate" title={searchResultItem.name}>
                          {searchResultItem.name}
                        </p>
                        {searchResultItem.actualFinishTime && (
                          <span className="block text-primary-gray font-bold bg-lighter-gray py-2 px-3 flex-grow-0 ml-2 rounded">
                            {searchResultItem.actualFinishTime &&
                              moment(searchResultItem.actualFinishTime).format("DD/MM/YYYY")}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <div className="flex items-center w-3/5">
                          <span className="inline-block w-2 h-2 rounded-full mr-3 bg-green"></span>
                          <img
                            src={thumbnail}
                            alt="Thumbnail"
                            className="w-6 h-6 rounded-full mr-3"
                          />
                          <span className="text-secondary-gray">
                            {searchResultItem.assignee?.fullname}{" "}
                            {searchResultItem.group?.sign && "|"} {searchResultItem.group?.sign}
                          </span>
                        </div>
                        {searchResultItem.amountChecklist ? (
                          <div className="w-2/5">
                            <div className="text-right text-[12px] mb-1">
                              {searchResultItem.amountFinishChecklist || 0}/
                              {searchResultItem.amountChecklist}
                            </div>
                            {/* Progessbar */}
                            <div className="border border-solid border-primary-border bg-secondary-light rounded">
                              <div
                                className="bg-green h-1"
                                style={{ width: `${progressValue}%` }}
                              />
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p className="mt-4 text-center">Không tìm thấy kết quả nào.</p>
            )}
          </div>
        )}
      </div>

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
