import React, {FC, useCallback, useContext} from "react";
import DotsHorizontalGrayIcon from "assets/icons/DotsHorizontalGray";
import RemoveIcon from "assets/images/icons8-remove-100.svg";
import AddAdminIcon from "assets/images/icons8-admin-settings-male-96.svg";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {ItemMemberMessage} from "typings/apis/messages/listConversation";
import moment from "moment";

type Props = {
    user: ItemMemberMessage,
    index: number
}
export const OnlineUserInChatItem:FC<Props> = ({user,index}) => {
    const {handleStartPrivateChat} = UseMessageHelper();
    const onlineStatus = useCallback(() => {
        if (!user.timeLastSeen) {
            return {
                isOnline: false,
                text: "Offline"
            }
        }
        if (moment().toDate().getTime() - user.timeLastSeen <= 24) {
            return {
                isOnline: true,
                text: "Online"
            }
        }
        return {
            isOnline: false,
            text: moment(user.timeLastSeen).fromNow()
        }
    }, [user])
    return (
        <div
            className={"group flex px-[15px] p-[10px] hover:bg-gray-100 cursor-pointer rounded-md items-center online-user-in-message-item smooth-animation"}>
            <img
                onClick={() => handleStartPrivateChat(user._id)}
                className={"w-[56px] h-[56px] rounded-full overflow-hidden"}
                src={`${process.env.REACT_APP_URL_S3_USER}/${user?.member?.image}`} alt={user?.member?.bizfullname}/>
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <span
                    onClick={() => handleStartPrivateChat(user._id)}
                    className={"font-bold"}>
                    {user?.member?.bizfullname}
                </span>
                <span className={"truncate text-xs "+(onlineStatus().isOnline?"text-primary":"text-gray-400")}>{onlineStatus().text}</span>
            </div>
            <div
                className={"action-button cursor-pointer relative w-[30px] h-[30px] bg-white border rounded-full flex items-center justify-center opacity-0 invisible transition duration-500"}>
                <DotsHorizontalGrayIcon/>

                <div className={"action-menu-button absolute z-10 top-30px right-1 rounded-md shadow-lg bg-white min-w-[216px] text-gray-500 opacity-0 invisible transition duration-500"}>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  src={RemoveIcon} alt={"bookmark"}/><div className={"flex-1 text-left ml-4"}>Remove</div>
                    </button>
                    <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img  src={AddAdminIcon} alt={"add folder"}/><div className={"flex-1 text-left ml-4"}>Set as a Mod</div>
                    </button>
                </div>
            </div>
        </div>
    )
}
