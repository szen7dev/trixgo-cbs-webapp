import { FC } from "react";

import iconFolder from "assets/images/icons8-application-window-100.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "services/hooks/auth/useAuth";

export const LeftSideBar: FC = () => {
  useAuth();

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
        {/* title */}
        {/* <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
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
        </div> */}

        {/* menu block */}
        <div className="t-link-menu-container">
          <NavLink
            to={`/timesheet/home`}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img
              width={'20px'}
              src={iconFolder}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
          </NavLink>
          <NavLink
            to={`/timesheet/salary`}
            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
          >
            <img
              width={'20px'}
              src={iconFolder}
              alt="Menu item"
            />
            <span className={"flex-1 ml-2 text-left text-[14px]"}>Tính lương</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
