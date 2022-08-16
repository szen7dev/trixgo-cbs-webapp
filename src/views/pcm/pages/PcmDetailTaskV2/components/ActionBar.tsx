import React, {FC, useState} from "react";
import iconBack from "assets/images/icon-back-gray.svg";
import iconLinkCopy from "assets/images/icons8-link-96-v3.svg";
import {SendEmailNotification} from "./SendEmailNotification";
import iconCopy from "assets/images/icons8-copy-96.svg";
import iconRemove from "assets/images/icons8-remove-96.svg";
import iconPrint from "assets/images/icons8-print-96.svg";
import iconChat from "assets/images/icons8-chat-48.svg";
import {TaskHistoryLog} from "./TaskHistoryLog";
import iconMember from "assets/images/icons8-member-48-white.svg";
import DotsVerticalIcon from "assets/icons/DotsVertical";

export const ActionTaskDetailBar:FC = () => {
    const [activeCopyTextTooltip, setActiveCopyTextTooltip] = useState(false);
    const copyLink = () => {
        const copyText = window.location.href;
        navigator.clipboard.writeText(copyText);
        setActiveCopyTextTooltip(true);
    }
    const mouseLeaveCopyTextButton = () => {
        setActiveCopyTextTooltip(false);
    }
    return (
        <div className={"action-bar z-30 bg-white flex items-center px-2 py-1 border-b-0.5 border-primary-border sticky top-0"}>
            <div className={"flex items-center flex-1"}>
                <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] bg-cbs-form-input-bg mr-3"}>
                    <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                </button>
                <button
                    onClick={() => copyLink()}
                    onMouseOut={() => mouseLeaveCopyTextButton()}
                    className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3 relative"}>
                    <img src={iconLinkCopy} alt={"----"} className={"w-[18px]"}/>
                    <div className={"absolute top-full bg-primary-gray p-2 rounded w-[170px] text-left text-white transition-all " + (activeCopyTextTooltip?"visible opacity-100":"invisible opacity-0")}>Đã sao chép đường liên kết</div>
                </button>
                <SendEmailNotification/>
                <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                    <img src={iconCopy} alt={"----"} className={"w-[18px]"}/>
                </button>
                <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                    <img src={iconRemove} alt={"----"} className={"w-[18px]"}/>
                </button>
                <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                    <img src={iconPrint} alt={"----"} className={"w-[18px]"}/>
                </button>
                <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                    <img src={iconChat} alt={"----"} className={"w-[18px]"}/>
                </button>
            </div>
            <TaskHistoryLog/>
            <button className={"rounded bg-cbs-green-medium h-[36px] text-white flex items-center justify-center px-3 mx-3"}>
                <img src={iconMember} alt={"----"} className={"w-[24px] mr-2"}/>
                <span>Chia sẻ</span>
            </button>
            <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] bg-cbs-form-input-bg mr-3"}>
                <DotsVerticalIcon/>
            </button>
        </div>
    )
}