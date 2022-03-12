import React, {FC} from "react";
import {ItemLinkMessage} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
type Props = {
    link: {
        dateFormat: string,
        links: ItemLinkMessage[]
    }
}
export const ItemLinkInMessage:FC<Props> = ({link}) => {
    return (
        <div className={"mb-3"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{link.dateFormat}</div>
            {
                _map(link.links, f => (
                    <a key={f._id} rel="noreferrer" target={"_blank"} href={f.link} className={"break-words text-primary p-[5px]"}>{f.link}</a>
                ))
            }
        </div>
    )
}