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
import {updateUsersMuteToConversation} from "redux/reducer/messages/ListConversation";
import {UseListConversation} from "services/hooks/messages/useListConversation";

export const MainChatOptions:FC = () => {
    const {currentChat} = useContext(MessageContext)
    const {openDeleteConfirm} = useDeleteConfirm();
    const dispatch = useDispatch();

    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;

    const chatData = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);
    const checkedValue = useCallback(() => {
        return !(chatData.usersMute??[]).includes(profileId)
    }, [chatData.usersMute])

    const {updateMuteConversation} = UseListConversation();

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
                <Menu.Item>
                    <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                        <img className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px]"} src={ExitRedIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-4 text-negative"}>Rời cuộc hội thoại</div>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div
                        onClick={() => openDeleteConfirm({
                            deleteAction: () => console.log('hiiii'),
                            // title: "Hello",
                            // message: "Oh shit"
                        })}
                        className={"w-full hover:bg-gray-100 flex items-center px-4 py-2 " + ((chatData.authors.includes(profileId)||chatData.author === profileId)?"":"hidden")}>
                        <img className={"w-[24px] h-[24px] min-w-[24px] min-h-[24px]"} src={RemoveRedIcon} alt={"exit"}/>
                        <div className={"flex-1 text-left ml-4 text-negative"}>Xoá cuộc hội thoại</div>
                    </div>
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}
