import React, {FC, useRef} from "react";
import TextChatContent from "./chatContent/textContent";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
import RightClickMenu from "components/common/RightClickMenu";
import RightClickMessage from "./RightClickMessage";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {ItemListConversation} from "typings/apis/messages/listConversation";
type Props = {
    message: ItemMessage;
}

const OthersMessage:FC<Props> = ({message}) => {
    const messageRef = useRef<HTMLDivElement>(null);
    const renderMessageContent = () => {
        switch (message.type) {
            case 0:
                return <TextChatContent message={message} showSenderName={true} className={"bg-white"}/>;
            // case 1:
            //     return <FileChatContent message={message} showSenderName={true} className={"bg-white"}/>;
            // case 2:
            //     return <ImagesContent message={message} showSenderName={true}/>
        }
    }
    return (
        <div ref={messageRef} className={"flex justify-start items-end mb-2 transition duration-500"}>
            <div className={"avt-user w-[34px] h-[34px] rounded-full overflow-hidden mr-[5px]"}>
                <img src={`${process.env.REACT_APP_URL_S3_USER}/${message.sender.image}`} alt={message.userName}/>
            </div>
            {renderMessageContent()}
            <RightClickMenu wrapperRef={messageRef} menu={<RightClickMessage/>}/>
        </div>
    )
}

export default OthersMessage;
