import React, {FC, useCallback, useContext} from "react";
import Close from "assets/icons/Close";
import {useDispatch} from "react-redux";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {removeReplyMessage} from "redux/reducer/messages/ListMessage";
import {ContactReply, TextReply, FileReply, ImageReply, DeleteReply} from "../ChatContent/ReplyContent";
import {DeleteChatContent} from "../ChatContent/RegularContent";

type Props = {
    replyData: ItemMessage;
    currentChat: string
}
export const ReplyChat:FC<Props> = ({replyData,currentChat}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();

    const isDeleted = useCallback(() => {
        if (replyData.usersDelete&&replyData.usersDelete.includes(profileId)) {
            return true
        }
        return (replyData.files??[]).some(file => file.usersDelete && file.usersDelete.includes(profileId));
    }, [replyData])
    const renderReply = () => {
        if (isDeleted()) {
            return <DeleteReply message={replyData} className={"text-xs"}/>
        }
        switch (replyData.type) {
            case 0:
                return <TextReply message={replyData} className={"text-xs"}/>;
            case 2:
                return <FileReply message={replyData} className={"text-xs"}/>;
            case 1:
                return <ImageReply message={replyData} className={"text-xs"}/>;
            case 7:
                return <ContactReply message={replyData} className={"text-xs"}/>;
        }
    }

    if (!replyData) return null;

    return (
        <div className={"flex w-full pt-[10px]"}>
            <button
                onClick={() => {
                    dispatch(removeReplyMessage({conversationId: currentChat}))
                }}
                className={"w-[46px] min-w-[46px] items-center justify-center flex"}>
                <Close/>
            </button>
            <div className={"flex-1 px-[10px]"}>
                {renderReply()}
            </div>
        </div>
    )
}