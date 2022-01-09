import React, {FC} from "react";
import DotsHorizontalGrayIcon from "assets/icons/DotsHorizontalGray";
import RemoveIcon from "assets/images/icons8-remove-100.svg";
import AddAdminIcon from "assets/images/icons8-admin-settings-male-96.svg";

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
            className={"group flex px-[15px] p-[10px] hover:bg-gray-100 cursor-pointer rounded-md items-center online-user-in-message-item"}>
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
            <div
                className={"action-button cursor-pointer relative w-[30px] h-[30px] bg-white border rounded-full flex items-center justify-center opacity-0 invisible transition duration-500"}>
                <DotsHorizontalGrayIcon/>

                <div className={"action-menu-button absolute z-10 top-30px right-1 rounded-md shadow-lg bg-white min-w-[216px] text-gray-500 opacity-0 invisible transition duration-500"}>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img src={RemoveIcon} alt={"bookmark"}/><div className={"flex-1 text-left ml-4"}>Remove</div>
                    </button>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img src={AddAdminIcon} alt={"add folder"}/><div className={"flex-1 text-left ml-4"}>Set as a Mod</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OnlineUserInChatItem
