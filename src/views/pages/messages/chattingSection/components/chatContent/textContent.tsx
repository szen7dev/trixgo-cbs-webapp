import React, {FC, ReactNode, useEffect, useRef} from "react";
import DoubleTickIcon from "../../../../../../assets/images/icons8-double-tick-96.svg";
import TextReply from "./replyContent/textReply";
import FileReply from "./replyContent/fileReply";
import ImageReply from "./replyContent/imageReply";
import moment from "moment";
import {ItemListConversation} from "typings/apis/messages/listConversation";
type Props = {
    message: any;
    className?: string;
    showSenderName?: boolean;
}
const TextChatContent:FC<Props> = ({message,className,showSenderName}) => {
    const textContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML = message.content;
        }
    },[textContentRef])

    const renderReply = () => {
        switch (message.parent.type) {
            case 0:
                return <TextReply message={message.parent}/>;
            case 2:
                return <FileReply message={message.parent}/>;
            case 1:
                return <ImageReply message={message.parent}/>;
        }
    }
    return (
        <div className={"max-w-[366px] min-w-[70px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                showSenderName&&
                <div className={"reply-user-name text-primary"}>
                    {message.sender.fullname}
                </div>
            }
            {
                message.parent&&
                renderReply()
            }
            <div className={"pr-[20px] pb-[5px]"}>
                <div className={"message-content"} ref={textContentRef}>
                    <div ref={textContentRef} className={"flex-1 py-[4px]"}>
                    </div>
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-gray-400 text-xs flex items-center"}>
                    {moment(message.createdAt).format("hh:mm")}<img className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}

export default TextChatContent
