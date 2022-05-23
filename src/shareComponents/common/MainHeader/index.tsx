import { FC, UIEvent, useEffect } from "react";
import { Link } from 'react-router-dom';

import { MainSearchDialog, NotificationsMenu, AppsMenu, UserMenu } from "shareComponents/common";
import SearchIcon from "assets/icons/Search";
import fakeThumbnail from "assets/images/company_default.png";
import iconChat from "assets/images/chat.png";
// import iconFilter from "assets/images/icons8-filter-96.png";

import { useModal } from "services/hooks/useModal";
import { useSocket } from "services/hooks/useSocket";
import { useNotification } from 'services/hooks/useNotification';
import { useAuth } from "services/hooks/auth/useAuth";

export const MainHeader: FC = () => {
  const { user } = useAuth();
  const { openModal } = useModal();
  const { current: socket }: any = useSocket();
  const {
    listNotifications,
    totalRecordSendSuccess,
    refetchListNotification,
    hasNextPage,
    nextPageListNotification
  } = useNotification({}, true);

  useEffect(() => {
    if (!socket) return;
		socket.on('NOTIFICATION_SSC_RECEIVE_NEW_NOTIFICATION', refetchListNotification);

    return () => socket.off('NOTIFICATION_SSC_RECEIVE_NEW_NOTIFICATION', refetchListNotification);
	}, []);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
    const bottom = scrollHeight - scrollTop === clientHeight;

    if(bottom && hasNextPage) {
      nextPageListNotification();
    }
  }

  return (
    <header className="home-header relative top-0 transition-all duration-500 ease-out bg-primary-light border-b border-solid border-secondary-light shadow-sm z-30">
      <div className="px-4 lg:px-8 pl-10 lg:pl-10">
        <div className="flex items-center justify-between h-14 -mb-px">
          {/* Header: Left side */}
          <div className="flex items-center whitespace-nowrap">
            <div className="t-header-company-name flex items-center">
              <img src={user?.company?.image ? `${process.env.REACT_APP_URL_S3_COMPANY}/${user?.company.image}` : fakeThumbnail} alt="Company avatar" className="w-10 h-10 rounded-full" />
              <div className="flex items-center truncate">
                <Link to={`/`} className="truncate ml-2 font-bold">
                  {user?.company?.name}
                </Link>
              </div>
            </div>

            {/* <div className="t-header-menu flex items-center flex-wrap">
              <Link to={`/`} className="font-bold ml-3 mr-3 active">
                Home
              </Link>
              <Link to={`/messages`} className="ml-3 mr-3">
                Nhắn tin
              </Link>
              <Link to={`/media/home`} className="ml-3 mr-3">
                Truyền thông
              </Link>
              <Link to={`/bidding/home`} className="ml-3 mr-3">
                Đấu thầu
              </Link>
              <Link to={`/cmcs/home`} className="ml-3 mr-3">
                Hợp đồng
              </Link>
            </div> */}
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

            <Link to={`/messages`} className="relative w-10 h-10 flex items-center justify-center bg-primary-light hover:bg-secondary-light transition duration-150 rounded-md focus:outline-none ml-6">
              <img src={iconChat} alt="Filter" className="w-6 h-6" />
            </Link>

            <AppsMenu />
            {/* <button className="relative w-10 h-10 flex items-center justify-center transition duration-150 focus:outline-none ml-6">
              <img src={iconGrid} alt="Grid" className="w-6 h-6" />
            </button> */}

            <NotificationsMenu notifications={listNotifications} total={totalRecordSendSuccess} onScroll={handleScroll} />
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
};