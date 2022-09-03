import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
    isMyMessage?: boolean
}
export const DeleteReply:FC<Props> = ({message, className, isMyMessage}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] " + (className??"")}>
            <div className={"reply-user-name " + (isMyMessage? "text-white font-bold text-opacity-75" : "text-gray-900")} style={{color: message.themeColor}}>
                {message.sender.bizfullname||message.sender.fullname}
            </div>
            <div className={"flex-1 py-[4px] break-words " + (isMyMessage? "text-white" : "text-gray-400 text-opacity-75")}>
                Tin nhắn đã xóa
            </div>
        </div>
    )
}
