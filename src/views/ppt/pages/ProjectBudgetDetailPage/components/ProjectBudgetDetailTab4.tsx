import React, { FC, useCallback, useState } from "react";

import { useModal } from "services/hooks/useModal";
import moment from "moment";
import { DATE_FORMAT, CONTRACT_IPC_TYPES } from "apis/localdb/index";

import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { ContractPaymentModal, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import {useHistory, useParams} from "react-router-dom";

import {
    useCreateContractPaymentMutation,
    useUpdateContractPaymentMutation,
    useDeleteContractPaymentMutation, UseContractPaymentListWithPager,
} from "services/hooks/cmcs/useContractPayment";
import {NavigateTabBudgetDetail} from "./NavigateTabBudgetDetail";
import PaginateV2 from "shareComponents/common/PaginateV2";
import iconBack from "assets/images/icon-back-gray.svg";
interface Props {
    contractInfo: any
};

export const ProjectBudgetDetailTab4:FC<Props> = ({ contractInfo }) => {
    const { id: projectID, type, budgetId, tab } = useParams<{ id: string , type: string, budgetId: string, tab: string}>();
    const history = useHistory();

    const [itemChecked, setItemChecked] = useState('');

    type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

    const { openModal } = useModal();
    const params: any = useParams();
  
    const {
        listContractPaymentWithPager,
        totalRecord,
        totalPage,
        refetch,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = UseContractPaymentListWithPager(true, {}, params.budgetId, 20, '');
    const { createContractPaymentMutateAsync } = useCreateContractPaymentMutation();
    const { updateContractPaymentMutateAsync } = useUpdateContractPaymentMutation();
    const { deleteContractPaymentMutateAsync } = useDeleteContractPaymentMutation();
  
    const { openDeleteConfirm } = useDeleteConfirm();

    const handleDeleteAction = async () => {
        if (!itemChecked) {
            return
        }
        openDeleteConfirm({
            deleteAction: async () => {
                const res = await deleteContractPaymentMutateAsync(itemChecked)
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
            <div className={
                "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
            }
            >
                <ContractPaymentModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit={true} contractID={params.budgetId} title="Cập nhật" refetchList={refetch}/>
            </div>
        )
    }

    const handleFinishForm = useCallback(async (values, isEdit = false) => {
        let res: any
        if (isEdit) {
            res = await updateContractPaymentMutateAsync(values);
        } else {
            res = await createContractPaymentMutateAsync(values);
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
    }, [listContractPaymentWithPager]);
  
    return (
        <>
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
                                <div className={
                                    "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
                                }
                                >
                                    <ContractPaymentModal onFinish={handleFinishForm} contractID={params.budgetId} refetchList={refetch} title="Tạo mới" />
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
            <table className={"table-fixed border-collapse w-full mt-4 mb-6"}>
                <thead>
                <tr className={"sticky top-0 z-5"}>
                    <th className={"w-[50px] bg-cbs-table-header p-2 border-0.5 border-primary-border align-middle"}>
                        <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                    </th>
                    <th className={"w-3/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                        Nội dung
                    </th>
                    <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                        Ngày tháng
                    </th>
                    <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                        Mã hiệu
                    </th>
                    <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                        Thuộc kỳ thanh toán
                    </th>
                    <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                        Phân loại
                    </th>
                    <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                        Giá trị giải ngân
                    </th>
                    <th className={"w-3/12 bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
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
                    <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray"}>
                    </td>
                    <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray"}>
                    </td>
                    <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                        {contractInfo?.amountPaid}
                    </td>
                    <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                    </td>
                </tr>
                {
                    (listContractPaymentWithPager[pageIndex]??[]).map((item:any, i: number) => (
                        <tr key={i}>
                            <td className={"border-0.5 border-primary-border p-2 text-center align-middle"}>
                            <input
                                className="form-check-input mr-2"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={itemChecked === item._id}
                                onChange={() => setItemChecked(item._id)}
                            />
                                {/* <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/> */}
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                                {item?.name}
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                                {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                                {item.sign}
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                                {item.ipc.name}
                            </td>
                            <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            {
                                item.type && CONTRACT_IPC_TYPES[item.type-1].text
                            }
                            </td>
                            <td className={"border-0.5 border-primary-border p-2 text-right"}>
                                {formatNumberMoney((item.value || 0))}
                            </td>
                            <td className={"border-0.5 border-primary-border p-2"}>
                                {item.note}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </>
    )
}