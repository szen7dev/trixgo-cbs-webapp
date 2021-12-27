import React, {FC, useRef} from "react";
import IconPinned from "assets/icons/Pinned";
import { NavLink } from "react-router-dom";
import RightClickMenu from "../../../../../components/common/RightClickMenu";
import OptionListItemRightClick from "./OptionListItemRightClick";

type Props = {
    chat: any,
    index: number
}
const ListChatItem:FC<Props> = ({chat,index}) => {
    const wrapperRef = useRef(null);
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
        <NavLink ref={wrapperRef} to={`#${chat._id}`} className={"group flex p-[10px] focus:bg-primary active:bg-primary hover:bg-gray-100 transition duration-300 cursor-pointer rounded-md"}>
            {
                chat.chatAvatar?
                    <img className={"w-[56px] h-[56px] rounded-full overflow-hidden"} src={chat.chatAvatar} alt={chat.chatName}/>:
                    <div className={"w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl"} style={{background: getColor()}}>
                        {getPresentGroupName()}
                    </div>
            }
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <div className={"flex"}>
                    <div className={"flex-1 font-bold group-active:text-white group-focus:text-white"}>
                        {chat.chatName}
                    </div>
                    <div className={"text-xs text-gray-400 group-active:text-white group-focus:text-white"}>
                        {chat.date}
                    </div>
                </div>
                <div className={"flex mt-1"}>
                    <div className={"flex-1 truncate text-gray-400 group-active:text-white group-focus:text-white"}>{chat.text}</div>
                    {chat.unread>0&&<span className={"rounded-full bg-positive text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{chat.unread}</span>}
                    {chat.pinned&&<IconPinned/>}
                </div>
            </div>
            <RightClickMenu wrapperRef={wrapperRef} menu={<OptionListItemRightClick/>}/>
        </NavLink>
    )
}

export default ListChatItem
