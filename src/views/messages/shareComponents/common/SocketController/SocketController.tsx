import React, {FC, useContext, useEffect} from "react";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {
    appendMessageToConversation,
    updateNewMessageToConversation,
    setShareMessage, revokeMessageInConversation,
    updateSeenMessage
} from "redux/reducer/messages/ListMessage";
import {useDispatch, useSelector} from "react-redux";
import {setListConversation, updateSingleConversation, setAmountMissMessage} from "redux/reducer/messages/ListConversation";
import {UseConversation} from "services/hooks/messages/useConversation";
import {toast} from "react-toastify";
import {RootState} from "redux/reducer";
import {pushMoreUnreadMessage} from "redux/reducer/messages/UnreadMessages";

type Props = {
    context: any;
    currentChat: string;
}
export const SocketController:FC<Props> = ({context, currentChat}) => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const {socketRef} = useContext(context);

    const inSearchMode = useSelector((state: RootState) => state.searchMessage.data.inSearchMode[currentChat]);

    const socket = socketRef.current;
    const {getListConversation} = UseListConversation();
    const {getListPinMessage} = UseConversation();

    useEffect(() => {
        if (socket) {
            socket.on('CHATTING_SSC_RECEIVE_MESSAGE', onReceiveMessage);
            socket.on('CHATTING_SSC_FIRE_MESSAGE', onFireMessage);
            socket.on('CHATTING_SSC_SHARE_MESSAGE', onReceiveShareMessage);
            socket.on('CHATTING_SSC_REVOKE_MESSAGE', onReceiveRevokeMessage);
            socket.on('CHATTING_SSC_REACTION_MESSAGE', onReceiveReactionMessage);
            socket.on('CHATTING_SSC_UPDATE_SEEN_MESSAGE', onUpdateSeenMessage);

            socket.on('CHATTING_SSC_GET_LIST_CONVERSATION', onReceiveConversation);
        };
    },[socket]);

    const onReceiveMessage = (data: any) => {
        if (data?.infoMessage?.error) {
            // Alert.alert(t('notification'), data.infoMessage.message);
            getListConversation({keyword: ""});
            return;
        }
        dispatch(setAmountMissMessage(data.amountMissMessage))
        // console.log(data)
        if (data?.infoMessage?.sender?._id === profileId) {
            dispatch(updateNewMessageToConversation({
                conversationId: data?.infoMessage?.conversation,
                newMessageId: data?.infoMessage?._id,
                oldMessageId: data?.tmpid,
                messageData: data?.infoMessage
            }));
        } else {
            dispatch(appendMessageToConversation({
                conversationId: data?.infoMessage?.conversation,
                messageId: data?.infoMessage?._id,
                messageData: data?.infoMessage
            }));
            if (currentChat === data?.infoMessage?.conversation) {
                dispatch(pushMoreUnreadMessage({conversationId: data?.infoMessage?.conversation, messagesId: [data?.infoMessage?._id]}));
            }
            if (!inSearchMode){
                setTimeout(() => {
                    scrollToBottom();
                }, 100)
            }
        }
    };

    const onReceiveConversation = (data: any) => {
        // console.log('CHATTING_SSC_GET_LIST_CONVERSATION', data.data.listRecords,  new Date())
        dispatch(setListConversation(data?.data));
    }

    const onFireMessage = (data: any) => {
        if (!data) return;
        dispatch(appendMessageToConversation({
            conversationId: data?.data?.conversation,
            messageId: data?.data?._id,
            messageData: data?.data
        }));
        if ([108, 109].includes(data?.data?.type)) {
            getListPinMessage({conversationID: data?.data?.conversation})
        }
        if (!inSearchMode){
            setTimeout(() => {
                scrollToBottom();
            }, 100)
        }
    };

    const onReceiveShareMessage = (data: any) => {
        if (!data) return;
        // dispatch(setShareMessage({
        //     messagesShare: data.data.listMessagesShared
        // }));
        dispatch(updateSingleConversation({
            conversationData: data?.data?.infoConversation
        }))
    }

    const onReceiveRevokeMessage = (data: any) => {
        if (!data) return;
        if (!data?.error) {
            dispatch(revokeMessageInConversation({messages: data?.data}))
        } else {
            toast.error(data?.message);
        }
    }

    const onReceiveReactionMessage = (data: any) => {
        console.log(data)
        if (!data) return;
        dispatch(updateNewMessageToConversation({
            conversationId: data?.data?.conversation?._id,
            newMessageId: data?.data?._id,
            oldMessageId: data?.data?._id,
            messageData: {...data?.data, conversation: data?.data?.conversation?._id}
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
    }

    return null;
};