import React, {FC, useContext, useEffect, useState} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import DropdownSearchable from "components/common/DropdownSearch";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import DatePickerWithRange from "./DatePickerWithRange";
import {map as _map} from "lodash";

import {MessageContext} from "../../home";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import SearchChatItem from "../../list/components/SearchUserConversation/searchChatItem";

type Props = {
    memberId: string;
}

const ListGeneralGroupByMember:FC<Props> = ({memberId}) => {
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

export default ListGeneralGroupByMember