import React, {FC} from "react";
import SearchInput from "components/common/SearchInput";
import {map as _map} from "lodash";
import ListChatItem from "./components/listChatItem";
import HamLeftMenu from "./components/hamLeftMenu";
import AddNewChatGroup from "./components/AddNewChatGroup";

const MessageList:FC = () => {
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
        },
        {
            _id: 5,
            chatName: "CBS-Backend",
            text: "You: Anh em hình dung rồi đúng không",
            chatAvatar: null,
            pinned: true,
            isDraft: false,
            date: "10:04",
            unread: 4
        },
        {
            _id: 6,
            chatName: "CBS-BE-FE",
            text: "Minh CBS: 🙃 Sticker ",
            chatAvatar: null,
            pinned: false,
            isDraft: false,
            date: "10:04"
        },
        {
            _id: 7,
            chatName: "Minh CBS",
            text: "BaoCaoDanhGia.pdf",
            chatAvatar: null,
            pinned: true,
            isDraft: false,
            date: "10:04"
        },
        {
            _id: 8,
            chatName: "CBS-BE-FE",
            text: "Alo em, em và Đệ đã online chưa?",
            chatAvatar: null,
            pinned: false,
            isDraft: true,
            date: "10:04"
        },
        {
            _id: 9,
            chatName: "CBS-Backend",
            text: "You: Anh em hình dung rồi đúng không",
            chatAvatar: null,
            pinned: true,
            isDraft: false,
            date: "10:04",
            unread: 4
        },
        {
            _id: 10,
            chatName: "CBS-BE-FE",
            text: "Minh CBS: 🙃 Sticker ",
            chatAvatar: null,
            pinned: false,
            isDraft: false,
            date: "10:04"
        },
        {
            _id: 11,
            chatName: "Minh CBS",
            text: "BaoCaoDanhGia.pdf",
            chatAvatar: null,
            pinned: true,
            isDraft: false,
            date: "10:04"
        },
        {
            _id: 12,
            chatName: "CBS-BE-FE",
            text: "Alo em, em và Đệ đã online chưa?",
            chatAvatar: null,
            pinned: false,
            isDraft: true,
            date: "10:04"
        }
    ]

    return (
        <div className={"messages-left-bar w-[480px] border-r transition duration-150 group relative"}>
            <div className={"overflow-auto h-full"}>
                <div className={"sticky top-0 bg-white z-5"}>
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
                                <button
                                    className={"whitespace-nowrap text-center block p-2 " + (tab.tabId==="all"?"border-b-2 border-primary text-primary":"text-primary-gray")}
                                >
                                    {tab.text}
                                </button>
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

            </div>
            <AddNewChatGroup/>
        </div>
    )
}

export default MessageList;
