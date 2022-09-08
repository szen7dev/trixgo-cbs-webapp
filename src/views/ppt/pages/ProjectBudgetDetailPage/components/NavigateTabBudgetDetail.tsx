import React, {FC, useCallback} from "react";
import {Link, useParams} from "react-router-dom";

export const NavigateTabBudgetDetail:FC = () => {
    const { id: projectID, type, budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const activeTab = useCallback(() => {
        return tab.trim();
    }, [tab])

    return (
        <div className={"border-0.5 border-primary-border flex items-center"}>
            <Link to={`/pm/project/${projectID}/budget/type/${type}/detail/${budgetId}/tab/1`} className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "1" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Thông tin chung
            </Link>
            <Link to={`/pm/project/${projectID}/budget/type/${type}/detail/${budgetId}/tab/2`}  className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Sản lượng
            </Link>
            <Link to={`/pm/project/${projectID}/budget/type/${type}/detail/${budgetId}/tab/3`}  className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "3" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Nghiệm thu
            </Link>
            <Link to={`/pm/project/${projectID}/budget/type/${type}/detail/${budgetId}/tab/4`}  className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "4" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Thanh toán
            </Link>
        </div>
    )
}