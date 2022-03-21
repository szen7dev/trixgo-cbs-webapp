import React, {FC, useCallback, useContext, useRef, useState} from "react";
import DotsHorizontalGrayIcon from "assets/icons/DotsHorizontalGray";
import RemoveIcon from "assets/images/icons8-remove-100.svg";
import AddAdminIcon from "assets/images/icons8-admin-settings-male-96.svg";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {ItemListConversation, ItemMemberMessage} from "typings/apis/messages/listConversation";
import moment from "moment";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {toast} from "react-toastify";
import {useDeleteConfirm} from "services/hooks/useDeleteConfirm";
import {MessageContext} from "../../../../index";

type Props = {
    user: ItemMemberMessage,
    index: number,
    chat: ItemListConversation
}
export const OnlineUserInChatItem:FC<Props> = ({user,index, chat}) => {
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;

    const {handleStartPrivateChat, isAuthor, isMasterAuthor} = UseMessageHelper();
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
    }, [user]);

    const {openDeleteConfirm} = useDeleteConfirm();
    const {removeMemberFromConversation, setAsAdmin} = UseListConversation();
    const removeUser = () => {
        setShowOption(false)
        openDeleteConfirm({
            title: "Xoá người dùng khỏi cuộc hội thoại",
            message: `Bạn có chắc muốn xoá ${user.member.bizfullname} khỏi cuộc hội thoại này không?`,
            deleteAction: () => {
                removeMemberFromConversation({
                    conversationID: chat._id,
                    memberID: user.member._id
                }).then(({data, error}) => {
                    if (error) {
                        toast.error(data.message)
                    } else {
                        socket.emit('CHATTING_CSS_REMOVE_MEMBER_CONVERSATION', {conversationID: chat._id, memberID: user.member._id})
                        socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage.data);
                        socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', {
                            conversationID: chat._id,
                            select: JSON.stringify({ sender:"bizfullname" }) ,
                            filter: JSON.stringify({
                                author: 0,
                                taskID: 0,
                                links: 0,
                                createAt: 0,
                                __v: 0,
                                // config: 0
                            })
                        });
                    }
                })
            }
        })
    }

    const setAsAdminAction = (isSetAdmin: boolean) => {
        setShowOption(false)
        setAsAdmin({
            conversationID: chat._id,
            memberID: user.member._id,
            isSetAdmin
        }).then(({data, error}) => {
            if (error) {
                toast.error(data.message)
            } else {
                socket.emit('CHATTING_CSS_UPDATE_ADMIN_CONVERSATION', {
                    conversationID: chat._id,
                    memberID: user.member._id,
                    isSetAdmin
                });
                socket.emit('CHATTING_CSS_FIRE_MESSAGE', data.infoMessage.data);
            }
        })
    }

    return (
        <div className={"relative"} ref={wrapper}>
            <div
                className={"group flex px-[15px] p-[10px] hover:bg-gray-100 cursor-pointer rounded-md items-center online-user-in-message-item smooth-animation"}>
                <img
                    onClick={() => handleStartPrivateChat(user?.member?._id)}
                    className={"w-[56px] h-[56px] rounded-full overflow-hidden object-cover"}
                    src={`${process.env.REACT_APP_URL_S3_USER}/${user?.member?.image}`} alt={user?.member?.bizfullname}/>
                <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                    <span
                        onClick={() => handleStartPrivateChat(user?.member?._id)}
                        className={"font-bold"}>
                        {user?.member?.bizfullname}
                    </span>
                    <span className={"truncate text-xs "+(onlineStatus().isOnline?"text-primary":"text-gray-400")}>{onlineStatus().text}</span>
                </div>
                {
                    //Phải là admin
                    //Không được tự xóa quyền bản thân
                    //Không được xóa quyền của Chủ cuộc hội thoại
                    isAuthor(chat, profileId)&&!isMasterAuthor(chat, user.member._id)&&profileId!==user.member._id&&
                    <div
                        onClick={() => setShowOption(!showOption)}
                        className={"cursor-pointer w-[30px] h-[30px] bg-white border rounded-full flex items-center justify-center "}>
                        <DotsHorizontalGrayIcon/>
                    </div>
                }
            </div>
            {
                showOption&&isAuthor(chat, profileId)&&!isMasterAuthor(chat, user.member._id)&&profileId!==user.member._id&&
                <div
                className={"absolute z-10 top-40px right-30px max-w-fit"}>
                    <div
                        className={"action-menu-button rounded-md shadow-lg bg-white min-w-[216px] text-gray-500 transition duration-500"}>
                        <button
                            onClick={() => removeUser()}
                            className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                            <img src={RemoveIcon} alt={"bookmark"}/>
                            <div className={"flex-1 text-left ml-4"}>Xoá khỏi cuộc hội thoại</div>
                        </button>
                        <button
                            onClick={() => setAsAdminAction(!isAuthor(chat, user.member._id))}
                            className={"w-full hover:bg-gray-100 flex items-center px-4 py-2"}>
                            <img src={AddAdminIcon} alt={"add folder"}/>
                            <div className={"flex-1 text-left ml-4"}>{isAuthor(chat, user.member._id)?"Xóa vai trò Admin":"Đặt làm Admin"}</div>
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}
