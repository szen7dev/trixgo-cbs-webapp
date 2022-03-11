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
import {
    updateUsersMuteToConversation,
    updateUsersHideToConversation,
    updateUsersPinToConversation,
    updateUsersMissMessageToConversation,
    deleteConversationAction
} from "redux/reducer/messages/ListConversation";
import {deleteAllMessagesInConversation} from "redux/reducer/messages/ListMessage";
import {dismissNotificationMute, openNotificationMute} from "redux/reducer/messages/NotificationMute";
import {RootState} from "redux/reducer";
import PinIcon from "assets/images/icons8-pin-96.svg";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {useDeleteConfirm} from "services/hooks/useDeleteConfirm";

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
    const {openDeleteConfirm} = useDeleteConfirm();

    const checkedValue = useCallback(() => {
        return !(chatData.usersMute??[]).includes(profileId)
    }, [chatData.usersMute]);

    const userUnreadMessage = useCallback(() => {
        const userUnread = chatData?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chatData.usersMissMessage])

    const {
        updateMuteConversation,
        pinConversation,
        hideConversation,
        markReadConversation,
        deleteHistoryConversation,
        deleteConversation
    } = UseListConversation()

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
            <button
                onClick={() => {
                    markReadConversation({
                        conversationID: chat._id
                    }).then(data => {
                        closeRightClick();
                        dispatch(updateUsersMissMessageToConversation({conversationId: chat._id, usersMissMessage: data.usersMissMessage}))
                    })
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full " + (userUnreadMessage()>0?"":"hidden")}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={ChatIcon}/>
                <div className={"mr-2 ml-4"}>Đánh dấu đã đọc</div>
            </button>
            <button
                onClick={() => {
                    pinConversation({
                        conversationID: chat._id,
                        isPin: !chatData.isPin
                    }).then(data => {
                        closeRightClick();
                        dispatch(updateUsersPinToConversation({conversationId: chat._id, isPin: data?.conversationsPin?.includes(chat._id)}))
                    })
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full " + (chat.isSaved?"hidden":"")}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={chatData.isPin?UnPinnedIcon:PinIcon}/>
                <div className={"mr-2 ml-4"}>{chatData.isPin?"Bỏ ghim hội thoại":"Ghim hội thoại"}</div>
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
            <button
                onClick={() => {
                    hideConversation({
                        conversationID: chat._id,
                        isHide: true
                    }).then(data => {
                        closeRightClick()
                        dispatch(updateUsersHideToConversation({conversationId: data._id, usersHide: data.usersHide}))
                    })
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={HideEyeIcon}/>
                <div className={"mr-2 ml-4"}>{"Ẩn cuộc hội thoại"}</div>
            </button>
            <button
                onClick={() => {
                    openDeleteConfirm({
                        title: "Xoá lịch sử cuộc hội thoại",
                        message: "Bạn có chắc muốn xoá toàn bộ lịch sử cuộc hội thoại không?",
                        deleteAction: () => {
                            deleteHistoryConversation({
                                conversationID: chat._id
                            }).then(data => {
                                const successDelete = data.usersDeleteHistory.find((user:{userID: string}) => user.userID === profileId);
                                successDelete&&dispatch(deleteAllMessagesInConversation({conversationId: data._id}))
                            })
                        }
                    })
                    setTimeout(() => {
                        closeRightClick()
                    }, 100)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Xoá lịch sử</div>
            </button>
            <button className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full"}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={ExitRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Rời cuộc hội thoại</div>
            </button>
            <button
                onClick={() => {
                    openDeleteConfirm({
                        title: "Xoá cuộc hội thoại",
                        message: "Bạn có chắc muốn giải tán cuộc hội thoại này không?",
                        deleteAction: () => {
                            deleteConversation({
                                conversationID: chat._id
                            }).then(data => {
                                dispatch(deleteConversationAction({conversationId: data._id}))
                                window.location.hash = "";
                                socket.emit("CHATTING_CSS_REMOVE_CONVERSATION",{infoConversation: data})
                            })
                        }
                    })
                    setTimeout(() => {
                        closeRightClick()
                    }, 100)
                }}
                className={"flex py-2 px-4 items-center hover:bg-gray-100 w-full " + ((chatData.authors.includes(profileId)||chatData.author === profileId)?"":"hidden")}>
                <img alt={"======"}  className={"mr-2 w-[24px] h-[24px]"} src={RemoveRedIcon}/>
                <div className={"text-negative mr-2 ml-4"}>Xoá cuộc hội thoại</div>
            </button>
        </div>
    )
}
