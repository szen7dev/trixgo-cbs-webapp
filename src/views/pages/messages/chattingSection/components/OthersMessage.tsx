import React, {FC} from "react";
import TextChatContent from "./chatContent/textContent";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
type Props = {
    message: any
}

const OthersMessage:FC<Props> = ({message}) => {
    const renderMessageContent = () => {
        switch (message.type) {
            case "text":
                return <TextChatContent message={message} className={"bg-white"}/>;
            case "file":
                return <FileChatContent message={message} className={"bg-white"}/>;
            case "images":
                return <ImagesContent message={message}/>
        }
    }
    return (
        <div className={"flex justify-start items-end mb-2"}>
            <div className={"avt-user w-[34px] h-[34px] rounded-full overflow-hidden mr-[5px]"}>
                <img src={message.avt} alt={message.userName}/>
            </div>
            {renderMessageContent()}
        </div>
    )
}

export default OthersMessage;
