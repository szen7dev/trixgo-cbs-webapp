import React, {FC, useCallback} from "react";
import iconBack from "assets/images/icon-back-gray.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import {useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import {ProjectBudgetDetailTab1} from "./components/ProjectBudgetDetailTab1";
import {ProjectBudgetDetailTab2} from "./components/ProjectBudgetDetailTab2";
import {ProjectBudgetDetailTab3} from "./components/ProjectBudgetDetailTab3";
import {ProjectBudgetDetailTab4} from "./components/ProjectBudgetDetailTab4";

const ProjectBudgetDetailPage:FC = () => {
    const { id: projectID, type, budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();

    const activeTab = useCallback(() => {
        return tab.trim();
    }, [tab])

    console.log(activeTab())
    return (
        <div className={"project-budget-detail relative flex flex-col h-full overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center"}>
                    <button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <p className={"text-lg text-primary-gray ml-2"}>Hợp đồng cung cấp, lắp đặt thiết bị hệ thống trạm xử lý nước thải</p>
                </div>
                <div className={"flex items-center pb-2 mt-2"}>
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
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <div className={"flex-1 flex items-center justify-end"}>
                        <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                            <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                        </button>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                            <img src={nextIcon} alt={"----"}/>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/*Thông tin chung*/}
                {
                    activeTab() === "1" &&
                    <ProjectBudgetDetailTab1/>
                }
                {/*End Thông tin chung*/}

                {/*Sản lượng*/}
                {
                    activeTab() === "2" &&
                    <ProjectBudgetDetailTab2/>
                }
                {/*End sản lượng*/}

                {/*Nghiệm thu*/}
                {
                    activeTab() === "3" &&
                    <ProjectBudgetDetailTab3/>
                }
                {/*End nghiệm thu*/}

                {/*Thanh toán*/}
                {
                    activeTab() === "4" &&
                    <ProjectBudgetDetailTab4/>
                }
                {/*End thanh toán*/}
            </div>
        </div>
    )
}

export default ProjectBudgetDetailPage;