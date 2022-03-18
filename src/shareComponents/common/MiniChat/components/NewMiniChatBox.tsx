import React, {FC, useContext, useState} from "react";
import iconClose from "assets/images/icons8-close-30.png";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissCreateNewChatMini, openChatBox} from "redux/reducer/messages/MiniChat";
import {map as _map} from "lodash"
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {SearchChatItem} from "views/messages/pages/MessageHome/sections/MessageList";
import {appendFakeItemListConversation} from "redux/reducer/messages/ListConversation";

export const NewMiniChatBox:FC = () => {
    const dispatch = useDispatch();
    const {isNewChatboxVisible} = useSelector((state: RootState) => state.miniChat.data)

    const [searchTerm, setSearchTerm] = useState('');
    const paramsListConversation = {limit: 10, keyword: searchTerm};
    const {listConversations, nextPageListConversations, hasListConversationNextPage} = UseListConversation(paramsListConversation, isNewChatboxVisible);

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
                    _map(listConversations, conversation => (
                        <SearchChatItem
                            itemClickAction={(chat) => {
                                dispatch(appendFakeItemListConversation({conversationId: chat._id, conversation: chat}))
                                dispatch(openChatBox({conversation: chat}))
                                dispatch(dismissCreateNewChatMini())
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