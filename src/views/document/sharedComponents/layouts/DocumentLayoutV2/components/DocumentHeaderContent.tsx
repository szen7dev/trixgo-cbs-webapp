import React, {ChangeEvent, FC, useRef, useState} from "react";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import searchIcon from "assets/images/icons8-search-120.png";
import { useListFilterDocument} from "services/hooks/document/useDocument";
import {Link} from "react-router-dom";

const DocumentHeaderContent:FC =  () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperClass = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState("");
    const [showResult, setShowResult] = useState(false);

    useOnClickOutside(wrapperClass, () => setShowResult(false))

    const setTypingTimeoutRef: any = useRef(null);
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (setTypingTimeoutRef.current) {
            clearTimeout(setTypingTimeoutRef.current);
        }
        setTypingTimeoutRef.current = setTimeout(() => {
            setSearch(e.target.value);
            setShowResult(true);
        }, 300)
    }

    const { listDocument } = useListFilterDocument({
        params: {
            keyword: search,
            limit: 10
        },
        isFetchList: showResult
    });

    return (
        <>
            <div ref={wrapperClass} className={"w-[600px] relative"}>
                <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                    <img src={searchIcon} alt={"search icon"}/>
                </div>
                <input
                    ref={inputRef}
                    onChange={e => handleSearchChange(e)}
                    className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:shadow-md transition-all"} placeholder={"Tìm kiếm hồ sơ"}/>

                {
                    showResult &&
                    <div className={"absolute top-full mt-2 w-full rounded border-0.5 border-primary-border p-4 bg-white"}>
                        {
                            listDocument.map(document => (
                                <Link
                                    onClick={() => {
                                        if (inputRef.current) {
                                            inputRef.current.value = "";
                                        }
                                        setSearch("");
                                        setShowResult(false)
                                    }}
                                    to={`/document/home/${document._id}`}
                                    key={document._id} className={"flex items-center py-2"}>
                                    <div className={"w-[36px] flex items-center justify-center"}>
                                        <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                                    </div>
                                    <p className={"ml-4"}>{document.name}</p>
                                </Link>
                            ))
                        }
                    </div>
                }
            </div>
        </>
    )
}

export default DocumentHeaderContent;