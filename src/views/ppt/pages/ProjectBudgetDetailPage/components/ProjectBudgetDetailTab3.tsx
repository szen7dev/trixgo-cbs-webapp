import { FC, useCallback, useEffect, useState } from "react";

import cn from "classnames";

import { useModal } from "services/hooks/useModal";
import moment from "moment";
import { DATE_FORMAT } from "apis/localdb/index";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { SearchInput, Paginate } from "shareComponents/common";
import { ContractIpcModal, DropdownFilterButton, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import styles from 'views/cmcs/styles/styles.module.css';
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import { useParams } from "react-router-dom";
import {
  UseContractIPCList,
  useCreateContractIPCMutation,
  useUpdateContractIPCMutation,
  useDeleteContractIPCMutation,
} from "services/hooks/cmcs/useContractIPC";

interface Props {
    contractInfo: any
};

export const ProjectBudgetDetailTab3:FC<Props> = ({ contractInfo }) => {
    const [itemChecked, setItemChecked] = useState('');

    const [pageParam, setPageParam] = useState('');
    const [prevCursor, setPrevCursor] = useState([null]);
  
    const { openModal } = useModal();
    const params: any = useParams();
  
    const contractIPC = UseContractIPCList(pageParam, params.budgetId);
  
    const { createContractIPCMutateAsync } = useCreateContractIPCMutation();
    const { updateContractIPCMutateAsync } = useUpdateContractIPCMutation();
    const { deleteContractIPCMutateAsync } = useDeleteContractIPCMutation();
  
    useEffect(() => {
      if (!contractIPC.nextCursor) {
        return;
      }
      const isExist = prevCursor.find(item => item === contractIPC.nextCursor)
      if (!isExist) {
        setPrevCursor([...prevCursor, contractIPC.nextCursor])
      }
    }, [contractIPC.nextCursor]);
  
    const prevPageAction = () => {
      if (!contractIPC.nextCursor) {
        setPageParam(prevCursor[prevCursor.length - 2] || '')
      } else {
        const prev = prevCursor.findIndex(item => item === contractIPC.nextCursor)
        setPageParam(prevCursor[prev - 2] || '')
      }
    };
  
    const nextPageAction = () => setPageParam(contractIPC.nextCursor);
  
    const { openDeleteConfirm } = useDeleteConfirm();
  
    const handleDeleteAction = async () => {
      if (!itemChecked) {
        return
      }
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await deleteContractIPCMutateAsync(itemChecked)
          if (!res.error) {
            contractIPC.refetch()
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
        contractIPC.refetch()
        return true;
      }
      return false;
    }, [contractIPC]);

    return (
        <>
        {itemChecked && (
            <ActionMenuTopBar deleteAction={handleDeleteAction} editAction={handleEditAction} updatePermission={true} deletePermission={true}/>
        )}
        <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
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
        <table className={"table-fixed border-collapse w-full mt-4 mb-6"}>
            <thead>
            <tr className={"sticky top-0"}>
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
                    Đề nghị tạm ứng/thanh toán (1)
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Thời hạn thanh toán
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Đã thanh toán (2)
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Còn lại chưa thanh toán (3=1-2)
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
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    {formatNumberMoney(contractInfo?.recommendedPayment)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    {formatNumberMoney(contractInfo?.amountPaid)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    {formatNumberMoney(contractInfo?.remainingPayment)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
            </tr>
            {
                contractIPC?.listContractIPC?.map((item: any, i: number) => (
                    <tr key={i}>
                        <td className={"border-0.5 border-primary-border p-2 text-center align-middle"}>
                        <input
                            className="form-check-input line mr-2"
                            type="checkbox"
                            checked={itemChecked === item._id}
                            onChange={() => setItemChecked(item._id)}
                        />
                            {/* <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/> */}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            {item.name}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            {item.sign}
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
        </>
    )
}