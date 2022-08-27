import React, {FC, useState} from "react";
import chervUpIcon from "assets/images/icon-cherv-up.svg";
import {RightClickMenuWrapper} from "shareComponents/common";
import MenuChildRow from "./MenuChildRow";
import {formatNumberMoney} from "utils/cmcs";
import BugetRowGroupTemp from "./BudgetRowGroupTemp";
import {Project} from "typings/items/project";
import {usePcmProjectBudget} from "services/hooks/pcm/usePcmProjectBudget";
import {Link, useParams} from "react-router-dom";

type Props = {
    collapse: boolean;
    toggleCollapse: () => void;
    projectInfo: Project
}
export const ProjectBudgetPageType1:FC<Props> = ({projectInfo, collapse, toggleCollapse}) => {
    const { id: projectID } = useParams<{ id: string }>();
    const [show, setShow] = useState<boolean>(false);

    const {
        listPcmProjectBudget,
        hasNextPage,
        fetchNextPage,
        totalRecord
    } = usePcmProjectBudget({
        projectID
    });

    return (
        <>
            <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                <thead className="bg-cbs-table-header h-[38px] border-0.5 border-primary-border">
                <tr className="font-semibold">
                    {/* <th className="sticky top-0 bg-gray-300 px-1.5 z-10">
						<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button>
					</th> */}
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2 w-[38px]">TT</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2 min-w-[200px] w-[300px]">Gói thầu/Hợp đồng</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Ngân sách</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Dự báo</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Ký hợp đồng</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Đã tạm ứng</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '125px' }}>Sản lượng</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '132px' }}>Nghiệm thu</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '123px' }}>Đã thanh toán</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '124px' }}>Còn lại phải trả</th>
                    <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '246px' }}>
                        <div className={"flex items-center"}>
                            <div className={"flex-1"}>
                                Ghi chú
                            </div>
                            <button
                                onClick={() => toggleCollapse()}
                                className={"p-2 rounded bg-white flex items-center justify-center"}>
                                <img src={chervUpIcon} alt={"----"} className={"transition-all " +(collapse?"rotate-180":"")}/>
                            </button>
                        </div>
                    </th>
                </tr>
                </thead>
                <RightClickMenuWrapper
                    contextMenu={<MenuChildRow />}
                    customRenderTag={"tbody"}
                    className="text-black"
                >
                    <tr className="text-right">
                        {/* <th className='bg-gray-300 px-1.5 relative'>
						<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: show })} />
						<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>
							{show ? '+' : '-'}
						</button>
					</th> */}
                        <th className='py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border text-center'></th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border text-left"></th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(projectInfo.budget + projectInfo.vatBudget)}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(projectInfo.forecastBudget + projectInfo.vatForecastBudget)}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(
                                projectInfo.contractValue + projectInfo.contractVatValue +
                                projectInfo.contractPlus + projectInfo.contractVatPlus
                            )}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(projectInfo.contractAdvancePaymentPaid)}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(projectInfo.contractProduce + projectInfo.contractVatProduce)}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(
                                projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
                                projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
                            )}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(projectInfo.contractAmountPaid)}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                            {formatNumberMoney(projectInfo.contractRemainingPayment)}
                        </th>
                        <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border"></th>
                    </tr>
                    {listPcmProjectBudget.map((_item: any, index) =>
                        <BugetRowGroupTemp row={_item} key={_item._id} index={index} show={show} _pid={projectID}/>
                    )}
                </RightClickMenuWrapper>
            </table>
            {hasNextPage && (
                <div className="w-full flex justify-center my-5">
                    <button onClick={fetchNextPage}>
                    <span className="text-primary">
                      Xem thêm ({totalRecord - listPcmProjectBudget.length})
                    </span>
                    </button>
                </div>
            )}
        </>
    )
}