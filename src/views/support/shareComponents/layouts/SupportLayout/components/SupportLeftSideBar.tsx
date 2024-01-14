import { FC } from "react";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/bullet.svg";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";

export const SupportLeftSideBar: FC = () => {
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
          <span>Support</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to="/support/companies"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3" style={{width:"7px"}}
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Quản lý phân vùng</span>
          </NavLink>
          <NavLink
            to="/support/members"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3" style={{width:"7px"}}
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Tài khoản thành viên</span>
          </NavLink>
          <NavLink
            to="/support/grant"
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3" style={{width:"7px"}}
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Cấp phép ứng dụng</span>
          </NavLink>
        </div>
      </div>
    </div>
  )
}