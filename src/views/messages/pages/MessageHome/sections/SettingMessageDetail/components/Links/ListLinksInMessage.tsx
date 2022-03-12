import React, {FC, useCallback, useContext, useEffect} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import {DropdownSearchable} from "shareComponents/common/DropdownSearchable";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import {DatePickerWithRange} from "../../../../../../shareComponents/common/DatePickerWithRange";
import {map as _map} from "lodash";

import {MessageContext} from "../../../../index";
import {ItemLinkInMessage} from "./ItemLinkInMessage";
import {UseInformationMessage} from "services/hooks/messages/useInformationMessage";
import {ItemLinkMessage} from "typings/apis/messages/listConversation";
import moment from "moment";

type Props = {
    isActive: boolean
}
export const ListLinksInMessage:FC<Props> = ({isActive}) => {
    const {currentChat} = useContext(MessageContext);
    const params = {conversationID: currentChat};
    const {listLinksMessage, hasListLinksNextPage, nextPageListLinks} = UseInformationMessage(params, isActive, "links");

    const groupByDate = useCallback(() : {
        dateFormat: string,
        links: ItemLinkMessage[]
    }[] => {
        const group : {[key: string]: ItemLinkMessage[]} = {};
        if (!listLinksMessage) return [];
        listLinksMessage.forEach(media => {
            if (!media) {
                return;
            }
            group[moment(media.createAt).format("DD/MM/YYYY")] = [];
        });
        listLinksMessage.forEach((media, index) => {
            if (!media) {
                return;
            }
            group[moment(media.createAt).format("DD/MM/YYYY")].push({...media, index});
        })

        const listAfterGroup: {
            dateFormat: string,
            links: ItemLinkMessage[]
        }[] = [];
        Object.keys(group).forEach(key => {
            listAfterGroup.push({
                dateFormat: key,
                links: group[key]
            })
        })
        return listAfterGroup;
    }, [listLinksMessage])

    return (
        <div className={"bg-white flex-1"}>
            <div className={"sticky bg-white top-110px w-full z-10 flex items-center p-[10px]"}>
                <DropdownSearchable
                    placeholder={"Loại"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    data={[
                        {
                            id: 1,
                            imageUrl: PDFIcon,
                            text: "PDF"
                        },
                        {
                            id: 2,
                            imageUrl: WordIcon,
                            text: "Word"
                        },
                        {
                            id: 3,
                            imageUrl: ExcelIcon,
                            text: "Excel"
                        },
                        {
                            id: 4,
                            imageUrl: OtherIcon,
                            text: "Other"
                        }
                    ]}
                    renderItem={(item) => (
                        <div className={"flex align-items-center text-left"}>
                            <img  alt={"Avt"} src={item.imageUrl} className={"w-9 h-9 object-cover mr-3"}/>
                            <span className={"flex-1 ml-1 mr-1"}>{item.text}</span>
                        </div>
                    )}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                />
                <DropdownSearchable
                    placeholder={"Người gửi"}
                    className={"bg-gray-100 rounded-full flex-1 mr-2"}
                    searchInputClassName={"border rounded-full h-[28px] p-0 border-gray-300 mx-[10px]"}
                />
                <DatePickerWithRange/>
            </div>
            <div className={"h-full"}>
                {
                    _map(groupByDate(), link => (
                        <ItemLinkInMessage key={link.dateFormat} link={link}/>
                    ))
                }
                {
                    hasListLinksNextPage &&
                    <button
                        onClick={() => nextPageListLinks()}
                        className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                        Xem thêm
                    </button>
                }
            </div>
        </div>
    )
}