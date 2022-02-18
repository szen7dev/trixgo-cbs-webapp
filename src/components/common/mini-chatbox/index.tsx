import { FC, useState } from "react";
import cn from "classnames";

import iconClose from "assets/images/icons8-close-30.png";
import iconChevronDown from "assets/images/icon-chevron-down.png";
import thumbnail from "assets/images/thumbnail2.png";
import {useSelector} from "react-redux";
import {RootState} from "../../../redux/reducer";
import NewMiniChatBox from "./NewMiniChatBox";
import MiniChatBoxDetail from "./MiniChatBoxDetail";
// import iconSend from "assets/images/icons8-email-send-48.png";

const MiniChatbox: FC = () => {
    const {isChatboxVisible, conversation} = useSelector((state: RootState) => state.miniChat.data);

    return (
        <div className="t-mini-chat-container fixed bottom-0 flex items-end flex-row-reverse transition-all duration-500 ease-out z-50">
            <NewMiniChatBox/>
            {isChatboxVisible&&conversation&&<MiniChatBoxDetail chat={conversation}/>}
        </div>
    );
};

export default MiniChatbox;
