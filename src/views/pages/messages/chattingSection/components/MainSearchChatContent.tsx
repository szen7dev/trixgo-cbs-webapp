import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import NotificationCenter from "./NotificationCenter";
import OthersMessage from "./OthersMessage";
import MyMessage from "./MyMessage";
import {map as _map} from "lodash";
import {UseConversation} from "services/hooks/messages/useConversation";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {MessageContext} from "../../home/index_v2";
import ArrowDown from "assets/images/icon-arrow-down.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";
import 'react-circular-progressbar/dist/styles.css';
import Reminder from "./reminder/Reminder";
import moment from "moment";
import angered from "assets/emoji/angered.png";
import dislike from "assets/emoji/dis-like.png";
import heart from "assets/emoji/heart.png";
import laugh from "assets/emoji/laugh.png";
import like from "assets/emoji/like.png";
import sad from "assets/emoji/sad.png";
import surprise from "assets/emoji/surprise.png";
import ReminderNoti from "./reminder/ReminderNoti";
import Poll from "./poll/Poll";
import PollNoti from "./poll/PollNoti";
import AddUsersNoti from "./chatContent/AddUsersNoti";
import PinMessageNoti from "./chatContent/pinMessageNoti";

export const listEmoji = [
    {
        id: 1,
        icon: heart,
        value: 1
    },
    {
        id: 2,
        icon: laugh,
        value: 2
    },
    {
        id: 3,
        icon: surprise,
        value: 3
    },
    {
        id: 4,
        icon: sad,
        value: 4
    },
    {
        id: 5,
        icon: angered,
        value: 5
    },
    {
        id: 6,
        icon: like,
        value: 6
    },
    {
        id: 7,
        icon: dislike,
        value: 7
    }
];

type Props = {
    chat: ItemListConversation
}

const MainSearchChatContent:FC<Props> = ({chat}) => {
    const {goToMessagePosition} = UseConversation();
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;

    const conversationMessagesList = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [reachedTop, setReachTop] = useState(false);
    const messagesData = useSelector((state: RootState) => state.searchMessage.data.listSearchMessage[chat._id]);
    const hasMoreDataBack = useSelector((state: RootState) => state.searchMessage.data.hasMoreDataBack[chat._id]);
    const hasMoreDataFront = useSelector((state: RootState) => state.searchMessage.data.hasMoreDataFront[chat._id]);
    const nextCursor = useSelector((state: RootState) => state.searchMessage.data.nextCursor[chat._id]);
    const prevCursor = useSelector((state: RootState) => state.searchMessage.data.prevCursor[chat._id]);
    const isLoading = useSelector((state: RootState) => state.listMessage.data.isLoading[chat._id]);

    const memoizedValue = useCallback(() => {
        const value = parseMessageData(messagesData);
        return _map(value, (message, index) => renderMessage(message, value[index-1]))
    },[messagesData]);

    useEffect(() => {
        conversationMessagesList.current && conversationMessagesList.current.addEventListener("scroll", () => onScroll());
    },[conversationMessagesList]);

    useEffect(() => {
        if (reachedTop && !isLoading && hasMoreDataBack) {
            goToMessagePosition({messageID: prevCursor, conversationID: chat._id}, false, "back");
            setReachTop(false);
        }
    }, [reachedTop, prevCursor])

    const userUnreadMessage = useCallback(() => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chat, profileId])

    const onScroll = () => {
        if (conversationMessagesList.current) {
            const { scrollTop, scrollHeight, clientHeight } = conversationMessagesList.current;
            if (scrollHeight + scrollTop - clientHeight < 300) {
                setReachTop(true)
            } else {
                setReachTop(false);
            }
        }
    };

    const scrollToBottom = () => {
        if (conversationMessagesList.current) {
            conversationMessagesList.current.scrollTo({top: conversationMessagesList.current.scrollHeight, behavior: "smooth" });
        }
    }

    const renderMessage = (message: ItemMessage, previousMessage: ItemMessage|null|undefined, shouldRenderDate = true) => {
        const messageCreatedAt = moment(message.createdAt);
        return (
            <div key={message._id} id={`message-${message._id}`}>
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
                    return <MyMessage context={MessageContext} message={message}/>
                } else {
                    return <OthersMessage context={MessageContext} message={message}/>
                }
            case 4:
                return <Reminder context={MessageContext} message={message}/>;
            case 5:
                return <Poll message={message} chat={chat}/>;
            case 7:
                if (message.sender._id === profileId) {
                    return <MyMessage context={MessageContext} message={message}/>
                } else {
                    return <OthersMessage context={MessageContext} message={message}/>
                }
            case 101:
                // eslint-disable-next-line no-case-declarations
                const usersAdded = message.usersAssigned.map(user => user.bizfullname);
                // eslint-disable-next-line no-case-declarations
                const messsagesAdd = usersAdded.join("; ");
                return <AddUsersNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã thêm: <span class="text-black">${messsagesAdd}</span>`}/>
            case 108:
                return <PinMessageNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã ghim một tin nhắn`}/>
            case 111:
                return <PollNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã tham gia bình chọn: <span class="text-black">${message.poll.name}</span>`}/>
            case 112:
                return <PollNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã thay đổi bình chọn: <span class="text-black">${message.poll.name}</span>`}/>
            case 116:
            case 117:
                // eslint-disable-next-line no-case-declarations
                let didAccept = message.reminder.accepts.includes(message.sender._id)&&!message.reminder.rejects.includes(message.sender._id);
                if (!didAccept) {
                    didAccept = message.reminder.accepts.find(action => action._id === message.sender._id)&&!message.reminder.rejects.find(action => action._id === message.sender._id)
                }
                return <ReminderNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã ${didAccept?"xác nhận":"từ chối"} tham gia hội thoại: <span class="text-black">${message.reminder.content}</span>`}/>
        }
    }
    return (
        <>
            <div
                ref={conversationMessagesList}
                id={"conversation-messages-list"}
                className={"flex-1 h-full items-center flex flex-col-reverse relative overflow-auto transition-all duration-150 pb-4"}
            >
                <div className={"w-full max-w-[645px] pt-[20px] px-[20px]"}>
                    {memoizedValue()}
                </div>
                <div style={{ float:"left", clear: "both" }} ref={messagesEndRef} />
            </div>
            {
                userUnreadMessage()>0 &&
                <button
                    onClick={() => scrollToBottom()}
                    className={"animate-bounce w-[48px] h-[48px] rounded-full absolute bottom-100px bg-white flex items-center justify-center right-40px z-10"}>
                    <img  src={ArrowDown} alt={"arrow down"}/>
                    <span
                        className={"absolute -top-1 -right-1 w-[24px] h-[24px] bg-positive rounded-full flex items-center justify-center text-white"}>{userUnreadMessage()}</span>
                </button>
            }
        </>
    )
}

const parseMessageData = (messagesData: {[key:string] : ItemMessage}) => {
    if (!messagesData) return [];
    return _map(Object.values(messagesData), message => message)
}

export default MainSearchChatContent;
