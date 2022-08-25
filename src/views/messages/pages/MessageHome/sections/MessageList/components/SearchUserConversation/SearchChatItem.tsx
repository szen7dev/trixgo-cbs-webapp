import React, {FC, useCallback, useContext, useRef} from "react";
import { NavLink } from "react-router-dom";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {AvatarGroupChat} from "../ListCoversation";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";

type Props = {
    chat: ItemListConversation;
    itemClickAction: (chat: ItemListConversation) => void;
    avatarClassname?: string;
    avatarClassnameMap?: any;
}
export const SearchChatItem:FC<Props> = ({chat, itemClickAction, avatarClassname, avatarClassnameMap}) => {
    const wrapperRef = useRef(null);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const getPresentGroupName = (name: string) => {
        return name.split('').slice(0, 1).map((text: string) => {
            return text.charAt(0)
        });
    }

    const {getNameConversation, getBackgroundGroupChat, getAvatarMembers} = UseMessageHelper();

    const handleSelectChat = (chat: ItemListConversation) => {
        itemClickAction(chat)
    }

    return (
        <NavLink
            onClick={() => handleSelectChat(chat)}
            ref={wrapperRef}
            to={`#${chat._id}`}
            className={"group flex p-[10px] cursor-pointer rounded-md hover:bg-gray-100"}>
            {
                chat.avatar?
                    <img  className={"rounded-full overflow-hidden " + (avatarClassname??"w-[36px] h-[36px] min-w-[36px] min-h-[36px]")} src={`${process.env.REACT_APP_URL_S3}${chat?.avatar?.path}`} alt={getNameConversation(chat, profileId)}/>:
                    (
                        getAvatarMembers(chat, profileId).length === 0 ?
                        <div className={"rounded-full flex items-center justify-center text-white font-bold text-xl min-w-[36px] min-h-[36px] " + (avatarClassname??"w-[36px] h-[36px]")} style={{background: getBackgroundGroupChat(chat)}}>
                            {getPresentGroupName(getNameConversation(chat, profileId))}
                        </div> :
                        <AvatarGroupChat
                            avatars={getAvatarMembers(chat, profileId)}
                            imageClass={avatarClassname??"w-[36px] h-[36px]"}
                            classesMap={avatarClassnameMap??{
                                "group_1": {
                                    imgWidth: "w-full h-full",
                                    groupPosition: [""]
                                }
                            }}
                        />
                    )
            }
            <div className={"flex-1 flex flex-col justify-center ml-[10px]"}>
                <div className={"flex"}>
                    {getNameConversation(chat, profileId)}
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
