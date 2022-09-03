import React, {FC } from "react";
import { Link } from "react-router-dom";

interface Props {
    tab: any
}

export const PcmHomeTab8:FC<Props> = ({ tab }) => {
    return (
        <>
            <Link to={"/pcm/draft"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (!tab ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Tất cả
                </button>
            </Link>
            <Link to={"/pcm/draft/2"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Quá hạn
                </button>
            </Link>
            <Link to={"/pcm/draft/3"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "3" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Tuần tới
                </button>
            </Link>
            <Link to={"/pcm/draft/4"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "4" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    {">"} 7 ngày
                </button>
            </Link>
            <Link to={"/pcm/draft/5"}>
                <button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "5" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                    Hoàn thành
                </button>
            </Link>
        </>
    )
}