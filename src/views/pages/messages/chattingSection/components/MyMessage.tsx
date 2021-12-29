import React, {FC} from "react";
import TextChatContent from "./chatContent/textContent";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
type Props = {
    message: any
}

const MyMessage:FC<Props> = ({message}) => {
    const renderMessageContent = () => {
        switch (message.type) {
            case "text":
                return <TextChatContent message={message} className={"bg-cbs-active-comment"}/>;
            case "file":
                return <FileChatContent message={message} className={"bg-cbs-active-comment"}/>;
            case "images":
                return <ImagesContent message={message}/>
        }
    }
    return (
        <div className={"flex justify-end items-end mb-2"}>
            {renderMessageContent()}
        </div>
    )
}

export default MyMessage;
