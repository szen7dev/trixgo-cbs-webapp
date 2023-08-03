/*=====1.LIBRARY=====*/
import { FC } from "react";
import { NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
// import budgetLogo from "assets/logos/budget.png";
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
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

                {/* menu block */}
                <div className="t-link-menu-container">
                    {hasPermission && dataUserAccess?.level == 0 ?
                        <NavLink
                            to={`/budget/admin`}
                            className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                        >
                            <img  width={'20px'} src={'/images/pcm/admin.png'} alt="Menu item" />
                            <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
                        </NavLink> : <></>
                    }
                    <NavLink to={`/budget/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'20px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};