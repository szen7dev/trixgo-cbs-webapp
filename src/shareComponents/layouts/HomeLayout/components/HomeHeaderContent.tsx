import React, {FC, Fragment, useState} from "react";
import {Menu, Transition} from '@headlessui/react';
import trigangleDown from "assets/images/triangle-down.svg";
import searchIcon from "assets/images/icons8-search-120.png";
import BlueCheck from "assets/images/blue-check.svg";

export const HomeHeaderContent:FC = () => {
    const [tab, setTab] = useState(1);
    const [filter, setFilter] = useState("all");

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
    return (
        <div className={"flex items-center justify-between pr-20"}>
            <div className={"flex-1 relative"}>
                <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                    <img src={searchIcon} alt={"search icon"}/>
                </div>
                <input className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-lg text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none"} placeholder={"Tìm trong chủ đề"}/>
            </div>
            <div className={"flex border-collapse ml-3 mr-3"}>
                <button
                    onClick={() => setTab(1)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 1 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    Chủ đề
                </button>
                <button
                    onClick={() => setTab(2)}
                    className={"border-0.5 border-primary-border px-3 py-1 " + (tab === 2 ? "bg-cbs-soft-blue text-primary" : "text-primary-gray")}>
                    Phản hồi
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