import React, {FC, useRef} from "react";
import IconPinned from "assets/icons/Pinned";
import { NavLink } from "react-router-dom";

type Props = {
    chat: any,
    index: number
}
const OnlineUserInChatItem:FC<Props> = ({chat,index}) => {
    const backGround = [
        "#84BBE4",
        "#8DD4D6",
        "#FCC4A2",
        "#A6DA95",
        "#0060E1",
        "#4781CF",
        "#F089B7",
    ]
    const getPresentGroupName = () => {
        return chat.chatName.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    const getColor = () => {
        return backGround[index%7]
    }

    return (
        <div
            className={"group flex p-[10px] hover:bg-gray-100 cursor-pointer rounded-md"}>
            {
                chat.chatAvatar?
                    <img className={"w-[56px] h-[56px] rounded-full overflow-hidden"} src={chat.chatAvatar} alt={chat.chatName}/>:
                    <div className={"w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl"} style={{background: getColor()}}>
                        {getPresentGroupName()}
                    </div>
            }
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <div className={"flex-1 font-bold"}>
                    {chat.chatName}
                </div>
                <div className={"flex mt-1"}>
                    <div className={"flex-1 truncate text-gray-400"}>{chat.text}</div>
                </div>
            </div>
        </div>
    )
}

export default OnlineUserInChatItem
