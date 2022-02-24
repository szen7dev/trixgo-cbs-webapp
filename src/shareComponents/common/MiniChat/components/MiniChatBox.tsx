import React, { FC, useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {NewMiniChatBox} from "./NewMiniChatBox";
import {MiniChatContext} from "../index";
import {MiniChatSection} from "./ChatBox";
import {SocketController} from "views/messages/shareComponents/common/SocketController";
import {PopupSendImageAndFile, DeleteAndRevokeMessageConfirm} from "views/messages/pages/MessageHome/sections/ChattingSection";
import {RightClickMenuV2} from "shareComponents/common";
import {MiniListConversation} from "./MiniListConversation";
// import iconSend from "assets/images/icons8-email-send-48.png";

export const MiniChatbox: FC = () => {
    const {isChatboxVisible, conversation} = useSelector((state: RootState) => state.miniChat.data);

    return (
        <div className="t-mini-chat-container fixed bottom-0 flex items-end flex-row-reverse transition-all duration-500 ease-out z-50">
            <MiniListConversation/>
            <NewMiniChatBox/>
            {isChatboxVisible&&conversation&&<MiniChatSection chat={conversation}/>}
            <SocketController context={MiniChatContext} currentChat={conversation?._id||""}/>
            <DeleteAndRevokeMessageConfirm context={MiniChatContext}/>
            <PopupSendImageAndFile/>
            <RightClickMenuV2/>
        </div>
    );
};
