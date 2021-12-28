import React, {FC} from "react";
import TextChatContent from "./chatContent/textContent";
import {map as _map} from "lodash";
import FileChatContent from "./chatContent/fileContent";
type Props = {
    message: any
}

const MyMessage:FC<Props> = ({message}) => {
    return (
        <div className={"flex justify-end items-end mb-2"}>
            <div className={"max-w-[466px] rounded-lg bg-cbs-active-comment p-[7px] relative"}>
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

export default MyMessage;
