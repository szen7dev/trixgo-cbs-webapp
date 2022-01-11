import React, {FC, useContext} from "react";
import MainChatHeading from "./components/MainChatHeading";
import MainChatContent from "./components/MainChatContent";
import ChattingInput from "./components/chatInput/ChattingInput";
import ArrowDown from "assets/images/icon-arrow-down.svg";
import {MessageContext} from "../home/index_v2";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/reducer";

const ChattingSection:FC = () => {
    const {currentChat} = useContext(MessageContext);
    const mapData = useSelector((state: RootState) => state.listConversation);
    const {listConversation} = mapData.data;
    const chat = listConversation[currentChat];

    return (
        <div className={"flex-1 transition duration-150"}>
            <div className={"relative flex flex-col bg-chat-app h-full"}>
                {
                    currentChat&&chat&&
                    <>
                        <MainChatHeading chat={chat}/>
                        <MainChatContent/>
                        <button
                            className={"animate-bounce w-[48px] h-[48px] rounded-full absolute bottom-100px bg-white flex items-center justify-center right-40px z-10"}>
                            <img src={ArrowDown} alt={"arrow down"}/>
                            <span
                                className={"absolute -top-1 -right-1 w-[24px] h-[24px] bg-positive rounded-full flex items-center justify-center text-white"}>3</span>
                        </button>
                        <ChattingInput/>
                    </>
                }
            </div>
        </div>
    )
}

export default ChattingSection;
