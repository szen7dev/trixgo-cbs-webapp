import React, {FC, useCallback, useEffect, useRef} from "react";
import DoubleTickIcon from "assets/images/icons8-double-tick-96.svg";
import moment from "moment";
import {ContactReply, TextReply, FileReply, ImageReply, DeleteReply} from "../ReplyContent";
import {ReactionList} from "../../Reactions";
import {MessageStatus} from "./MessageStatus";

type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
    isMyMessage?: boolean;
    isMini?: boolean;
}
export const DeleteChatContent:FC<Props> = ({message,className,showSenderName, isMyMessage, isMini}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const isDeleted = useCallback(() => {
        if (message.parent.usersDelete&&message.parent.usersDelete.includes(profileId)) {
            return true
        }
        return (message.parent.files??[]).some((file: { usersDelete: string | any[]; }) => file.usersDelete && file.usersDelete.includes(profileId));
    }, [message])
    const renderReply = () => {
        if (isDeleted()) {
            return <DeleteReply message={message} />
        }
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
        <div className={"max-w-[366px] min-w-[70px] rounded-lg p-[7px] relative " + (className??"")}>
            {
                showSenderName&&
                <div className={"reply-user-name text-gray-400"}>
                    {message.sender.bizfullname||message.sender.fullname}
                </div>
            }
            {
                message.parent&&
                renderReply()
            }
            <div className={"pr-[20px]"}>
                <div className={"message-content"}>
                    <div className={"flex-1 py-[4px] break-words text-gray-400"}>
                        Tin nhắn đã xóa
                    </div>
                </div>
                <div className={"date-message date-text-message text-xs flex items-center w-full justify-end "  + (isMyMessage?"text-primary":"text-gray-500")}>
                    <ReactionList message={message}/>
                    <span className={"ml-[5px]"}>{moment(message.createAt).format("HH:mm")}</span>
                    <MessageStatus message={message} isMine={isMyMessage}/>
                </div>
            </div>
        </div>
    )
}
