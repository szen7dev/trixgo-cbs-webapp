import React, {FC, useCallback} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";

type Props = {
    message: ItemMessage
}
export const MessageStatus:FC<Props> = ({message}) => {
    const messagesData = useSelector((state: RootState) => state.listMessage.data.listMessage[message.conversation]);
    const currentMessageData = messagesData?messagesData[message._id]:null;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const didUsersSeen = useCallback(() => {
        if (!currentMessageData?.usersSeen) return false;
        return  (currentMessageData?.usersSeen ?? []).some((user: string | { _id: string; bizfullname: string; fullname: string; image: string }) => {
            if (typeof user === "string") {
                return user !== profileId;
            } else {
                return user._id !== profileId;
            }
        });
    }, [currentMessageData]);

    return (
        <>
            <span className={"cbs-clock message-sending ml-1 " + (message.isFake?"block":"hidden")}>
            </span>
            <img  src={DoubleTickIcon} alt={"tick"} className={!message.isFake&&didUsersSeen()?"block ml-1":"hidden"}/>
            <img  src={"/images/messages/icons8-signle-tick-96.png"} alt={"tick"} className={"w-[16px] h-[16px] " + (!message.isFake&&!didUsersSeen()?"block ml-1":"hidden")}/>
        </>
    )
};