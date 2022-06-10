import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseConversation} from "services/hooks/messages/useConversation";
import {map as _map} from "lodash";
import {ItemMessage} from "typings/apis/messages/listMessage";
import moment from "moment";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {MiniChatContext} from "../../index";
import {
    Reminder,
    ReminderNoti,
    Poll,
    PollNoti,
    AddUsersNoti,
    PinMessageNoti,
    NotificationCenter,
    MyMessage,
    OthersMessage,
    ChangeNameNoti, ChangeAvatarNoti
} from "views/messages/pages/MessageHome/sections/ChattingSection";
import {Oval} from "react-loader-spinner";
import {updateUsersMissMessageToConversation} from "redux/reducer/messages/ListConversation";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {setIsReviewOldMessages} from "redux/reducer/messages/ListMessage";
import {NpsNoti} from "views/messages/pages/MessageHome/sections/ChattingSection/components/Nps/NpsNoti";

type Props = {
    chat: ItemListConversation;
}
export const MiniChatBoxDetail:FC<Props> = ({chat}) => {
    const {getListMessage} = UseConversation();
    const {markReadConversation} = UseListConversation();
    const dispatch = useDispatch();
    const {isDragOver} = useContext(MiniChatContext);

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
            dispatch(setIsReviewOldMessages({conversationId: chat._id, isReview: true}))
            if (scrollHeight + scrollTop - clientHeight < 200) {
                setReachTop(true)
            } else {
                setReachTop(false);
            }
            if (scrollTop >= 0) {
                dispatch(setIsReviewOldMessages({conversationId: chat._id, isReview: false}))
            }
        }
    };

    const memoizedValue = useCallback(() => {
        const value = parseMessageData(messagesData);
        return _map(value.sort((a,b) => {
            if (moment(b.createAt).toDate().getTime() < moment(a.createAt).toDate().getTime()) {
                return 1
            }
            return -1
        }), (message, index) => renderMessage(message, value[index-1]))
    },[messagesData]);

    const memoizedFakeValue = useCallback(() => {
        const value = parseMessageData(fakeMessagesData);
        return _map(value.sort((a,b) => {
            if (moment(b.createAt).toDate().getTime() < moment(a.createAt).toDate().getTime()) {
                return 1
            }
            return -1
        }), (message, index) => renderMessage(message, null, false))
    },[fakeMessagesData]);

    const parseMessageData = (messagesData: {[key:string] : ItemMessage}) => {
        if (!messagesData) return [];
        return _map(Object.values(messagesData), message => message)
    }

    const userUnreadMessage = useCallback(() => {
        const userUnread = chat?.usersMissMessage?.find(unread => unread.userID === profileId)
        return userUnread?.amount??0
    }, [chat, profileId])

    useEffect(() => {
        if (userUnreadMessage()>0) {
            markAsRead()
        }
        const conversationMessagesList = document.getElementById("conversation-messages-MessageList");
        if (conversationMessagesList) {
            conversationMessagesList.scrollTop = 0;
        }
        getListMessage({conversationID: chat._id})
    },[chat._id]);

    const markAsRead = () => {
        markReadConversation({
            conversationID: chat._id
        }).then(data => {
            dispatch(updateUsersMissMessageToConversation({
                conversationId: chat._id,
                usersMissMessage: data.usersMissMessage
            }))
        })
    }

    const renderMessage = (message: ItemMessage, previousMessage: ItemMessage|null|undefined, shouldRenderDate = true) => {
        const messageCreatedAt = moment(message.createAt);
        const isOut = message.sender._id === profileId;
        let classOrigin = (isOut ? "is-out":"is-in");
        if (![0,1,2,7].includes(message.type)) {
            classOrigin = "is-middle"
        }
        return (
            <div key={message._id} id={`message-${message._id}`} className={(message.noAnimation?"":"bubble-animation") + " " + classOrigin}>
                {
                    shouldRenderDate&&previousMessage&&!messageCreatedAt.isSame(moment(previousMessage.createAt), 'date')?
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
                return <Poll message={message} chat={chat} context={MiniChatContext} isMini={true}/>;
            case 7:
                if (message.sender._id === profileId) {
                    return <MyMessage isMini={true} context={MiniChatContext} message={message}/>
                } else {
                    return <OthersMessage isMini={true} bgMessage={"bg-gray-100"} context={MiniChatContext} message={message}/>
                }
            case 8:
                if (message.sender._id === profileId) {
                    return <MyMessage isMini={true} context={MiniChatContext} message={message}/>
                } else {
                    return <OthersMessage isMini={true} context={MiniChatContext} message={message}/>
                }
            case 101:
                return <AddUsersNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã thêm: <span class="text-black">${message.usersAssigned.map(user => user.bizfullname).join("; ")}</span>`}/>
            case 102:
                return <AddUsersNoti isMini={true} isLeave={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã xoá: <span class="text-black">${message.usersAssigned.map(user => user.bizfullname).join("; ")}</span>`}/>
            case 103:
                return <ChangeNameNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã đổi tên cuộc hội thoại`}/>;
            case 104:
                return <ChangeAvatarNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã đổi ảnh đại diện cuộc hội thoại`}/>;
            case 105:
                return <AddUsersNoti isMini={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã đặt: <span class="text-black">${message.usersAssigned.map(user => user.bizfullname).join("; ")}</span> với trai trò Admin`}/>;
            case 106:
                return <AddUsersNoti isMini={true} isLeave={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã xóa: <span class="text-black">${message.usersAssigned.map(user => user.bizfullname).join("; ")}</span> với vai trò Admin`}/>
            case 107:
                return <AddUsersNoti isMini={true} isLeave={true} content={`${(message.sender.bizfullname||message.sender.fullname)} đã rời khỏi cuộc hội thoại`}/>;
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
            case 120:
                return <NpsNoti
                    isMini={true}
                    content={`${(message.sender.bizfullname || message.sender.fullname)} đã tham gia NPS: <span class="text-black">${message.nps.service.name}</span> trong cuộc hội thoại`}/>
            case 121:
                return <NpsNoti
                    isMini={true}
                    content={`${(message.sender.bizfullname || message.sender.fullname)} đã thay đổi NPS: <span class="text-black">${message.nps.service.name}</span> trong cuộc hội thoại`}/>
        }
    }

    return (
        <>
            {
                isLoading&&
                <div className={"absolute w-full flex items-center justify-center z-21 spinner-animation transition-all"}>
                    <div className={"bg-white rounded-full p-1"}>
                        <Oval color={"#0d6efd"} strokeWidth={3} secondaryColor={"#fff"} height={30} width={30}/>
                    </div>
                </div>
            }
            <div
                ref={conversationMessagesList}
                id={"conversation-messages-MessageList"}
                className="t-mini-chat-content flex-1 h-[400px] items-center flex flex-col-reverse relative overflow-auto transition-all duration-150 pb-4">
                <div className={"w-full max-w-full pt-[20px] px-[10px]"}>
                    {memoizedValue()}
                    {memoizedFakeValue()}
                </div>
            </div>
            <div id={"drop-mask"} className={"absolute top-0 w-full h-full flex items-center justify-center bg-white border-primary border border-dashed z-50 border-2 rounded-md bg-opacity-50 backdrop-blur-md " + (!isDragOver ? 'hidden':'block')}>
                <div className={"text-center flex items-center justify-center text-lg text-primary"}>
                    Thả file vào đây để gửi...
                </div>
            </div>
        </>
    )
}