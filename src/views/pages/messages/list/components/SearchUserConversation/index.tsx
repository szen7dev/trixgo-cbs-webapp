import React, {FC, useContext, useEffect, useRef, useState} from "react";
import IconBackGray from "assets/images/icon-back-gray.svg";
import {SearchUserAndConversationContext} from "../SearchUserAndConversation";
import SearchIcon from "assets/images/icons8-search-120.png";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {useUser} from "services/hooks/useUser";
import {map as _map} from "lodash";
import PlusIcon from "assets/images/icons8-plus-math-96.svg";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {MessageContext} from "../../../home/index_v2";
import SearchChatItem from "./searchChatItem";

const SearchUserConversationSection:FC = () => {
    const {setShowSearch} = useContext(SearchUserAndConversationContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const listFriendsRef = useRef<HTMLDivElement>(null);
    const {socketRef,setCurrentChat, currentChat} = useContext(MessageContext);
    const socket = socketRef.current;

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
    const [pageParam, setPageParam] = useState('');
    const params = {limit: 10, select: 'fullname email phone image', populates: '{"path": "company", "select": "name"}', lastestID: pageParam, keyword: searchTerm}
    const { listFriends, nextCursor } = useUser(pageParam, params);
    const {createConversation} = UseListConversation();

    const paramsListConversation = {limit: 2, keyword: searchTerm};

    const {listConversations, nextPageListConversations, hasListConversationNextPage} = UseListConversation(paramsListConversation);

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
        setShowSearch(false)
    }

    const handleSearchTerm = (str: string) => {
        setSearchTerm(str)
    }

    return (
        <div className={"absolute top-0 w-full h-full overflow-auto bg-white z-20 left-0 no-webkit-scrollbar"}>
            <div className={"sticky top-0 bg-white w-full z-55"}>
                <div className={"flex h-[56px] p-2 items-center"}>
                    <button onClick={() => setShowSearch(false)} className={"flex w-[40px] h-[40px] items-center justify-center"}>
                        <LazyLoadImage effect="blur" src={IconBackGray} alt={"----"}/>
                    </button>
                    <div className={"relative flex items-center flex-1"}>
                        <LazyLoadImage effect="blur" src={SearchIcon} alt={"icon search"} wrapperClassName={"absolute w-[14px] h-[14px] left-2"} className={"w-full h-full"}/>
                        <input
                            onChange={e => handleSearchTerm(e.target.value)}
                            ref={inputRef}
                            className={"h-[30px] w-full bg-gray-50 pl-10 rounded rounded-full focus:outline-blue-300"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}
                        />
                    </div>
                </div>
                <div ref={listFriendsRef} className={"flex max-w-full border-t border-gray-100 border-b overflow-auto no-webkit-scrollbar p-[5px]"}>
                    {
                        _map(listFriends, friend => (
                            <button
                                key={friend._id}
                                onClick={() => handleStartPrivateChat(friend._id)}
                                className={"hover:bg-gray-200 rounded-lg w-[78px] flex flex-col items-center py-[15px] px-[10px]"}>
                                <LazyLoadImage effect="blur" src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`} alt={'======'} wrapperClassName={"w-[54px] h-[54px] rounded-full"} className={"w-full h-full rounded-full"}/>
                                <div className={"truncate text-sm max-w-full mt-[5px]"}>{friend.fullname}</div>
                            </button>
                        ))
                    }
                    {
                        nextCursor &&
                        <button
                            onClick={() => setPageParam(nextCursor)}
                            className={"rounded-lg w-[78px] flex flex-col items-center py-[15px] px-[10px] justify-center"}>
                            <LazyLoadImage src={PlusIcon} wrapperClassName={"w-[24px] h-[24px]"}
                                           className={"w-full h-full"}/>
                        </button>
                    }
                </div>
                <div className={"font-semibold text-gray-400 p-[5px]"}>Hội thoại ({listConversations.length})</div>
            </div>
            <div className={"px-[5px]"}>
                {
                    _map(listConversations, conversation => (
                        <SearchChatItem chat={conversation} key={conversation._id}/>
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

export default SearchUserConversationSection;