import React, {FC, useContext} from "react";
import {SocketController} from "../../../shareComponents/common/SocketController";
import {MessageContext} from "../../../shareComponents/layouts/MessagesLayoutV2";
import {
    AddUsersToConversation, ConversationConfig,
    DeleteAndRevokeMessageConfirm, NPSCreate, NpsVoteDetail,
    PollCreate, PopupSendImageAndFile,
    ReminderCreate,
    SendContactMessage,
    ShareMessage, UsersSeenDetail
} from "./ChattingSection";
import {UnreadMessageController} from "./UnreadMessages";
import {FolderDeleteConfirmPopup, FolderFormPopup} from "./MessageList";
import {FolderAddConversationPopup} from "./MessageList/components/ListFolders/FolderAddConversationPopup";
import {NotificationMutePopup} from "./SettingMessageDetail/components/Notification/NotificationMutePopup";

export const SubComponents:FC = () => {
    const {currentChat} = useContext(MessageContext);
    
    return (
        <>
            <SocketController currentChat={currentChat} context={MessageContext}/>
            <ShareMessage currentChat={currentChat} context={MessageContext}/>
            <DeleteAndRevokeMessageConfirm context={MessageContext}/>
            <PollCreate context={MessageContext}/>
            <ReminderCreate context={MessageContext}/>
            <SendContactMessage context={MessageContext}/>
            <NPSCreate context={MessageContext}/>
            <AddUsersToConversation context={MessageContext}/>
            <PopupSendImageAndFile/>
            <UnreadMessageController currentChat={currentChat} context={MessageContext}/>
            <FolderFormPopup/>
            <FolderDeleteConfirmPopup/>
            <FolderAddConversationPopup/>
            <UsersSeenDetail/>
            <NotificationMutePopup/>
            <ConversationConfig/>
            <NpsVoteDetail/>
        </>
    )
}