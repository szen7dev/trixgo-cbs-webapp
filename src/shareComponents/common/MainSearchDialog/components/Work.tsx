import React, { FC, Fragment, useEffect, useState } from "react";
import { debounce } from "lodash";
import cn from "classnames";
import { Link } from "react-router-dom";
import moment from "moment";

import { useModal } from "services/hooks/useModal";
import { useMainSearch } from "services/hooks/useMainSearch";

// Components
import { Loader } from "shareComponents/common";
import { MainSearchFilter } from "shareComponents/common";

import iconSlider from "assets/images/icons8-slider-32.png";
import iconThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import thumbnail from "assets/images/thumbnail2.png";

const Work: FC = () => {
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
    setCurrentID(nextCursor || "");
    setIsResultNavigation(true);
  };

  // handle data from filter tab
  const onHandleFilterData = (filterData: any) => {
    setFilterParam(filterData);
  };

  return (
    <Fragment>
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
                  ? searchResultItem.amountFinishedChecklist || 0 / searchResultItem.amountChecklist
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
                            src={searchResultItem.assignee?.image ? `${process.env.REACT_APP_URL_S3_USER}/${searchResultItem.assignee?.image}` : thumbnail}
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
                              {searchResultItem.amountFinishedChecklist || 0}/
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
    </Fragment>
  );
};

export default Work;
