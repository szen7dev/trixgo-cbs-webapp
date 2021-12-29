import React, {FC, useContext} from "react";
import HamMenu from "assets/images/icons8-menu-96.svg"
import SearchInput from "components/common/SearchInput";
import iconNotification from "assets/images/icons8-notification-64.svg";
import iconPencilWhite from "assets/images/icons8-pencil-64.svg";
import {map as _map} from "lodash";
import {useParams,NavLink} from "react-router-dom";
import ListChatItem from "./components/listChatItem";
import HamLeftMenu from "./components/hamLeftMenu";

const MessageList:FC = () => {
    const {tab} = useParams<{ tab: string }>();
    const tabID = tab??"all";

    const listTab = [
        {
            text: "All",
            tabId: "all",
            unread: 0
        },
        {
            text: "CBS",
            tabId: "cbs",
            unread: 0
        },
        {
            text: "Quản trị",
            tabId: "quan-tri",
            unread: 0
        },
        {
            text: "Budget",
            tabId: "budget",
            unread: 0
        },
        {
            text: "Unread",
            tabId: "unread",
            unread: 7
        },
        {
            text: "Quản trị",
            tabId: "quan-tri2",
            unread: 0
        },
        {
            text: "Budget",
            tabId: "budget2",
            unread: 0
        },
    ]
    const listChat = [
        {
            _id: 1,
            chatName: "CBS-Backend",
            text: "You: Anh em hình dung rồi đúng không",
            chatAvatar: null,
            pinned: true,
            isDraft: false,
            date: "10:04",
            unread: 4
        },
        {
            _id: 2,
            chatName: "CBS-BE-FE",
            text: "Minh CBS: 🙃 Sticker ",
            chatAvatar: null,
            pinned: false,
            isDraft: false,
            date: "10:04"
        },
        {
            _id: 3,
            chatName: "Minh CBS",
            text: "BaoCaoDanhGia.pdf",
            chatAvatar: null,
            pinned: true,
            isDraft: false,
            date: "10:04"
        },
        {
            _id: 4,
            chatName: "CBS-BE-FE",
            text: "Alo em, em và Đệ đã online chưa?",
            chatAvatar: null,
            pinned: false,
            isDraft: true,
            date: "10:04"
        }
    ]

    return (
        <div className={"overflow-auto relative h-full group"}>
            <div className={"sticky top-0"}>
                <div className={"p-2 flex"}>
                    <HamLeftMenu/>
                    <SearchInput classNameWrapper={"flex-1"} classNameInput={"rounded-full"} onChange={value => console.log(value)}/>
                </div>
                <div className={"flex overflow-auto max-w-full border-b border-gray-100 no-webkit-scrollbar"}>
                    {_map(listTab, tab => (
                        <div
                            className={"flex items-center px-4 hover:bg-gray-100 rounded-tl-md rounded-tr-md"}
                            key={tab.tabId}
                        >
                            <NavLink
                                className={"whitespace-nowrap text-center block p-2 " + (tab.tabId===tabID?"border-b-2 border-primary text-primary":"text-primary-gray")}
                                to={"/messages/list/"+tab.tabId}
                            >
                                {tab.text}
                            </NavLink>
                            {tab.unread>0&&<span className={"rounded-full bg-primary text-xs text-white w-[18px] h-[18px] text-center leading-[18px]"}>{tab.unread}</span>}
                        </div>
                    ))}
                </div>
            </div>

            <div className={"chat-list p-1"}>
                {_map(listChat, (chat,index) => (
                    <ListChatItem key={chat._id} chat={chat} index={index}/>
                ))}
            </div>

            <button className={"w-[56px] h-[56px] group-hover:opacity-100 opacity-0 rounded-full absolute bottom-20px right-20px z-5 bg-primary flex items-center justify-center"}>
                <img src={iconPencilWhite} alt={"Pencil icon"}/>
            </button>
        </div>
    )
}

export default MessageList;
