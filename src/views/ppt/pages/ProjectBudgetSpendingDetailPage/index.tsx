import React, {FC} from "react"
import iconBack from "assets/images/icon-back-gray.svg";
import {useHistory, useParams} from "react-router-dom";
import {useCashFlowPlan} from "services/hooks/financial/useCashFlow";

const ProjectBudgetSpendingDetailPage:FC = () => {
    const { id: projectID, budgetId } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const history = useHistory();
    const {isLoading, fetchNextPage, hasNextPage, totalRecord, list, totalPage} = useCashFlowPlan({
        params: {
            parentID: budgetId
        },
        isFetchList: true
    })

    return (
        <div className={"project-budget-detail relative flex flex-col h-full overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center"}>
                    <button
                        onClick={() => history.push(`/pm/project/${projectID}/budget/type/4`)}
                        className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <p className={"text-lg text-primary-gray ml-2"}></p>
                </div>
            </div>
        </div>
    )
}

export default ProjectBudgetSpendingDetailPage;