import { FC } from "react";
import { Link } from "react-router-dom";

import iconSlider from "assets/images/icons8-slider-32.png";
import iconThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import iconChevronLeft from "assets/images/icon-chevron-left.png";
import iconChevronRight from "assets/images/icon-chevron-right.png";
import thumbnail from "assets/images/thumbnail2.png";

const MainSearchDialog: FC = () => {
  return (
    <div className="t-main-search-wrapper overflow-auto rounded pb-10">
      {/* Search form */}
      <div className="t-main-search-input pt-4 pl-8 pr-8 pb-3 relative">
        <input type="search" placeholder="Tìm kiếm" className="w-full focus:outline-none h-11 border border-solid border-primary-border pl-3 pr-16 rounded-md" />
        <button className="absolute top-5 right-12 w-9 h-9 flex items-center justify-center bg-lighter-gray hover:bg-primary-border transition duration-150 rounded-full focus:outline-none ml-6">
          <img src={iconSlider} alt="Filter" className="w-6 h-6" />
        </button>
      </div>

      {/* Search results */}
      <div className="t-main-search-results">
        <div className="flex items-center justify-between pl-8 pr-8 border-b border-solid border-primary-border pb-2 mb-6">
          <div className="flex items-center">
            <input type="checkbox" className="form-check-input mr-5 cursor-pointer" />
            <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 hover:bg-primary-border">
                <img alt="Options" src={iconThreeDotsVertical} className="w-4" />
            </button>
          </div>
          <div className="flex items-center text-primary-gray">
            <span className="mr-4">1-50 trong số rất nhiều</span>
            <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-solid border-transparent hover:border-primary-border">
                <img alt="Previous" src={iconChevronLeft} className="w-4 filter-primary-gray" />
            </button>
            <button className="rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 border border-solid border-transparent hover:border-primary-border">
                <img alt="Next" src={iconChevronRight} className="w-4 filter-primary-gray" />
            </button>
          </div>
        </div>

        <div className="t-main-search-results-container">
            {/* Search result item */}
            <div className="t-main-search-result-item flex pl-8 pr-8 mb-5 t-main-search-result-item-good">
              <input type="checkbox" className="form-check-input mr-5 mt-2 cursor-pointer" />
              <div className="t-main-search-result-item-content">
                <div className="flex items-center mb-1">
                  <div className="flex-grow text-[14px]">Đệ trình phê duyệt Báo cáo thanh toán Đợt 3 PGI-PMI Dự án CHG, dịch vụ Tư vấn Quản lý dự án</div>
                  <div className="t-main-search-result-item-date text-primary-gray font-bold bg-lighter-gray pt-2 pb-2 pl-3 pr-3 flex-grow-0 ml-2 rounded">15/8/2021</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center w-3/5">
                    <span className="inline-block w-2 h-2 rounded-full mr-3 bg-green"></span>
                    <img src={thumbnail} alt="Thumbnail" className="w-6 h-6 rounded-full mr-3" />
                    <span className="text-secondary-gray">Phùng Thị Hà-TRX | CHG.THT.QDLDA.BCT</span>
                  </div>
                  <div className="w-2/5">
                    <div className="text-right text-[12px] mb-1">9/10</div>
                    <div className="border border-solid border-primary-border bg-secondary-light rounded">
                      <div className="bg-green h-1" style={{ width: "90%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search result item */}
            <div className="t-main-search-result-item flex pl-8 pr-8 mb-5 t-main-search-result-item-incoming">
              <input type="checkbox" className="form-check-input mr-5 mt-2 cursor-pointer" />
              <div className="t-main-search-result-item-content">
                <div className="flex items-center mb-1">
                  <div className="flex-grow text-[14px]">Đệ trình phê duyệt Báo cáo thanh toán Đợt 3 PGI-PMI Dự án CHG, dịch vụ Tư vấn Quản lý dự án</div>
                  <div className="t-main-search-result-item-date text-primary-gray font-bold bg-lighter-gray pt-2 pb-2 pl-3 pr-3 flex-grow-0 ml-2 rounded">15/8/2021</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center w-3/5">
                    <span className="inline-block w-2 h-2 rounded-full mr-3 bg-orange"></span>
                    <img src={thumbnail} alt="Thumbnail" className="w-6 h-6 rounded-full mr-3" />
                    <span className="text-secondary-gray">Phùng Thị Hà-TRX | CHG.THT.QDLDA.BCT</span>
                  </div>
                  <div className="w-2/5">
                    <div className="text-right text-[12px] mb-1">2/10</div>
                    <div className="border border-solid border-primary-border bg-secondary-light rounded">
                      <div className="bg-orange h-1" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search result item */}
            <div className="t-main-search-result-item flex pl-8 pr-8 mb-5 t-main-search-result-item-overdue">
              <input type="checkbox" className="form-check-input mr-5 mt-2 cursor-pointer" />
              <div className="t-main-search-result-item-content">
                <div className="flex items-center mb-1">
                  <div className="flex-grow text-[14px]">Đệ trình phê duyệt Báo cáo thanh toán Đợt 3 PGI-PMI Dự án CHG, dịch vụ Tư vấn Quản lý dự án</div>
                  <div className="t-main-search-result-item-date text-primary-gray font-bold bg-lighter-gray pt-2 pb-2 pl-3 pr-3 flex-grow-0 ml-2 rounded">15/8/2021</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center w-3/5">
                    <span className="inline-block w-2 h-2 rounded-full mr-3 bg-red"></span>
                    <img src={thumbnail} alt="Thumbnail" className="w-6 h-6 rounded-full mr-3" />
                    <span className="text-secondary-gray">Phùng Thị Hà-TRX | CHG.THT.QDLDA.BCT</span>
                  </div>
                  <div className="w-2/5">
                    <div className="text-right text-[12px] mb-1">7/10</div>
                    <div className="border border-solid border-primary-border bg-secondary-light rounded">
                      <div className="bg-red h-1" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Search result item */}
            <div className="t-main-search-result-item flex pl-8 pr-8 mb-5 t-main-search-result-item-normal">
              <input type="checkbox" className="form-check-input mr-5 mt-2 cursor-pointer" />
              <div className="t-main-search-result-item-content">
                <div className="flex items-center mb-1">
                  <div className="flex-grow text-[14px]">Đệ trình phê duyệt Báo cáo thanh toán Đợt 3 PGI-PMI Dự án CHG, dịch vụ Tư vấn Quản lý dự án</div>
                  <div className="t-main-search-result-item-date text-primary-gray font-bold bg-lighter-gray pt-2 pb-2 pl-3 pr-3 flex-grow-0 ml-2 rounded">15/8/2021</div>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center w-3/5">
                    <span className="inline-block w-2 h-2 rounded-full mr-3 bg-blue"></span>
                    <img src={thumbnail} alt="Thumbnail" className="w-6 h-6 rounded-full mr-3" />
                    <span className="text-secondary-gray">Phùng Thị Hà-TRX | CHG.THT.QDLDA.BCT</span>
                  </div>
                  <div className="w-2/5">
                    <div className="text-right text-[12px] mb-1">7/10</div>
                    <div className="border border-solid border-primary-border bg-secondary-light rounded">
                      <div className="bg-blue h-1" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      
    </div>
  );
};

export default MainSearchDialog;
