import React, {FC, useRef} from "react";
import TextChatContent from "./chatContent/textContent";
import RightClickMenu from "components/common/RightClickMenu";
import RightClickMessage from "./RightClickMessage";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {ItemListConversation} from "typings/apis/messages/listConversation";
type Props = {
    message: ItemMessage;
}

const MyMessage:FC<Props> = ({message}) => {
    const messageRef = useRef<HTMLDivElement>(null);

    const renderMessageContent = () => {
        switch (message.type) {
            case 0:
                return <TextChatContent message={message} className={"bg-cbs-active-comment"}/>;
            // case "file":
            //     return <FileChatContent message={message} className={"bg-cbs-active-comment"}/>;
            // case "images":
            //     return <ImagesContent message={message}/>
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
