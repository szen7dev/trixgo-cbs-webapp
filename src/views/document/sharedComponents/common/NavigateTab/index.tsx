import React, {FC} from "react";
import {Link, useParams} from "react-router-dom";

export const NavigateTab:FC = () => {
    const {id: departmentID, type} = useParams<{id: string, type: string}>();

    return (
        <div className={"border-0.5 border-primary-border flex items-center mt-1"}>
            <Link to={`/pm/project/${departmentID}/document`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (!type ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                Danh sách
            </Link>
            <Link to={`/pm/project/${departmentID}/document/1`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "1" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                Phân loại
            </Link>
            <Link to={`/pm/project/${departmentID}/document/2`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "2" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                Danh bạ hệ thống
            </Link>
            <Link to={`/pm/project/${departmentID}/document/3`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "3" ? "bg-cbs-soft-blue text-primary" : "bg-white text-primary-gray")}>
                Gói thầu
            </Link>
        </div>
    )
}