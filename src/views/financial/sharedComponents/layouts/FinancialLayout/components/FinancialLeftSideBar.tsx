/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Link, NavLink } from "react-router-dom";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import financialLogo from "assets/logos/financial.png";
// import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";

/*=====7.OTHER=====*/
const routes = [
  { pathname: "/financial/home", label: "Trang chủ", icon: iconFolder },
  { pathname: "/financial/dashboard", label: "Báo cáo quản trị", icon: iconFolder },
  { pathname: "/financial/cashbook", label: "Sổ quỹ", icon: iconFolder },
  { pathname: "/financial/cashflow", label: "Kế hoạch tài chính", icon: iconFolder },
];

export const FinancialLeftSideBar: FC = () => {
  return (
    <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
      <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
        {/* title */}
        <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
          <img src={financialLogo} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
          <span>Quản trị tài chính</span>
        </div>

        {/* menu block */}
        <div className="t-link-menu-container">
          <ul>
            {routes.map((route, index) => (
              <li key={index} className="w-full">
                <NavLink
                  to={route.pathname}
                  className="hover:bg-cbs-active-comment w-full block py-2 px-3"
                  activeClassName="w-full"
                >
                  <img
                    className="w-6 h-6 object-contain mr-3 inline-block"
                    src={iconFolder}
                    alt="Menu item"
                  />
                  <span className="truncate">{route.label}</span>
                </NavLink>
              </li>
            ))}
            {/* <li>
              <NavLink
                to={`/financial/home`}
                className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px] active"
              >
                <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                <span className="truncate">Trang chủ</span>
              </NavLink>
            </li>
            <li></li>
            <li></li>
            <li></li> */}
          </ul>
        </div>
      </div>
    </div>
  );
};
