import React, {FC, useCallback, useContext} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {RightClickMenuWrapper} from "shareComponents/common";
import {RightClickMessage, SelectMessageCheckbox} from "../../MainChatContent";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {removeSelectedMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {DeleteChatContent, ContactContent, FileChatContent, TextChatContent, ImagesContent} from "./index";
import {NpsContent} from "../../Nps";

type Props = {
    message: ItemMessage;
    context: any;
    isMini?: boolean;
}

export const MyMessage:FC<Props> = ({message, context, isMini}) => {
    const selectedState = useSelector((state: RootState) => state.listMessage.data.selectedState[message.conversation]);
    const listSelectedMessage = useSelector((state: RootState) => state.listMessage.data.listSelectedMessage[message.conversation]);
    const {socketRef, editorRef} = useContext(context);
    const socket = socketRef.current;
    const editor = editorRef?.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const dispatch = useDispatch();

    const renderMessageContent = useCallback(() => {
        if (message.usersDelete&&message.usersDelete.includes(profileId)) {
            return <DeleteChatContent message={message} className={"bg-cbs-active-comment"} isMyMessage={true}/>
        }
        switch (message.type) {
            case 0:
                return <TextChatContent isMini={isMini} context={context} message={message} className={"bg-cbs-active-comment"} isMyMessage={true}/>;
            case 2:
                return <FileChatContent isMini={isMini} context={context} message={message} className={"bg-cbs-active-comment"} isMyMessage={true}/>;
            case 1:
                return <ImagesContent isMini={isMini} context={context} message={message} isMyMessage={true}/>;
            case 7:
                return <ContactContent isMini={isMini} context={context} message={message} className={"bg-cbs-active-comment"} borderClass={"border-gray-300"}/>;
            case 999999:
                return <NpsContent isMini={isMini} message={message} className={"bg-cbs-active-comment"} borderClass={"border-gray-300"} isMyMessage={true}/>;
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
                className={"flex justify-end items-end flex-1 transition duration-500 cursor-pointer relative"}>
                <RightClickMenuWrapper disabled={message.isFake} contextMenu={<RightClickMessage isMini={isMini} message={message} socket={socket} editor={editor}/>} className={"mb-2 transition duration-500"}>
                    <div className={"message-container my-message"}>
                        {renderMessageContent()}
                    </div>
                </RightClickMenuWrapper>
            </div>
        </div>
    )
}
