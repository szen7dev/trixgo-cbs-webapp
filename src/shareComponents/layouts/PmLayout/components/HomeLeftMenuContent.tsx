import React, {FC} from "react";
import plusIcon from "assets/images/icons8-plus-math-96.svg"
import rocketIcon from "assets/images/icons8-rocket.svg"
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
            label: "Danh sách dự án",
            icon: rocketIcon,
            count: 2,
            route: '/'
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