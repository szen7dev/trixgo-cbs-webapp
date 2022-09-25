/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Link } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import marketLogo from "assets/logos/market.png";
// import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";

/*=====7.OTHER=====*/

export const MarketLeftSideBar: FC = () => {
  const { user } = useAuth();

  return (
      <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
          <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

              {/* menu block */}
              <div className="t-link-menu-container">
                  <Link to={`/market/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px] active">
                      <img width={'20px'} src={iconFolder} alt="Menu item" />
                      <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                  </Link>
              </div>
          </div>
      </div>
  );
};