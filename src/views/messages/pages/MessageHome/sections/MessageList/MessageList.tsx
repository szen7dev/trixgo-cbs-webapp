import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {map as _map} from "lodash";
import {ListChatItem} from "./components/ListCoversation";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {HamLeftMenu, AddNewChatGroup} from "./components/HeaderMessageList";
import {ListFolders} from "./components/ListFolders";
import {Oval} from "react-loader-spinner";

export const MessageList:FC = () => {
    const [reachedEnd, setReachEnd] = useState(false);
    const {getListConversation} = UseListConversation();

    const mapData = useSelector((state: RootState) => state.listConversation);
    const {listConversation, nextCursor, isLoading,  hasMoreData} = mapData.data;

    useEffect(() => {
        Object.keys(listConversation).length===0&&getListConversation({});
    },[]);

    useEffect(() => {
        if (reachedEnd && !isLoading && hasMoreData && nextCursor !== "" && nextCursor !== null && nextCursor !== undefined) {
            getListConversation({lastestID: nextCursor});
            setReachEnd(false);
        }
    },[reachedEnd, isLoading, hasMoreData]);

    const listInnerRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        if (listInnerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
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
            .filter(item => !item.isFake)
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
        <div className={"messages-left-bar w-[256px] min-w-[256px] transition duration-150 group relative"}>
            <div className={"bg-white z-5"}>
                <div className={"p-2 flex"}>
                    <HamLeftMenu/>
                </div>
                <ListFolders/>
            </div>
            <div
                className={"overflow-auto message-list-height px-[5px] pb-10"}
                ref={listInnerRef}
                id={'list-conversation'}>
                {renderListConversation()}
                {
                    isLoading&&
                    <div className={"absolute w-full flex items-center justify-center z-21 spinner-animation from-bottom transition-all"}>
                        <div className={"bg-white rounded-full p-1"}>
                            <Oval color={"#0d6efd"} strokeWidth={3} secondaryColor={"#fff"} height={30} width={30}/>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
