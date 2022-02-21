import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";
import { Link } from "react-router-dom";
import { useAuth } from "services/hooks/useAuth";

const LinkMenuLeftSideBar: FC = () => {
  const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
          <img
            src={
              user?.image
                ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}`
                : fakeThumbnail
            }
            alt="Thumbnail"
            className="w-10 h-10 rounded-full mr-3"
          />
          <span>Quản lý chấm công</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <Link
            to={`/timesheet/home`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px] active"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Trang chủ</span>
          </Link>
          <Link
            to={`/timesheet/dashboard`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Báo cáo quản trị</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LinkMenuLeftSideBar;
