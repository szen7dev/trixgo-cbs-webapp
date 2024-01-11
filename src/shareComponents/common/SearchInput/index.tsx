/*=====LIBRARY=====*/
import React, { FC } from "react";

/*=====COMPONENTS=====*/

/*=====ICONS=====*/
import SearchIcon from "assets/images/icons8-search-120.png";

type Props = {
    classNameWrapper?: string;
    classNameInput?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export const SearchInput: FC<Props> = ({ classNameWrapper, classNameInput, onChange, placeholder }) => {
    return (
        <div className={"relative flex items-center " + classNameWrapper}>
            {/* <img src={SearchIcon} alt={"icon search"} className={"absolute w-[14px] h-[14px] left-2"} /> */}
            <input onChange={onChange} className={"h-[30px] w-full bg-gray-50 pl-2 border border-primary-border rounded-lg " + classNameInput} type={"text"} placeholder={placeholder ?? "Nhập từ khóa"} />
        </div>
    )
};