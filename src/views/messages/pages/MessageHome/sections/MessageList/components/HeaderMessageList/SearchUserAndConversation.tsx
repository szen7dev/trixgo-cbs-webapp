import React, {ChangeEvent, FC, useContext, useRef, useState} from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import {useUserSystem} from "services/hooks/users/useUserSystem";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {MessageContext, populates} from "../../../../../../shareComponents/layouts/MessagesLayoutV2";
import {appendFakeItemListConversation} from "redux/reducer/messages/ListConversation";
import {useDispatch} from "react-redux";
import {map as _map} from "lodash";
import {SearchChatItem} from "../SearchUserConversation";

export const SearchUserAndConversation:FC = () => {
    const {currentChat, socketRef, setCurrentChat} = useContext(MessageContext);
    const socket = socketRef.current;
    const dispatch = useDispatch();

    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperClass = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState("");
    const [showResult, setShowResult] = useState(false);

    useOnClickOutside(wrapperClass, () => {
        setShowResult(false);
        setSearch("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    })

    const setTypingTimeoutRef: any = useRef(null);
    async function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (setTypingTimeoutRef.current) {
            clearTimeout(setTypingTimeoutRef.current);
        }
        setTypingTimeoutRef.current = setTimeout(() => {
            setSearch(e.target.value);
            setShowResult(true);
        }, 300)
    }

    const params = {limit: 5, select: 'fullname bizfullname email phone image', populates: '{"path": "company", "select": "name"}', keyword: search}
    const {data} = useUserSystem(params, showResult);

    const paramsListConversation = {limit: 5, keyword: search};
    const {listConversations, createConversation} = UseListConversation(paramsListConversation, showResult);

    const handleStartPrivateChat = (memberId: string) => {
        setSearch("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
        createConversation({
            name: "",
            description: "",
            isPrivate: true,
            membersID: [memberId]
        }).then(data => {
            if (currentChat === data._id) return;
            socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
                conversationID: data._id,
                populates
            });
            dispatch(appendFakeItemListConversation({conversationId: data._id, conversation: data}))
            setCurrentChat(data._id);
            window.location.hash = `#${data._id}`
        });
        setShowResult(false);
    }

    return (
        <div ref={wrapperClass} className={"w-[600px] relative"}>
            <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                <img src={searchIcon} alt={"search icon"}/>
            </div>
            <input
                ref={inputRef}
                onChange={e => handleSearchChange(e)}
                className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:shadow-md transition-all"} placeholder={"Tìm trong bạn bè hoặc cuộc hội thoại"}/>

            {
                showResult &&
                <div className={"absolute top-full mt-2 w-full rounded border-0.5 border-primary-border p-2 bg-white"}>
                    {
                        data.map(friend => (
                            <div
                                key={friend._id}
                                className={"flex items-center p-[10px] cursor-pointer rounded-md hover:bg-gray-100"}
                                onClick={() => handleStartPrivateChat(friend._id)}
                            >
                                <div className={"w-[36px] flex items-center justify-center"}>
                                    <img src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`} alt={friend.bizfullname}  className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                                </div>
                                <p className={"ml-4"}>{friend.bizfullname}</p>
                            </div>
                        ))
                    }
                    {
                        _map(listConversations, conversation => (
                            <SearchChatItem
                                itemClickAction={(chat) => {
                                    dispatch(appendFakeItemListConversation({conversationId: chat._id, conversation: chat}))
                                    setCurrentChat(chat._id);
                                    setShowResult(false)
                                    setSearch("");
                                    if (inputRef.current) {
                                        inputRef.current.value = "";
                                    }
                                }}
                                chat={conversation} key={conversation._id}/>
                        ))
                    }
                </div>
            }
        </div>
    )
}