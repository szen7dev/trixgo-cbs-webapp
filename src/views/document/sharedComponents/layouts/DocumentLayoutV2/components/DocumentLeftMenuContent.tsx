import React, {FC} from "react"
import {NavLink} from "react-router-dom";
import fileIcon from "assets/images/icon-file.svg";

const DocumentLeftMenuContent:FC = () => {
    const listTab : {
        label: string,
        icon: string,
        count: number,
        route: string
    }[] = [
        {
            label: "Trang chủ",
            icon: fileIcon,
            count: 0,
            route: '/document/home'
        }
    ]

    const renderNav = (nav: {
        label: string,
        icon: string,
        count: number,
        route: string
    }) => {
        return (
            <NavLink key={nav.route} to={nav.route} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                <img src={nav.icon} alt={nav.label}/>
                <span className={"flex-1 ml-2 text-left text-[14px]"}>{nav.label}</span>
                {
                    nav.count > 0 &&
                    <span>{nav.count}</span>
                }
            </NavLink>
        )
    }
    return (
        <div className={"mt-4"}>
            {
                listTab.map(nav => renderNav(nav))
            }
        </div>
    )
}
export default DocumentLeftMenuContent;