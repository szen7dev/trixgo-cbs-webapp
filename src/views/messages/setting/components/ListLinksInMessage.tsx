import React, {FC, useContext, useEffect} from "react";
import PDFIcon from "assets/images/CBS-PDF-Icon-48.svg";
import DropdownSearchable from "components/common/DropdownSearch";
import WordIcon from "assets/images/CBS-Word-Icon.svg";
import ExcelIcon from "assets/images/CBS-Excel-Icon.svg";
import OtherIcon from "assets/images/CBS-Other-Icon.svg";
import DatePickerWithRange from "./DatePickerWithRange";
import {map as _map} from "lodash";

import {MessageContext} from "../../home";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import ItemLinkInMessage from "./ItemLinkInMessage";

const ListLinksInMessage:FC = () => {
    const {currentChat} = useContext(MessageContext);
    const {getListMediasOfConversation} = UseListConversation();
    useEffect(() => {
        getListMediasOfConversation({conversationID: currentChat, typeMessage: 3})
    },[currentChat]);
    const listLinksInMessage = useSelector((state: RootState) => state.listMessage.data.listLinks[currentChat]);

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
                    _map(listLinksInMessage, link => (
                        <ItemLinkInMessage key={link._id} link={link}/>
                    ))
                }
            </div>
        </div>
    )
}

export default ListLinksInMessage