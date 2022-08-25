import React, {FC, useEffect, useState} from "react";
import menuIcon from "assets/images/icon-mobile-menu-black.png";
import mailIcon from "assets/images/icons8-secure-mail-48.svg";
import chatIcon from "assets/images/icons8-chat-48.svg";
import projectIcon from "assets/images/icons-project.svg";
import contractIcon from "assets/images/icons8-contract-64.svg";
import fileIcon from "assets/images/icons-file.svg";
import {Link, useLocation} from "react-router-dom";
import {useSocket} from "services/hooks/useSocket";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {setAmountMissMessage} from "redux/reducer/messages/ListConversation";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import { usePcmPlanTaskNotification } from "services/hooks/pcm/usePcmDashboardV2";

type Props = {
    handleMenuEvent: () => void
}
export const LeftNavigate:FC<Props> = ({handleMenuEvent}) => {
    const {pathname} = useLocation();
    const { current: socket }: any = useSocket();
    const dispatch = useDispatch();
    const [enabled, setEnabled] = useState(false);

    const {data} = usePcmPlanTaskNotification({enabled: enabled});

    useEffect(() => {
        setTimeout(() => {
            setEnabled(true);
        }, 300);
        if (!pathname.includes("/messages")) {
            getListConversation({keyword: ""});
        }
    },[]);

    useEffect(() => {
        if (!socket) return;
        socket.on('CHATTING_SSC_RECEIVE_MESSAGE', onReceiveMessage);

        return () => {
            socket.off('CHATTING_SSC_RECEIVE_MESSAGE', onReceiveMessage);
        }
    },[socket]);

    const amountMissMessage = useSelector((state: RootState) => state.listConversation.data.amountMissMessage);
    const {getListConversation} = UseListConversation();

    const onReceiveMessage = (data: any) => {
        if (pathname.includes("/messages")) {
            return;
        }
        if (data?.infoMessage?.error) {
            return;
        }
        dispatch(setAmountMissMessage(data.amountMissMessage))
    };

    return (
        <div className={"bg-cbs-right-navigate-bg w-[68px] min-w-[68px] flex flex-col items-center relative z-40"}>
            <button title="Toggle left sidebar" onClick={handleMenuEvent} className={"my-6"}>
              <img className="w-4" src={menuIcon} alt="Menu" />
            </button>

            <Link to={`/`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + ((pathname === "/" || pathname.includes("/pcm")) ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={mailIcon} alt={"Chủ đề"}/>
                    {/*{*/}
                    {/*    totalNoti > 0 &&*/}
                    {data?.data?.amountUnreadTask && data?.data?.amountUnreadTask > 0 ? 
                        <span
                        className={"absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"}>
                        {data?.data?.amountUnreadTask}
                    </span> : <></>
                    }
                    {/*}*/}
                </div>
                <span className={"text-primary-gray mt-1"}>Chủ đề</span>
            </Link>
            <Link to={`/pm/projects`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + (pathname.includes("/pm") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={projectIcon} alt={"Dự án"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Dự án</span>
            </Link>
            <Link to={`/cmcs/home`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + (pathname.includes("/cmcs") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={contractIcon} alt={"Hợp đồng"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Hợp đồng</span>
            </Link>
            <Link to={`/document/home`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + (pathname.includes("/document") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={fileIcon} alt={"Hồ sơ"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Hồ sơ</span>
            </Link>
            <Link to={`/messages`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={chatIcon} alt={"Chat"}/>
                    {
                        amountMissMessage > 0 &&
                        <span
                            className={"absolute -top-1 right-1 min-w-5 w-5 h-5 text-xs inline-block border-2 text-center border-white rounded-full bg-negative text-white"}>
                            {amountMissMessage}
                        </span>
                    }
                </div>
                <span className={"text-primary-gray mt-1"}>Chat</span>
            </Link>
            {/* <Link to={`/human/home`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={peopleIcon} alt={"Nhân sự"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Nhân sự</span>
            </Link> */}
            {/* <Link to={`/media/home`} className={"flex flex-col items-center mb-3"}>
                <div className={"px-4 py-1 rounded-full relative " + (pathname.includes("/messages") ? "bg-cbs-hightlight-right-navigate" : "")}>
                    <img src={commercialIcon} alt={"Media"}/>
                </div>
                <span className={"text-primary-gray mt-1"}>Media</span>
            </Link> */}
        </div>
    )
}