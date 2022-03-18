import React, {FC} from "react";
import {ItemLinkMessage} from "typings/apis/messages/listConversation";
import {map as _map} from "lodash";
import moment from "moment";
type Props = {
    link: {
        dateFormat: string,
        links: ItemLinkMessage[]
    }
}
export const ItemLinkInMessage:FC<Props> = ({link}) => {
    const extractHostname = (url: string) =>  {
        let hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if (url.indexOf("//") > -1) {
            hostname = url.split('/')[2];
        } else {
            hostname = url.split('/')[0];
        }

        //find & remove port number
        hostname = hostname.split(':')[0];
        //find & remove "?"
        hostname = hostname.split('?')[0];

        return hostname;
    }

    return (
        <div className={"mb-3"}>
            <div className={"px-[10px] py-[15px] font-bold"}>{link.dateFormat}</div>
            {
                _map(link.links, f => (
                    <div className={"p-3 py-0 mb-2 flex"} key={f._id}>
                        <div className={"mr-2 min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] bg-primary rounded-md text-center flex items-center justify-center font-bold text-white text-lg"}>
                            {extractHostname(f.link).charAt(0)}
                        </div>
                        <div className={"flex-1"}>
                            <div className={"flex"}>
                                <p className={"flex-1"}>{extractHostname(f.link)}</p>
                                <p className={"text-xs text-gray-400"}>{moment(f.createAt).format("HH:mm")}</p>
                            </div>
                            <a rel="noreferrer" target={"_blank"} href={f.link} className={"break-words text-primary text-xs"}>{f.link}</a>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}