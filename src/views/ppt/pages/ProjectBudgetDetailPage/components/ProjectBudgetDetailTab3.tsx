import React, { FC, useCallback, useState } from "react";

import { useModal } from "services/hooks/useModal";
import moment from "moment";
import { toast } from "react-toastify";
import downloadIcon from "assets/images/icons8-download-96.svg";

import { DATE_FORMAT, CONTRACT_IPC_TYPES, CONTRACT_IPC_PLANS } from "apis/localdb/index";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { ContractIpcModal, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import {useHistory, useLocation, useParams} from "react-router-dom";
import {
    useCreateContractIPCMutation,
    useUpdateContractIPCMutation,
    useDeleteContractIPCMutation, 
    UseContractIPCListWithPager,
    useContractIpcCustom
} from "services/hooks/cmcs/useContractIPC";
import {NavigateTabBudgetDetail} from "./NavigateTabBudgetDetail";
import PaginateV2 from "shareComponents/common/PaginateV2";
import iconBack from "assets/images/icon-back-gray.svg";
import { createLinkAndClick } from 'utils';
import {  Loader } from "shareComponents/common";
interface Props {
    contractInfo: any
};

export const ProjectBudgetDetailTab3:FC<Props> = ({ contractInfo }) => {
    const { exportContractIpcAsync } = useContractIpcCustom({});
    const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

    const { id: projectID, type, budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const history = useHistory();
    const location = useLocation();

    const [itemChecked, setItemChecked] = useState('');

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const { openModal } = useModal();
    const params: any = useParams();
  
    const {
        listContractIPCWithPager,
        totalRecord,
        totalPage,
        nextCursor,
        refetch,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = UseContractIPCListWithPager(true, {}, params.budgetId, 20)
  
    const { createContractIPCMutateAsync } = useCreateContractIPCMutation();
    const { updateContractIPCMutateAsync } = useUpdateContractIPCMutation();
    const { deleteContractIPCMutateAsync } = useDeleteContractIPCMutation();
  
    const { openDeleteConfirm } = useDeleteConfirm();

    const handleDeleteAction = async () => {
        if (!itemChecked) {
            return
        }
        openDeleteConfirm({
            deleteAction: async () => {
                const res = await deleteContractIPCMutateAsync(itemChecked)
                if (!res.error) {
                    setPageIndex(0);
                    ref.current&&ref.current.resetPaginate();
                    refetch()
                }
            },
        });
    }

    const handleEditAction = async () => {
        if (!itemChecked) {
            return
        }
        openModal(
            <div
                className={
                    "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
                }
            >
                <ContractIpcModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit={true} contractID={params.budgetId} title="Cập nhật" />
            </div>
        )
    }

    const handleFinishForm = useCallback(async (values, isEdit = false) => {
        let res: any
        if (isEdit) {
            res = await updateContractIPCMutateAsync(values);
        } else {
            res = await createContractIPCMutateAsync(values);
        }

        if (res.code && res.code !== 200) {
            return false;
        }

        if (!res.error) {
            setPageIndex(0);
            ref.current&&ref.current.resetPaginate();
            refetch()
            return true;
        }
        return false;
    }, [listContractIPCWithPager]);

    const handleExportReport = async () => {
        try {
            setStateExport({ isExporting: true });
            let conditionDownload;
            if(itemChecked){
                conditionDownload = { option: "1", ipcID: itemChecked };
            }else{
                conditionDownload = { option: "1", contractID: contractInfo._id  };
            }
            const { error, data } = await exportContractIpcAsync(conditionDownload);
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
            <div className={"sticky top-0 bg-white"}>
                <div className={"flex items-center"}>
                    <div className={"flex flex-1 items-center"}>
                        <button
                            onClick={() => {
                                if(location.pathname.includes("/cmcs/home/")){
                                    history.push(`/cmcs/home`)
                                } else {
                                    history.push(`/pm/project/${projectID}/budget/type/1`)
                                }
                            }}
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
                                        "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
                                    }
                                >
                                    <ContractIpcModal onFinish={handleFinishForm} contractID={params.budgetId} title="Tạo mới" />
                                </div>
                            )
                        }
                    >
                        Tạo mới
                    </button>
                </div>
                <div className={"flex items-center pb-2"}>
                    <NavigateTabBudgetDetail/>
                    {itemChecked && (
                        <ActionMenuTopBar deleteAction={handleDeleteAction} editAction={handleEditAction} updatePermission={true} deletePermission={true}/>
                    )}
                     <button className={"flex items-center justify-center mx-3 ml-6"} onClick={handleExportReport}>
                        <img src={downloadIcon} alt={"-----"} className={"w-[18px] h-[18px]"} />
                    </button>
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
            </div>
            <div className="flex-1 overflow-y-auto">
                <table className={"table-fixed border-collapse w-full mt-4 mb-6"}>
                <thead>
                    <tr className={"sticky top-0 z-5"}>
                        <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                            <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Phân loại
                        </th>
                        <th className={"w-2/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Nội dung
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Ngày tháng
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Giá trị nghiệm thu hoàn thành (1)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Giá trị giữ lại (2)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Thu hồi tạm ứng (3)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Khấu trừ khác (4)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Đề nghị tạm ứng/thanh toán (5)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Thời hạn thanh toán
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Đã thanh toán (6)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Còn lại chưa thanh toán (7=5-6)
                        </th>
                        <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                            Ghi chú
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.acceptance + contractInfo?.vatAcceptance + contractInfo?.plusAcceptance + contractInfo?.vatPlusAcceptance)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.retainedValue)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.advancePaymentDeduction)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.otherDeduction)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.recommendedPayment)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.advancePaymentPaid + contractInfo?.amountPaid)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                            {formatNumberMoney(contractInfo?.remainingPayment)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                        </td>
                    </tr>
                    {
                        (listContractIPCWithPager[pageIndex]??[]).map((item: any, i: number) => (
                            <tr key={i}>
                                <td className={"border-0.5 border-primary-border p-2 text-center align-middle"}>
                                <input
                                    className="form-check-input mr-2"
                                    type="checkbox"
                                    checked={itemChecked === item._id}
                                    onChange={() => setItemChecked(item._id)}
                                />
                                    {/* <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/> */}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
                                    {item.type && CONTRACT_IPC_PLANS[item.plan-1].text}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
                                    {item.name}
                                    <p>
                                        <i className="text-primary-gray">{
                                            item.type && CONTRACT_IPC_TYPES[item.type-1].text
                                        }</i>
                                    </p>
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.acceptance + item.vatAcceptance + item.plusAcceptance + item.vatPlusAcceptance || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.retainedValue || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.advancePaymentDeduction || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.otherDeduction || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.recommendedPayment || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {moment(item.date).isValid() && moment(item.timeForPayment).format(DATE_FORMAT)}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.amountPaid || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                    {formatNumberMoney((item.remainingPayment || 0))}
                                </td>
                                <td className={"border-0.5 border-primary-border p-2"}>
                                    {item.note}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </>
    )
}