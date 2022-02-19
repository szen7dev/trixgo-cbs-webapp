import React, { FC, useState } from "react";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import NewMiniChatBox from "./NewMiniChatBox";
import SocketController from "views/pages/messages/home/socket";
import DeleteAndRevokeMessageConfirm
    from "views/pages/messages/chattingSection/components/DeleteAndRevokeMessage";
import {MiniChatContext} from "./ChatsOnRightSideBar";
import MiniChatSection from "./MiniChatSection";
import PopupSendImageAndFile from "views/pages/messages/chattingSection/components/PopupSendImageAndFile";
// import iconSend from "assets/images/icons8-email-send-48.png";

const MiniChatbox: FC = () => {
    const {isChatboxVisible, conversation} = useSelector((state: RootState) => state.miniChat.data);

    return (
        <div className="t-mini-chat-container fixed bottom-0 flex items-end flex-row-reverse transition-all duration-500 ease-out z-50">
            <NewMiniChatBox/>
            {isChatboxVisible&&conversation&&<MiniChatSection chat={conversation}/>}
            <SocketController context={MiniChatContext} currentChat={conversation?._id||""}/>
            <DeleteAndRevokeMessageConfirm context={MiniChatContext}/>
            <PopupSendImageAndFile/>
        </div>
    );
};

export default MiniChatbox;
