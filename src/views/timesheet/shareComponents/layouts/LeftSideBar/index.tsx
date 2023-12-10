import { FC } from "react";
import { NavLink } from 'react-router-dom';
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

import iconFolder from "assets/images/icons8-application-window-100.png";

export const LeftSideBar: FC = () => {
  const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.TIMESHEET.id })

  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

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
          {hasPermission && dataUserAccess?.level == 0 ?
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
              : <></>
          }
        </div>
      </div>
    </div>
  )
}