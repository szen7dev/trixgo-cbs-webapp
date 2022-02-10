import React, {FC, useCallback, useRef} from "react";
import TextChatContent from "./chatContent/textContent";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";
import RightClickMessage from "./RightClickMessage";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import SelectMessageCheckbox from "./SelectMessageCheckbox";
import {removeSelectedMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";

type Props = {
    message: ItemMessage;
    bgMessage?: string;
}

const OthersMessage:FC<Props> = ({message,bgMessage}) => {
    const {handleStartPrivateChat} = UseMessageHelper();
    const selectedState = useSelector((state: RootState) => state.listMessage.data.selectedState[message.conversation]);
    const listSelectedMessage = useSelector((state: RootState) => state.listMessage.data.listSelectedMessage[message.conversation]);

    const dispatch = useDispatch();

    const renderMessageContent = useCallback(() => {
        switch (message.type) {
            case 0:
                return <TextChatContent message={message} showSenderName={true} className={bgMessage??"bg-white"}/>;
            case 2:
                return <FileChatContent message={message} showSenderName={true} className={bgMessage??"bg-white"}/>;
            case 1:
                return <ImagesContent message={message} showSenderName={true}/>
        }
    },[message]);

    return (
        <div className={"flex justify-start items-end mb-2 transition duration-500"}>
            <div className={"mb-[10px]"}>
                <SelectMessageCheckbox message={message}/>
            </div>
            <div
                onClick={() => handleStartPrivateChat(message.sender._id)}
                className={"avt-user w-[34px] h-[34px] rounded-full overflow-hidden mr-[5px] cursor-pointer"}>
                <img src={`${process.env.REACT_APP_URL_S3_USER}/${message.sender.image}`} alt={message.userName}/>
            </div>
            <div
                onClick={() => {
                    if (selectedState) {
                        if (!Object.keys(listSelectedMessage??{}).includes(message._id)) {
                            dispatch(setSelectedMessages({selectedMessages: [message], conversationId: message.conversation}))
                        } else {
                            dispatch(removeSelectedMessage({conversationId: message.conversation, messageId: message._id}))
                        }
                    }
                }}
                className={"transition duration-500 cursor-pointer"}>
                <RightClickMenuWrapper contextMenu={<RightClickMessage message={message}/>}>
                    {renderMessageContent()}
                </RightClickMenuWrapper>
            </div>
        </div>
    )
}

export default OthersMessage;
