import { FC, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import cn from "classnames";
import { UseMainSearch } from 'services/hooks/useMainSearch';
import moment from "moment";
import { useModal } from "services/hooks/useModal";

import MainSearchFilter from "./main-search-filter";
import Loader from "components/shared/Loader";

import iconSlider from "assets/images/icons8-slider-32.png";
import iconThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
// import iconChevronLeft from "assets/images/icon-chevron-left.png";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import thumbnail from "assets/images/thumbnail2.png";

const MainSearchDialog: FC = () => {
  const { closeModal } = useModal();

  const [currentID, setCurrentID] = useState("");
  const [isResultNavigation, setIsResultNavigation] = useState(false);
  const [isVisibleSearchFilter, setIsVisibleSearchFilter] = useState(false);
  const [searchText, setSearchText] = useState<string>("");
  const [filterParam, setFilterParam] = useState({});
  const { searchResultList, 
          fetchSearchResultList, 
          totalRecord, 
          nextCursor, 
          isLoadingSearchResultList, 
        } = UseMainSearch('search_results', { keyword: searchText, lastestID: !isResultNavigation ? '' : currentID, ...filterParam });

  const toggleSearchFilter = () => {
    setIsVisibleSearchFilter(!isVisibleSearchFilter);
  };

  const handleSearchInput = (val: string) => {
    setSearchText(val);
    setIsResultNavigation(false);
  };
  
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
    <div className="t-main-search-wrapper rounded pb-4">
      {/* Search form */}
      <div className="t-main-search-input pt-4 pl-8 pr-8 pb-3 relative">
        <input 
          value={searchText} 
          onChange={(e) => handleSearchInput(e.target.value)}
          type="search" 
          placeholder="Tìm kiếm" 
          className="w-full focus:outline-none h-11 border border-solid border-primary-border pl-3 pr-16 rounded-md" />
        <button
          onClick={toggleSearchFilter}
          className="absolute top-5 right-12 w-9 h-9 flex items-center justify-center bg-lighter-gray hover:bg-primary-border transition duration-150 rounded-full focus:outline-none ml-6"
        >
          <img src={iconSlider} alt="Filter" className="w-6 h-6" />
        </button>
      </div>

      {/* search results */}
      <div className={cn("t-main-search-results overflow-auto pb-6 relative", {"hidden": isVisibleSearchFilter})}>
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
                <span className="mr-4">{totalRecord && totalRecord > 10 ? '10' : totalRecord} trong số {totalRecord}</span>
                {/* <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-solid border-transparent hover:border-primary-border">
                    <img alt="Previous" src={iconChevronLeft} className="w-4 filter-primary-gray" />
                </button> */}
                {totalRecord && totalRecord > 10 ? 
                <button 
                  onClick={handleNextPageButton} 
                  className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-solid border-transparent hover:border-primary-border"
                >
                    <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
                </button>
                : ''
                }
                
              </>
            ) : ''}
          </div>
        </div>

        {/* result type: t-main-search-result-item-good, t-main-search-result-item-incoming, t-main-search-result-item-overdue, t-main-search-result-item-normal */}
        {isLoadingSearchResultList ? 
          <Loader absolute={true} className="border-primary" />
          :
          (
            <div className="t-main-search-results-container relative">
              {searchResultList.length ? 
                searchResultList.map(searchResultItem => {
                  const progressValue = searchResultItem.amountChecklist ? searchResultItem.amountFinishChecklist/searchResultItem.amountChecklist : 0;
                  return (
                    <Link onClick={() => closeModal()} to={`/pcm/detail/${searchResultItem._id}`}  key={searchResultItem._id} className="t-main-search-result-item flex pl-8 pr-8 mb-5 t-main-search-result-item-good">
                      <input type="checkbox" className="form-check-input mr-5 mt-2 cursor-pointer" />
                      <div className="t-main-search-result-item-content">
                        <div className="flex items-center mb-1">
                          <div className="flex-grow text-[14px] truncate" title={searchResultItem.name}>{searchResultItem.name}</div>
                          {searchResultItem.actualFinishTime && (
                            <div className="t-main-search-result-item-date text-primary-gray font-bold bg-lighter-gray pt-2 pb-2 pl-3 pr-3 flex-grow-0 ml-2 rounded">
                              {searchResultItem.actualFinishTime && moment(searchResultItem.actualFinishTime).format("DD/MM/YYYY")}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center w-3/5">
                            <span className="inline-block w-2 h-2 rounded-full mr-3 bg-green"></span>
                            <img src={thumbnail} alt="Thumbnail" className="w-6 h-6 rounded-full mr-3" />
                            <span className="text-secondary-gray">
                              {searchResultItem.assignee?.fullname} {searchResultItem.group?.sign && '|'} {searchResultItem.group?.sign}
                            </span>
                          </div>
                          {searchResultItem.amountChecklist ? 
                            (
                              <div className="w-2/5">
                                <div className="text-right text-[12px] mb-1">
                                  {searchResultItem.amountFinishChecklist}/{searchResultItem.amountChecklist}
                                </div>
                                <div className="border border-solid border-primary-border bg-secondary-light rounded">
                                  <div className="bg-green h-1" style={{ width: `${progressValue}%` }}></div>
                                </div>
                              </div>
                            ) : ''
                          }
                          
                        </div>
                      </div>
                    </Link>
                  );
                })
                : (
                  <p className="mt-4 text-center">Không tìm thấy kết quả nào.</p>
                )
              }
            </div>
          )
        }
      </div>

      {/* search filter */}
      <div className={cn("t-main-search-filter pl-8 pr-8 mb-5", {"hidden": !isVisibleSearchFilter})}>
        <MainSearchFilter
          handleFilterData={onHandleFilterData}
          toggleSearchFilter={toggleSearchFilter}
        />
      </div>
      
    </div>
  );
};

export default MainSearchDialog;
