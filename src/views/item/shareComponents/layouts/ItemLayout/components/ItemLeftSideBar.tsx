import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";

export const ItemLeftSideBar: FC = () => {
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
          <span>{user?.bizfullname}</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to="/item/home"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Văn Bản Lĩnh vực hồ sơ"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Văn Bản Lĩnh vực hồ sơ</span>
          </NavLink>
          <NavLink
            to="/item/home/2"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
            title="Văn Bản Tính chất hồ sơ"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={`${process.env.PUBLIC_URL}/images/common/icons8-application-window-100.png`}
              alt="Menu item"
            />
            <span className="truncate">Văn Bản Tính chất hồ sơ</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};