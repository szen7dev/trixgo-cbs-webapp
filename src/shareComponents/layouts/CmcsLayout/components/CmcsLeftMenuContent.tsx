import React, {FC} from "react";
import {NavLink} from "react-router-dom";
import adminIcon from "assets/images/icons8-user-shield-48.svg";
import contractIcon from "assets/images/icons8-contract-64.svg";
import {
    useCheckPerAccessApp,
    useGetListAppMenu,
    useGetListAppRoleMenu
} from "services/hooks/auth/usePermissions";
import {APP_ID} from "apis/localdb";

export const CmcsLeftMenuContent:FC = () => {
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.CMCS.id });
    const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.CMCS.id, parentID: APP_ID.CMCS.menuCmcsApp.id });
    const { listAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.CMCS.id, type: "1" });

    const renderNav = (nav: {
        name: string,
        count: number,
        slug: string
    }) => {
        return (
            <NavLink key={nav.slug}
                     to={`/cmcs/${nav.slug}`}
                     className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                <img width={'20px'} src={contractIcon} alt={nav.name}/>
                <span className={"flex-1 ml-2 text-left text-[14px]"}>{nav.name}</span>
            </NavLink>
        )
    }
    return (
        <>
            <button
                className={"bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
                <img src={contractIcon} alt={"Tạo mới"}/>
                <span className={"ml-2"}>Tạo mới</span>
            </button>

            <div className={"mt-4"}>
                {hasPermission && dataUserAccess?.level == 0 ?
                    <NavLink to={`/cmcs/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                        <img width={'20px'} src={adminIcon}/>
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
                    </NavLink> : <></>
                }
                <NavLink
                         to={`/cmcs/home`}
                         className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                    <img width={'20px'} src={contractIcon} alt={"Trang chủ"}/>
                    <span className={"flex-1 ml-2 text-left text-[14px]"}>{"Trang chủ"}</span>
                </NavLink>
                {listAppMenu && listAppMenu.length &&
                    listAppMenu.map((item: any, index: number) => {
                        const roleApp = listAppRoleMenu.find((e: any) => e?._id?.menu == item?._id);
                        if (roleApp && roleApp.read >= 1) {
                            return renderNav(item);
                        }
                    })
                }
            </div>
        </>
    )
}