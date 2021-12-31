import React, {FC} from "react";
import MainChatHeading from "./components/MainChatHeading";
import MainChatContent from "./components/MainChatContent";
import ChattingInput from "./components/chatInput/ChattingInput";
import ArrowDown from "assets/images/icon-arrow-down.svg";

const ChattingSection:FC = () => {
    const chat = {
        _id: 1,
        chatName: "CBS-Backend",
        text: "You: Anh em hình dung rồi đúng không",
        chatAvatar: null,
        pinned: true,
        isDraft: false,
        date: "10:04",
        unread: 4
    };

    return (
        <div className={"flex-1 transition duration-150"}>
            <div className={"relative flex flex-col bg-chat-app h-full"}>
                <MainChatHeading chat={chat}/>
                <MainChatContent/>
                <button className={"animate-bounce w-[48px] h-[48px] rounded-full absolute bottom-100px bg-white flex items-center justify-center right-40px z-10"}>
                    <img src={ArrowDown} alt={"arrow down"}/>
                    <span className={"absolute -top-1 -right-1 w-[24px] h-[24px] bg-positive rounded-full flex items-center justify-center text-white"}>3</span>
                </button>
                <ChattingInput/>
            </div>
        </div>
    )
}

export default ChattingSection;
