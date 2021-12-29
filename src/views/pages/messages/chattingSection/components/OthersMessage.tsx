import React, {FC} from "react";
import TextChatContent from "./chatContent/textContent";
import {map as _map} from "lodash";
import FileChatContent from "./chatContent/fileContent";
type Props = {
    message: any
}

const OthersMessage:FC<Props> = ({message}) => {
    return (
        <div className={"flex justify-start items-end mb-2"}>
            <div className={"avt-user w-[34px] h-[34px] rounded-full overflow-hidden mr-[5px]"}>
                <img src={message.avt} alt={message.userName}/>
            </div>
            <div className={"max-w-[466px] rounded-lg bg-white p-[7px] relative"}>
                <div className={"user-name font-bold"} style={{color: message.themeColor}}>{message.userName}</div>
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
                    {
                        message.text&&
                        <TextChatContent>
                            {message.text}
                        </TextChatContent>
                    }
                    {
                        message.files&&
                        _map(message.files, file => <FileChatContent file={file}/>)
                    }
                </div>
                <div className={"date-message absolute bottom-3px right-4px text-gray-400 text-xs"}>{message.date}</div>
            </div>
        </div>
    )
}

export default OthersMessage;
