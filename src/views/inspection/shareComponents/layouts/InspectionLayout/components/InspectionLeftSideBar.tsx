/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Link, NavLink } from 'react-router-dom';

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import adminIcon from "assets/images/icons8-user-shield-48.svg"
import iconSuppervision from "assets/images/iconstrx-suppervision-v1.svg";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { useAuth } from "services/hooks/auth/useAuth";
import { APP_ID } from "apis/localdb";

/*=====7.OTHER=====*/

export const InspectionLeftSideBar: FC = () => {
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
    const { user } = useAuth();

    return (
        <div className="t-leftsidebar-navigation-v2 bg-white fixed left-[68px] top-14 bottom-0 transition-all duration-500 ease-out z-10 p-3">
            <div className={"mt-4"}>
            {hasPermission && dataUserAccess?.level == 0 ?
                <NavLink to={`/inspection/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                    <img width={'20px'} src={adminIcon}/>
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
                </NavLink> : <></>
            }

            {/* <NavLink to={`/inspection/home`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                <img width={'20px'} src={iconSuppervision}/>
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
            </NavLink> */}
            <NavLink to={`/inspection/home`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                <img width={'20px'} src={iconSuppervision}/>
                <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
            </NavLink>
        </div>
        </div>
    );
};