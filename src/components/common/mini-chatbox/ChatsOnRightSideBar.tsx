import React, {FC} from "react";
import MiniChatbox from "./index";
import MiniChatGroup from "./MiniChatGroup";

const ChatsOnRightSideBar:FC = () => {
    return (
        <>
            <MiniChatGroup/>
            <MiniChatbox />
        </>
    )
}
export default ChatsOnRightSideBar;