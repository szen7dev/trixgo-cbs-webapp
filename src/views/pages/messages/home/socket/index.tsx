import React, {FC, useContext, useEffect} from "react";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {
    appendMessageToConversation,
    updateNewMessageToConversation,
    setShareMessage, revokeMessageInConversation
} from "redux/reducer/messages/ListMessage";
import {MessageContext} from "../index_v2";
import {useDispatch} from "react-redux";
import {setListConversation, updateSingleConversation} from "redux/reducer/messages/ListConversation";
import {UseConversation} from "services/hooks/messages/useConversation";
import {toast} from "react-toastify";

const SocketController:FC = () => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const {socketRef, currentChat} = useContext(MessageContext);

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

            socket.on('CHATTING_SSC_GET_LIST_CONVERSATION', onReceiveConversation);
        };

        return () => {
            if (socket) {
                socket.off('CHATTING_SSC_RECEIVE_MESSAGE', onReceiveMessage);
                socket.off('CHATTING_SSC_FIRE_MESSAGE', onFireMessage);
                socket.off('CHATTING_SSC_SHARE_MESSAGE', onReceiveShareMessage);
                socket.off('CHATTING_SSC_REVOKE_MESSAGE', onReceiveRevokeMessage);
                socket.off('CHATTING_SSC_REACTION_MESSAGE', onReceiveReactionMessage);

                socket.off('CHATTING_SSC_GET_LIST_CONVERSATION', onReceiveConversation);
            }
        }
    },[socket]);

    const onReceiveMessage = (data: any) => {
        console.log(data)
        if (data?.infoMessage?.error) {
            // Alert.alert(t('notification'), data.infoMessage.message);
            getListConversation({keyword: ""});
            return;
        }
        // console.log(data)
        if (data.infoMessage?.sender?._id === profileId) {
            dispatch(updateNewMessageToConversation({
                conversationId: data.infoMessage.conversation,
                newMessageId: data.infoMessage._id,
                oldMessageId: data.tmpid,
                messageData: data.infoMessage
            }));
        } else {
            dispatch(appendMessageToConversation({
                conversationId: data.infoMessage.conversation,
                messageId: data.infoMessage._id,
                messageData: data.infoMessage
            }))
            setTimeout(() => {
                scrollToBottom();
            }, 100)
        }
        // socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: data.infoMessage.conversation });
    };

    const onReceiveConversation = (data: any) => {
        console.log(data)
        dispatch(setListConversation(data.data.listRecords));
    }

    const onFireMessage = (data: any) => {
        dispatch(appendMessageToConversation({
            conversationId: data.data.conversation,
            messageId: data.data._id,
            messageData: data.data
        }));
        if (data.data.type === 108) {
            getListPinMessage({conversationID: data.data.conversation})
        }
        setTimeout(() => {
            scrollToBottom();
        }, 100)
    };

    const onReceiveShareMessage = (data: any) => {
        // dispatch(setShareMessage({
        //     messagesShare: data.data.listMessagesShared
        // }));
        dispatch(updateSingleConversation({
            conversationData: data.data.infoConversation
        }))
    }

    const onReceiveRevokeMessage = (data: any) => {
        if (!data.data.error) {
            dispatch(revokeMessageInConversation({messages: data.data.data}))
        } else {
            toast.error(data.data.message);
        }
    }

    const onReceiveReactionMessage = (data: any) => {
        dispatch(updateNewMessageToConversation({
            conversationId: data.data.conversation._id,
            newMessageId: data.data._id,
            oldMessageId: data.data._id,
            messageData: {...data.data, conversation: data.data.conversation._id}
        }));
    }

    const scrollToBottom = () => {
        const conversationMessagesList = document.getElementById("conversation-messages-list");
        if (conversationMessagesList) {
            conversationMessagesList.scrollTo({top: conversationMessagesList.scrollHeight, behavior: "smooth" });
        }
    };

    return null;
};

export default SocketController;