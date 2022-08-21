import React, {FC} from "react";
import {useModal} from "services/hooks/useModal";
import {ModalAddNewTask} from "../../../../common";
import {NavLink, useParams} from 'react-router-dom';
import projectIcon from "assets/images/icons-project.svg";
import shieldIcon from "assets/images/icons8-user-shield-48.svg";
import reportIcon from "assets/images/icons8-report.svg";

export const PmProjectLeftMenuContent:FC = () => {
    const { openModal } = useModal();
    const {id} = useParams<{id: string}>();

    const listTab : {
        label: string,
        icon: string,
        route: string
    }[] = [
        {
            label: "Quản trị viên",
            icon: shieldIcon,
            route: '/pm/admin'
        },
        {
            label: "Trang chủ",
            icon: reportIcon,
            route: `/pm/project/${id}/home`
        },
        {
            label: "Báo cáo quản trị",
            icon: reportIcon,
            route: `/pm/project/${id}/dashboard`
        },
        {
            label: "Thư mục dữ liệu",
            icon: reportIcon,
            route: `/pm/project/${id}/folder`
        },
        {
            label: "Mốc tiến độ",
            icon: reportIcon,
            route: `/pm/project/${id}/schedule`
        },
        {
            label: "Công việc",
            icon: reportIcon,
            route: `/pm/project/${id}/subject`
        },
        {
            label: "Ngân sách, hợp đồng",
            icon: reportIcon,
            route: `/pm/project/${id}/budget`
        },
        {
            label: "Lựa chọn nhà thầu",
            icon: reportIcon,
            route: `/pm/project/${id}/bidding`
        },
        {
            label: "Hồ sơ thanh toán",
            icon: reportIcon,
            route: `/pm/project/${id}/payment`
        },
        {
            label: "Hồ sơ văn bản",
            icon: reportIcon,
            route: `/pm/project/${id}/document`
        },
        {
            label: "Hình ảnh",
            icon: reportIcon,
            route: `/pm/project/${id}/photo`
        },
        {
            label: "Bản vẽ",
            icon: reportIcon,
            route: `/pm/project/${id}/drawing`
        },
        {
            label: "Danh bạ dự án",
            icon: reportIcon,
            route: `/pm/project/${id}/directory`
        },
    ]

    const renderNav = (nav: {
        label: string,
        icon: string,
        route: string
    }) => {
      return (
          <NavLink key={nav.route} to={nav.route} className={"left-menu-nav flex items-center py-1 px-4 rounded-full w-full text-primary-gray"}>
              <img src={nav.icon} alt={nav.label}/>
              <span className={"flex-1 ml-2 text-left"}>{nav.label}</span>
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