import React, {FC} from "react";
import MessageList from "../list";

const MessagesHome:FC = () => {
    return (
        <div className={"flex"}>
            <div className={"messages-left-bar min-h-screen"}>
                <MessageList/>
            </div>
            <div className={"flex-1 overflow-auto"}>

            </div>
        </div>
    )
}

export default MessagesHome;
