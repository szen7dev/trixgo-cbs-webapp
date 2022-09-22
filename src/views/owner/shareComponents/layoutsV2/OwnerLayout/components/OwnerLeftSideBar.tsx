/*=====1.LIBRARY=====*/
import { FC } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import ownerLogo from "assets/logos/owner.png";
// import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";

/*=====7.OTHER=====*/

export const OwnerLeftSideBar: FC = () => {
    const { user } = useAuth();

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2 t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
                {/* title */}
                <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
                    <img src={ownerLogo} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
                    <span>Quản trị doanh nghiệp</span>
                </div>

                {/* menu block */}
                <div className="t-link-menu-container">
                    <NavLink to={`/owner/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Trang chủ</span>
                    </NavLink>
                    <NavLink to={`/owner/members`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Tài khoản thành viên</span>
                    </NavLink>
                    <NavLink to={`/owner/grant`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3 text-[14px]">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Cấp phép ứng dụng</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};