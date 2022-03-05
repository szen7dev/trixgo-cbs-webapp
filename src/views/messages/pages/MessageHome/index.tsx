import React, {createContext, FC, useMemo, useEffect, useState} from "react";
import {FolderDeleteConfirmPopup, FolderFormPopup, MessageList} from "./sections/MessageList";
import { useLocation } from 'react-router-dom';
import {SettingMessageDetail} from "./sections/SettingMessageDetail";
import { useSocket } from "services/hooks/useSocket";
import '@draft-js-plugins/emoji/lib/plugin.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
    ShareMessage,
    DeleteAndRevokeMessageConfirm,
    PollCreate,
    ChattingSection,
    ReminderCreate,
    SendContactMessage,
    NPSCreate,
    AddUsersToConversation,
    PopupSendImageAndFile,
    UsersSeenDetail
} from "./sections/ChattingSection";
import Editor from "@draft-js-plugins/editor";
import {SearchMessage} from "./sections/SearchMessage";
import {useDispatch} from "react-redux";
import {dismissSearchMode} from "redux/reducer/messages/SearchMessage";
import {SocketController} from "views/messages/shareComponents/common/SocketController";
import {UnreadMessageController} from "./sections/UnreadMessages";
import {FolderAddConversationPopup} from "./sections/MessageList/components/ListFolders/FolderAddConversationPopup";

export const MessageContext = createContext<{
    currentChat: string;
    setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    socketRef: any;
    editorRef: any;
    setEditorRef: React.Dispatch<React.SetStateAction<any>>;
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    currentChat: '',
    setCurrentChat: () => undefined,
    showMenu: false,
    setShowMenu: () => undefined,
    socketRef: null,
    editorRef: null,
    setEditorRef: () => undefined,
    showSearch: false,
    setShowSearch: () => undefined
});

export const MessagesHome:FC = () => {
    const location = useLocation();
    const [currentChat, setCurrentChat] = useState(location.hash.replace("#",""));
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [editorRef, setEditorRef] = useState<Editor>();
    const socketRef = useSocket();
    const dispatch = useDispatch();

    const value = useMemo(
        () => ({ currentChat, setCurrentChat , showMenu, setShowMenu, socketRef, editorRef, setEditorRef, showSearch, setShowSearch}),
        [currentChat, showMenu, socketRef, editorRef, showSearch]
    );

    useEffect(() => {
        currentChat&&setShowMenu(true)
        currentChat&&setShowSearch(false)
        currentChat&&dispatch(dismissSearchMode({conversationId: currentChat}));
    }, [currentChat])

    return (
        <MessageContext.Provider value={value}>
            <div className={"main-message flex content-avoid-header w-screen overflow-hidden relative " + (showMenu?" show-menu":"") + (showSearch?" show-SearchMessage":"")}>
                <MessageList/>
                <ChattingSection/>
                <SettingMessageDetail/>
                <SearchMessage/>
            </div>
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
        </MessageContext.Provider>
    )
}
