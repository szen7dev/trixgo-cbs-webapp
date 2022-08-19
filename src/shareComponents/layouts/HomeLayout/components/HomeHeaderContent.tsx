import React, {ChangeEvent, FC, Fragment, useRef, useState} from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import debounce from "lodash/debounce";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import userAvt from "assets/images/task-user.svg";

export const HomeHeaderContent:FC = () => {
    const wrapperClass = useRef<HTMLDivElement>(null);
    const [tab, setTab] = useState(1);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [showResult, setShowResult] = useState(false);

    useOnClickOutside(wrapperClass, () => setShowResult(false))
    const menuFilter : {
        text: string,
        filter: string
    }[] = [
        {
            text: "Tất cả",
            filter: "all"
        },
        {
            text: "Chưa đọc",
            filter: "unread"
        },
        {
            text: "Đã đọc",
            filter: "read"
        },
    ]

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounce((e) => setSearch(e.target.value), 600)
        setShowResult(true)
    }
    return (
        <div className={"flex items-center"}>
            <div ref={wrapperClass} className={"w-[600px] relative"}>
                <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                    <img src={searchIcon} alt={"search icon"}/>
                </div>
                <input
                    onChange={e => handleSearchChange(e)}
                    className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none"} placeholder={"Tìm trong chủ đề"}/>

                {
                    showResult &&
                    <div className={"absolute top-full w-full rounded border-0.5 border-primary-border p-4 bg-white"}>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                            </div>
                            <p className={"ml-4"}>Đề nghị phong tỏa tài khoản ngân hàng nhà thầu ABC (tiêu đề, mô tả task, nội dung phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                            </div>
                            <p className={"ml-4"}>Đề nghị phong tỏa tài khoản ngân hàng nhà thầu ABC (tiêu đề, mô tả task, nội dung phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                            </div>
                            <p className={"ml-4"}>Đề nghị phong tỏa tài khoản ngân hàng nhà thầu ABC (tiêu đề, mô tả task, nội dung phản hồi)</p>
                        </div>

                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                            </div>
                            <p className={"ml-4"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                            </div>
                            <p className={"ml-4"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                            </div>
                            <p className={"ml-4"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
                        </div>
                    </div>
                }
            </div>
            <div className={"flex border-collapse ml-3 mr-3"}>
                <button
                    onClick={() => setTab(1)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 1 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    Phản hồi
                </button>
                <button
                    onClick={() => setTab(2)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 2 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    Chủ đề
                </button>
                <button
                    onClick={() => setTab(3)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 3 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    File
                </button>
            </div>
        </div>
    )
}