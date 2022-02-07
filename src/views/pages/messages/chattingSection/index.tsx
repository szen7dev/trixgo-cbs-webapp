import React, {FC, useContext} from "react";
import MainChatHeading from "./components/MainChatHeading";
import MainChatContent from "./components/MainChatContent";
import ChattingInput from "./components/chatInput/ChattingInput";
import {MessageContext} from "../home/index_v2";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import ShareMessage from "./components/ShareMessage";

const ChattingSection:FC = () => {
    const {currentChat, showMenu} = useContext(MessageContext);
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);

    return (
        <div id={"chatting-section"} className={"flex-1 transition-all duration-500 " + (showMenu?"mr-[480px]":"mr-0")}>
            <div className={"relative flex flex-col bg-chat-app h-full"}>
                {
                    currentChat&&chat&&
                    <>
                        <MainChatHeading chat={chat}/>
                        <MainChatContent chat={chat}/>
                        <ChattingInput chat={chat}/>
                        <ShareMessage/>
                    </>
                }
            </div>
        </div>
    )
}

export default ChattingSection;
