import React, { FC, useEffect, useState } from "react";
import adminIcon from "assets/images/icons8-user-shield-48.svg"
import plusIcon from "assets/images/icons8-plus-math-96.svg"
import sendAndReceiveIcon from "assets/images/icons-send-and-receive.svg"
import tagIcon from "assets/images/icons8-tag-100.svg"
import mailOutLineIcon from "assets/images/icons-mail-outline.svg"
import uploadIcon from "assets/images/icons-upload.svg"
import starIcon from "assets/images/icons-star-outline.svg"
import linkIcon from "assets/images/icons-link.svg"
import fileIcon from "assets/images/icons-file.svg"
import humanIcon from "assets/images/icons8-people-64.svg"
import paymentImage from "assets/menu/project/icons-project-payment.svg"
import deliveryImage from "assets/menu/project/icons-project-delivery.svg"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useModal } from "../../../../services/hooks/useModal";
import { ModalAddNewTask } from "../../../common";
import { NavLink } from 'react-router-dom';

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp, useGetListAppMenu, useGetListAppRoleMenu } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";
import { useDispatch } from "react-redux";
import { resetFilterDashboard } from "redux/reducer/DashboardV2Slice";

export const HomeLeftMenuContent: FC = () => {
    const [enabled, setEnabled] = useState(false);
    const { data } = usePcmPlanTaskNotification({ enabled: enabled });
    const { openModal } = useModal();
    const { user } = useAuth();
    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
    const dispatch = useDispatch();
    const [menuShowList, setMenuState] = useState(false);

    const listTab: {
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
                label: "Việc của tôi",
                icon: mailOutLineIcon,
                count: Number(data?.data?.amountMyTask1 + data?.data?.amountMyTask2 + data?.data?.amountMyTask3) || 0,
                route: '/pcm/mine'
            },
            {
                label: "Việc quan tâm",
                icon: starIcon,
                count: 0,
                route: '/pcm/bookmark'
            },
            // {
            //     label: "Đã gửi",
            //     icon: sendAndReceiveIcon,
            //     count: 0,
            //     route: '/pcm/send'
            // },
            {
                label: "Việc nháp",
                icon: fileIcon,
                count: 0,
                route: '/pcm/draft'
            },
        ];

    const listTabSub: {
        label: string,
        icon: string,
        count: number,
        route: string
    }[] = [
            {
                label: "Việc giao người khác",
                icon: uploadIcon,
                count: 0,
                route: '/pcm/assign'
            },
            {
                label: "Báo cáo theo dự án",
                icon: tagIcon,
                count: 0,
                route: '/pcm/tags'
            },
            {
                label: "Báo cáo theo nhân sự",
                icon: humanIcon,
                count: 0,
                route: '/pcm/users'
            },
            {
                label: "Báo cáo, giao nộp",
                icon: deliveryImage,
                count: 0,
                route: '/pcm/delivery'
            },
            {
                label: "Thanh toán",
                icon: paymentImage,
                count: 0,
                route: '/pcm/payment'
            },
            {
                label: "Việc liên quan",
                icon: linkIcon,
                count: 0,
                route: '/pcm/related'
            },
            // {
            //     label: "Thầu và mua sắm",
            //     icon: biddingImage,
            //     count: 0,
            //     route: '/pcm/bidding'
            // },
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
    }, []);

    const renderNav = (nav: {
        label: string,
        icon: string,
        count: number,
        route: string
    }) => {
        return (
            <NavLink key={nav.route} to={nav.route} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"} onClick={() => dispatch(resetFilterDashboard({}))}>
                <img width={'20px'} src={nav.icon} alt={nav.label} />
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
                <img src={plusIcon} alt={"Tạo mới"} />
                <span className={"ml-2"}>Tạo mới</span>
            </button>

            <div className={"mt-4 pb-1 relative"}>
                {hasPermission && dataUserAccess?.level == 0 ?
                    <NavLink to={`/pcm/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                        <img width={'20px'} src={adminIcon} />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>Quản trị viên</span>
                    </NavLink> : <></>
                }

                {
                    listTab.map(nav => renderNav(nav))
                }
                <div onClick={() => setMenuState(!menuShowList)} className="text-primary-gray px-4 py-1 cursor-pointer hover:bg-slate-200">
                    {(menuShowList ? <ExpandLessIcon className="w-[20px]" fontSize="small"/> : <ExpandMoreIcon className="w-[20px]" fontSize="small"/>)}
                    <span className="ml-2 text-[14px]">{(menuShowList ? 'Thu gọn' : 'Danh sách mở rộng')}</span>
                </div>
                <div className={"transition-1s h-0 overflow-hidden " + (menuShowList ? ' h-[300px]' : '')}>
                    {
                        listTabSub.map(nav => renderNav(nav))
                    }
                </div>
            </div>
        </>
    )
}