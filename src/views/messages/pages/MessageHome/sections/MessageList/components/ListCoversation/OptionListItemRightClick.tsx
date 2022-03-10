import React, {FC, useCallback, useState} from "react";
import AddFolderIcon from "assets/images/icons8-add-folder-96.svg";
import ChatIcon from "assets/images/icons8-chat-96.svg";
import UnPinnedIcon from "assets/images/icons8-unpin-96.svg";
import NotificationIcon from "assets/images/icons8-notification-96.svg";
import HideEyeIcon from "assets/images/icons8-hide-96.svg";
import ExitRedIcon from "assets/images/icons8-exit-48.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {useDispatch, useSelector} from "react-redux";
import {openAddConversationToFolder} from "redux/reducer/messages/AddConversationToFolder";
import {useRightClickMenu} from "services/hooks/useRightClickMenu";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {updateUsersMuteToConversation} from "redux/reducer/messages/ListConversation";
import {dismissNotificationMute, openNotificationMute} from "redux/reducer/messages/NotificationMute";
import {RootState} from "redux/reducer";
import PinIcon from "assets/images/icons8-pin-96.svg";
import {ItemListConversation} from "typings/apis/messages/listConversation";

type Props = {
    chat: ItemListConversation;
    socketRef: any
}
export const OptionListItemRightClick:FC<Props> = ({chat, socketRef}) => {
    const socket = socketRef.current;
    const dispatch = useDispatch();
    const {closeRightClick} = useRightClickMenu();

    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const chatData = useSelector((state: RootState) => state.listConversation.data.listConversation[chat._id]);

    const checkedValue = useCallback(() => {
        return !(chatData.usersMute??[]).includes(profileId)
    }, [chatData.usersMute])

    const {updateMuteConversation, pinConversation} = UseListConversation()

    const handleTurnOffMute = () => {
        const payload = {
            conversationID: chat._id,
            isMute: false,
        }
        updateMuteConversation(payload).then(data => {
            dispatch(updateUsersMuteToConversation({conversationId: data._id, usersMute: data.usersMute}))
            dispatch(dismissNotificationMute())
        })
    }

    return (
        <div className={"bg-white rounded-md shadow-lg text-gray-500 min-w-[216px]"}>
            <button
                onClick={() => {
                    dispatch(openAddConversationToFolder({conversation: chat}))
                    setTimeout(() => {
                        closeRightClick()
                    }, 100)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full add-to-folder"}>
                <img alt={"======"} className={"mr-2 w-[24px] h-[24px]"} src={AddFolderIcon}/>
                <div className={"mr-2 ml-4"}>Thêm vào thư mục...</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full hidden"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={ChatIcon}/>
                <div className={"mr-2 ml-4"}>Mark as unread</div>
            </button>
            <button
                onClick={() => {
                    pinConversation({
                        conversationID: chat._id,
                        isPin: !chat.isPin
                    }).then(data => {
                        closeRightClick();
                        socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', {
                            conversationID: chat._id,
                            select: JSON.stringify({ sender:"bizfullname" }) ,
                            filter: JSON.stringify({
                                author: 0,
                                taskID: 0,
                                links: 0,
                                createAt: 0,
                                __v: 0,
                                config: 0
                            })
                        });
                    })
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full " + (chat.isSaved?"hidden":"")}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={chat.isPin?UnPinnedIcon:PinIcon}/>
                <div className={"mr-2 ml-4"}>{chat.isPin?"Bỏ ghim hội thoại":"Ghim hội thoại"}</div>
            </button>
            <button
                onClick={() => {
                    if (checkedValue()) {
                        dispatch(openNotificationMute({
                            conversation: chat
                        }))
                    } else {
                        handleTurnOffMute();
                    }
                    setTimeout(() => {
                        closeRightClick()
                    }, 100)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={NotificationIcon}/>
                <div className={"mr-2 ml-4"}>{checkedValue()?"Tắt thông báo":"Bật thông báo"}</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={HideEyeIcon}/>
                <div className={"mr-2 ml-4"}>Ẩn cuộc hội thoại</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={ExitRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Rời cuộc hội thoại</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full " + (chat.author !== profileId?"hidden":"")}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Xoá cuộc hội thoại</div>
            </button>
        </div>
    )
}
