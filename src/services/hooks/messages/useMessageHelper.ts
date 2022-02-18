import {UseListConversation} from "./useListConversation";
import {ReactNode, useCallback, useContext} from "react";
import {MessageContext} from "../../../views/pages/messages/home/index_v2";
import {ItemListConversation} from "../../../typings/apis/messages/listConversation";
import SavedMessage from "../../../assets/images/saved-messages.svg";

type UseMessageHelperType = {
    handleStartPrivateChat: (memberId: string) => void;
    getAvatarMembers: (chat: ItemListConversation, profileId: string) => string[];
    getNameConversation: (chat: ItemListConversation, profileId: string) => string;
}

export const UseMessageHelper = () : UseMessageHelperType => {
    const {createConversation} = UseListConversation();
    const {socketRef,setCurrentChat, currentChat} = useContext(MessageContext);
    const socket = socketRef?.current;

    const handleStartPrivateChat = (memberId: string) => {
        createConversation({
            name: "",
            description: "",
            isPrivate: true,
            membersID: [memberId]
        }).then(data => {
            if (currentChat === data._id) return;
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: data._id, select: JSON.stringify({ sender:"bizfullname" }) });
            setCurrentChat(data._id);
            window.location.hash = `#${data._id}`
        });
    };

    const getAvatarMembers = (chat: ItemListConversation, profileId: string) => {
        if (chat.isPrivate) {
            if (chat.members.length === 1) {
                return [SavedMessage];
            } else {
                const members = chat.members.filter((item: any) => item._id !== profileId);
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
    };

    const getNameConversation = (chat: ItemListConversation, profileId: string) : string => {
        if (chat.members && chat.members.length === 1) {
            return "Saved Messages";
        }
        if (chat.members && chat.members.length === 2) {
            const userInConversation = chat?.members.find((item: any) => item._id != profileId);
            return (userInConversation.bizfullname||userInConversation.fullname).trim();
        }

        return chat.name||"";
    }

    return {
        handleStartPrivateChat,
        getAvatarMembers,
        getNameConversation
    }
};