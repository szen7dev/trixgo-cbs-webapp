import React, {FC, useContext, useEffect, useRef} from "react";
import IconBackGray from "assets/images/icon-back-gray.svg";
import {SearchUserAndConversationContext} from "../SearchUserAndConversation";
import SearchIcon from "assets/images/icons8-search-120.png";
import {LazyLoadImage} from "react-lazy-load-image-component";

const SearchUserConversationSection:FC = () => {
    const {setShowSearch} = useContext(SearchUserAndConversationContext);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current&&inputRef.current.focus()
    }, [inputRef]);
    return (
        <div className={"absolute top-0 w-full h-full bg-white z-10 left-0"}>
            <div className={"sticky top-0 bg-white w-full flex h-[56px] p-2 items-center"}>
                <button onClick={() => setShowSearch(false)} className={"flex w-[40px] h-[40px] items-center justify-center"}>
                    <LazyLoadImage effect="blur" src={IconBackGray} alt={"----"}/>
                </button>
                <div className={"relative flex items-center flex-1"}>
                    <LazyLoadImage effect="blur" src={SearchIcon} alt={"icon search"} className={"absolute w-[14px] h-[14px] left-2"}/>
                    <input ref={inputRef} className={"h-[30px] w-full bg-gray-50 pl-10 rounded rounded-full"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}/>
                </div>
            </div>
        </div>
    )
}

export default SearchUserConversationSection;