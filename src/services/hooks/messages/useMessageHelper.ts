import {UseListConversation} from "./useListConversation";
import {useContext} from "react";
import {MessageContext} from "../../../views/pages/messages/home/index_v2";

type UseMessageHelperType = {
    handleStartPrivateChat: (memberId: string) => void;
}

export const UseMessageHelper = () : UseMessageHelperType => {
    const {createConversation} = UseListConversation();
    const {socketRef,setCurrentChat, currentChat} = useContext(MessageContext);
    const socket = socketRef.current;

    const handleStartPrivateChat = (memberId: string) => {
        createConversation({
            name: "",
            description: "",
            isPrivate: true,
            membersID: [memberId]
        }).then(data => {
            if (currentChat === data._id) return;
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: data._id });
            setCurrentChat(data._id);
            window.location.hash = `#${data._id}`
        });
    };

    return {
        handleStartPrivateChat
    }
};