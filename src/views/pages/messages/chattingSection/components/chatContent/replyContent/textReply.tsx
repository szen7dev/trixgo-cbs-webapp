import React, {FC} from "react";

type Props = {
    message: any
}
const TextReply:FC<Props> = ({message}) => {
    return (
        <div className={"reply-content border-l-2 border-primary pl-[7px]"}>
            <div className={"reply-user-name text-blue-900"} style={{color: message.themeColor}}>
                {message.sender.fullname}
            </div>
            <div className={"truncate text-gray-400"}>
                {message.content}
            </div>
        </div>
    )
}

export default TextReply;
