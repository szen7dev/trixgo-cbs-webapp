import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
    isMyMessage?: boolean;
}
export const ContactReply:FC<Props> = ({message, className, isMyMessage}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] " + (className??"")}>
            <div className={"reply-user-name " + (isMyMessage? "text-white font-bold text-opacity-75" : "text-gray-900")} style={{color: message.themeColor}}>
                {message.sender.bizfullname||message.sender.fullname}
            </div>
            <div className={"truncate reply-content-text max-w-[250px] " + (isMyMessage? "text-white text-opacity-75" : "text-gray-400")}>
                [Liên hệ]
            </div>
        </div>
    )
}
