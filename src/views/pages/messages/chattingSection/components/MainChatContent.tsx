import React, {FC, useCallback, useContext, useEffect, useMemo, useRef, useState} from "react";
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

import Reminder from "./Reminder";
import moment from "moment";

type Props = {
    chat: ItemListConversation
}

const MainChatContent:FC<Props> = ({chat}) => {
    const {getListMessage} = UseConversation();
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profileId = JSON.parse(currentUser)?._id;
    const {currentChat} = useContext(MessageContext);

    const conversationMessagesList = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [reachedTop, setReachTop] = useState(false);
    const messagesData = useSelector((state: RootState) => state.listMessage.data.listMessage[chat._id]);
    const fakeMessagesData = useSelector((state: RootState) => state.listMessage.data.listFakeMessage[chat._id]);
    const hasMoreData = useSelector((state: RootState) => state.listMessage.data.hasMoreData[chat._id]);
    const nextCursor = useSelector((state: RootState) => state.listMessage.data.nextCursor[chat._id]);
    const isLoading = useSelector((state: RootState) => state.listMessage.data.isLoading[chat._id]);

    const memoizedValue = useCallback(() => {
        const value = parseMessageData(messagesData);
        return _map(value, (message, index) => renderMessage(message, value[index-1]))
    },[messagesData]);

    const memoizedFakeValue = useCallback(() => {
        const value = parseMessageData(fakeMessagesData);
        return _map(value, (message, index) => renderMessage(message, null, false))
    },[fakeMessagesData]);

    useEffect(() => {
        getListMessage({conversationID: currentChat})
    },[currentChat]);

    useEffect(() => {
        conversationMessagesList.current && conversationMessagesList.current.addEventListener("scroll", () => onScroll());
    },[conversationMessagesList]);

    useEffect(() => {
        if (reachedTop && !isLoading && hasMoreData) {
            getListMessage({lastestID: nextCursor, conversationID: currentChat});
            setReachTop(false);
        }
    }, [reachedTop, nextCursor])

    const userUnreadMessage = useCallback(() => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chat, profileId])

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

    const scrollToBottom = () => {
        if (conversationMessagesList.current) {
            conversationMessagesList.current.scrollTo({top: conversationMessagesList.current.scrollHeight, behavior: "smooth" });
        }
    }

    const renderMessage = (message: ItemMessage, previousMessage: ItemMessage|null|undefined, shouldRenderDate = true) => {
        const messageCreatedAt = moment(message.createdAt);
        return (
            <div key={message._id}>
                {
                    shouldRenderDate&&previousMessage&&!messageCreatedAt.isSame(moment(previousMessage.createdAt), 'date')?
                        <NotificationCenter content={messageCreatedAt.format("DD/MM/YYYY")}/>:
                        (
                            !previousMessage?
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
                    return <MyMessage message={message}/>
                } else {
                    return <OthersMessage message={message}/>
                }
            case 4:
                return <div>
                    <Reminder message={message}/>
                </div>;
            case 108:
                return <NotificationCenter content={`${message.sender.fullname} đã ghim một tin nhắn`}/>
            case 116:
            case 117:
                return <NotificationCenter content={`${message.sender.fullname} đã ${message.reminder.accepts.includes(message.sender._id)&&!message.reminder.rejects.includes(message.sender._id)?"xác nhận":"từ chối"} tham gia hội thoại: <b class="text-primary">${message.reminder.content}</b>`}/>
        }
    }
    return (
        <>
            <div
                ref={conversationMessagesList}
                id={"conversation-messages-list"}
                className={"flex-1 h-full items-center flex flex-col-reverse relative overflow-auto transition-all duration-150"}
            >
                <div className={"w-full max-w-[645px] pt-[20px] px-[20px]"}>
                    {memoizedValue()}
                    {memoizedFakeValue()}
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

export default MainChatContent;
