import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
}
export const DeleteReply:FC<Props> = ({message, className}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] " + (className??"")}>
            <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                {message.sender.bizfullname||message.sender.fullname}
            </div>
            <div className={"flex-1 py-[4px] break-words text-gray-400"}>
                Tin nhắn đã xóa
            </div>
        </div>
    )
}
