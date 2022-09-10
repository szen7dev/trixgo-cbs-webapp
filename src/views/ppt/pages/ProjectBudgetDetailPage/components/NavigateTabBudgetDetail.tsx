import React, {FC, useCallback} from "react";
import {Link, useLocation, useParams} from "react-router-dom";

export const NavigateTabBudgetDetail:FC = () => {
    const { id: projectID, type, budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const location = useLocation();

    const activeTab = useCallback(() => {
        return tab.trim();
    }, [tab])

    const linkGenerate = (tabId: string) => {
        if(location.pathname.includes("/cmcs/home/")){
            return `/cmcs/home/${budgetId}/tab/${tabId}`
        } else {
            return `/pm/project/${projectID}/budget/type/${type}/detail/${budgetId}/tab/${tabId}`
        }
    }

    return (
        <div className={"border-0.5 border-primary-border flex items-center"}>
            <Link to={linkGenerate('1')} className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "1" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Thông tin chung
            </Link>
            <Link to={linkGenerate('2')}  className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Sản lượng
            </Link>
            <Link to={linkGenerate('3')}  className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "3" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Nghiệm thu
            </Link>
            <Link to={linkGenerate('4')}  className={"px-4 py-2 border-r-0.5 border-primary-border " + (activeTab() === "4" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
                Thanh toán
            </Link>
        </div>
    )
}