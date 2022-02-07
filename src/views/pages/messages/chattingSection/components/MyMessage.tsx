import React, {FC, useRef} from "react";
import TextChatContent from "./chatContent/textContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";
import RightClickMessage from "./RightClickMessage";
type Props = {
    message: ItemMessage;
}

const MyMessage:FC<Props> = ({message}) => {
    const renderMessageContent = () => {
        switch (message.type) {
            case 0:
                return <TextChatContent message={message} className={"bg-cbs-active-comment"}/>;
            case 2:
                return <FileChatContent message={message} className={"bg-cbs-active-comment"}/>;
            case 1:
                return <ImagesContent message={message}/>
        }
    }
    return (
        <RightClickMenuWrapper contextMenu={<RightClickMessage message={message}/>} className={"flex justify-end items-end mb-2 transition duration-500"}>
            {renderMessageContent()}
        </RightClickMenuWrapper>
    )
}

export default MyMessage;
