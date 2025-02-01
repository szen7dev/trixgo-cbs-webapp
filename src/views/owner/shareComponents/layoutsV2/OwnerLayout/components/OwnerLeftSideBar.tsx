/*=====1.LIBRARY=====*/
import { FC, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import iconFolder from "assets/images/bullet.svg";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

/*=====7.OTHER=====*/

export const OwnerLeftSideBar: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | Quản trị viên";
	}, []);

    const history = useHistory();
    const { hasPermission, isSuccess, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.OWNER.id });

    useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">

                {/* menu block */}
                <div className="t-link-menu-container">
                    {hasPermission && dataUserAccess?.level == 0 ?
                        <NavLink
                        to={`/owner/admin`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                        >
                        <img width={'20px'} src={'/images/pcm/admin.png'} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị ứng dụng</span>
                        </NavLink> : <></>
                    }

                    <NavLink to={`/owner/home`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                    </NavLink>
                    <NavLink to={`/owner/members`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Tài khoản thành viên</span>
                    </NavLink>
                    <NavLink to={`/owner/grant`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Cấp phép ứng dụng</span>
                    </NavLink>
                    <NavLink to={`/owner/payment`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Cấu hình thanh toán</span>
                    </NavLink>
                    <NavLink to={`/owner/config`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Cấu hình môi trường</span>
                    </NavLink>
                    <NavLink to={`/owner/workflow`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Cấu hình workflow</span>
                    </NavLink>
                    <NavLink to={`/owner/traffic`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản lý truy cập</span>
                    </NavLink>
                    <NavLink to={`/owner/storage`} className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray">
                        <img  width={'7px'} src={iconFolder} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản lý dung lượng</span>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}