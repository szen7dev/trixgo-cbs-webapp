import React, {FC, useCallback} from "react";
import iconBack from "assets/images/icon-back-gray.svg";
import {useHistory, useParams} from "react-router-dom";
import {ProjectBudgetDetailTab1} from "./components/ProjectBudgetDetailTab1";
import {ProjectBudgetDetailTab2} from "./components/ProjectBudgetDetailTab2";
import {ProjectBudgetDetailTab3} from "./components/ProjectBudgetDetailTab3";
import {ProjectBudgetDetailTab4} from "./components/ProjectBudgetDetailTab4";
// hook backend
import { useContract } from 'services/hooks/items/useContract';
import {ContractProduceModal} from "../../../cmcs/shareComponents/common";
import {
    UseContractProduceList,
    useCreateContractProduceMutation,
    useUpdateContractProduceMutation
} from "services/hooks/cmcs/useContractProduce";
import {useModal} from "services/hooks/useModal";

const ProjectBudgetDetailPage:FC = () => {
    const { budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();

    const activeTab = useCallback(() => {
        return tab.trim();
    }, [tab])
    // Xử lý logic code
    const contractID = budgetId;
    const { contractInfo } = useContract({
		params: {
			contractID,
			select: `name sign date buyerBank sellerBank sellerInfo status expiredAg expiredCg 
            value vatValue plus vatPlus contractProduce contractVatProduce
            contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance
            contractAmountPaid contractRemainingPayment finalValue produce vatProduce plusProduce vatPlusProduce remainingProduce 
            recommendedPayment amountPaid remainingPayment userCreate userUpdate createAt modifyAt`,
			populates: JSON.stringify({
				path: "project buyerInfo sellerInfo userCreate userUpdate",
				select: "_id name fullname"
			})
		},
		isFetchInfo: !!contractID
	});

    if (!contractInfo) return null;

    return (
        <div className={"project-budget-detail relative flex flex-col h-full overflow-hidden"}>
            {/*Thông tin chung*/}
            {
                activeTab() === "1" &&
                <ProjectBudgetDetailTab1 contractInfo={contractInfo}/>
            }
            {/*End Thông tin chung*/}

            {/*Sản lượng*/}
            {
                activeTab() === "2" &&
                <ProjectBudgetDetailTab2 contractInfo={contractInfo}/>
            }
            {/*End sản lượng*/}

            {/*Nghiệm thu*/}
            {
                activeTab() === "3" &&
                <ProjectBudgetDetailTab3 contractInfo={contractInfo}/>
            }
            {/*End nghiệm thu*/}

            {/*Thanh toán*/}
            {
                activeTab() === "4" &&
                <ProjectBudgetDetailTab4 contractInfo={contractInfo}/>
            }
            {/*End thanh toán*/}
        </div>
    )
}

export default ProjectBudgetDetailPage;