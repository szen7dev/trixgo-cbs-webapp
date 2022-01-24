import React, {FC, useContext, useEffect} from "react";
import {UseListConversation} from "../../../../../services/hooks/messages/useListConversation";
import {
    appendMessageToConversation,
    updateNewMessageToConversation
} from "redux/reducer/messages/ListMessage";
import {MessageContext} from "../index_v2";
import {useDispatch} from "react-redux";
import {setListConversation} from "../../../../../redux/reducer/messages/ListConversation";

const SocketController:FC = () => {
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();
    const {socketRef, currentChat} = useContext(MessageContext);

    const socket = socketRef.current;
    const {getListConversation} = UseListConversation();
    useEffect(() => {
        if (socket) {
            socket.on('CHATTING_SSC_RECEIVE_MESSAGE', onReceiveMessage);
            socket.on('CHATTING_SSC_GET_LIST_CONVERSATION', onReceiveConversation);
        };
    },[socket]);

    const onReceiveMessage = (data: any) => {
        if (data.infoMessage?.conversation === currentChat) {
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
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: currentChat });
        }
    };

    const onReceiveConversation = (data: any) => {
        dispatch(setListConversation(data.data.listRecords));
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