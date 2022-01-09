import React, {FC} from "react";
import SampleImage from "assets/images/icons8-image-256.svg";
import Close from "assets/icons/Close";
import MainChatOptions from "./MainChatOptions";
import SearchIcon from "assets/images/icons8-search-120.png";
import DotsVerticalIcon from "assets/icons/DotsVertical";

type Props = {
    chat: any
}

const MainChatHeading:FC<Props> = ({chat}) => {
    const backGround = [
        "#84BBE4",
        "#8DD4D6",
        "#FCC4A2",
        "#A6DA95",
        "#0060E1",
        "#4781CF",
        "#F089B7",
    ]
    const getColor = () => {
        return backGround[Math.floor(Math.random() * 7)%7]
    }
    const getPresentGroupName = () => {
        return chat.chatName.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }
    return (
        <div className={"sticky top-0 bg-white h-[56px] flex px-4 py-1 z-50"}>
            <div className={"avatar-chat"}>
                {
                    chat.chatAvatar?
                        <img className={"w-[40px] h-[40px] rounded-full overflow-hidden"} src={chat.chatAvatar??""} alt={chat.chatName}/>:
                        <div className={"w-[40px] h-[40px] rounded-full flex items-center justify-center text-white font-bold text-xl"} style={{background: "#8DD4D6"}}>
                            {getPresentGroupName()}
                        </div>
                }
            </div>
            <div className={"chat-basic-infor flex flex-col justify-center ml-[10px] flex-1"}>
                <div className={""}>CBS | WEB CLIENT</div>
                <div className={"text-xs text-gray-300"}>6 members</div>
            </div>
            <div className={"items-center flex"}>
                <div className={"indicator-pinned flex flex-col h-full"}>
                    <div className={"bg-primary w-[2px] flex-1 mb-[2px]"}></div>
                    <div className={"bg-primary w-[2px] flex-1 mb-[2px]"}></div>
                    <div className={"bg-primary w-[2px] flex-1 mb-[2px]"}></div>
                </div>
                <div className={"flex-1 flex ml-[5px]"}>
                    <img src={SampleImage} alt={"sample"} className={"w-[36px] h-[36px]"}/>
                    <div className={"flex-1 max-w-[185px] ml-[5px]"}>
                        <div className={"text-primary"}>Pinned Message</div>
                        <div className={"truncate"}>Báo cáo ảnh tuần 12 của CPM olala ABC</div>
                    </div>
                    <button className={"flex items-center justify-center ml-[20px]"}>
                        <Close/>
                    </button>
                </div>
            </div>
            <div className={"action-section flex items-center justify-end ml-[20px]"}>
                <MainChatOptions/>
                <button className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                    <img src={SearchIcon} alt={"search icon"}/>
                </button>
                <button className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                    <DotsVerticalIcon/>
                </button>
            </div>
        </div>
    )
}

export default MainChatHeading;
