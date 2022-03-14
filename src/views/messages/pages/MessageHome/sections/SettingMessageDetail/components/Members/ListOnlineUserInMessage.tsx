import React, {FC, useCallback, useContext, useEffect} from "react";
import {map as _map} from "lodash";
import {OnlineUserInChatItem} from "./OnlineUserInChatItem";
import {MessageContext} from "../../../../index";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {UseInformationMessage} from "services/hooks/messages/useInformationMessage";

type Props = {
    chat: ItemListConversation;
    isActive: boolean
}

export const ListOnlineUserInMessage:FC<Props> = ({chat, isActive}) => {
    const {currentChat} = useContext(MessageContext);

    const params = {conversationID: currentChat, type: "member", populates: JSON.stringify({"path": "addedBy member", "select": "_id bizfullname image"})};
    const {listMembersMessage, hasListMembersNextPage, nextPageListMembers} = UseInformationMessage(params, isActive, "members");

    const renderListOnlineUser = useCallback(() => {
        return  _map(listMembersMessage, (user,index) => (
            <OnlineUserInChatItem chat={chat} key={user._id} user={user} index={index}/>
        ))
    }, [listMembersMessage]);

    return (
        <div className={"bg-white flex-1"}>
            {renderListOnlineUser()}
            {
                hasListMembersNextPage &&
                <button
                    onClick={() => nextPageListMembers()}
                    className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                    Xem thêm
                </button>
            }
        </div>
    )
}
