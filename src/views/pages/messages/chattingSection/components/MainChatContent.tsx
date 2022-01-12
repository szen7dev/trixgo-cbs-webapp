import React, {FC, useContext, useEffect, useRef, useState} from "react";
import NotificationCenter from "./NotificationCenter";
import OthersMessage from "./OthersMessage";
import MyMessage from "./MyMessage";
import {map as _map} from "lodash";
import {UseConversation} from "services/hooks/messages/useConversation";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {MessageContext} from "../../home/index_v2";
import ArrowDown from "../../../../../assets/images/icon-arrow-down.svg";

type Props = {
    chat: ItemListConversation
}

const MainChatContent:FC<Props> = ({chat}) => {
    const {getListMessage} = UseConversation();
    const currentUser = localStorage.getItem("currentUser")??"";
    const profileId = JSON.parse(currentUser)?._id;
    const {currentChat} = useContext(MessageContext);

    const conversationMessagesList = useRef<HTMLDivElement>(null);
    const [reachedTop, setReachTop] = useState(false);
    const messagesData = useSelector((state: RootState) => state.listMessage.data.listMessage[chat._id]);
    const hasMoreData = useSelector((state: RootState) => state.listMessage.data.hasMoreData[chat._id]);
    const nextCursor = useSelector((state: RootState) => state.listMessage.data.nextCursor[chat._id]);
    const isLoading = useSelector((state: RootState) => state.listMessage.data.isLoading[chat._id]);

    useEffect(() => {
        getListMessage({conversationID: currentChat})
    },[currentChat])

    useEffect(() => {
        scrollToBottom()
    }, [messagesData])

    useEffect(() => {
        conversationMessagesList.current&&conversationMessagesList.current.addEventListener("scroll", () => onScroll());
    },[conversationMessagesList])

    useEffect(() => {
        if (reachedTop && !isLoading && hasMoreData) {
            getListMessage({lastestID: nextCursor, conversationID: currentChat});
            setReachTop(false);
        }
    }, [reachedTop, nextCursor])

    const onScroll = () => {
        if (conversationMessagesList.current) {
            const { scrollTop, offsetTop } = conversationMessagesList.current;
            if (offsetTop > scrollTop) {
                setReachTop(true);
            } else {
                setReachTop(false);
            }
        }
    };

    const scrollToBottom = () => {
        if (conversationMessagesList.current) {
            conversationMessagesList.current.scrollTop = conversationMessagesList.current.scrollHeight;
        }
    }

    const renderMessage = (message: any) => {
        switch (message.type) {
            case 0:
                if (message.sender._id === profileId) {
                    return <MyMessage key={message._id} message={message}/>
                } else {
                    return <OthersMessage key={message._id} message={message}/>
                }
            case 108:
                return <NotificationCenter key={message._id} content={`${message.sender.fullname} đã ghim một tin nhắn`}/>
        }
    }
    return (
        <>
            <div
                ref={conversationMessagesList}
                style={{scrollBehavior: "smooth"}}
                id={"conversation-messages-list"}
                className={"flex-1 h-full items-center flex flex-col relative overflow-auto transition-all duration-150"}
            >
                <div className={"w-full max-w-[645px] pt-[20px] px-[20px]"}>
                    {
                        messagesData?
                            _map(Object.values(messagesData), message => renderMessage(message)):
                            null
                    }
                </div>
            </div>
            <button
                onClick={() => scrollToBottom()}
                className={"animate-bounce w-[48px] h-[48px] rounded-full absolute bottom-100px bg-white flex items-center justify-center right-40px z-10"}>
                <img src={ArrowDown} alt={"arrow down"}/>
                <span
                    className={"absolute -top-1 -right-1 w-[24px] h-[24px] bg-positive rounded-full flex items-center justify-center text-white"}>3</span>
            </button>
        </>
    )
}

export default MainChatContent;
