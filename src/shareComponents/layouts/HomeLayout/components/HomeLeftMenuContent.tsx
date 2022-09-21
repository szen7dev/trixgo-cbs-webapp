import React, {FC, useEffect, useState} from "react";
import adminIcon from "assets/images/icons8-user-shield-48.svg"
import plusIcon from "assets/images/icons8-plus-math-96.svg"
import sendAndReceiveIcon from "assets/images/icons-send-and-receive.svg"
import tagIcon from "assets/images/icons8-tag-100.svg"
import mailOutLineIcon from "assets/images/icons-mail-outline.svg"
import uploadIcon from "assets/images/icons-upload.svg"
import starIcon from "assets/images/icons-star-outline.svg"
import linkIcon from "assets/images/icons-link.svg"
import fileIcon from "assets/images/icons-file.svg"
import biddingImage from "assets/menu/project/icons-project-bidding.svg"
import paymentImage from "assets/menu/project/icons-project-payment.svg"
import deliveryImage from "assets/menu/project/icons-project-delivery.svg"

import {useModal} from "../../../../services/hooks/useModal";
import {ModalAddNewTask} from "../../../common";
import { NavLink } from 'react-router-dom';

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";
import { useDispatch } from "react-redux";
import { resetFilterDashboard } from "redux/reducer/DashboardV2Slice";

export const HomeLeftMenuContent:FC = () => {
    const [enabled, setEnabled] = useState(false);
    const {data} = usePcmPlanTaskNotification({enabled: enabled});
    const { openModal } = useModal();
    const { user } = useAuth();
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
    const dispatch = useDispatch();

    const listTab : {
        label: string,
        icon: string,
        count: number,
        route: string
    }[] = [
        {
            label: "Hoạt động",
            icon: sendAndReceiveIcon,
            count: data?.data?.amountUnreadTask || 0,
            route: '/pcm/home'
        },
        {
            label: "Phân loại theo dự án",
            icon: tagIcon,
            count: 0,
            route: '/pcm/tags'
        },
        {
            label: "Tổng hợp theo nhân sự",
            icon: tagIcon,
            count: 0,
            route: '/pcm/users'
        },
        // {
        //     label: "Outbox",
        //     icon: sendAndReceiveIcon,
        //     count: 0,
        //     route: '/pcm/send'
        // },
        {
            label: "Việc của tôi",
            icon: mailOutLineIcon,
            count: data?.data?.amountMyTask || 0,
            route: '/pcm/mine'
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
        // {
        //     label: "Thầu và mua sắm",
        //     icon: biddingImage,
        //     count: 0,
        //     route: '/pcm/bidding'
        // },
        {
            label: "Hồ sơ thanh toán",
            icon: paymentImage,
            count: 0,
            route: '/pcm/payment'
        },
        {
            label: "Báo cáo, giao nộp",
            icon: deliveryImage,
            count: 0,
            route: '/pcm/delivery'
        },
        {
            label: "Việc liên quan",
            icon: linkIcon,
            count: 0,
            route: '/pcm/related'
        },
        {
            label: "Việc nháp",
            icon: fileIcon,
            count: 0,
            route: '/pcm/draft'
        },
        {
            label: "Báo cáo động",
            icon: fileIcon,
            count: 0,
            route: '/pcm/report'
        },
    ];

    useEffect(() => {
        setTimeout(() => {
            setEnabled(true);
        }, 300);
    },[]);

    const renderNav = (nav: {
        label: string,
        icon: string,
        count: number,
        route: string
    }) => {
      return (
          <NavLink key={nav.route} to={nav.route} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"} onClick={() => dispatch(resetFilterDashboard({}))}>
              <img width={'20px'} src={nav.icon} alt={nav.label}/>
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
                {hasPermission && dataUserAccess?.level == 0 ?
                    <NavLink to={`/pcm/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                        <img width={'20px'} src={adminIcon}/>
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
                    </NavLink> : <></>
                }

                {
                    listTab.map(nav => renderNav(nav))
                }
            </div>
        </>
    )
}