import {UseListConversation} from "./useListConversation";
import {ReactNode, useCallback, useContext} from "react";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import SavedMessage from "assets/images/saved-messages.svg";
import {appendFakeItemListConversation} from "redux/reducer/messages/ListConversation";
import {useDispatch} from "react-redux";
import {MessageContext, populates} from "../../../views/messages/shareComponents/layouts/MessagesLayoutV2";

type UseMessageHelperType = {
    handleStartPrivateChat: (memberId: string, redirectOnly?: boolean) => void;
    getAvatarMembers: (chat: ItemListConversation, profileId: string) => string[];
    getNameConversation: (chat: ItemListConversation, profileId: string) => string;
    isAuthor: (chat: ItemListConversation, profileId: string) => boolean;
    isMasterAuthor: (chat: ItemListConversation, profileId: string) => boolean;
    hasPermission: (chat: ItemListConversation, profileId: string, permission: string) => boolean;
}

export const UseMessageHelper = () : UseMessageHelperType => {
    const {createConversation} = UseListConversation();
    const {socketRef,setCurrentChat, currentChat} = useContext(MessageContext);
    const socket = socketRef?.current;
    const dispatch = useDispatch();

    const handleStartPrivateChat = (memberId: string, redirectOnly = false) => {
        createConversation({
            name: "",
            description: "",
            isPrivate: true,
            membersID: [memberId]
        }).then(data => {
            if (!data?._id) return;
            dispatch(appendFakeItemListConversation({conversationId: data._id, conversation: data}))
            if (!redirectOnly){
                if (currentChat === data._id) return;
                socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
                    conversationID: data._id,
                    populates
                });
                setCurrentChat(data._id);
            }
            window.location.href = window.location.origin + "/messages#" + data._id;
        });
    };

    const getAvatarMembers = (chat: ItemListConversation, profileId: string) => {
        if (chat?.isPrivate) {
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
            const userInConversation = chat?.members.find((item: any) => item._id !== profileId);
            return (userInConversation?.bizfullname||userInConversation?.fullname).trim();
        }

        return chat.name||"";
    };

    const isAuthor = (chat: ItemListConversation, profileId: string) : boolean => {
        return (chat.authors.includes(profileId)||chat.author === profileId);
    };

    const isMasterAuthor = (chat: ItemListConversation, profileId: string) : boolean => {
        return chat.author === profileId;
    }

    const hasPermission = (chat: ItemListConversation, profileId: string, permission: string) : boolean => {
        if(!chat) return false;
        if (chat?.isPrivate) return true;
        const value = chat.config?chat.config[permission]:1;
        return (value===1||isAuthor(chat, profileId))
    }

    return {
        handleStartPrivateChat,
        getAvatarMembers,
        getNameConversation,
        isAuthor,
        isMasterAuthor,
        hasPermission
    }
};