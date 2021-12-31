import React, {createContext, FC, useMemo, useState} from "react";
import MessageList from "../list";
import { useLocation } from 'react-router-dom';
import ChattingSection from "../chattingSection";
import SettingMessageDetail from "../setting";

export const MessageContext = createContext<{
    currentChat: string;
    setCurrentChat: React.Dispatch<React.SetStateAction<string>>;
}>({
    currentChat: '',
    setCurrentChat: () => undefined,
});

const MessagesHome:FC = () => {
    const location = useLocation();
    const [currentChat, setCurrentChat] = useState(location.hash.replace("#",""));
    const value = useMemo(
        () => ({ currentChat, setCurrentChat }),
        [currentChat]
    );

    return (
        <MessageContext.Provider value={value}>
            <div className={"flex h-screen w-screen overflow-hidden"}>
                <MessageList/>
                <ChattingSection/>
                <SettingMessageDetail/>
            </div>
        </MessageContext.Provider>
    )
}

export default MessagesHome;
