import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import iconChevronDown from "assets/images/icon-chevron-down.png";
import iconClose from "assets/images/icons8-close-30.png";
import {UseConversation} from "services/hooks/messages/useConversation";
import {map as _map} from "lodash";
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import NotificationCenter from "views/pages/messages/chattingSection/components/NotificationCenter";
import MyMessage from "views/pages/messages/chattingSection/components/MyMessage";
import OthersMessage from "views/pages/messages/chattingSection/components/OthersMessage";
import Reminder from "views/pages/messages/chattingSection/components/reminder/Reminder";
import Poll from "views/pages/messages/chattingSection/components/poll/Poll";
import AddUsersNoti from "views/pages/messages/chattingSection/components/chatContent/AddUsersNoti";
import PinMessageNoti from "views/pages/messages/chattingSection/components/chatContent/pinMessageNoti";
import PollNoti from "views/pages/messages/chattingSection/components/poll/PollNoti";
import ReminderNoti from "views/pages/messages/chattingSection/components/reminder/ReminderNoti";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import SavedMessage from "assets/images/saved-messages.svg";
import AvatarGroupChat from "views/pages/messages/list/components/AvatarGroupChat";
import {dismissChatBox} from "redux/reducer/messages/MiniChat";
import {UseMessageHelper} from "../../../services/hooks/messages/useMessageHelper";
import {MiniChatContext} from "./ChatsOnRightSideBar";

type Props = {
    chat: ItemListConversation;
}
const MiniChatBoxDetail:FC<Props> = ({chat}) => {
    const {getListMessage} = UseConversation();
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const conversationMessagesList = useRef<HTMLDivElement>(null);
    const [reachedTop, setReachTop] = useState(false);
    const messagesData = useSelector((state: RootState) => state.listMessage.data.listMessage[chat._id]);
    const fakeMessagesData = useSelector((state: RootState) => state.listMessage.data.listFakeMessage[chat._id]);
    const hasMoreData = useSelector((state: RootState) => state.listMessage.data.hasMoreData[chat._id]);
    const nextCursor = useSelector((state: RootState) => state.listMessage.data.nextCursor[chat._id]);
    const isLoading = useSelector((state: RootState) => state.listMessage.data.isLoading[chat._id]);

    useEffect(() => {
        conversationMessagesList.current && conversationMessagesList.current.addEventListener("scroll", () => onScroll());
    },[conversationMessagesList]);

    useEffect(() => {
        if (reachedTop && !isLoading && hasMoreData) {
            getListMessage({lastestID: nextCursor, conversationID: chat._id});
            setReachTop(false);
        }
    }, [reachedTop, nextCursor]);

    const onScroll = () => {
        if (conversationMessagesList.current) {
            const { scrollTop, scrollHeight, clientHeight } = conversationMessagesList.current;
            if (scrollHeight + scrollTop - clientHeight < 200) {
                setReachTop(true)
            } else {
                setReachTop(false);
            }
        }
    };

    const memoizedValue = useCallback(() => {
        const value = parseMessageData(messagesData);
        return _map(value, (message, index) => renderMessage(message, value[index-1]))
    },[messagesData]);

    const memoizedFakeValue = useCallback(() => {
        const value = parseMessageData(fakeMessagesData);
        return _map(value, (message, index) => renderMessage(message, null, false))
    },[fakeMessagesData]);

    useEffect(() => {
        if (!messagesData||Object.keys(messagesData).length===0) {
            getListMessage({conversationID: chat._id})
        }
    },[chat._id]);

    const renderMessage = (message: ItemMessage, previousMessage: ItemMessage|null|undefined, shouldRenderDate = true) => {
        const messageCreatedAt = moment(message.createdAt);
        return (
            <div key={message._id}>
                {
                    shouldRenderDate&&previousMessage&&!messageCreatedAt.isSame(moment(previousMessage.createdAt), 'date')?
                        <NotificationCenter content={messageCreatedAt.format("DD/MM/YYYY")}/>:
                        (
                            shouldRenderDate&&!previousMessage?
                                <NotificationCenter content={messageCreatedAt.format("DD/MM/YYYY")}/>:
                                null
                        )
                }
                {renderPrimaryMessage(message)}
            </div>
        )
    }
    const renderPrimaryMessage = (message: ItemMessage) => {
        switch (message.type) {
            case 0:
            case 1:
            case 2:
                if (message.sender._id === profileId) {
                    return <MyMessage isMini={true} context={MiniChatContext} message={message}/>
                } else {
                    return <OthersMessage isMini={true} bgMessage={"bg-gray-100"} context={MiniChatContext} message={message}/>
                }
            case 4:
                return <Reminder isMini={true} context={MiniChatContext} message={message}/>;
            case 5:
                return <Poll message={message} chat={chat}/>;
            case 7:
                if (message.sender._id === profileId) {
                    return <MyMessage isMini={true} context={MiniChatContext} message={message}/>
                } else {
                    return <OthersMessage isMini={true} bgMessage={"bg-gray-100"} context={MiniChatContext} message={message}/>
                }
            case 101:
                // eslint-disable-next-line no-case-declarations
                const usersAdded = message.usersAssigned.map(user => user.bizfullname);
                // eslint-disable-next-line no-case-declarations
                const messsagesAdd = usersAdded.join("; ");
                return <AddUsersNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã thêm: <span class="text-black">${messsagesAdd}</span>`}/>
            case 108:
                return <PinMessageNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã ghim một tin nhắn`}/>
            case 111:
                return <PollNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã tham gia bình chọn: <span class="text-black">${message.poll.name}</span>`}/>
            case 112:
                return <PollNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã thay đổi bình chọn: <span class="text-black">${message.poll.name}</span>`}/>
            case 116:
            case 117:
                // eslint-disable-next-line no-case-declarations
                let didAccept = message.reminder.accepts.includes(message.sender._id)&&!message.reminder.rejects.includes(message.sender._id);
                if (!didAccept) {
                    didAccept = message.reminder.accepts.find(action => action._id === message.sender._id)&&!message.reminder.rejects.find(action => action._id === message.sender._id)
                }
                return <ReminderNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã ${didAccept?"xác nhận":"từ chối"} tham gia hội thoại: <span class="text-black">${message.reminder.content}</span>`}/>
        }
    }

    return (
        <div
            ref={conversationMessagesList}
            id={"conversation-messages-list"}
            className="t-mini-chat-content flex-1 h-[400px] items-center flex flex-col-reverse relative overflow-auto transition-all duration-150 pb-4">
            <div className={"w-full max-w-full pt-[20px] px-[20px]"}>
                {memoizedValue()}
                {memoizedFakeValue()}
            </div>
        </div>
    )
}

export default MiniChatBoxDetail;

const parseMessageData = (messagesData: {[key:string] : ItemMessage}) => {
    if (!messagesData) return [];
    return _map(Object.values(messagesData), message => message)
}