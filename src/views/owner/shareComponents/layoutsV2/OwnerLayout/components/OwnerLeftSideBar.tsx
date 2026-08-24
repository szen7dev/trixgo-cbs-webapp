import { FC, useEffect } from "react";
import { NavLink, useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import iconFolder from "assets/images/bullet.svg";
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions"

export const OwnerLeftSideBar: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | Quản trị viên";
	}, []);

    const history = useHistory();
    const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.OWNER.id, parentID: APP_ID.OWNER.menuOwnerApp.id })
    const { hasPermission, isSuccess, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.OWNER.id });
    const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.OWNER.id, type: "1" })

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
                    {/*
                      * ⭐ Sao lưu CSDL — HARD-CODE theo `level == 0`, CỐ Ý không đi qua bảng menu.
                      *
                      * Mọi mục dưới đây lấy từ `app_menu` trong CSDL và hiện theo `app_role_menu.read`.
                      * Cơ chế đó đúng cho menu nghiệp vụ, nhưng SAI cho màn này: quyền vào kho sao lưu
                      * sẽ trở thành thứ cấp được bằng vài cú bấm trong màn phân quyền, cho một tài khoản
                      * bất kỳ, mà không ai duyệt lại. Một dòng dữ liệu trong CSDL không nên là thứ quyết
                      * định ai tải được TOÀN BỘ CSDL đó.
                      * Bám đúng khuôn mục "Quản trị ứng dụng" ngay trên.
                      */}
                    {hasPermission && dataUserAccess?.level == 0 ?
                        <NavLink
                        to={`/owner/backup`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                        >
                        <span className={"w-[20px] text-center"}>💾</span>
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Sao lưu CSDL</span>
                        </NavLink> : <></>
                    }
                    {listAppMenu && listAppMenu.length ?
                        <>
                        {listAppMenu.map((item: any, index: number) => {
                            const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                            if (roleApp && roleApp.read >= 1) {
                            return (
                                <NavLink
                                key={index}
                                to={`/owner/${item.slug}`}
                                className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                                >
                                <img
                                    width={'7px'}
                                    src={iconFolder}
                                    alt="Menu item"
                                />
                                <span className={"flex-1 ml-2 text-left text-[14px]"}>{item.name}</span>
                                </NavLink>
                            )
                            };
                            return <div key={index}></div>
                        })
                        }              
                        </> : <></>
                    }
                </div>
            </div>
        </div>
    )
}