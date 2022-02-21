import React, {FC} from "react";
import {ItemMediaOfConversation} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
type Props = {
    link: ItemMediaOfConversation
}
const ItemLinkInMessage:FC<Props> = ({link}) => {
    return (
        <div className={"mb-3"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{link.dataFormat}</div>
            {
                _map(link.messages, f => (
                    <a key={f._id} rel="noreferrer" target={"_blank"} href={f.link} className={"break-words text-primary p-[5px]"}>{f.link}</a>
                ))
            }
        </div>
    )
}

export default ItemLinkInMessage