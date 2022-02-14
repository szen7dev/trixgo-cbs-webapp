import React, {FC, useCallback, useContext, useEffect} from "react";
import {map as _map} from "lodash";
import OnlineUserInChatItem from "./OnlineUserInChatItem";
import {MessageContext} from "../../home/index_v2";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";

const ListOnlineUserInMessage:FC = () => {
    const {currentChat} = useContext(MessageContext);
    const {getListMembersOfConversation} = UseListConversation();
    useEffect(() => {
        getListMembersOfConversation({conversationID: currentChat})
    },[currentChat])

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

export default ListOnlineUserInMessage;
