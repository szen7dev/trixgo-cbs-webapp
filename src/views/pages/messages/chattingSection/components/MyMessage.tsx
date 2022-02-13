import React, {FC, useCallback, useContext} from "react";
import TextChatContent from "./chatContent/textContent";
import {ItemMessage} from "typings/apis/messages/listMessage";
import FileChatContent from "./chatContent/fileContent";
import ImagesContent from "./chatContent/imageContent";
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";
import RightClickMessage from "./RightClickMessage";
import SelectMessageCheckbox from "./SelectMessageCheckbox";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {removeSelectedMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {MessageContext} from "../../home/index_v2";
import DeleteChatContent from "./chatContent/deleteContent";
import ReactionActions from "./ReactionActions";

type Props = {
    message: ItemMessage;
}

const MyMessage:FC<Props> = ({message}) => {
    const selectedState = useSelector((state: RootState) => state.listMessage.data.selectedState[message.conversation]);
    const listSelectedMessage = useSelector((state: RootState) => state.listMessage.data.listSelectedMessage[message.conversation]);
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const dispatch = useDispatch();

    const renderMessageContent = useCallback(() => {
        if (message.usersDelete&&message.usersDelete.includes(profileId)) {
            return <DeleteChatContent message={message} className={"bg-cbs-active-comment"} isMyMessage={true}/>
        }
        switch (message.type) {
            case 0:
                return <TextChatContent message={message} className={"bg-cbs-active-comment"} isMyMessage={true}/>;
            case 2:
                return <FileChatContent message={message} className={"bg-cbs-active-comment"} isMyMessage={true}/>;
            case 1:
                return <ImagesContent message={message} isMyMessage={true}/>
        }
    }, [message]);

    return (
        <div className={"flex items-center"}>
            <SelectMessageCheckbox message={message}/>
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
                className={"flex justify-end items-end flex-1 transition duration-500 cursor-pointer relative message-container my-message"}>
                <RightClickMenuWrapper contextMenu={<RightClickMessage message={message} socket={socket}/>} className={"mb-2 transition duration-500"}>
                    {renderMessageContent()}
                </RightClickMenuWrapper>
                <ReactionActions message={message}/>
            </div>
        </div>
    )
}

export default MyMessage;
