import React, {FC, useContext} from "react";
import AddUserToGroup from "assets/images/icons8-add-user-group-man-man-96.svg";
import {SettingMessageDetailTab} from "./components";
import {MessageContext} from "../../index";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "redux/reducer";
import {openAddUserToConversation} from "redux/reducer/messages/AddUserToConversation";
import {NotificationController} from "./components/Notification/NotificationController";
import {BasicInformationConversation} from "./components/BasicInformation";

export const SettingMessageDetail:FC = () => {
    const {currentChat, showMenu} = useContext(MessageContext);
    const dispatch = useDispatch()
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    if (!chat) return null
    return (
        <div className={"messages-right-bar border-l transition-all duration-500 group w-[402px] min-w-[402px] absolute h-full bg-white  z-10 " + (showMenu?"right-0":"right--402px")}>
            <div className={"h-full group overflow-auto no-webkit-scrollbar"}>
                <BasicInformationConversation chat={chat}/>
                <NotificationController chat={chat}/>
                <div className={"h-3 w-full bg-gray-100"}></div>
                <SettingMessageDetailTab chat={chat}/>
            </div>
            {!chat.isPrivate&&(chat.authors.includes(profileId)||chat.author === profileId)&&
                <button
                    onClick={() => dispatch(openAddUserToConversation({conversationId: currentChat}))}
                    className={"w-[56px] h-[56px] group-hover:opacity-100 opacity-0 rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center "}>
                    <img src={AddUserToGroup} alt={"Pencil icon"}/>
                </button>
            }
        </div>
    )
}
