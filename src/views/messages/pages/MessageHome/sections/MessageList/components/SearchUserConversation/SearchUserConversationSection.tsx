import React, {FC, useContext, useEffect, useRef, useState} from "react";
import IconBackGray from "assets/images/icon-back-gray.svg";
import {SearchUserAndConversationContext} from "../HeaderMessageList";
import SearchIcon from "assets/images/icons8-search-120.png";

import {useUser} from "services/hooks/useUser";
import {map as _map} from "lodash";
import PlusIcon from "assets/images/icons8-plus-math-96.svg";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {MessageContext} from "../../../../index";
import {SearchChatItem} from "./SearchChatItem";
import {useDispatch} from "react-redux";
import {appendFakeItemListConversation} from "redux/reducer/messages/ListConversation";

export const SearchUserConversationSection:FC = () => {
    const {setShowSearch, showSearch} = useContext(SearchUserAndConversationContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const listFriendsRef = useRef<HTMLDivElement>(null);
    const {socketRef,setCurrentChat, currentChat} = useContext(MessageContext);
    const socket = socketRef.current;
    const dispatch = useDispatch();

    useEffect(() => {
        inputRef.current&&inputRef.current.focus()
    }, [inputRef]);
    useEffect(() => {
        if (listFriendsRef.current) {
            listFriendsRef.current.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                if (listFriendsRef.current) {
                    listFriendsRef.current.scrollLeft = listFriendsRef.current.scrollLeft + evt.deltaY;
                }
            });
        }
    }, [listFriendsRef])

    const [searchTerm, setSearchTerm] = useState('');
    const params = {limit: 10, select: 'fullname bizfullname email phone image', populates: '{"path": "company", "select": "name"}', keyword: searchTerm}
    const { listFriends, nextPageListFriends , hasNextPageListFriends } = useUser(params);

    const paramsListConversation = {limit: 10, keyword: searchTerm};
    const {listConversations, nextPageListConversations, hasListConversationNextPage, createConversation} = UseListConversation(paramsListConversation, showSearch);

    const handleStartPrivateChat = (memberId: string) => {
        createConversation({
            name: "",
            description: "",
            isPrivate: true,
            membersID: [memberId]
        }).then(data => {
            if (currentChat === data._id) return;
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', {
                conversationID: data._id,
                select: JSON.stringify({ sender:"bizfullname" }) ,
                filter: JSON.stringify({
                    author: 0,
                    taskID: 0,
                    links: 0,
                    createAt: 0,
                    __v: 0,
                    // config: 0
                })
            });
            dispatch(appendFakeItemListConversation({conversationId: data._id, conversation: data}))
            setCurrentChat(data._id);
            window.location.hash = `#${data._id}`
        });
        setShowSearch(false)
    }

    const handleSearchTerm = (str: string) => {
        setSearchTerm(str)
    }

    return (
        <div className={"absolute top-0 w-full h-full overflow-auto bg-white z-20 left-0 no-webkit-scrollbar"}>
            <div className={"sticky top-0 bg-white w-full z-55"}>
                <div className={"flex h-[56px] p-2 items-center"}>
                    <button onClick={() => setShowSearch(false)} className={"flex w-[40px] h-[40px] items-center justify-center mr-[14px]"}>
                        <img  src={IconBackGray} alt={"----"}/>
                    </button>
                    <div className={"relative flex items-center flex-1"}>
                        <img  src={SearchIcon} alt={"icon SearchMessage"} className={"absolute w-[24px] h-[24px] left-2"}/>
                        <input
                            onChange={e => handleSearchTerm(e.target.value)}
                            ref={inputRef}
                            className={"h-[44px] w-full bg-gray-100 px-[12px] py-[10px] pl-[36px] rounded-full focus:outline-none"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}
                        />
                    </div>
                </div>
                <div ref={listFriendsRef} className={"flex max-w-full border-t border-gray-100 border-b overflow-auto no-webkit-scrollbar p-[5px]"}>
                    {
                        _map(listFriends, friend => (
                            <button
                                title={friend.bizfullname||friend.fullname}
                                key={friend._id}
                                onClick={() => handleStartPrivateChat(friend._id)}
                                className={"hover:bg-gray-100 rounded-lg w-[78px] flex flex-col items-center py-[15px] px-[10px]"}>
                                <img  src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`} alt={'======'}  className={"w-[54px] h-[54px] rounded-full"}/>
                                <div className={"truncate text-xs max-w-full mt-[5px]"}>{friend.bizfullname||friend.fullname}</div>
                            </button>
                        ))
                    }
                    {
                        hasNextPageListFriends &&
                        <button
                            onClick={() => nextPageListFriends()}
                            className={"rounded-lg w-[78px] min-w-[78px] flex flex-col items-center py-[15px] px-[10px] justify-center"}>
                            <img src={PlusIcon} className={"w-[24px] h-[24px]"} alt={"==="}/>
                        </button>
                    }
                </div>
                <div className={"font-semibold text-gray-400 p-[5px]"}>Hội thoại ({listConversations.length})</div>
            </div>
            <div className={"px-[5px]"}>
                {
                    _map(listConversations, conversation => (
                        <SearchChatItem
                            itemClickAction={(chat) => {
                                dispatch(appendFakeItemListConversation({conversationId: chat._id, conversation: chat}))
                                setCurrentChat(chat._id);
                                setShowSearch(false)
                            }}
                            chat={conversation} key={conversation._id}/>
                    ))
                }
                {
                    hasListConversationNextPage &&
                    <button
                        onClick={() => nextPageListConversations()}
                        className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                        Xem thêm
                    </button>
                }
            </div>
        </div>
    )
}