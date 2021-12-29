import React, {FC, ReactNode, useEffect, useRef} from "react";
import DoubleTickIcon from "../../../../../../assets/images/icons8-double-tick-96.svg";
type Props = {
    message: any;
    className?: string;
}
const TextChatContent:FC<Props> = ({message,className}) => {
    const textContentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (textContentRef && textContentRef.current) {
            textContentRef.current.innerHTML = message.content;
        }
    },[textContentRef])
    return (
        <div className={"max-w-[466px] rounded-lg p-[7px] pb-[10px] relative " + (className??"")}>
            {
                message.replyTo&&
                <div className={"reply-content border-l-2 border-primary pl-[7px]"}>
                    <div className={"reply-user-name"} style={{color: message.replyTo.themeColor}}>
                        {message.replyTo.userName}
                    </div>
                    <div className={"truncate text-gray-400"}>
                        {message.replyTo.text}
                    </div>
                </div>
            }
            <div className={"pr-[20px] pb-[5px]"}>
                <div className={"message-content"} ref={textContentRef}>
                    <div ref={textContentRef} className={"flex-1 py-[4px]"}>
                    </div>
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-gray-400 text-xs flex items-center"}>
                    {message.date}<img src={DoubleTickIcon} alt={"tick"}/>
                </div>
            </div>
        </div>
    )
}

export default TextChatContent
