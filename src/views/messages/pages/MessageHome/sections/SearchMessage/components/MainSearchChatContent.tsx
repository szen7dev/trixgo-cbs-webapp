import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import {UseConversation} from "services/hooks/messages/useConversation";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {MessageContext} from "../../../index";
import ArrowDown from "assets/images/icon-arrow-down.svg";
import {ItemMessage} from "typings/apis/messages/listMessage";
import 'react-circular-progressbar/dist/styles.css';
import {
    Reminder,
    ReminderNoti,
    Poll,
    PollNoti,
    AddUsersNoti,
    PinMessageNoti,
    MyMessage,
    OthersMessage,
    NotificationCenter,
    ChangeNameNoti, ChangeAvatarNoti
} from "../../ChattingSection";
import moment from "moment";
import {dismissSearchMode} from "redux/reducer/messages/SearchMessage";

type Props = {
    chat: ItemListConversation
}

export const MainSearchChatContent:FC<Props> = ({chat}) => {
    const {goToMessagePosition} = UseConversation();
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const dispatch = useDispatch();

    const conversationMessagesList = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [reachedTop, setReachTop] = useState(false);
    const [reachedBottom, setReachBottom] = useState(false);
    const messagesData = useSelector((state: RootState) => state.searchMessage.data.listSearchMessage[chat._id]);
    const hasMoreDataBack = useSelector((state: RootState) => state.searchMessage.data.hasMoreDataBack[chat._id]);
    const hasMoreDataFront = useSelector((state: RootState) => state.searchMessage.data.hasMoreDataFront[chat._id]);
    const nextCursor = useSelector((state: RootState) => state.searchMessage.data.nextCursor[chat._id]);
    const prevCursor = useSelector((state: RootState) => state.searchMessage.data.prevCursor[chat._id]);
    const isLoading = useSelector((state: RootState) => state.searchMessage.data.isLoading[chat._id]);
    const shouldStartListenEvent = useSelector((state: RootState) => state.searchMessage.data.shouldStartListenEvent[chat._id]);

    const memoizedValue = useCallback(() => {
        const value = parseMessageData(messagesData);
        return _map(value.sort((a,b) => {
            if (moment(b.createAt).toDate().getTime() < moment(a.createAt).toDate().getTime()) {
                return 1
            }
            return -1
        }), (message, index) => renderMessage(message, value[index-1]))
    },[messagesData]);

    useEffect(() => {
        conversationMessagesList.current && conversationMessagesList.current.addEventListener("scroll", () => onScroll());
    },[conversationMessagesList]);

    useEffect(() => {
        if (reachedTop && !isLoading && hasMoreDataBack && shouldStartListenEvent) {
            goToMessagePosition({messageID: prevCursor, conversationID: chat._id}, false, "back");
            setReachTop(false);
        }
    }, [reachedTop, prevCursor]);

    useEffect(() => {
        if (reachedBottom && !isLoading && hasMoreDataFront && shouldStartListenEvent) {
            goToMessagePosition({messageID: nextCursor, conversationID: chat._id}, false, "front");
            setReachBottom(false);
        }
    }, [reachedBottom, nextCursor])

    const userUnreadMessage = useCallback(() => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chat, profileId])

    const onScroll = () => {
        if (conversationMessagesList.current) {
            const { scrollTop, scrollHeight, clientHeight } = conversationMessagesList.current;
            if (scrollHeight + scrollTop - clientHeight < 100) {
                setReachTop(true)
            } else {
                setReachTop(false);
            }

            if (scrollTop > -100) {
                setReachBottom(true);
            } else {
                setReachBottom(false);
            }
        }
    };

    const scrollToBottom = () => {
        if (conversationMessagesList.current) {
            conversationMessagesList.current.scrollTo({top: conversationMessagesList.current.scrollHeight, behavior: "smooth" });
        }
        dispatch(dismissSearchMode({conversationId: chat._id}));
    }

    const renderMessage = (message: ItemMessage, previousMessage: ItemMessage|null|undefined, shouldRenderDate = true) => {
        const messageCreatedAt = moment(message.createdAt);
        return (
            <div key={message._id} className={"transition-all"} id={`message-${message._id}`}>
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
                return <Poll message={message} chat={chat} context={MessageContext}/>;
            case 7:
                if (message.sender._id === profileId) {
                    return <MyMessage context={MessageContext} message={message}/>
                } else {
                    return <OthersMessage context={MessageContext} message={message}/>
                }
            case 101:
                return <AddUsersNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã thêm: <span class="text-black">${message.usersAssigned.map(user => user.bizfullname).join("; ")}</span>`}/>
            case 102:
                return <AddUsersNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã xoá: <span class="text-black">${message.usersAssigned.map(user => user.bizfullname).join("; ")}</span>`}/>
            case 103:
                return <ChangeNameNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã đổi tên cuộc hội thoại`}/>;
            case 104:
                return <ChangeAvatarNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã đổi ảnh đại diện cuộc hội thoại`}/>;
            case 107:
                return <AddUsersNoti isLeave={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã rời khỏi cuộc hội thoại`}/>;
            case 108:
                return <PinMessageNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã ghim một tin nhắn`}/>
            case 109:
                return <PinMessageNoti content={`${(message.sender.bizfullname||message.sender.fullname)} đã bỏ ghim một tin nhắn`}/>
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
                id={"conversation-messages-MessageList"}
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
