import { FC } from "react";
import { NavLink } from 'react-router-dom';
import iconFolder from "assets/images/bullet.svg";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions"
import { APP_ID } from "apis/localdb"

export const CrmLeftSideBar: FC = () => {
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.CRM.id })
    const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.CRM.id, parentID: APP_ID.CRM.menuCrmApp.id })
    const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.CRM.id, type: "1" })

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
                <div className="t-link-menu-container">
                    {hasPermission && dataUserAccess?.level == 0 ?
                        <NavLink
                        to={`/crm/admin`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                        >
                        <img width={'20px'} src={'/images/pcm/admin.png'} alt="Menu item" />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị ứng dụng</span>
                        </NavLink> : <></>
                    }
                    <NavLink
                        to={`/crm/home`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full  text-primary-gray"
                    >
                        <img
                        width={'7px'}
                        src={iconFolder}
                        alt="Menu item"
                        />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Trang chủ</span>
                    </NavLink>
                    {listAppMenu && listAppMenu.length ?
                        <>
                        {listAppMenu.map((item: any, index: number) => {
                            const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                            if (roleApp && roleApp.read >= 1) {
                            return (
                                <NavLink
                                key={index}
                                to={`/crm/${item.slug}`}
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