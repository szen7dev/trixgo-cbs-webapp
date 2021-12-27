import React, {createContext, FC, useMemo, useState} from "react";
import MessageList from "../list";
import { useLocation } from 'react-router-dom';
import ChattingSection from "../chattingSection";

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
                <div className={"messages-left-bar max-w-[480px] min-w-[240px] min-h-screen border-r"}>
                    <MessageList/>
                </div>
                <div className={"flex-1 overflow-auto min-h-screen"}>
                    <ChattingSection/>
                </div>
            </div>
        </MessageContext.Provider>
    )
}

export default MessagesHome;
