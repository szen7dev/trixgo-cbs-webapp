import React, {FC, ReactNode, useEffect, useRef} from "react";
import DoubleTickIcon from "../../../../../../assets/images/icons8-double-tick-96.svg";
import TextReply from "./replyContent/textReply";
import FileReply from "./replyContent/fileReply";
import ImageReply from "./replyContent/imageReply";
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
        switch (message.replyTo.type) {
            case "text":
                return <TextReply message={message.replyTo}/>
            case "file":
                return <FileReply message={message.replyTo}/>
            case "images":
                return <ImageReply message={message.replyTo}/>;
        }
    }
    return (
        <div className={"max-w-[366px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                showSenderName&&
                <div className={"reply-user-name"} style={{color: message.themeColor}}>
                    {message.userName}
                </div>
            }
            {
                message.replyTo&&
                renderReply()
            }
            <div className={"pr-[20px] pb-[5px]"}>
                <div className={"message-content"} ref={textContentRef}>
                    <div ref={textContentRef} className={"flex-1 py-[4px]"}>
                    </div>
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-primary text-xs flex items-center"}>
                    {message.date}<img className={"ml-1"} src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}

export default TextChatContent
