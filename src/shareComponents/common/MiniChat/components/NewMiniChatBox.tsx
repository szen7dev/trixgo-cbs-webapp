import React, {FC, useContext, useState} from "react";
import iconClose from "assets/images/icons8-close-30.png";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissCreateNewChatMini, openChatBox} from "redux/reducer/messages/MiniChat";
import {useUser} from "services/hooks/useUser";
import {map as _map} from "lodash"
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {MiniChatContext} from "../index";

export const NewMiniChatBox:FC = () => {
    const dispatch = useDispatch();
    const {isNewChatboxVisible} = useSelector((state: RootState) => state.miniChat.data)
    const {socketRef} = useContext(MiniChatContext);
    const socket = socketRef.current;

    const [searchTerm, setSearchTerm] = useState('');
    const params = {limit: 10, select: 'fullname bizfullname email phone image', keyword: searchTerm}
    const { listFriends, nextPageListFriends, hasNextPageListFriends } = useUser(params);
    const {createConversation} = UseListConversation();
    const handleOpenPrivateChat = (memberId : string) => {
        createConversation({
            name: "",
            description: "",
            isPrivate: true,
            membersID: [memberId]
        }).then(data => {
            socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', {
                conversationID: data._id,
                select: JSON.stringify({sender: "bizfullname"}),
                filter: JSON.stringify({
                    author: 0,
                    taskID: 0,
                    links: 0,
                    createAt: 0,
                    __v: 0,
                    config: 0
                })
            });
            // getConverationInformation({
            //     conversationID: data._id,
            //     select: JSON.stringify({"members": "", "authors": "fullname _id", "avatar": "", "lastMessage": "", "messagesPin": "", "image": ""})
            // }).then(infor => {
                dispatch(openChatBox({conversation: data}))
                dispatch(dismissCreateNewChatMini())
            // })
        });
    }
    if (!isNewChatboxVisible) return null;
    return (
        <div className="t-mini-chat-add-new text-[15px] ml-3 bg-primary-light border border-primary-border">
            <div className="t-mini-chat-add-new-header flex items-center p-3">
                <span className="font-bold text-dark">Tin nhắn mới</span>
                <button className="ml-auto" onClick={() => dispatch(dismissCreateNewChatMini())}>
                    <img src={iconClose} alt="Close" className="w-5 h-5 object-contain" />
                </button>
            </div>
            <div className="t-mini-chat-add-new-find flex items-center px-3 pb-3 border-b border-primary-border text-primary-gray">
                <span>Tới:</span>
                <input
                    onChange={event => setSearchTerm(event.target.value)}
                    className="border-0 flex-grow outline-none px-3 text-primary-gray" type="text" placeholder="Người nhận" />
            </div>
            <p className="font-bold text-primary-gray p-3 mb-2">Gần đây</p>
            <div className="t-mini-chat-add-new-list min-h-[370px] max-h-[370px] overflow-auto">
                {
                    _map(listFriends, friend => (
                        <button key={friend._id} className="t-mini-chat-add-new-list-item flex items-center text-[15px] mb-4 px-3" onClick={() => handleOpenPrivateChat(friend._id)}>
                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`} alt="Thumbnail" className="rounded-full w-9 h-9 mr-3 object-cover" />
                            <span>{friend.bizfullname||friend.fullname}</span>
                        </button>
                    ))
                }
                {
                    hasNextPageListFriends&&
                    <div className={"flex items-center justify-center mb-5"}>
                        <button
                            onClick={() => nextPageListFriends()}
                            className={"text-primary text-center"}
                        >
                            Xem thêm
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}