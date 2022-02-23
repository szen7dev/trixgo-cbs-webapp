import React, {FC, useContext, useEffect, useState} from "react";
import {map as _map} from "lodash";

import {MessageContext} from "../../../../MessageHome";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import {SearchChatItem} from "../../../messageList";

type Props = {
    memberId: string;
}

export const ListGeneralGroupByMember:FC<Props> = ({memberId}) => {
    const {currentChat, setCurrentChat} = useContext(MessageContext);
    const {getListGeneralGroupByMember} = UseListConversation();
    const [listGroup, setListGroup] = useState<ItemListConversation[]>([])
    useEffect(() => {
        getListGeneralGroupByMember({memberID: memberId}).then(data => {
            setListGroup(data)
        })
    },[currentChat]);

    return (
        <div className={"bg-white flex-1"}>
            {
                _map(listGroup.map(chat => {
                    return {...chat,_id: chat.conversationID}
                }), chat => (
                    <SearchChatItem
                        itemClickAction={chat => {
                            setCurrentChat(chat.conversationID);
                        }}
                        key={chat._id}
                        chat={chat}
                    />
                ))
            }
        </div>
    )
}