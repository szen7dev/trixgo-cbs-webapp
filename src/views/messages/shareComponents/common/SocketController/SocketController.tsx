import React, {FC, useContext, useEffect, useRef, useState} from "react";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {
    appendMessageToConversation,
    updateNewMessageToConversation,
    setShareMessage, revokeMessageInConversation,
    updateSeenMessage
} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {
    setListConversation,
    updateSingleConversation,
    setAmountMissMessage,
    deleteConversationAction,
    decreaseAmountMissMessage
} from "redux/reducer/messages/ListConversation";
import {UseConversation} from "services/hooks/messages/useConversation";
import {toast} from "react-toastify";
import {RootState} from "redux/reducer";
import {pushMoreUnreadMessage} from "redux/reducer/messages/UnreadMessages";
import {UseInformationMessage} from "services/hooks/messages/useInformationMessage";
import {populates} from "../../layouts/MessagesLayoutV2";
import Favico from "react-favico-js";

type Props = {
    context: any;
    currentChat: string;
}
export const SocketController:FC<Props> = ({context, currentChat}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const {socketRef} = useContext(context);
    console.log("xxxxxxxxxxxxxxxxxxxxx");
    const inSearchMode = useSelector((state: RootState) => state.searchMessage.data.inSearchMode[currentChat]);
    const amountMissMessage = useSelector((state: RootState) => state.listConversation.data.amountMissMessage);
    const isReviewOldMessage = useSelector((state: RootState) => state.listMessage.data.isReviewOldMessage[currentChat]);

    const socket = socketRef.current;
    const {getListPinMessage} = UseConversation();
    const paramsRefetchListMember = {conversationID: currentChat, populates: JSON.stringify({"path": "addedBy member", "select": "_id bizfullname image"})};
    const {refetchListMembers} = UseInformationMessage(paramsRefetchListMember, false, "members");
    
    useEffect(() => {
        if (!socket) return;
        socket.on('CHATTING_SSC_FIRE_MESSAGE', onFireMessage);
        socket.on('CHATTING_SSC_REVOKE_MESSAGE', onReceiveRevokeMessage);
        socket.on('CHATTING_SSC_REACTION_MESSAGE', onReceiveReactionMessage);
        socket.on('CHATTING_SSC_UPDATE_SEEN_MESSAGE', onUpdateSeenMessage);

        socket.on('CHATTING_SSC_REMOVE_CONVERSATION', onRemoveConversation);
        socket.on('CHATTING_SSC_REMOVE_MEMBER_CONVERSATION', onRemoveMemberConversation);
        socket.on('CHATTING_SSC_GET_INFO_CONVERSATION', onGetInfoConversation);

        return () => {
            socket.off('CHATTING_SSC_FIRE_MESSAGE', onFireMessage);
            socket.off('CHATTING_SSC_REVOKE_MESSAGE', onReceiveRevokeMessage);
            socket.off('CHATTING_SSC_REACTION_MESSAGE', onReceiveReactionMessage);
            socket.off('CHATTING_SSC_UPDATE_SEEN_MESSAGE', onUpdateSeenMessage);

            socket.off('CHATTING_SSC_REMOVE_CONVERSATION', onRemoveConversation);
            socket.off('CHATTING_SSC_REMOVE_MEMBER_CONVERSATION', onRemoveMemberConversation);
            socket.off('CHATTING_SSC_GET_INFO_CONVERSATION', onGetInfoConversation);
        }
    },[socket]);

    useEffect(() => {
        if (amountMissMessage > 0) {
            document.title = `(${amountMissMessage}) tin nhắn`
        } else {
            document.title = `${process.env.REACT_APP_WEBSITE_NAME}`
        }
    }, [amountMissMessage])

    const onFireMessage = (data: any) => {
        if (!data) return;
        dispatch(appendMessageToConversation({
            conversationId: data?.data?.conversation,
            messageId: data?.data?._id,
            messageData: {
                ...data?.data,
                noAnimation: true
            }
        }));
        socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
            conversationID: data?.data?.conversation,
            populates
        });
        if ([108, 109].includes(data?.data?.type)) {
            getListPinMessage({conversationID: data?.data?.conversation})
        }
        if ([101, 102, 107].includes(data?.data?.type)) {
            refetchListMembers();
        }
        if (!inSearchMode && currentChat === data?.infoMessage?.conversation && !isReviewOldMessage){
            setTimeout(() => {
                scrollToBottom();
            }, 100)
        }
    };

    // const onReceiveShareMessage = (data: any) => {
    //     if (!data) return;
    //     // dispatch(setShareMessage({
    //     //     messagesShare: data.data.listMessagesShared
    //     // }));
    //     dispatch(updateSingleConversation({
    //         conversationData: data?.data?.infoConversation
    //     }))
    // }

    const onReceiveRevokeMessage = (data: any) => {
        if (!data) return;
        if (!data?.error) {
            dispatch(revokeMessageInConversation({messages: data?.data}))
        } else {
            toast.error(data?.message);
        }
    }

    const onReceiveReactionMessage = (data: any) => {
        if (!data || data.error) return;
        const { _id: messageID, conversation } = data?.data;

        dispatch(updateNewMessageToConversation({
            conversationId: conversation?._id,
            newMessageId: messageID,
            oldMessageId: messageID,
            messageData: {
                ...data?.data,
                conversation: conversation?._id,
                noAnimation: true
            }
        }));
    }

    const scrollToBottom = () => {
        const conversationMessagesList = document.getElementById("conversation-messages-MessageList");
        if (conversationMessagesList) {
            conversationMessagesList.scrollTo({top: conversationMessagesList.scrollHeight, behavior: "smooth" });
        }
    };

    const onUpdateSeenMessage = (data: any) => {
        if (!data) return;
        dispatch(updateSeenMessage({
            conversationId: data?.data?.infoConversation?._id,
            messsagesId: data?.data?.messagesID,
            infoUserSeen: data?.data?.infoUserSeen
        }))
        dispatch(decreaseAmountMissMessage({decrease: data?.data?.messagesID.length, conversationId: data?.data?.infoConversation?._id, profileId: profileId}))
    }

    const onRemoveConversation = (data: any) => {
        if (!data) return;
        dispatch(deleteConversationAction({conversationId: data?.data?._id}))
    }

    // const onCreateConversation = (data: any) => {
    //     if (!data) return;
    //     dispatch(updateSingleConversation({
    //         conversationData: data?.data?.infoConversation
    //     }))
    // }

    // const onUserLeaveConversation = (data: any) => {
    //    if (!data) return;
    //     dispatch(updateSingleConversation({
    //         conversationData: data?.data?.infoConversation
    //     }))
    // }

    // const onAddMemberConversation = (data: any) => {
    //    if (!data) return;
    //     dispatch(updateSingleConversation({
    //         conversationData: data?.data?.infoConversation
    //     }))
    // }

    // const onUpdateInforConversation = (data: any) => {
    //    if (!data) return;
    //     dispatch(updateSingleConversation({
    //         conversationData: data?.data
    //     }))
    // }

    const onRemoveMemberConversation = (data: any) => {
       if (!data) return;
       const youGotDeleted = data?.data?.removedMember.some((member: {_id: string, [key: string]: any}) => member._id === profileId);
       if (youGotDeleted) {
           dispatch(deleteConversationAction({conversationId: data?.data?.infoConversation?._id}))
       } else {
           dispatch(updateSingleConversation({
               conversationData: data?.data?.infoConversation
           }))
       }

    }

    // const onUpdateAdminConversation = (data: any) => {
    //     if (!data) return;
    //     dispatch(updateSingleConversation({
    //         conversationData: data?.data?.infoConversation
    //     }))
    // }

    const onGetInfoConversation = (data: any) => {
        if (!data) return;
        if (data.error) return;
        dispatch(updateSingleConversation({
            conversationData: data?.data
        }))
    }

    return null;
};