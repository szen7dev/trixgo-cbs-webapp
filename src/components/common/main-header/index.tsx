import { FC } from "react";

import { useModal } from "services/hooks/useModal";

import MainSearchDialog from "components/common/MainSearchDialog";
import NotificationsMenu from "./NotificationsMenu";
import AppsMenu from "./AppsMenu";
import UserMenu from "./UserMenu";
import SearchIcon from "assets/icons/Search";
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import iconFilter from "assets/images/icons8-filter-96.png";

const MainHeader: FC = () => {
  const { openModal } = useModal();

  return (
    <header className="home-header relative top-0 transition-all duration-500 ease-out bg-primary-light border-b border-solid border-secondary-light shadow-sm z-30">
      <div className="px-4 lg:px-8 pl-10 lg:pl-10">
        <div className="flex items-center justify-between h-14 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center whitespace-nowrap">
            <div className="t-header-company-name flex items-center">
              <img src={fakeThumbnail} alt="Company avatar" className="w-10 h-10 rounded-full" />
              <div className="flex items-center truncate">
                <span className="truncate ml-2 font-bold">
                  PGI Partners JSC
                </span>
              </div>
            </div>

            <div className="t-header-menu flex items-center flex-wrap">
              <a className="font-bold ml-5 mr-5 active" href="/">Home</a>
              <a className="font-bold ml-5 mr-5" href="/">Công việc</a>
              <a className="font-bold ml-5 mr-5" href="/">Nhân sự</a>
              <a className="font-bold ml-5 mr-5" href="/">Tài chính</a>
              <a className="font-bold ml-5 mr-5" href="/">Hồ sơ</a>
              <a className="font-bold ml-5 mr-5" href="/">Hợp đồng</a>
            </div>
          </div>

          <button className="t-header-investment-category-btn whitespace-nowrap">Danh mục đầu tư</button>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* Search menu */}
            <button
              aria-controls="search-modal"
              className="w-10 h-10 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-6"
              onClick={() =>
                openModal(
                  <div className="inline-block w-2/5 overflow-hidden align-top transition-all transform bg-primary-light shadow-xl rounded mt-28">
                    <MainSearchDialog />
                  </div>
                )
              }
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            <button className="relative w-10 h-10 flex items-center justify-center bg-lighter-gray hover:bg-secondary-light transition duration-150 rounded-md focus:outline-none ml-6">
              <img src={iconFilter} alt="Filter" className="w-6 h-6" />
            </button>

            {/* <MessagesMenu /> */}

            <AppsMenu />
            {/* <button className="relative w-10 h-10 flex items-center justify-center transition duration-150 focus:outline-none ml-6">
              <img src={iconGrid} alt="Grid" className="w-6 h-6" />
            </button> */}

            <NotificationsMenu />

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
