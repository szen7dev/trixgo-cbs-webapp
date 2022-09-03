import React, {FC} from "react";
import rocketIcon from "assets/images/icons8-rocket.svg"
import {useModal} from "services/hooks/useModal";
import {ModalAddNewTask} from "../../../../common";
import { NavLink } from 'react-router-dom';
import projectIcon from "assets/images/icons-project.svg";
import shieldIcon from "assets/images/icons8-user-shield-48.svg";
import reportIcon from "assets/images/icons8-report.svg";
import paperPenIcon from "assets/images/icons-paper-pen.svg";
import fileIcon from "assets/images/icon-file.svg";

export const PmLeftMenuContent:FC = () => {
    const { openModal } = useModal();

    const listTab : {
        label: string,
        icon: string,
        count: number,
        route: string
    }[] = [
        {
            label: "Danh sách dự án",
            icon: rocketIcon,
            count: 0,
            route: '/pm/projects'
        },
        // {
        //     label: "Báo cáo đầu tư",
        //     icon: reportIcon,
        //     count: 0,
        //     route: '/pm/report-1'
        // },
        // {
        //     label: "Báo cáo công việc",
        //     icon: paperPenIcon,
        //     count: 0,
        //     route: '/pm/report-2'
        // },
        // {
        //     label: "Báo cáo hồ sơ",
        //     icon: fileIcon,
        //     count: 0,
        //     route: '/pm/report-3'
        // },
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
              <span className={"flex-1 ml-2 text-left"}>{nav.label}</span>
              {
                  nav.count > 0 &&
                  <span>{nav.count}</span>
              }
          </NavLink>
      )
    }
    return (
        <>
            {/* <button
                onClick={() =>
                    openModal(
                        <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                            <ModalAddNewTask />
                        </div>
                    )
                }
                className={"bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
                <img src={projectIcon} alt={"Tạo mới"}/>
                <span className={"ml-2"}>Tạo mới</span>
            </button> */}

            <div className={"mt-4"}>
                {
                    listTab.map(nav => renderNav(nav))
                }
            </div>
        </>
    )
}