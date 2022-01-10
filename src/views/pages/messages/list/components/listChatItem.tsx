import React, {FC, useCallback, useContext, useRef} from "react";
import IconPinned from "assets/icons/Pinned";
import { NavLink } from "react-router-dom";
import RightClickMenu from "components/common/RightClickMenu";
import OptionListItemRightClick from "./OptionListItemRightClick";
import {MessageContext} from "../../home/index_v2";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import moment from "moment";

type Props = {
    chat: ItemListConversation,
    index: number
}
const ListChatItem:FC<Props> = ({chat,index}) => {
    const {currentChat, setCurrentChat} = useContext(MessageContext);
    const wrapperRef = useRef(null);
    const currentUser = localStorage.getItem("currentUser")??"";
    const profileId = JSON.parse(currentUser)?._id;

    const getPresentGroupName = (name: string) => {
        return name.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    const getNameConversation = useCallback(() => {
        if (chat.members && chat.members.length == 2) {
            const userInConversation = chat?.members.find((item: any) => chat._id != profileId);
            return userInConversation.fullname.trim();
        }

        return chat?.name;
    }, [chat, profileId]);

    const getAvatarMembers = useCallback(() => {
        if (chat.isPrivate) {
            const members = chat.members.filter((item: any) => chat._id != profileId);
            return [`${process.env.REACT_APP_URL_S3_USER}/${members[0].image}`];
        }
        const avatars: any = [];
        if (chat.members && chat.members.length) {
            chat.members.forEach((member: any) => {
                avatars.push(`${process.env.REACT_APP_URL_S3_USER}/${member.image}`);
            });
        }
        return avatars;
    }, [chat, profileId]);

    const userUnreadMessage = useCallback(() => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chat, profileId])

    const getLastMessage = useCallback(() => {
        if (chat.lastMessage) {
            switch (chat.lastMessage.type) {
                case 0:
                    return chat.lastMessage.content
                case 1:
                    return "[Hình ảnh]";
                case 2:
                    return "[Tệp tin]";
                default:
                    return "[Thông báo]";
            }
        }
        return "[Thông báo]";
    }, [chat, profileId])

    const getDate = useCallback(() => {
        const date = moment(chat.modifyAt);
        if (date.isSame(new Date(), 'year')) {
            return date.format("DD/MM")
        } else {
            return date.format("DD/MM/YYYY")
        }
    },[chat, profileId])

    return (
        <NavLink
            onClick={() => setCurrentChat(chat._id)}
            ref={wrapperRef}
            to={`#${chat._id}`}
            className={"group flex p-[10px] focus:bg-primary active:bg-primary hover:bg-gray-100 cursor-pointer rounded-md " + (currentChat==chat._id ? "bg-primary":"")}>
            {
                chat.avatar?
                    <img className={"w-[56px] h-[56px] rounded-full overflow-hidden"} src={chat.chatAvatar} alt={chat.chatName}/>:
                    <div className={"w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl"} style={{background: "#8DD4D6"}}>
                        {getPresentGroupName(getNameConversation())}
                    </div>
            }
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <div className={"flex"}>
                    <div className={"flex-1 font-bold group-active:text-white group-focus:text-white "+ (currentChat==chat._id ? "text-white":"")}>
                        {getNameConversation()}
                    </div>
                    <div className={"text-xs text-gray-400 group-active:text-white group-focus:text-white "+ (currentChat==chat._id ? "text-white":"")}>
                        {getDate()}
                    </div>
                </div>
                <div className={"flex mt-1"}>
                    <div className={"flex-1 truncate text-gray-400 group-active:text-white group-focus:text-white "+ (currentChat==chat._id ? "text-white":"")}>{getLastMessage()}</div>
                    {
                        userUnreadMessage() > 0 &&
                        <span className={"rounded-full bg-positive text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{userUnreadMessage()}</span>}
                    {chat.pinned&&<IconPinned/>}
                </div>
            </div>
            <RightClickMenu wrapperRef={wrapperRef} menu={<OptionListItemRightClick/>}/>
        </NavLink>
    )
}

export default ListChatItem
