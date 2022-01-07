import React, {FC, useRef} from "react";
import IconPinned from "assets/icons/Pinned";
import { NavLink } from "react-router-dom";

type Props = {
    user: any,
    index: number
}
const OnlineUserInChatItem:FC<Props> = ({user,index}) => {
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
        return user.userName.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    const getColor = () => {
        return backGround[index%7]
    }

    return (
        <div
            className={"group flex px-[15px] p-[10px] hover:bg-gray-100 cursor-pointer rounded-md"}>
            {
                user.userAvatar?
                    <img className={"w-[56px] h-[56px] rounded-full overflow-hidden"} src={user.userAvatar} alt={user.userName}/>:
                    <div className={"w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl"} style={{background: "#8DD4D6"}}>
                        {getPresentGroupName()}
                    </div>
            }
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <span className={"font-bold"}>
                    {user.userName}
                </span>
                <span className={"truncate "+(user.status==="online"?"text-primary":"text-gray-400")}>{user.status}</span>
            </div>
        </div>
    )
}

export default OnlineUserInChatItem
