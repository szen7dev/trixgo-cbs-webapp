import React, {FC, useCallback, useState} from "react"
import iconBack from "assets/images/icon-back-gray.svg";
import {useHistory, useParams} from "react-router-dom";
import {useCashFlowPlan} from "services/hooks/financial/useCashFlow";
import downloadIcon from "assets/images/icons8-download-64.svg";
import PaginateV2 from "shareComponents/common/PaginateV2";
import moment from "moment";
import {formatNumberMoney} from "utils/cmcs";

const ProjectBudgetSpendingDetailPage:FC = () => {
    const { id: projectID, budgetId } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const history = useHistory();
    const {isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage} = useCashFlowPlan({
        params: {
            parentID: budgetId,
            projectID: projectID
        },
        isFetchList: true
    })

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const { info: cashFlowInfo, isLoadingInfo } = useCashFlowPlan({
        params: {
            cashFlowID: budgetId,
            populates: JSON.stringify({
                path: 'admins members userCreate',
                select: '_id bizfullname image'
            })
        },
        isFetchInfo: true
    })

    const getPriority = useCallback((priority: any) => {
        switch (priority) {
            case 1:
                return "Bình thường";
            case 2:
                return "Ưu tiên";
            case 3:
                return "Cao";
        }
    }, [listWithPager]);

    if (!cashFlowInfo) return <></>
    return (
        <div className={"project-budget-detail relative flex flex-col h-full overflow-hidden"}>
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center"}>
                    <button
                        onClick={() => history.push(`/pm/project/${projectID}/budget/type/4`)}
                        className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}>
                        <img src={iconBack} alt={"----"} className={"w-[18px]"}/>
                    </button>
                    <p className={"text-lg text-primary-gray ml-2"}>{cashFlowInfo.name}</p>
                    <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    <div className={"flex flex-1 items-center justify-end mr-4"}>
                        <span className={"text-primary-gray"}>Admin ({cashFlowInfo.admins.length}) | Thành viên ({cashFlowInfo.members.length})</span>
                        {
                            cashFlowInfo.members.slice(0,3).map(member => (
                                <img key={member._id}
                                     src={member.image ? `${process.env.REACT_APP_URL_S3_USER}/${member.image}` : '/images/common/thumbnail.png'}
                                     alt={member.fullname} className={"rounded-full overflow-hidden h-[32px] w-[32px] min-h-[32px] min-w-[32px] max-h-[32px] max-w-[32px] mx-1"}/>
                            ))
                        }
                        {
                            cashFlowInfo.members.length-4 > 0 &&
                            <div
                                className={"rounded-full overflow-hidden h-[32px] w-[32px] min-h-[32px] min-w-[32px] max-h-[32px] max-w-[32px] mx-1 bg-primary-border text-lg flex items-center justify-center text-white"}
                            >
                                +{cashFlowInfo.members.length}
                            </div>
                        }
                    </div>
                    <PaginateV2
                        fitContent={true}
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
            </div>

            <div className="flex-1 overflow-y-auto">
                <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                    <thead>
                    <tr className={"sticky top-0"}>
                        <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                            TT
                        </th>
                        <th className={"w-3/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Nội dung
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Hợp đồng
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Nhà thầu
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Giá trị kế hoạch
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ngày kế hoạch
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Giá trị thực tế
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Ngày thực tế
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Xây dựng mẫu BoQ cho công tác preliminaries
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-normal text-left"}>
                            Cao
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (listWithPager[pageIndex]??[]).map((plan,i) => (
                            <tr key={plan._id}>
                                <td className={"p-2 border-0.5 border-primary-border text-center"}>
                                    {i+(pageIndex*20)+1}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.name}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.contract.name}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.contract?.sellerInfo?.name}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {formatNumberMoney(plan.value)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {moment(plan.date).format("DD/MM/YYYY")}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {formatNumberMoney(plan.realValue)}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {moment(plan.realDate).format("DD/MM/YYYY")}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {plan.note}
                                </td>
                                <td className={"p-2 border-0.5 border-primary-border"}>
                                    {getPriority(plan.priority)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProjectBudgetSpendingDetailPage;