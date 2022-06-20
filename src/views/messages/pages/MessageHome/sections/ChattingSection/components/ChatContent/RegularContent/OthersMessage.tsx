import React, {FC, useCallback, useContext, useRef} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {RightClickMenuWrapper} from "shareComponents/common";
import {RightClickMessage, SelectMessageCheckbox} from "../../MainChatContent";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {removeSelectedMessage, setSelectedMessages} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {DeleteChatContent, ContactContent, TextChatContent, FileChatContent, ImagesContent} from "./index";
import {NpsContent} from "../../Nps";

type Props = {
    message: ItemMessage;
    bgMessage?: string;
    context: any;
    isMini?: boolean
}

export const OthersMessage:FC<Props> = ({message,bgMessage, context, isMini}) => {
    const {handleStartPrivateChat} = UseMessageHelper();
    const selectedState = useSelector((state: RootState) => state.listMessage.data.selectedState[message.conversation]);
    const listSelectedMessage = useSelector((state: RootState) => state.listMessage.data.listSelectedMessage[message.conversation]);
    const {socketRef, editorRef} = useContext(context);
    const socket = socketRef.current;
    const editor = editorRef?.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();

    const isDeleted = useCallback(() => {
        if (message.usersDelete&&message.usersDelete.includes(profileId)) {
            return true
        }
        return (message.files??[]).some(file => file.usersDelete && file.usersDelete.includes(profileId));
    }, [message])
    const renderMessageContent = useCallback(() => {
        if (isDeleted()) {
            return <DeleteChatContent isMini={isMini} message={message} showSenderName={true} className={bgMessage??"bg-white"}/>
        }
        switch (message.type) {
            case 0:
                return <TextChatContent isMini={isMini} context={context} message={message} showSenderName={true} className={bgMessage??"bg-white"}/>;
            case 2:
                return <FileChatContent isMini={isMini} context={context} message={message} showSenderName={true} className={bgMessage??"bg-white"}/>;
            case 1:
                return <ImagesContent isMini={isMini} context={context} message={message} showSenderName={true}/>;
            case 7:
                return <ContactContent isMini={isMini} context={context} message={message} className={bgMessage??"bg-white"}/>;
            case 8:
                return <NpsContent isMini={isMini} context={context} message={message} className={bgMessage??"bg-white"}/>;
        }
    },[message]);

    return (
        <div className={"flex justify-start items-end mb-2 transition duration-500"}>
            <div className={"mb-[10px] mr-[10px]"}>
                <SelectMessageCheckbox message={message}/>
            </div>
            <div
                onClick={() => handleStartPrivateChat(message.sender._id, isMini)}
                className={"avt-user w-[34px] h-[34px] rounded-full overflow-hidden mr-[5px] cursor-pointer"}>
                <img className={"w-full h-full object-cover"} src={`${process.env.REACT_APP_URL_S3_USER}/${message.sender.image}`} alt={message.userName}/>
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
                className={"transition relative duration-500 message-container " + (selectedState ? "cursor-pointer":"")}>
                <RightClickMenuWrapper disabled={message.isFake} contextMenu={<RightClickMessage isMini={isMini} message={message} socket={socket} editor={editor}/>}>
                    {renderMessageContent()}
                </RightClickMenuWrapper>
            </div>
        </div>
    )
}
