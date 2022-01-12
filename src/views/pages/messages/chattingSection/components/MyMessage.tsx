import React, {FC, useRef} from "react";
import TextChatContent from "./chatContent/textContent";
import RightClickMenu from "components/common/RightClickMenu";
import RightClickMessage from "./RightClickMessage";
import {ItemMessage} from "typings/apis/messages/listMessage";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
type Props = {
    message: ItemMessage;
}

const MyMessage:FC<Props> = ({message}) => {
    const messageRef = useRef<HTMLDivElement>(null);

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
        <div ref={messageRef} className={"flex justify-end items-end mb-2 transition duration-500"}>
            {renderMessageContent()}
            <RightClickMenu wrapperRef={messageRef} menu={<RightClickMessage/>}/>
        </div>
    )
}

export default MyMessage;
