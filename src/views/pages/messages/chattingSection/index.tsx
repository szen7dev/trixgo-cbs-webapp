import React, {FC} from "react";
import MainChatHeading from "./components/MainChatHeading";
import MainChatContent from "./components/MainChatContent";
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
        <div className={"min-h-full"}>
            <MainChatHeading chat={chat}/>
            <MainChatContent/>
        </div>
    )
}

export default ChattingSection;
