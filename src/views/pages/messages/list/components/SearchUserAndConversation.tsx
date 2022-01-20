import React, {createContext, FC, useMemo, useState} from "react";
import SearchIcon from "assets/images/icons8-search-120.png";
import SearchUserConversationSection from "./SearchUserConversation";
import {LazyLoadImage} from "react-lazy-load-image-component";

export const SearchUserAndConversationContext = createContext<{
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    showSearch: false,
    setShowSearch: () => undefined,
});
const SearchUserAndConversation:FC = () => {
    const [showSearch, setShowSearch] = useState(false);
    const value = useMemo(
        () => ({ showSearch, setShowSearch }),
        [showSearch]
    );

    return (
        <SearchUserAndConversationContext.Provider value={value}>
            <div className={"relative flex items-center flex-1"}>
                <LazyLoadImage effect="blur" src={SearchIcon} alt={"icon search"} className={"absolute w-[14px] h-[14px] left-2"}/>
                <input onFocus={() => setShowSearch(true)} className={"h-[30px] w-full bg-gray-50 pl-10 rounded rounded-full"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}/>
            </div>
            {
                showSearch&&
                <SearchUserConversationSection/>
            }
        </SearchUserAndConversationContext.Provider>
    )
}

export default SearchUserAndConversation;