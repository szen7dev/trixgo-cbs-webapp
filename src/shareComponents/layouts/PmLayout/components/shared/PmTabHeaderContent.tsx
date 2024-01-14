import {ChangeEvent, FC, useRef, useState} from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import debounce from "lodash/debounce";

export const PmTabHeaderContent:FC = () => {
    const wrapperClass = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState("");
    const [showResult, setShowResult] = useState(false);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounce((e) => setSearch(e.target.value), 600)
        setShowResult(true)
    }
    return (
        <>
            <div ref={wrapperClass} className={"w-[600px] relative"}>
                <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                    <img src={searchIcon} alt={"search icon"}/>
                </div>
                <input
                    onChange={e => handleSearchChange(e)}
                    className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:bg-white focus:shadow-md transition-all"} placeholder={"Tìm kiếm dự án"}/>

                {
                    showResult &&
                    <div className={"absolute top-full mt-2 w-full rounded border-0.5 border-primary-border p-4 bg-white"}>
                    </div>
                }
            </div>
        </>
    )
}