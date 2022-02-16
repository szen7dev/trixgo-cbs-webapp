import React, {FC} from "react";
import SearchIcon from "../../assets/images/icons8-search-120.png";
import placeholder from "lodash/fp/placeholder";
type Props = {
    classNameWrapper?: string;
    classNameInput?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

const SearchInput:FC<Props> = ({classNameWrapper, classNameInput, onChange, placeholder}) => {
    return (
        <div className={"relative flex items-center " + classNameWrapper}>
            <img src={SearchIcon} alt={"icon search"} className={"absolute w-[14px] h-[14px] left-2"}/>
            <input onChange={(event) => onChange(event)} className={"h-[30px] w-full bg-gray-50 pl-10 rounded " + classNameInput} type={"text"} placeholder={placeholder??"Nhập từ khóa tìm kiếm"}/>
        </div>
    )
}

export default SearchInput;
