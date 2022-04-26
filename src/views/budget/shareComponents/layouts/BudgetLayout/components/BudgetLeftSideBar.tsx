/*=====1.LIBRARY=====*/
import { FC } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import budgetLogo from "assets/logos/budget.png";
// import fakeThumbnail from "assets/images/avatar.jpg";
import iconFolder from "assets/images/icons8-application-window-100.png";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

/*=====7.OTHER=====*/

export const BudgetLeftSideBar: FC = () => {
    const { user } = useAuth();
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.BUDGET.id });

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-type2 fixed left-0 top-14 bottom-0 transition-all duration-500 ease-out border-r border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container overflow-auto transition-all duration-500 ease-out">
                {/* title */}
                <div className="t-leftsidebar-title flex items-center py-2 pl-3 pr-3 text-[14px] font-bold">
                    <img src={budgetLogo} alt="Thumbnail" className="w-10 h-10 rounded-full mr-3" />
                    <span>Quản lý ngân sách</span>
                </div>

                {/* menu block */}
                <div className="t-link-menu-container">
                    {hasPermission && dataUserAccess?.level == 0 ?
                        <NavLink
                            to={`/budget/admin`}
                            className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3"
                        >
                            <img className="w-6 h-6 object-contain mr-3" src={'/images/pcm/admin.png'} alt="Menu item" />
                            <span className="truncate">Quản trị viên</span>
                        </NavLink> : <></>
                    }
                    <NavLink to={`/budget/home`} className="t-link-menu-item flex items-center text-primary-gray py-3 pl-8 pr-3">
                        <img className="w-6 h-6 object-contain mr-3" src={iconFolder} alt="Menu item" />
                        <span className="truncate">Trang chủ</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};