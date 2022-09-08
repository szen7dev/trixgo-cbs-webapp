import React, {FC, useCallback} from "react";
import iconBack from "assets/images/icon-back-gray.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import {Link, useHistory, useParams} from "react-router-dom";
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
} from "../../../../services/hooks/cmcs/useContractProduce";
import {useModal} from "../../../../services/hooks/useModal";

const ProjectBudgetDetailPage:FC = () => {
    const { id: projectID, type, budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const history = useHistory();

    const activeTab = useCallback(() => {
        return tab.trim();
    }, [tab])
    // Xử lý logic code
    const contractID = budgetId;
    const { openModal } = useModal();

    const contractProduce = UseContractProduceList("", budgetId);
    const { createContractProduceMutateAsync } = useCreateContractProduceMutation();
    const { updateContractProduceMutateAsync } = useUpdateContractProduceMutation();
    const { contractInfo } = useContract({
		params: {
			contractID,
			// select: `name sign date buyerBank sellerBank sellerInfo status expiredAg expiredCg 
            // value vatValue plus vatPlus contractProduce contractVatProduce
            // contractAcceptance contractVatAcceptance contractPlusAcceptance contractVatPlusAcceptance
            // contractAmountPaid contractRemainingPayment finalValue produce vatProduce plusProduce vatPlusProduce remainingProduce 
            // recommendedPayment amountPaid remainingPayment`,
			populates: JSON.stringify({
				path: "project buyerInfo",
				select: "_id name"
			})
		},
		isFetchInfo: !!contractID
	});

    const handleFinishForm = useCallback(async (values, isEdit = false) => {
        let res: any
        if (isEdit) {
            res = await updateContractProduceMutateAsync(values);
        } else {
            res = await createContractProduceMutateAsync(values);
        }

        if (res.code && res.code !== 200) {
            return false;
        }

        if (!res.error) {
            contractProduce.refetch()
            return true;
        }
        return false;
    }, [contractProduce]);

    return (
        <div className={"project-budget-detail relative flex flex-col h-full overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center"}>
                    <div className={"flex flex-1 items-center"}>
                        <button
                            onClick={() => history.push(`/pm/project/${projectID}/budget/type/1`)}
                            className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                            <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                        </button>
                        <p className={"text-lg text-primary-gray ml-2"}>{contractInfo?.name}</p>
                    </div>
                    <button
                        className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-4"
                        onClick={() =>
                            openModal(
                                <div
                                    className={
                                        // "inline-block w-[900px] h-[800px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                                        "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
                                    }
                                >
                                    <ContractProduceModal onFinish={handleFinishForm} contractID={budgetId} title="Thêm mới" />
                                </div>
                            )
                        }
                    >
                        Tạo mới
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
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
        </div>
    )
}

export default ProjectBudgetDetailPage;