import React, {FC, useEffect, useRef, useState} from "react";
import SearchInput from "components/common/SearchInput";
import {map as _map} from "lodash";
import ListChatItem from "./components/listChatItem";
import HamLeftMenu from "./components/hamLeftMenu";
import AddNewChatGroup from "./components/AddNewChatGroup";
import {UseListConversation} from "services/hooks/messages/useListConversation";

const MessageList:FC = () => {
    const listTab = [
        {
            text: "All",
            tabId: "all",
            unread: 0
        }
    ]

    const [searchText, setSearchText] = useState("");
    const {listConversation, nextListConversation, hasNextPage, isLoadingListConversation} = UseListConversation('list_conversation', {keyword: searchText});
    const listInnerRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight === scrollHeight) {
                nextListConversation();
            }
        }
    };

    useEffect(() => {
        listInnerRef.current&&listInnerRef.current.addEventListener("scroll", () => onScroll());
    },[listInnerRef])

    return (
        <div className={"messages-left-bar w-[480px] border-r transition duration-150 group relative"}>
                <div className={"bg-white z-5"}>
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
                <div
                    className={"overflow-auto message-list-height"}
                    ref={listInnerRef}
                    id={'list-conversation'}>
                    {_map(listConversation, (chat,index) => (
                        <ListChatItem key={chat._id} chat={chat} index={index}/>
                    ))}
                </div>
            <AddNewChatGroup/>
        </div>
    )
}

export default MessageList;
