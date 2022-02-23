import React, {createContext, FC, useMemo, useState} from "react";
import SearchIcon from "assets/images/icons8-search-120.png";
import {SearchUserConversationSection} from "../searchUserConversation";

export const SearchUserAndConversationContext = createContext<{
    showSearch: boolean;
    setShowSearch: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    showSearch: false,
    setShowSearch: () => undefined,
});
export const SearchUserAndConversation:FC = () => {
    const [showSearch, setShowSearch] = useState(false);
    const value = useMemo(
        () => ({ showSearch, setShowSearch }),
        [showSearch]
    );

    return (
        <SearchUserAndConversationContext.Provider value={value}>
            <div className={"relative flex items-center flex-1"}>
                <img  src={SearchIcon} alt={"icon SearchMessage"} className={"absolute w-[24px] h-[24px] left-2"}/>
                <input onFocus={() => setShowSearch(true)} className={"h-[44px] w-full bg-gray-100 px-[12px] py-[10px] pl-[36px] rounded-full"} type={"text"} placeholder={"Nhập từ khóa tìm kiếm"}/>
            </div>
            {
                showSearch&&
                <SearchUserConversationSection/>
            }
        </SearchUserAndConversationContext.Provider>
    )
}