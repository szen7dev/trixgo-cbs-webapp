import React, {FC, useEffect, useState} from "react";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import mailIcon from "assets/images/icons8-secure-mail-48.svg";
import chatIcon from "assets/images/icons8-chat-48.svg";
import projectIcon from "assets/images/icons-project.svg";
import contractIcon from "assets/images/icons8-contract-64.svg";
import fileIcon from "assets/images/icons-file.svg";
import commercialIcon from "assets/images/icons8-commercial-64.svg";
import peopleIcon from "assets/images/icons8-people-64.svg";
import {Link, useHistory, useLocation} from "react-router-dom";
import {useSocket} from "../../../services/hooks/useSocket";
import {useNotification} from "../../../services/hooks/useNotification";

type Props = {
    handleMenuEvent: () => void
}
export const LeftNavigate:FC<Props> = ({handleMenuEvent}) => {
    const {pathname} = useLocation();

    const [totalNoti, setTotalNoti] = useState(0);

    const { current: socket }: any = useSocket();

    const {
        totalRecordSendSuccess,
        refetchListNotification,
    } = useNotification({}, true);

    useEffect(() => {
        socket?.on('NOTIFICATION_SSC_RECEIVE_NEW_NOTIFICATION', refetchListNotification);

        return () => socket?.off('NOTIFICATION_SSC_RECEIVE_NEW_NOTIFICATION', refetchListNotification);
    }, [socket]);

    useEffect(() => {
        totalRecordSendSuccess && setTotalNoti(totalRecordSendSuccess);
    }, [totalRecordSendSuccess])

    return (
        <div className={"bg-cbs-right-navigate-bg w-[75px] min-w-[75px] flex flex-col items-center relative z-40"}>
            <button title="Toggle left sidebar" onClick={handleMenuEvent} className={"my-6"}>
              <img className="w-4" src={menuIcon} alt="Menu" />
            </button>

            <Link to={`/`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + ((pathname === "/" || pathname.includes("/pcm")) ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={mailIcon} alt={"Chủ đề"}/>
                    {
                        totalNoti > 0 &&
                        <span
                            className={"absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"}>
                            {totalNoti}
                        </span>
                    }
                </div>
                <span className={"text-primary-gray mt-1"}>Chủ đề</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={chatIcon} alt={"Chat"}/>
                    {
                        totalNoti > 0 &&
                        <span
                            className={"absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"}>
                            {totalNoti}
                        </span>
                    }
                </div>
                <span className={"text-primary-gray mt-1"}>Chat</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={projectIcon} alt={"Dự án"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Dự án</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={contractIcon} alt={"Hợp đồng"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Hợp đồng</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={fileIcon} alt={"Hồ sơ"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Hồ sơ</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={commercialIcon} alt={"Media"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Media</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-5"}>
                <div className={"px-4 py-2 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={peopleIcon} alt={"Nhân sự"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Nhân sự</span>
            </Link>
        </div>
    )
}