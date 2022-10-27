import React, {FC, useEffect, useState} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import {NavigateTabBudgetPage} from "./NavigateTabBudgetPage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconPencil from "assets/images/icons8-pencil-96 1.png";
import {useCashFlowPlan} from "services/hooks/financial/useCashFlow";
import {Project} from "typings/items/project";
import PaginateV2 from "shareComponents/common/PaginateV2";
import moment from "moment";
import {formatNumberMoney} from "utils/cmcs";
import {Link} from "react-router-dom";
import classnames from "classnames";
import RevenueOverTimeReport from "./RevenueOverTimeReport";
import { useCmcsDashboard } from 'services/hooks/cmcs/useContractIPC';

type Props = {
    projectInfo: Project
}
const yearCurrent = new Date().getFullYear();
const reportYears = [yearCurrent, yearCurrent-1, yearCurrent-2, yearCurrent-3, yearCurrent-4];
export const ProjectBudgetPageType6:FC<Props> = ({projectInfo}) => {
    const [recordSelected, setSelectRecord] = useState<any>({});
    const [yearSelected, setYearSelected] = useState(2022);
    const [dataIPC, setDataIPC] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const { cmcsContractIPCAmountByMonth } = useCmcsDashboard({
        params: { 
            outin: 2, 
            year: yearSelected,
            projectID: projectInfo._id,
            plan: 1
        }
    });
    
    const dataIPC_ByMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    cmcsContractIPCAmountByMonth?.map((item: any)=> {
        dataIPC_ByMonth[item._id.month-1] = item.amount;
    })

    useEffect(()=> {
        setDataIPC(dataIPC_ByMonth)
    }, [yearSelected, cmcsContractIPCAmountByMonth])

    return (
        <>
            <div className={"sticky top-0 z-10 block"}>
                <div className={"flex items-center px-4 py-2"}>
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetPage/>
                    {
                        recordSelected._id&&
                        <button className={"flex items-center justify-center mx-3 ml-6"}>
                            <img src={iconPencil} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    }
                </div>
                {/* end tab */}
                <div className="flex justify-between">
                    {/* filter by year */}
                    <div className={"header-table flex py-4 w-full top-0 bg-white"}>
                        {reportYears.map(year => (
                            <button
                                key={year}
                                onClick={() => setYearSelected(year)}
                                className={
                                    classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
                                        "text-white bg-cbs-secondary border-none": yearSelected === year
                                    })
                                }
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>
                {/* end filter by year */}
            </div>
            <div className="flex-1 overflow-y-auto">
                <RevenueOverTimeReport dataIPC={dataIPC}/>
                <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                    <thead>
                    <tr className={"sticky top-0"}>
                        <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                            STT
                        </th>
                        <th className={"w-5/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Kế hoạch thanh toán theo hợp đồng
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Giá trị kế hoạch
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cmcsContractIPCAmountByMonth?.map((item: any, i: number) => (
                            <tr key={item._id}>
                                <td className={"p-2 border-0.5 border-primary-border text-center"}>
                                   {i+1}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    <Link to={`/pm/project/${projectInfo._id}/budget/type/6/month/${item._id.month}/year/${item._id.year}`}>Kế hoạch thanh toán tháng {item._id.month} năm {item._id.year}</Link>
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {formatNumberMoney(item.amount)}
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}