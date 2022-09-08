import React, {FC} from "react"
import {Link, useParams} from "react-router-dom";

export const NavigateTabBudgetPage:FC = () => {
    const { id: projectID, type } = useParams<{ id: string , type: string}>();

    return (
        <div className={"border-0.5 border-primary-border flex items-center"}>
            <Link to={`/pm/project/${projectID}/budget/type/1`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "1" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Ngân sách-Hợp đồng
            </Link>
            {/* <Link to={`/pm/project/${projectID}/budget/type/2`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Bảo lãnh tạm ứng
            </Link>
            <Link to={`/pm/project/${projectID}/budget/type/3`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "3" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Bảo lãnh hợp đồng
            </Link> */}
            <Link to={`/pm/project/${projectID}/budget/type/4`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "4" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Kế hoạch chi
            </Link>
            {/* <Link to={`/pm/project/${projectID}/budget/type/5`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (type === "5" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Kế hoạch thu
            </Link> */}
        </div>
    )
}