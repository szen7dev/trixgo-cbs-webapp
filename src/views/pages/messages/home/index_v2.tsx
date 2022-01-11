import React, {createContext, FC, useMemo, useState} from "react";
import MessageList from "../list";
import { useLocation } from 'react-router-dom';
import ChattingSection from "../chattingSection";
import SettingMessageDetail from "../setting";

export const MessageContext = createContext<{
    currentChat: string;
    setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    currentChat: '',
    setCurrentChat: () => undefined,
    showMenu: false,
    setShowMenu: () => undefined
});

const MessagesHome:FC = () => {
    const location = useLocation();
    const [currentChat, setCurrentChat] = useState(location.hash.replace("#",""));
    const [showMenu, setShowMenu] = useState(false);
    const value = useMemo(
        () => ({ currentChat, setCurrentChat , showMenu, setShowMenu}),
        [currentChat, showMenu]
    );

    return (
        <MessageContext.Provider value={value}>
            <div className={"main-message flex content-avoid-header w-screen overflow-hidden relative " + (showMenu?"show-menu":"")}>
                <MessageList/>
                <ChattingSection/>
                <SettingMessageDetail/>
            </div>
        </MessageContext.Provider>
    )
}

export default MessagesHome;
