import React, {FC, useEffect, useRef} from "react";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import moment from "moment";
import {ContactReply, TextReply, FileReply, ImageReply} from "../ReplyContent";

type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
}
export const DeleteChatContent:FC<Props> = ({message,className,showSenderName, isMyMessage}) => {
    const renderReply = () => {
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
            case 7:
                return <ContactReply message={message.parent}/>;
        }
    }
    return (
        <div className={"max-w-[366px] min-w-[70px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                showSenderName&&
                <div className={"reply-user-name text-primary"}>
                    {message.sender.bizfullname||message.sender.fullname}
                </div>
            }
            {
                message.parent&&
                renderReply()
            }
            <div className={"pr-[20px] pb-[5px]"}>
                <div className={"message-content"}>
                    <div className={"flex-1 py-[4px] break-words text-gray-400"}>
                        Tin nhắn đã xóa
                    </div>
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-xs flex items-center "  + (isMyMessage?"text-primary":"text-gray-500")}>
                    {moment(message.createAt).format("HH:mm")}<img  className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}
