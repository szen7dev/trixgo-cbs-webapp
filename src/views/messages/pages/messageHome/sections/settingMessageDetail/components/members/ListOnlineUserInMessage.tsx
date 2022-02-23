import React, {FC, useCallback, useContext, useEffect} from "react";
import {map as _map} from "lodash";
import {OnlineUserInChatItem} from "./OnlineUserInChatItem";
import {MessageContext} from "../../../../MessageHome";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {ItemListConversation} from "typings/apis/messages/listConversation";

type Props = {
    chat: ItemListConversation;
}

export const ListOnlineUserInMessage:FC<Props> = ({chat}) => {
    const {currentChat} = useContext(MessageContext);
    const {getListMembersOfConversation} = UseListConversation();
    useEffect(() => {
        getListMembersOfConversation({conversationID: currentChat})
    },[currentChat, chat.members.length])

    const listUserInMessage = useSelector((state: RootState) => state.listMessage.data.listMembers[currentChat]);

    const renderListOnlineUser = useCallback(() => {
        return  _map(listUserInMessage??[], (user,index) => (
            <OnlineUserInChatItem key={user._id} user={user} index={index}/>
        ))
    }, [listUserInMessage]);

    return (
        <div className={"bg-white flex-1"}>
            {renderListOnlineUser()}
        </div>
    )
}
