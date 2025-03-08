import { FC } from "react";
import { NavLink } from 'react-router-dom';
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { useAuth } from "services/hooks/auth/useAuth";
import { useModal } from "services/hooks/useModal";
import { ModalAddNewOrder2 } from "views/fnb/shareComponents/layouts/FnbLayout/components/ModalAddNewOrder2";
import iconFolder from "assets/images/bullet.svg";
import iconPlusBlue from "assets/images/icons8-plus-math-96 1.svg";

export const CrmLeftSideBar: FC = () => {
    const { user } = useAuth();
    const { openModal } = useModal();
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.CRM.id })
    const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.CRM.id, parentID: APP_ID.CRM.menuCrmApp.id })
    const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.CRM.id, type: "1" })

    return (
        <div className="t-leftsidebar-navigation t-leftsidebar-navigation-v2 t-leftsidebar-navigation-type2 fixed left-64px top-14 bottom-0 transition-all duration-500 ease-out border-secondary-light z-10 bg-primary-light">
            <div className="t-leftsidebar-navigation-container-v2  overflow-auto transition-all duration-500 ease-out p-3">
                <div>
                    <button
                        className="flex gap-2 items-center justify-center text-primary-gray bg-cbs-blue-button  rounded-md font-bold px-6 py-2 mb-3"
                        onClick={() =>
                            openModal(
                                <div
                                    className="w-full text-left transition-all transform bg-primary-light shadow-xl rounded my-6 align-top inline-block"
                                    style={{ maxWidth: " calc(100vw - 50px)" }}
                                >
                                   <ModalAddNewOrder2 />
                                </div>
                            )
                        }
                    >
                        <img src={iconPlusBlue} alt="" /> Tạo đơn hàng
                    </button>
                </div>
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

                    {/* <NavLink
                        to={`/crm/post`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                        >
                        <img
                            width={'7px'}
                            src={iconFolder}
                            alt="Menu item"
                        />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Bài viết</span>
                    </NavLink>   

                    <NavLink
                        to={`/crm/combo`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                        >
                        <img
                            width={'7px'}
                            src={iconFolder}
                            alt="Menu item"
                        />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Combo ưu đãi, deal hot</span>
                    </NavLink>   

                    <NavLink
                        to={`/crm/menu`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                        >
                        <img
                            width={'7px'}
                            src={iconFolder}
                            alt="Menu item"
                        />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Menu Website</span>
                    </NavLink>

                    <NavLink
                        to={`/crm/banner`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                        >
                        <img
                            width={'7px'}
                            src={iconFolder}
                            alt="Menu item"
                        />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Banner truyền thông</span>
                    </NavLink>

                    <NavLink
                        to={`/crm/tag`}
                        className="left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"
                        >
                        <img
                            width={'7px'}
                            src={iconFolder}
                            alt="Menu item"
                        />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Tagline bài viết</span>
                    </NavLink> */}
                </div>
            </div>
        </div>
    )
}