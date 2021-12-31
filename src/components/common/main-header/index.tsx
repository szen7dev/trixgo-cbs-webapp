import { FC, useEffect } from "react";
import { Link } from 'react-router-dom';

import MainSearchDialog from "components/common/main-search-dialog";
import NotificationsMenu from "./NotificationsMenu";
import AppsMenu from "./AppsMenu";
import UserMenu from "./UserMenu";
import SearchIcon from "assets/icons/Search";
import fakeThumbnail from "assets/images/thumbnail1.jpg";
import iconFilter from "assets/images/icons8-filter-96.png";

import { useModal } from "services/hooks/useModal";
import { useSocket } from "services/hooks/useSocket";
import { useNotification } from 'services/hooks/useNotification';
import { useAuth } from "services/hooks/useAuth";

const MainHeader: FC = () => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { listNotifications, refetchListNotification } = useNotification();
  const socketRef: any = useSocket();

  useEffect(() => {
		const socket = socketRef.current;
    if (!socket) return;

		socket.on('NOTIFICATION_SSC_ADD_MEDIA', () => {
      refetchListNotification();
		});
	}, []);

  return (
    <header className="home-header relative top-0 transition-all duration-500 ease-out bg-primary-light border-b border-solid border-secondary-light shadow-sm z-30">
      <div className="px-4 lg:px-8 pl-10 lg:pl-10">
        <div className="flex items-center justify-between h-14 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center whitespace-nowrap">
            <div className="t-header-company-name flex items-center">
              <img src={user?.company?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${user?.company.image}` : fakeThumbnail} alt="Company avatar" className="w-10 h-10 rounded-full" />
              <div className="flex items-center truncate">
                <span className="truncate ml-2 font-bold">
                  {user?.company?.name}
                </span>
              </div>
            </div>

            <div className="t-header-menu flex items-center flex-wrap">
            <Link to={`/`} className="font-bold ml-3 mr-3">
              Home
						</Link>
            <Link to={`/messages`} className="font-bold ml-3 mr-3">
              Chatting
						</Link>
            <Link to={`/social/home`} className="font-bold ml-3 mr-3">
              Truyền thông
						</Link>
            <Link to={`/cmcs/home`} className="font-bold ml-3 mr-3">
              Hợp đồng
						</Link>
              {/* <a className="font-bold ml-5 mr-5 active" href="/">Home</a> */}
              {/* <a className="font-bold ml-5 mr-5" href="/">Công việc</a>
              <a className="font-bold ml-5 mr-5" href="/">Nhân sự</a>
              <a className="font-bold ml-5 mr-5" href="/">Tài chính</a>
              <a className="font-bold ml-5 mr-5" href="/">Hồ sơ</a>
              <a className="font-bold ml-5 mr-5" href="/">Hợp đồng</a> */}
            </div>
          </div>

          {/* <button className="t-header-investment-category-btn whitespace-nowrap">Danh mục đầu tư</button> */}

          {/* Header: Right side */}
          <div className="flex items-center">
            {/* Search menu */}
            <button
              aria-controls="search-modal"
              className="w-10 h-10 flex items-center justify-center bg-primary-light hover:bg-secondary-light transition duration-150 rounded-full focus:outline-none ml-6"
              onClick={() =>
                openModal(
                  <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                    <MainSearchDialog />
                  </div>
                )
              }
            >
              <SearchIcon className="w-4 h-4" />
            </button>

            <button className="relative w-10 h-10 flex items-center justify-center bg-primary-light hover:bg-secondary-light transition duration-150 rounded-md focus:outline-none ml-6">
              <img src={iconFilter} alt="Filter" className="w-6 h-6" />
            </button>

            {/* <MessagesMenu /> */}

            <AppsMenu />
            {/* <button className="relative w-10 h-10 flex items-center justify-center transition duration-150 focus:outline-none ml-6">
              <img src={iconGrid} alt="Grid" className="w-6 h-6" />
            </button> */}

            <NotificationsMenu notifications={listNotifications} />

            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
