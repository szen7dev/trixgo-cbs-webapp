import React, {FC, useCallback, useContext} from "react";
import NotificationIcon from "assets/images/icons8-notification-96.svg";
import IconSelected from "assets/images/icons-web-select.svg";
import ExitRedIcon from "assets/images/icons8-exit-48.svg";
import RemoveRedIcon from "assets/images/icons8-remove-48.svg";
import {useDeleteConfirm} from "services/hooks/useDeleteConfirm";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import { Menu } from '@headlessui/react'
import {setSelectedStateOn} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {MessageContext} from "../../../../index";
import {RootState} from "redux/reducer";
import {dismissNotificationMute, openNotificationMute} from "redux/reducer/messages/NotificationMute";
import {deleteConversationAction, updateUsersMuteToConversation} from "redux/reducer/messages/ListConversation";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {toast} from "react-toastify";

export const MainChatOptions:FC = () => {
    const {currentChat, socketRef} = useContext(MessageContext);
    const socket = socketRef.current;
    const {openDeleteConfirm} = useDeleteConfirm();
    const dispatch = useDispatch();

    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const chatData = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);
    const checkedValue = useCallback(() => {
        return !(chatData.usersMute??[]).includes(profileId)
    }, [chatData.usersMute])

    const {updateMuteConversation, deleteConversation, leaveConversation} = UseListConversation();
    const {isAuthor} = UseMessageHelper()
    const handleTurnOffMute = () => {
        const payload = {
            conversationID: currentChat,
            isMute: false,
        }
        updateMuteConversation(payload).then(data => {
            dispatch(updateUsersMuteToConversation({conversationId: data._id, usersMute: data.usersMute}))
            dispatch(dismissNotificationMute())
        })
    }

    const userLeaveConversation = () => {
        if (isAuthor(chatData, profileId)) {
            openDeleteConfirm({
                title: "Xoá cuộc hội thoại",
                message: "Vì bạn là người tạo cuộc hội thoại việc rời đi tương đương giải tán nhóm. Bạn có chắc muốn giải tán cuộc hội thoại này không?",
                deleteAction: () => {
                    deleteConversation({
                        conversationID: chatData._id
                    }).then(data => {
                        dispatch(deleteConversationAction({conversationId: data._id}))
                        if (currentChat===chatData._id) {
                            window.location.hash = ""
                        }
                        socket.emit("CHATTING_CSS_REMOVE_CONVERSATION",{infoConversation: data})
                    })
                }
            })
        } else {
            openDeleteConfirm({
                title: "Rời khỏi cuộc hội thoại",
                message: "Bạn có chắc muốn rời khỏi cuộc hội thoại này không?",
                deleteAction: () => {
                    leaveConversation({
                        conversationID: chatData._id
                    }).then(({data, error}) => {
                        if (!error) {
                            dispatch(deleteConversationAction({conversationId: data.infoConversation._id}))
                            if (currentChat === chatData._id) {
                                window.location.hash = ""
                            }
                            socket.emit('CHATTING_CSS_MEMBER_LEAVE_CONVERSATION', {
                                conversationID: data.infoConversation._id,
                                memberID: profileId
                            });
                            socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage.data);
                        } else {
                            toast.error(data.message);
                        }
                    })
                }
            })
        }
    }

    const userDeleteConversation = () => {
        openDeleteConfirm({
            title: "Xoá cuộc hội thoại",
            message: "Bạn có chắc muốn giải tán cuộc hội thoại này không?",
            deleteAction: () => {
                deleteConversation({
                    conversationID: chatData._id
                }).then(data => {
                    dispatch(deleteConversationAction({conversationId: data._id}))
                    if (currentChat===chatData._id) {
                        window.location.hash = ""
                    }
                    socket.emit("CHATTING_CSS_REMOVE_CONVERSATION",{infoConversation: data})
                })
            }
        })
    }

    return (
        <Menu>
            <Menu.Button className={"w-[40px] h-[40px] hover:bg-gray-200 active:bg-gray-200 focus:bg-gray-200 rounded-full flex items-center justify-center"}>
                <DotsVerticalIcon/>
            </Menu.Button>
            <Menu.Items className={"absolute top-55px right-3 rounded-md shadow-lg bg-white min-w-[272px] text-gray-500"}>
                <Menu.Item
                    onClick={() => {
                        if (checkedValue()) {
                            dispatch(openNotificationMute({
                                conversation: currentChat
                            }))
                        } else {
                            handleTurnOffMute();
                        }
                    }}
                >
                    <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px]"} src={NotificationIcon} alt={"bookmark"}/>
                        <div className={"flex-1 text-left ml-4"}>{checkedValue()?"Tắt thông báo":"Bật thông báo"}</div>
                    </div>
                </Menu.Item>
                <Menu.Item
                    onClick={() => {
                        dispatch(setSelectedStateOn({conversationId: currentChat}));
                    }}
                >
                    <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px]"} src={IconSelected} alt={"add folder"}/>
                        <div className={"flex-1 text-left ml-4"}>Lựa chọn tin nhắn</div>
                    </div>
                </Menu.Item>
                <Menu.Item
                    onClick={() => userLeaveConversation()}
                >
                    <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px]"} src={ExitRedIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-4 text-negative"}>Rời cuộc hội thoại</div>
                    </div>
                </Menu.Item>
                <Menu.Item
                    onClick={() => userDeleteConversation()}
                >
                    <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2 " + (isAuthor(chatData, profileId)?"":"hidden")}>
                        <img className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px]"} src={RemoveRedIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-4 text-negative"}>Xoá cuộc hội thoại</div>
                    </div>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}
