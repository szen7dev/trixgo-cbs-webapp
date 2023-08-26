import {FC} from "react";
import { NavLink } from 'react-router-dom';
import documentIcon from "assets/images/icons8-document.svg";

import projectIcon from "assets/images/icons-project.svg";
import reportIcon from "assets/images/icons8-report.svg";
import taskIcon from "assets/images/icons8-task.svg";

export const PmLeftMenuContent:FC = () => {
    const listTab : {
        label: string,
        icon: string,
        count: number,
        route: string
    }[] = [
        {
            label: "Danh sách dự án",
            icon: projectIcon,
            count: 0,
            route: '/pm/projects'
        },
        {
            label: "Báo cáo đầu tư",
            icon: reportIcon,
            count: 0,
            route: '/pm/dashboard-portfolio'
        },
        {
            label: "Báo cáo công việc",
            icon: taskIcon,
            count: 0,
            route: '/pm/dashboard-task'
        },
        {
            label: "Báo cáo hồ sơ",
            icon: documentIcon,
            count: 0,
            route: '/pm/dashboard-document'
        },
    ]

    const renderNav = (nav: {
        label: string,
        icon: string,
        count: number,
        route: string
    }) => {
      return (
          <NavLink key={nav.route} to={nav.route} className={"left-menu-nav flex items-center py-1 px-4 rounded-full w-full text-primary-gray"}>
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
        <>
            <div className={"mt-4"}>
                {
                    listTab.map(nav => renderNav(nav))
                }
            </div>
        </>
    )
}