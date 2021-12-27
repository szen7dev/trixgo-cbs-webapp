import React, {FC} from "react";
import NotificationCenter from "./NotificationCenter";

const MainChatContent:FC = () => {
    return (
        <div className={"full-height-app bg-chat-app items-center flex flex-col"}>
            <div className={"max-w-[645px] pt-[20px]"}>
                <NotificationCenter content={"Thursday"}/>
                <NotificationCenter content={'Hiepnh created the group "TRX.PGI-Quản trị nội bộ"'}/>
            </div>
        </div>
    )
}

export default MainChatContent;
