import React, {FC, useContext} from "react";
import {MainChatHeading} from "./components/HeaderConversation";
import {MainChatContent} from "./components/MainChatContent";
import {ChattingInput} from "./components/ChatInput";
import {MessageContext} from "../../index";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {MainSearchChatContent} from "../SearchMessage";

export const ChattingSection:FC = () => {
    const {currentChat, showMenu, isDragOver} = useContext(MessageContext);
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);
    const inSearchMode = useSelector((state: RootState) => state.searchMessage.data.inSearchMode[currentChat]);
    return (
        <div id={"chatting-section"} className={"flex-1 transition-all duration-500 " + (showMenu?"mr-[402px]":"mr-0")}>
            <div className={"relative flex flex-col bg-chat-app h-full"}>
                {
                    currentChat&&chat&&
                    <>
                        <MainChatHeading chat={chat}/>
                        {
                            inSearchMode?
                            <MainSearchChatContent chat={chat}/>:
                            <MainChatContent chat={chat}/>
                        }
                        <ChattingInput chat={chat} context={MessageContext}/>
                    </>
                }
                <div id={"drop-mask"} className={"absolute top-0 w-full h-full flex items-center justify-center bg-white border-primary border border-dashed z-50 border-2 rounded-md bg-opacity-50 backdrop-blur-md " + (!isDragOver ? 'hidden':'block')}>
                    <div className={"text-center flex items-center justify-center text-lg text-primary"}>
                        Thả file vào đây để gửi...
                    </div>
                </div>
            </div>
        </div>
    )
}
