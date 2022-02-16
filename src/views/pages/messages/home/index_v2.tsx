import React, {createContext, FC, useMemo, useEffect, useState} from "react";
import MessageList from "../list";
import { useLocation } from 'react-router-dom';
import ChattingSection from "../chattingSection";
import SettingMessageDetail from "../setting";
import { useSocket } from "services/hooks/useSocket";
import '@draft-js-plugins/emoji/lib/plugin.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import SocketController from "./socket";
import ShareMessage from "../chattingSection/components/ShareMessage";
import DeleteAndRevokeMessageConfirm from "../chattingSection/components/DeleteAndRevokeMessage";
import PollCreate from "../chattingSection/components/poll/PollCreate";
import ReminderCreate from "../chattingSection/components/reminder/ReminderCreate";
import SendContactMessage from "../chattingSection/components/SendContactMessage";
import Editor from "@draft-js-plugins/editor";
import NPSCreate from "../chattingSection/components/nps/NPSCreate";
import SearchMessage from "../search";

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

const MessagesHome:FC = () => {
    const location = useLocation();
    const [currentChat, setCurrentChat] = useState(location.hash.replace("#",""));
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [editorRef, setEditorRef] = useState<Editor>();
    const socketRef = useSocket();

    const value = useMemo(
        () => ({ currentChat, setCurrentChat , showMenu, setShowMenu, socketRef, editorRef, setEditorRef, showSearch, setShowSearch}),
        [currentChat, showMenu, socketRef, editorRef, showSearch]
    );

    useEffect(() => {
        currentChat&&setShowMenu(true)
    }, [currentChat])

    return (
        <MessageContext.Provider value={value}>
            <div className={"main-message flex content-avoid-header w-screen overflow-hidden relative " + (showMenu?"show-menu":"") + (showSearch?"show-search":"")}>
                <MessageList/>
                <ChattingSection/>
                <SettingMessageDetail/>
                <SearchMessage/>
            </div>
            <SocketController/>
            <ShareMessage/>
            <DeleteAndRevokeMessageConfirm/>
            <PollCreate/>
            <ReminderCreate/>
            <SendContactMessage/>
            <NPSCreate/>
        </MessageContext.Provider>
    )
}

export default MessagesHome;
