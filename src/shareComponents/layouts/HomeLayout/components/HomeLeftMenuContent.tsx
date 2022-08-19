import React, {FC} from "react";
import plusIcon from "assets/images/icons8-plus-math-96.svg"
import sendAndReceiveIcon from "assets/images/icons-send-and-receive.svg"
import mailOutLineIcon from "assets/images/icons-mail-outline.svg"
import uploadIcon from "assets/images/icons-upload.svg"
import starIcon from "assets/images/icons-star-outline.svg"
import linkIcon from "assets/images/icons-link.svg"
import fileIcon from "assets/images/icons-file.svg"
import {useModal} from "../../../../services/hooks/useModal";
import {ModalAddNewTask} from "../../../common";
import { NavLink } from 'react-router-dom';

export const HomeLeftMenuContent:FC = () => {
    const { openModal } = useModal();

    const listTab : {
        label: string,
        icon: string,
        count: number,
        route: string
    }[] = [
        {
            label: "Hoạt động",
            icon: sendAndReceiveIcon,
            count: 2,
            route: '/'
        },
        {
            label: "Việc của tôi",
            icon: mailOutLineIcon,
            count: 0,
            route: '/pcm/home'
        },
        {
            label: "Việc giao người khác",
            icon: uploadIcon,
            count: 0,
            route: '/pcm/assign'
        },
        {
            label: "Việc quan tâm",
            icon: starIcon,
            count: 0,
            route: '/pcm/bookmark'
        },
        {
            label: "Việc liên quan",
            icon: linkIcon,
            count: 0,
            route: '/pcm/related'
        },
        {
            label: "Báo cáo động",
            icon: fileIcon,
            count: 0,
            route: '/pcm/report'
        },
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
        <>
            <button
                onClick={() =>
                    openModal(
                        <div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
                            <ModalAddNewTask />
                        </div>
                    )
                }
                className={"bg-cbs-blue-button rounded-md flex items-center justify-center text-xl text-primary-gray py-2 px-4"}>
                <img src={plusIcon} alt={"Tạo mới"}/>
                <span className={"ml-2"}>Tạo mới</span>
            </button>

            <div className={"mt-4"}>
                {
                    listTab.map(nav => renderNav(nav))
                }
            </div>
        </>
    )
}