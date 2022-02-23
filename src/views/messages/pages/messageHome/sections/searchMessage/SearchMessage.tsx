import React, {FC, useCallback, useContext, useEffect, useRef, useState} from "react";
import {MessageContext} from "../../MessageHome";
import {useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import SearchIcon from "assets/images/icons8-search-120.png";
import {UseMessage} from "services/hooks/messages/useMessage";
import {map as _map} from "lodash";
import {ListSearchMessagesItem} from "./components/ListSearchMessagesItem";
import Close from "assets/icons/Close";

export const SearchMessage:FC = () => {
    const {currentChat, setShowSearch, showSearch} = useContext(MessageContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const {searchMessages, totalRecordRequest, hasSearchMessageNextPage, nextPageSearchMessage} = UseMessage({conversationID: currentChat, keyword: searchTerm}, (showSearch && searchTerm.length > 0));

    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[currentChat]);

    useEffect(() => {
        setTimeout(() => {
            inputRef.current&&showSearch&&inputRef.current.focus()
        }, 500);
    }, [inputRef,showSearch]);

    useEffect(() => {
        if (!showSearch) {
            setSearchTerm("");
        }
    }, [showSearch])

    const handleSearchTerm = (str: string) => {
        setSearchTerm(str)
    }

    if (!chat) return null;
    return (
        <div className={"messages-right-bar-search border-l transition-all duration-500 group w-[402px] min-w-[402px] absolute h-full bg-white z-11 " + (showSearch?"right-0":"right--402px")}>
            <div className={"h-full group overflow-auto no-webkit-scrollbar"}>
                <div className={"bg-white p-2 sticky top-0 z-5"}>
                    <div className={"flex items-center"}>
                        <button onClick={() => setShowSearch(false)} className={"flex w-[40px] h-[40px] items-center justify-center mr-[14px]"}>
                            <Close/>
                        </button>
                        <div className={"relative flex items-center flex-1"}>
                            <img  src={SearchIcon} alt={"icon searchMessage"} className={"absolute w-[24px] h-[24px] left-2"}/>
                            <input
                                value={searchTerm}
                                onChange={e => handleSearchTerm(e.target.value)}
                                ref={inputRef}
                                className={"h-[44px] w-full bg-gray-100 px-[12px] py-[10px] pl-[36px] rounded-full focus:outline-none"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}
                            />
                        </div>
                    </div>
                    {
                        searchTerm.length > 0&&
                        <div className={"text-gray-400 mt-4 px-2"}>
                            {totalRecordRequest} tin nhắn được tìm thấy
                        </div>
                    }
                </div>
                <div className={"w-full px-[5px]"}>
                    {
                        _map(searchMessages, message => <div className={"w-full"} key={message._id}><ListSearchMessagesItem message={message}/></div>)
                    }
                    {
                        hasSearchMessageNextPage &&
                        <button
                            onClick={() => nextPageSearchMessage()}
                            className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                            Xem thêm
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
