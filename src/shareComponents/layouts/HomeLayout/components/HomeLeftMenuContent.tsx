import { FC, useEffect, useMemo, useState } from "react";
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
import { useTranslation } from "react-i18next";
import { NavLink } from 'react-router-dom';

import { useModal } from "../../../../services/hooks/useModal";
import { ModalAddNewTask } from "../../../common";

/*=====6.HOOKS/APIS=====*/
import { useAuth } from "services/hooks/auth/useAuth";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";
import { useDispatch } from "react-redux";
import { resetFilterDashboard } from "redux/reducer/DashboardV2Slice";
import { useSocket } from "services/hooks/useSocket";

type Tab = {
    label: string,
    icon: string,
    count: number,
    route: string
}

export const HomeLeftMenuContent: FC = () => {
    useAuth();

    const dispatch = useDispatch();
    const [enabled, setEnabled] = useState(false);
    const [menuShowList, setMenuState] = useState(false);

    const { t } = useTranslation()
    const { openModal } = useModal(true);
    const { current: socket }: any = useSocket();
    const { data } = usePcmPlanTaskNotification({ enabled: enabled });
    // console.log(data)
    // console.log(data?.amountMyTask5)

    const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

    const [badge, setBadge] = useState({
        amountUnreadTask: data?.data?.amountUnreadTask,
        amountMyTask: Number(data?.data?.amountMyTask),
    })

    const amountUnreadTask = useMemo(() => {
        return badge.amountUnreadTask || data?.data?.amountUnreadTask || 0;
    }, [data?.data?.amountUnreadTask, badge.amountUnreadTask])

    const amountMyTask = useMemo(() => {
        return badge.amountMyTask || Number(data?.data?.amountMyTask) || 0;
    }, [data?.data, badge.amountMyTask])

    useEffect(() => {
        const onUpdateBadgeNotification = ({ error, data }: any) => {
            if(error || !Object.keys(data).length) return;

            if(data.amountUnreadTask) {
                const {
                    amountUnreadTask,
                    amountMyTask1,
                    amountMyTask2,
                    amountMyTask3,
                    // amountMyTask5,
                } = data;

                setBadge({
                    amountUnreadTask,
                    amountMyTask: Number(amountMyTask1 + amountMyTask2 + amountMyTask3) || 0,
                })
            }
        }

        socket?.on("SUBJECT_PCM_SSC_UPDATE_NOTIFICATION", onUpdateBadgeNotification);

        return () => {
          socket?.off("SUBJECT_PCM_SSC_UPDATE_NOTIFICATION", onUpdateBadgeNotification);
        };
    }, [socket]);

    const listTab: Tab[] = [
        {
            label: t("menu:activity"),
            icon: sendAndReceiveIcon,
            count: amountUnreadTask,
            route: '/pcm/home'
        },
        {
            label: t("menu:mytask"),
            icon: mailOutLineIcon,
            count: amountMyTask,
            route: '/pcm/mine'
        },
        {
            label: t("menu:star"),
            icon: starIcon,
            count: 0,
            route: '/pcm/bookmark'
        },
        {
            label: t("menu:givingTask"),
            icon: uploadIcon,
            count: 0,
            route: '/pcm/assign'
        },
        {
            label: t("menu:draft"),
            icon: fileIcon,
            count: data?.data?.amountMyTask5,
            route: '/pcm/draft'
        },
        {
            label: t("menu:kpiReport"),
            icon: fileIcon,
            count: 0,
            route: '/pcm/kpi-report'
        },
    ]

    const listTabSub: Tab[] = [
        {
            label: t("menu:dynamicReport"),
            icon: fileIcon,
            count: 0,
            route: '/pcm/report'
        },
        {
            label: t("menu:relatingTask"),
            icon: linkIcon,
            count: 0,
            route: '/pcm/related'
        },
        {
            label: t("menu:projectReport"),
            icon: tagIcon,
            count: 0,
            route: '/pcm/tags'
        },
        {
            label: t("menu:humanReport"),
            icon: humanIcon,
            count: 0,
            route: '/pcm/users'
        },
        {
            label: t("menu:deliveredTracking"),
            icon: deliveryImage,
            count: 0,
            route: '/pcm/delivery'
        },
        {
            label: t("menu:paymentTracking"),
            icon: paymentImage,
            count: 0,
            route: '/pcm/payment'
        },
        {
            label:t("menu:biddingTracking"),
            icon: fileIcon,
            count: 0,
            route: '/pcm/bidding'
        },
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setEnabled(true);
        }, 300);

        return () => clearTimeout(timeout);
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
                <span className={"ml-2"}>{t("menu:add")}</span>
            </button>

            <div className={"mt-4 pb-1 relative"}>
                {hasPermission && dataUserAccess?.level == 0 ?
                    <NavLink to={`/pcm/admin`} className={"left-menu-nav flex items-center py-1.5 px-4 rounded-full w-full text-primary-gray"}>
                        <img width={'20px'} src={adminIcon} />
                        <span className={"flex-1 ml-2 text-left text-[14px]"}>{t("menu:admin")}</span>
                    </NavLink> : <></>
                }
                {
                    listTab.map(nav => renderNav(nav))
                }
                <div onClick={() => setMenuState(!menuShowList)} className="text-primary-gray px-4 py-1 cursor-pointer hover:bg-slate-200">
                    {(menuShowList ? <ExpandLessIcon className="w-[20px]" fontSize="small"/> : <ExpandMoreIcon className="w-[20px]" fontSize="small"/>)}
                    <span className="ml-2 text-[14px]">{(menuShowList ? `${t("menu:less")}` : `${t("menu:more")}`)}</span>
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