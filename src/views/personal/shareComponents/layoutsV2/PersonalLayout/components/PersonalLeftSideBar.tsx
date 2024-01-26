/*=====1.LIBRARY=====*/
import { FC } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import iconFolder from "assets/images/bullet.svg"

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/
export const PersonalLeftSideBar: FC = () => {
  return (
      <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
          <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

              {/* menu block */}
              <div className="t-link-menu-container">
                  <NavLink to={`/personal/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                      <img width={'7px'} src={iconFolder} alt="Menu item" />
                      <span className={"flex-1 ml-2 text-left text-[14px]"}>Cài đặt tài khoản</span>
                  </NavLink>
              </div>
              <div className="t-link-menu-container">
                  <NavLink to={`/personal/histories`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'7px'} src={iconFolder} alt="Menu item" />
                      <span className="flex-1 ml-2 text-left text-[14px]">Lịch sử truy cập</span>
                  </NavLink>
              </div>
              <div className="t-link-menu-container">
                  <NavLink to={`/personal/storage`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'7px'} src={iconFolder} alt="Menu item" />
                      <span className="flex-1 ml-2 text-left text-[14px]">Quản lý dung lượng</span>
                  </NavLink>
              </div>
          </div>
      </div>
  )
}