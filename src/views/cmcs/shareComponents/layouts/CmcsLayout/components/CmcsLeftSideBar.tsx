import { FC } from "react";

import { NavLink } from "react-router-dom";

import { useAuth } from "services/hooks/useAuth";

import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

export const CmcsLeftSideBar: FC = () => {
  const { user } = useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 font-bold">
          <img src={user?.image ? `${process.env.REACT_APP_URL_S3_USER}/${user?.image}` : fakeThumbnail} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <span>Quản lý hợp đồng</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to={`/cmcs/home`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Trang chủ</span>
          </NavLink>
          <NavLink
            to={`/cmcs/dashboard`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Báo cáo quản trị</span>
          </NavLink>
          {/* <NavLink
            to={`/cmcs/portfolio`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Quản trị dự án</span>
          </NavLink> */}
          <NavLink
            to={`/cmcs/income`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Hợp đồng bán ra</span>
          </NavLink>
          {/* <NavLink
            to={`/cmcs/expenses`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Hợp đồng mua vào</span>
          </NavLink> */}
          <NavLink
            to={`/cmcs/guarantee`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Theo dõi bảo lãnh</span>
          </NavLink>
          <NavLink
            to={`/cmcs/admin`}
            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3"
          >
            <img
              className="w-6 h-6 object-contain mr-3"
              src={iconFolder}
              alt="Menu item"
            />
            <span className="truncate">Quản trị viên</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
