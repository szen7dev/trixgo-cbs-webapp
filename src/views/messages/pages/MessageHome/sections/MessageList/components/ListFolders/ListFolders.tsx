import React, {FC, useEffect, useRef} from 'react'
import {map as _map} from "lodash";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";

export const ListFolders:FC = () => {
    const {listFolders, nextCursor, hasMoreData} = useSelector((state: RootState) => state.listFolders.data);
    const listFoldersRef = useRef<HTMLDivElement>(null);
    const {getListFoldersConversation} = UseListConversation();
    useEffect(() => {
        getListFoldersConversation({limit: 10})
    }, []);

    const listTab = [
        {
            text: "All",
            tabId: "all",
            unread: 0
        }
    ];

    useEffect(() => {
        if (listFoldersRef.current) {
            listFoldersRef.current.addEventListener("wheel", (evt) => {
                evt.preventDefault();
                if (listFoldersRef.current) {
                    listFoldersRef.current.scrollLeft = listFoldersRef.current.scrollLeft + evt.deltaY;
                }
            });
        }
    }, [listFoldersRef])

    if (listFolders.length <= 0) return null;
    return (
        <div ref={listFoldersRef} className={"flex overflow-auto max-w-full border-b border-gray-100 no-webkit-scrollbar"}>
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
    )
}