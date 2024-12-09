import React, {FC, useState, useEffect} from "react";
import chervUpIcon from "assets/images/icon-cherv-up.svg";
import {DropdownSearchableV2, RightClickMenuWrapper, Loader} from "shareComponents/common";
import MenuChildRow from "./MenuChildRow";
import {formatNumberMoney} from "utils/cmcs";
import BugetRowGroupTemp from "./BudgetRowGroupTemp";
import {Project} from "typings/items/project";
import {usePcmProjectBudget} from "services/hooks/pcm/usePcmProjectBudget";
import {Link, useParams} from "react-router-dom";
import categoryIcon from "assets/images/icons8-category-48.svg";
import contractIcon from "assets/images/icons8-contract-64-blue.svg";
import {NavigateTabBudgetPage} from "./NavigateTabBudgetPage";
import downloadIcon from "assets/images/icons8-download-64.svg";
import pencilIcon from "assets/images/icons8-pencil-96 1.png";
import nextIcon from "assets/images/icons-arrow-next.svg";
import { createLinkAndClick } from 'utils';
import { toast } from "react-toastify";
import { useContractCustom } from "services/hooks/cmcs/useContractIncome";

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

    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

    const { exportContractAsync } = useContractCustom({});
    const handleExportReport = async () => {
        try {
            setStateExport({ isExporting: true });
            const { error, data } = await exportContractAsync({
                filterParams: {
                    projectID
                },
                type: 'project'
            });
            if(error) {
                return toast.warn(data?.message);
            }

            data && createLinkAndClick(data, '_self');
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setStateExport({ isExporting: false });
        }
    }
    
    if(stateExport.isExporting) {
        return <Loader className="border-primary" />
    }
    return (
        <>
            <div className={"sticky top-0 z-10 " + (collapse?"hidden":"block")}>
                <div className={"flex items-center px-4 py-2"}>
                    {/* <div className={"flex items-center flex-1"}>
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại gói thầu"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Hình thức"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Loại hợp đồng"}
                            prefixIcon={<img className={"mr-2"} src={contractIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                        <DropdownSearchableV2
                            className={"mr-4 border border-primary-border rounded-lg mb-2"}
                            placeholder={"Trạng thái"}
                            prefixIcon={<img className={"mr-2"} src={categoryIcon} alt={"icon"}/>}
                            isMultiple={true}
                            disableSearch={true}
                            data={[]}
                        />
                    </div> */}
                    {/* <button className={"h-[32px] rounded bg-cbs-green text-white font-bold px-4"}>
                        Tạo mới
                    </button> */}
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetPage/>
                    <button className={"flex items-center justify-center mx-3 ml-6"} onClick={handleExportReport}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button>
                    {/* <button className={"flex items-center justify-center mx-3 ml-6"}>
                        <img src={pencilIcon} alt={"-----"} className={"w-[18px] h-[18px]"}/>
                    </button> */}
                    {/* <div className={"flex-1 flex items-center justify-end"}>
                        <span className={"text-primary-gray"}>1-50 trong số 2.358</span>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"} disabled={true}>
                            <img src={nextIcon} alt={"----"} className={"rotate-180"}/>
                        </button>
                        <button className={"w-[36px] h-[36px] rounded-full bg-cbs-left-menu mx-2 disabled:bg-transparent disabled:opacity-50 flex items-center justify-center"}>
                            <img src={nextIcon} alt={"----"}/>
                        </button>
                    </div> */}
                </div>
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className="table-fixed border-collapse w-full overflow-auto border-0.5 border-primary-border">
                    <thead className="bg-cbs-table-header h-[38px] border-0.5 border-primary-border">
                    <tr className="font-semibold">
                        {/* <th className="sticky top-0 bg-gray-300 px-1.5 z-10">
                            <button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{show ? '+' : '-'}</button>
                        </th> */}
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2 w-[38px]">TT</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2 min-w-[200px] w-[300px]">Hợp đồng</th>
                        {/* <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Ngân sách</th> */}
                        {/* <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Dự báo</th> */}
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Giá trị ký</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Giá trị phát sinh</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '122px' }}>Giá trị đã tạm ứng</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '125px' }}>Sản lượng thực hiện</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '132px' }}>Nghiệm thu hoàn thành</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '123px' }}>Đã thanh toán</th>
                        <th className="sticky top-0 bg-cbs-table-header border-0.5 border-cbs-border px-2" style={{ maxWidth: '124px' }}>Còn lại phải trả theo công nợ</th>
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
                            {/* <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                                {formatNumberMoney(projectInfo.budget + projectInfo.vatBudget)}
                            </th> */}
                            {/* <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                                {formatNumberMoney(projectInfo.forecastBudget + projectInfo.vatForecastBudget)}
                            </th> */}
                            <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                                {formatNumberMoney(
                                    projectInfo.contractValue + projectInfo.contractVatValue
                                )}
                            </th>
                            <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border md:text-xs">
                                {formatNumberMoney(
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
            </div>
        </>
    )
}