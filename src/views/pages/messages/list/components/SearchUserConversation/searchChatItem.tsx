import React, {FC, useCallback, useContext, useRef} from "react";
import { NavLink } from "react-router-dom";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import AvatarGroupChat from "../AvatarGroupChat";
import SavedMessage from "assets/images/saved-messages.svg";

type Props = {
    chat: ItemListConversation;
    itemClickAction: (chat: ItemListConversation) => void;
    avatarClassname?: string;
    avatarClassnameMap?: any;
}
const SearchChatItem:FC<Props> = ({chat, itemClickAction, avatarClassname, avatarClassnameMap}) => {
    const wrapperRef = useRef(null);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getPresentGroupName = (name: string) => {
        return name.split(' ').slice(0, 2).map((text: string) => {
            return text.charAt(0)
        });
    }

    const getNameConversation = useCallback(() => {
        if (chat.members && chat.members.length === 1) {
            return "Saved Messages";
        }
        if (chat.members && chat.members.length === 2) {
            const userInConversation = chat?.members.find((item: any) => item._id != profileId);
            return userInConversation.fullname.trim();
        }

        return chat?.name;
    }, [chat, profileId]);

    const getAvatarMembers = useCallback(() => {
        if (chat.isPrivate) {
            if (chat.members.length === 1) {
                return [SavedMessage];
            } else {
                const members = chat.members.filter((item: any) => item._id != profileId);
                return [`${process.env.REACT_APP_URL_S3_USER}/${members[0].image}`];
            }
        }
        const avatars: any = [];
        if (chat.members && chat.members.length) {
            chat.members.slice(0, 4).forEach((member: any) => {
                avatars.push(`${process.env.REACT_APP_URL_S3_USER}/${member.image}`);
            });
        }
        return avatars;
    }, [chat, profileId]);

    const handleSelectChat = (chat: ItemListConversation) => {
        itemClickAction(chat)
    }

    return (
        <NavLink
            onClick={() => handleSelectChat(chat)}
            ref={wrapperRef}
            to={`#${chat._id}`}
            className={"group flex p-[10px] focus:bg-primary active:bg-primary cursor-pointer rounded-md hover:bg-gray-100"}>
            {
                chat.avatar?
                    <img  className={"w-[56px] h-[56px] rounded-full overflow-hidden"} src={chat?.avatar?.url} alt={getNameConversation()}/>:
                    (
                        getAvatarMembers().length === 0 ?
                        <div className={"w-[56px] h-[56px] rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[56px] min-h-[56px]"} style={{background: "#8DD4D6"}}>
                            {getPresentGroupName(getNameConversation())}
                        </div> :
                        <AvatarGroupChat
                            avatars={getAvatarMembers()}
                            imageClass={avatarClassname??"w-[56px] h-[56px]"}
                            classesMap={avatarClassnameMap??{
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
                    {getNameConversation()}
                </div>
                {
                    chat.members.length > 2 ?
                    <div className={"flex mt-1"}>
                        <div className={"flex-1 w-[250px] font-xs text-gray-500"}>{chat.members.length} thành viên</div>
                    </div>:
                    <div className={"flex mt-1 h-[22px]"}/>
                }
            </div>
        </NavLink>
    )
}

export default SearchChatItem
