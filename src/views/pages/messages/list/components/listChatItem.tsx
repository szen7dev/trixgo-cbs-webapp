import React, {FC, useCallback, useContext, useRef} from "react";
import IconPinned from "assets/icons/Pinned";
import { NavLink } from "react-router-dom";
import RightClickMenu from "components/common/RightClickMenu";
import OptionListItemRightClick from "./OptionListItemRightClick";
import {MessageContext} from "../../home/index_v2";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import moment from "moment";
import AvatarGroupChat from "./AvatarGroupChat";
import {LazyLoadImage} from "react-lazy-load-image-component";

type Props = {
    chat: ItemListConversation
}
const ListChatItem:FC<Props> = ({chat}) => {
    const {currentChat, setCurrentChat} = useContext(MessageContext);
    const wrapperRef = useRef(null);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getPresentGroupName = (name: string) => {
        return name.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    const getNameConversation = useCallback(() => {
        if (chat.members && chat.members.length == 2) {
            const userInConversation = chat?.members.find((item: any) => item._id != profileId);
            return userInConversation.fullname.trim();
        }

        return chat?.name;
    }, [chat, profileId]);

    const getAvatarMembers = useCallback(() => {
        if (chat.isPrivate) {
            const members = chat.members.filter((item: any) => item._id != profileId);
            return [`${process.env.REACT_APP_URL_S3_USER}/${members[0].image}`];
        }
        const avatars: any = [];
        if (chat.members && chat.members.length) {
            chat.members.slice(0, 4).forEach((member: any) => {
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
                    return chat.lastMessage.content.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                        const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                        if (matchs) {
                            const fullName = matchs[1];
                            return `@${fullName}`;
                        } else {
                            return replacement;
                        }
                    });
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
        if (date.isSame(new Date(), 'date')) {
            return date.format("HH:mm")
        }else if (date.isSame(new Date(), 'week')) {
            return date.format("dddd").split(" ").map((str:string) => str.charAt(0).toUpperCase() + str.slice(1)).join(" ")
        }else if (date.isSame(new Date(), 'year')) {
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
                    <LazyLoadImage effect="blur" className={"w-[56px] h-[56px] rounded-full overflow-hidden"} src={chat.avatar.file.url} alt={getNameConversation()}/>:
                    (
                        getAvatarMembers().length === 0 ?
                        <div className={"w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                            {getPresentGroupName(getNameConversation())}
                        </div> :
                        <AvatarGroupChat
                            avatars={getAvatarMembers()}
                            imageClass={"w-[56px] h-[56px]"}
                            classesMap={{
                                "group_1": {
                                    imgWidth: "w-full h-full",
                                    groupPosition: [""]
                                },
                                "group_2": {
                                    imgWidth: "w-[38px] h-[38px] absolute",
                                    groupPosition: [
                                        "bottom-0 left-0 z-2",
                                        "top-0 right-0 z-1",
                                    ]
                                },
                                "group_3": {
                                    imgWidth: "w-[32px] h-[32px] absolute",
                                    groupPosition: [
                                        "bottom-0 left-12px z-3",
                                        "top-0 left-0 z-2",
                                        "top-0 right-0 z-1",
                                    ]
                                },
                                "group_4": {
                                    imgWidth: "w-[28px] h-[28px] absolute",
                                    groupPosition: [
                                        "bottom-0 left-0 z-4",
                                        "top-0 left-0 z-3",
                                        "top-0 right-0 z-2",
                                        "bottom-0 right-0 z-1"
                                    ]
                                }
                            }}
                        />
                    )
            }
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <div className={"flex"}>
                    <div className={"flex-1 font-bold group-active:text-white group-focus:text-white "+ (currentChat==chat._id ? "text-white":"")}>
                        {getNameConversation()}
                    </div>
                    <div className={"text-xs group-active:text-white group-focus:text-white "+ (currentChat==chat._id ? "text-white":"text-gray-400")}>
                        {getDate()}
                    </div>
                </div>
                <div className={"flex mt-1"}>
                    <div className={"flex-1 truncate w-[250px] group-active:text-white group-focus:text-white "+ (currentChat==chat._id ? "text-white":"text-gray-400")}>{getLastMessage()}</div>
                    {
                        userUnreadMessage() > 0 &&
                        <span className={"rounded-full bg-positive text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{userUnreadMessage()}</span>}
                    {chat.isPin&&<IconPinned/>}
                </div>
            </div>
            <RightClickMenu wrapperRef={wrapperRef} menu={<OptionListItemRightClick/>}/>
        </NavLink>
    )
}

export default ListChatItem
