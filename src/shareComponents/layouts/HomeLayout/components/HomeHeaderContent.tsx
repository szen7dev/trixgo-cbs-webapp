import React, {FC, useState} from "react";

export const HomeHeaderContent:FC = () => {
    const [tab, setTab] = useState(1);
    return (
        <div className={"flex items-center justify-between"}>
            <div className={"flex-1"}>
                <input className={"w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-lg text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none"} placeholder={"Tìm trong chủ đề"}/>
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