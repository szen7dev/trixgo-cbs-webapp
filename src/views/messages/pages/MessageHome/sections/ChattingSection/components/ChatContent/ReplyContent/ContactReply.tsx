import React, {FC, useEffect, useRef} from "react";

type Props = {
    message: any;
    className?: string;
}
export const ContactReply:FC<Props> = ({message, className}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px] " + (className??"")}>
            <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                {message.sender.bizfullname||message.sender.fullname}
            </div>
            <div className={"truncate text-gray-400 max-w-[250px]"}>
                [Liên hệ]
            </div>
        </div>
    )
}
