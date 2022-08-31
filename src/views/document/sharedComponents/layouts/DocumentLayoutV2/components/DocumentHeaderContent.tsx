import React, {ChangeEvent, FC, useRef, useState} from "react";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import searchIcon from "assets/images/icons8-search-120.png";
import { useListFilterDocument} from "services/hooks/document/useDocument";
import {Link} from "react-router-dom";
import {Oval} from "react-loader-spinner";
import {useDispatch} from "react-redux";
import {useAppSelector} from "redux/reducer";
import {setKeyword} from "redux/reducer/DocumentHomeSlice";

const DocumentHeaderContent:FC =  () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const wrapperClass = useRef<HTMLDivElement>(null);
    const [search, setSearch] = useState("");
    const [showResult, setShowResult] = useState(false);

    const dispatch = useDispatch();
    const filterDropdown = useAppSelector(
        (state) => state.documentHome.data.filterDropdown
    );

    useOnClickOutside(wrapperClass, () => {
        setShowResult(false)
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    })

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

    const onKeyDown = (e: any) => {
        if (e.key === "Enter") {
            dispatch(setKeyword(search));
            setShowResult(false)
        }
    }

    const { listDocument, isLoading } = useListFilterDocument({
        params: {
            keyword: search,
            limit: 10,
            ...filterDropdown,
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
                    onKeyDown={onKeyDown}
                    ref={inputRef}
                    onChange={e => handleSearchChange(e)}
                    className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:shadow-md transition-all"} placeholder={"Tìm kiếm hồ sơ"}/>

                {
                    showResult &&
                    <div className={"absolute min-h-[300px] focus:bg-white top-full mt-2 w-full rounded border-0.5 border-primary-border p-4 bg-white"}>
                        {
                            isLoading &&
                            <div
                                className={
                                    "absolute w-full flex items-center justify-center h-[200px]"
                                }
                            >
                                <div className={"bg-white rounded-full"}>
                                    <Oval
                                        color={"#0d6efd"}
                                        strokeWidth={3}
                                        secondaryColor={"#fff"}
                                        height={30}
                                        width={30}
                                    />
                                </div>
                            </div>
                        }
                        {
                            !isLoading && listDocument.length === 0 &&
                            <div className="italic pt-200 flex items-center justify-center h-[200px]">
                                <span>Không tìm thấy kết quả phù hợp</span>
                            </div>
                        }
                        {
                            !isLoading && listDocument.length > 0 &&
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
                                    <div className={"w-[36px] min-w-[36px] flex items-center justify-center"}>
                                        <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                                    </div>
                                    <p className={"ml-4"}>{document.project.sign}.{document.name} {document.sign} {document.storeSign}</p>
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