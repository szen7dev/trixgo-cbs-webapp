import React, {FC, useCallback, useContext, useRef, useState} from "react";
import DotsHorizontalGrayIcon from "assets/icons/DotsHorizontalGray";
import RemoveIcon from "assets/images/icons8-remove-100.svg";
import AddAdminIcon from "assets/images/icons8-admin-settings-male-96.svg";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {ItemListConversation, ItemMemberMessage} from "typings/apis/messages/listConversation";
import moment from "moment";
import {useOnClickOutside} from "../../../../../../../../services/hooks/useOnclickOutside";

type Props = {
    user: ItemMemberMessage,
    index: number,
    chat: ItemListConversation
}
export const OnlineUserInChatItem:FC<Props> = ({user,index, chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const {handleStartPrivateChat, isAuthor} = UseMessageHelper();
    const [showOption, setShowOption] = useState(false);
    const wrapper = useRef<HTMLDivElement>(null);
    useOnClickOutside(wrapper, () => setShowOption(false));

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
        <div className={"relative"} ref={wrapper}>
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
                {
                    isAuthor(chat, profileId)&&
                    <div
                        onClick={() => setShowOption(!showOption)}
                        className={"cursor-pointer w-[30px] h-[30px] bg-white border rounded-full flex items-center justify-center "}>
                        <DotsHorizontalGrayIcon/>
                    </div>
                }
            </div>
            {
                showOption&&isAuthor(chat, profileId)&&
                <div
                className={"absolute z-10 top-40px right-30px max-w-fit"}>
                    <div
                        className={"action-menu-button rounded-md shadow-lg bg-white min-w-[216px] text-gray-500 transition duration-500"}>
                        <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                            <img src={RemoveIcon} alt={"bookmark"}/>
                            <div className={"flex-1 text-left ml-4"}>Remove</div>
                        </button>
                        <button className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                            <img src={AddAdminIcon} alt={"add folder"}/>
                            <div className={"flex-1 text-left ml-4"}>Set as a Mod</div>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
