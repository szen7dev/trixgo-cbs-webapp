import React, {FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    tab: any
}

export const PcmHomeTab5:FC<Props> = ({ tab }) => {
    return (
        <>
            <Link to={"/pcm/assign"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (!tab ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Tất cả
                </button>
            </Link>
            <Link to={"/pcm/assign/2"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Quá hạn
                </button>
            </Link>
            <Link to={"/pcm/assign/3"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "3" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Tuần tới
                </button>
            </Link>
            <Link to={"/pcm/assign/4"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "4" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    {">"} 7 ngày
                </button>
            </Link>
            <Link to={"/pcm/assign/5"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "5" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Hoàn thành
                </button>
            </Link>
        </>
    )
}