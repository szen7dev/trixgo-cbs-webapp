import { FC } from "react";

import { useModal } from "services/hooks/useModal";

import MainSearchDialog from "components/common/MainSearchDialog";
import MessagesMenu from "./MessagesMenu";
import NotificationsMenu from "./NotificationsMenu";
import UserMenu from "./UserMenu";
import SearchIcon from "assets/icons/Search";
import ViewGridIcon from "assets/icons/ViewGrid";
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import iconGrid from "assets/images/icons8-menu-100.png";

const MainHeader: FC = () => {
  const { openModal } = useModal();

  return (
    <header className="sticky top-0 bg-primary-light border-b border-solid border-secondary-light shadow-sm z-30">
      <div className="px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center">
            <div className="t-header-company-name flex items-center">
              <img src={fakeThumbnail} alt="Company avatar" className="w-12 h-12 rounded-full" />
              <div className="flex items-center truncate">
                <span className="truncate ml-2 font-bold">
                  PGI Partners JSC
                </span>
              </div>
            </div>

            <div className="t-header-menu flex items-center">
              <a className="active" href="/">Home</a>
              <a href="/">Công việc</a>
              <a href="/">Nhân sự</a>
              <a href="/">Tài chính</a>
              <a href="/">Hồ sơ</a>
              <a href="/">Hợp đồng</a>
            </div>
          </div>

          <button className="t-header-investment-category-btn">Danh mục đầu tư</button>

          {/* Header: Right side */}
          <div className="flex items-center">
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

            {/* <MessagesMenu /> */}

            <button className="relative w-10 h-10 flex items-center justify-center transition duration-150 focus:outline-none ml-6">
              <img src={iconGrid} alt="Grid" className="w-6 h-6" />
            </button>

            <NotificationsMenu />

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
