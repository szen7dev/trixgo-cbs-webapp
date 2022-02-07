import React, {FC, useRef} from "react";
import TextChatContent from "./chatContent/textContent";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";
import RightClickMessage from "./RightClickMessage";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

type Props = {
    message: ItemMessage;
}

const OthersMessage:FC<Props> = ({message}) => {
    const {handleStartPrivateChat} = UseMessageHelper();

    const renderMessageContent = () => {
        switch (message.type) {
            case 0:
                return <TextChatContent message={message} showSenderName={true} className={"bg-white"}/>;
            case 2:
                return <FileChatContent message={message} showSenderName={true} className={"bg-white"}/>;
            case 1:
                return <ImagesContent message={message} showSenderName={true}/>
        }
    }
    return (
        <div className={"flex justify-start items-end mb-2 transition duration-500"}>
            <div
                onClick={() => handleStartPrivateChat(message.sender._id)}
                className={"avt-user w-[34px] h-[34px] rounded-full overflow-hidden mr-[5px] cursor-pointer"}>
                <img src={`${process.env.REACT_APP_URL_S3_USER}/${message.sender.image}`} alt={message.userName}/>
            </div>
            <RightClickMenuWrapper contextMenu={<RightClickMessage message={message}/>}>
                {renderMessageContent()}
            </RightClickMenuWrapper>
        </div>
    )
}

export default OthersMessage;
