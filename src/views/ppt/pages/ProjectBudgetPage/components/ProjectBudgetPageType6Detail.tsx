import React, {FC, useState} from "react";
import {DropdownSearchableV2} from "shareComponents/common";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import {NavigateTabBudgetPage} from "./NavigateTabBudgetPage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96 1.png";
import {useCashFlowPlan} from "services/hooks/financial/useCashFlow";
import {Project} from "typings/items/project";
import PaginateV2 from "shareComponents/common/PaginateV2";
import moment from "moment";
import {formatNumberMoney} from "utils/cmcs";
import {Link, useParams, useHistory} from "react-router-dom";
import { UseContractIPCGetListByMonthWithPager } from "services/hooks/cmcs/useContractIPC";
import { CONTRACT_IPC_PLANS } from "apis/localdb/index";
type Props = {
    projectInfo: Project
}
export const ProjectBudgetPageType6Detail:FC<Props> = ({ projectInfo }) => {
    const [recordSelected, setSelectRecord] = useState<any>({});
	const { month, year } = useParams<{ month: string, year: string}>();
    const history = useHistory();

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage } = UseContractIPCGetListByMonthWithPager({
        params: {
            projectID: projectInfo._id,
            month,
            year,
            plan: 1,
            populates:  JSON.stringify({
                path: "project userCreate contract",
                select: "name date sign fullname sellerInfo",
                populate: ({
                    path: "sellerInfo",
                    select: "name"
                })
            }),
        },
        isFetchList: true
    })
    console.log(listWithPager)

    return (
        <>
            <div className={"sticky top-0 z-10 block"}>
                <div className={"flex items-center px-4 py-2"}>
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetPage/>
                    {/* <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button> */}
                    {
                        recordSelected._id&&
                        <button className={"flex items-center justify-center mx-3 ml-6"}>
                            <img src={pencilIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                        </button>
                    }

                    <PaginateV2
                        ref={ref}
                        totalRecord={totalRecord}
                        totalPages={totalPage}
                        limit={20}
                        hasNextPage={hasNextPage}
                        isFetching={isLoading}
                        nextPageAction={() => {
                            fetchNextPage();
                            setPageIndex(oldState => oldState+1)
                        }}
                        prevPageAction={() => {
                            setPageIndex(oldState => oldState-1)
                        }}
                    />
                </div>
                <div className={"flex items-center px-4 py-2"}>
                    <button onClick={history.goBack}>
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
                    <p className="text-lg ml-2">Tổng hợp công nợ tháng {month} năm {year}</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">

                <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                    <thead>
                    <tr className={"sticky top-0"}>
                        <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                            {/* <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/> */}
                            STT
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Phân loại
                        </th>
                        <th className={"w-3/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Nội dung
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ngày tháng
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Đề nghị tạm ứng/thanh toán (1)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Thời hạn thanh toán theo kế hoạch
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Đã thanh toán (2)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Còn lại chưa thanh toán (3=1-2)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ghi chú
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (listWithPager[pageIndex]??[]).map((plan: any,i: number) => (
                            <tr key={plan._id}>
                                <td className={"p-2 border-0.5 border-primary-border text-center"}>
                                    {i+1}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.type && CONTRACT_IPC_PLANS[plan.plan-1]?.text}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    <Link to={`/pm/project/${plan?.project?._id}/budget/type/1/detail/${plan?.contract?._id}/tab/3`}>
                                        <p className=" text-[14px]">{plan?.name}</p>
                                        <p className={"text-primary-gray text-xs"}>{plan?.contract?.sellerInfo?.name}</p>
                                        <p className={"text-primary-gray text-xs"}><i>{plan?.contract?.name} - {plan?.contract?.sign} - { moment(plan?.contract?.date).format("L")}</i></p>
                                    </Link>
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    { moment(plan?.timeForPayment).format("L")}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border text-right"}>
                                    {formatNumberMoney(plan.recommendedPayment)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    { moment(plan.timeForPayment).format("L")}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border text-right"}>
                                    {formatNumberMoney(plan.amountPaid)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border text-right"}>
                                    {formatNumberMoney(plan.remainingPayment)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    { plan.note }
                                </td>
                            </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}