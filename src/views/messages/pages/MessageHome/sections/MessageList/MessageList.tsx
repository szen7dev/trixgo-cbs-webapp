import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import {ListChatItem} from "./components/ListCoversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {SearchUserAndConversation, HamLeftMenu, AddNewChatGroup} from "./components/HeaderMessageList";

export const MessageList:FC = () => {
    const listTab = [
        {
            text: "All",
            tabId: "all",
            unread: 0
        }
    ];

    const [reachedEnd, setReachEnd] = useState(false);
    const {getListConversation} = UseListConversation();

    const mapData = useSelector((state: RootState) => state.listConversation);
    const {listConversation, nextCursor, isLoading,  hasMoreData} = mapData.data;

    useEffect(() => {
        listConversation&&getListConversation({});
    },[]);

    useEffect(() => {
        if (reachedEnd && !isLoading && hasMoreData) {
            getListConversation({lastestID: nextCursor});
            setReachEnd(false);
        }
    },[reachedEnd, isLoading, hasMoreData]);

    const listInnerRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop } = listInnerRef.current;
            if (scrollTop > -100) {
                setReachEnd(true);
            } else {
                setReachEnd(false);
            }
        }
    };

    useEffect(() => {
        listInnerRef.current&&listInnerRef.current.addEventListener("scroll", () => onScroll());
    },[listInnerRef]);

    const renderListConversation = useCallback(() => {
        return _map(Object.values(listConversation)
            // .sort((a,b) => b.isSaved ? 1 : -1)
            .sort((a,b) => {
                if (b.position > a.position) {
                    return 1
                } else {
                    if (b.isPin&&!a.isPin) {
                        return 1
                    } else if (b.isPin&&a.isPin) {
                        if (b.position > a.position) {
                            return 1
                        } else {
                            return -1
                        }
                    }
                }
                return -1
            })
            ,(chat) => (
                <ListChatItem key={chat._id} chat={chat}/>
            )
        )
    },[listConversation]);

    return (
        <div className={"messages-left-bar w-[402px] min-w-[402px] border-r transition duration-150 group relative"}>
                <div className={"bg-white z-5"}>
                    <div className={"p-2 flex"}>
                        <HamLeftMenu/>
                        <SearchUserAndConversation/>
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
                    className={"overflow-auto message-list-height px-[5px]"}
                    ref={listInnerRef}
                    id={'list-conversation'}>
                    {renderListConversation()}
                </div>
            <AddNewChatGroup/>
        </div>
    )
}
