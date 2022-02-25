import {FC, useContext, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseConversation} from "services/hooks/messages/useConversation";

type Props = {
    context: any;
    currentChat: string
}
export const UnreadMessageController:FC<Props> = ({currentChat, context}) => {
    const {socketRef} = useContext(context);
    const socket = socketRef.current;

    const [isFocus, setIsFocus] = useState(document.hasFocus());

    const unreadMessages = useSelector((state: RootState) => state.unreadMessages.data.unreadMessages[currentChat]);
    const {updateSeenMessage} = UseConversation();

    useEffect(() => {
        window.addEventListener("focus", onFocus)
        window.addEventListener("blur", onblur)

        return () => {
            window.removeEventListener("focus", onFocus)
            window.removeEventListener("blur", onblur)
        }
    },[])

    useEffect(() => {
        if (unreadMessages&&unreadMessages.length>0&&isFocus) {
            updateSeenMessage({conversationID: currentChat, messagesID: unreadMessages}).then((data) => {
                socket.emit("CHATTING_CSS_UPDATE_SEEN_MESSAGE",{conversationID: currentChat, messagesID: unreadMessages})
            })
        }
    },[unreadMessages, currentChat, isFocus]);

    const onFocus = () => {
        setIsFocus(true);
    }

    const onblur = () => {
        setIsFocus(false);
    }

    return null
}