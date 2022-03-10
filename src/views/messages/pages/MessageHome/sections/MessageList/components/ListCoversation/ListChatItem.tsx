import React, {FC, useCallback, useContext, useEffect, useRef} from "react";
import IconPinned from "assets/icons/Pinned";
import { NavLink } from "react-router-dom";
import {OptionListItemRightClick} from "./OptionListItemRightClick";
import {MessageContext} from "../../../../index";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import moment from "moment";
import {AvatarGroupChat} from "./AvatarGroupChat";
import {RightClickMenuWrapper} from "shareComponents/common";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";

type Props = {
    chat: ItemListConversation;
    customLink?: string;
    customOnClick?: (chat: ItemListConversation) => void;
}
export const ListChatItem:FC<Props> = ({chat, customLink, customOnClick}) => {
    const {currentSelectedFolders} = useSelector((state: RootState) => state.listFolders.data);
    const {currentChat, setCurrentChat} = useContext(MessageContext);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getPresentGroupName = (name: string) => {
        return name.split('').slice(0, 1).map((text: string) => {
            return text.charAt(0)
        });
    }

    const {getNameConversation, getAvatarMembers} = UseMessageHelper();

    const userUnreadMessage = useCallback(() => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chat.usersMissMessage])

    const getLastMessage = useCallback(() => {
        if (chat.lastMessage) {
            if (chat.lastMessage.usersDelete&&chat.lastMessage.usersDelete.includes(profileId)) {
                return "Tin nhắn đã xóa";
            }
            switch (chat.lastMessage.type) {
                case 0:
                    return <p className={"flex items-center max-w-[250px] truncate"}>
                        <span className={"whitespace-nowrap "+(currentChat===chat._id ?"text-white":"text-black")}>{getSenderName()}</span>:
                        <span className={"ml-[5px] truncate max-w-full"}>
                            {chat.lastMessage.content.replaceAll(/[@]\[(.*?)\]\((.*?)\)/g, (replacement: string) => {
                                const matchs = (/[@]\[(.*?)\]\((.*?)\)/g).exec(replacement);
                                if (matchs) {
                                    const fullName = matchs[1];
                                    return `@${fullName}`;
                                } else {
                                    return replacement;
                                }
                            })}
                        </span>
                    </p>
                case 1:
                    return <p className={"flex items-center truncate"}>
                        <span className={"whitespace-nowrap "+(currentChat===chat._id ? "text-white":"text-black")}>{getSenderName()}</span>:
                        <span className={"ml-[5px]"}>
                        [Hình ảnh]
                        </span>
                    </p>;
                case 2:
                    return <p className={"flex items-center truncate"}>
                        <span className={"whitespace-nowrap "+(currentChat===chat._id ? "text-white":"text-black")}>{getSenderName()}</span>:
                        <span className={"ml-[5px]"}>
                        [Tệp tin]
                        </span>
                    </p>;
                default:
                    return "[Thông báo]";
            }
        }
        return "[Thông báo]";
    }, [chat.lastMessage, currentChat])

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
    },[chat.modifyAt]);

    const getSenderName = useCallback(() => {
        if (chat.lastMessage.sender._id === profileId) {
            return "Bạn";
        } else return (chat.lastMessage.sender.bizfullname||chat.lastMessage.sender.fullname);
    },[chat.lastMessage])

    const displayClass = (!currentSelectedFolders ||
        (
            currentSelectedFolders&&
            chat.folders&&
            chat.folders.includes(currentSelectedFolders._id)
        )) ? "block":"hidden"

    return (
        <RightClickMenuWrapper
            className={displayClass}
            contextMenu={<OptionListItemRightClick chat={chat}/>}
        >
            <NavLink
                onClick={() => {
                    if (customOnClick) {
                        customOnClick(chat)
                    } else {
                        setCurrentChat(chat._id)
                    }
                }}
                to={customLink??`#${chat._id}`}
                className={"group smooth-animation flex p-[10px] cursor-pointer rounded-lg z-1 " + (currentChat===chat._id ? "bg-primary":"hover:bg-gray-100")}>
                {
                    chat.avatar?
                        <img  className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] rounded-full overflow-hidden"} src={`${process.env.REACT_APP_URL_S3}${chat?.avatar?.path}`} alt={getNameConversation(chat, profileId)}/>:
                        (
                            getAvatarMembers(chat, profileId).length === 0 ?
                                <div className={"w-[56px] h-[56px] min-w-[56px] min-h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                                    {getPresentGroupName(getNameConversation(chat, profileId))}
                                </div> :
                                <AvatarGroupChat
                                    avatars={getAvatarMembers(chat, profileId)}
                                    imageClass={"w-[56px] h-[56px] min-w-[56px] min-h-[56px]"}
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
                        <div className={"flex-1 font-bold "+ (currentChat===chat._id ? "text-white":"")}>
                            {getNameConversation(chat, profileId)}
                        </div>
                        <div className={"text-xs "+ (currentChat===chat._id ? "text-white":"text-gray-500")}>
                            {getDate()}
                        </div>
                    </div>
                    <div className={"flex mt-1"}>
                        <div className={"flex-1 "+ (currentChat===chat._id ? "text-white":"text-gray-500")}>{getLastMessage()}</div>
                        {
                            userUnreadMessage() > 0 &&
                            <div className={"rounded-full flex items-center justify-center bg-positive text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{userUnreadMessage()}</div>}
                        {chat.isPin&&<IconPinned style={{filter: currentChat === chat._id ? "brightness(0) invert(1)": "none"}}/>}
                    </div>
                </div>
            </NavLink>
        </RightClickMenuWrapper>
    )
}
