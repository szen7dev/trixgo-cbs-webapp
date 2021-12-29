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
            <div className={"flex"}>
                <div className={"messages-left-bar w-[480px] min-h-screen border-r transition duration-500"}>
                    <MessageList/>
                </div>
                <div className={"flex-1 min-h-screen transition duration-500"}>
                    <ChattingSection/>
                </div>
                <div className={"messages-right-bar w-[480px] min-h-screen border-r transition duration-500"}>
                    <SettingMessageDetail/>
                </div>
            </div>
        </MessageContext.Provider>
    )
}

export default MessagesHome;
