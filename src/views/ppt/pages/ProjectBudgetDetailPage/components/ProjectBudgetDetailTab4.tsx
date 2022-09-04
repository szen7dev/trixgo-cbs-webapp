import { FC, useCallback, useEffect, useState } from "react";
import debounce from "lodash/debounce";
import cn from "classnames";

import { useModal } from "services/hooks/useModal";
import moment from "moment";
import { DATE_FORMAT, CONTRACT_IPC_TYPES } from "apis/localdb/index";

import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { SearchInput, Paginate } from "shareComponents/common";
import { ContractPaymentModal, DropdownFilterButton, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import styles from 'views/cmcs/styles/styles.module.css';
import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import { useParams } from "react-router-dom";

import {
  UseContractPaymentList,
  useCreateContractPaymentMutation,
  useUpdateContractPaymentMutation,
  useDeleteContractPaymentMutation,
} from "services/hooks/cmcs/useContractPayment";
interface Props {
    contractInfo: any
};

export const ProjectBudgetDetailTab4:FC<Props> = ({ contractInfo }) => {
    const [itemChecked, setItemChecked] = useState('');
    const [keyword, setKeyword]         = useState('');
    const [pageParam, setPageParam] = useState('');
    const [prevCursor, setPrevCursor] = useState([null]);
  
    const { openModal } = useModal();
    const params: any = useParams();
  
    const contractPayment = UseContractPaymentList(pageParam, params.budgetId, 20, keyword);
    const { createContractPaymentMutateAsync } = useCreateContractPaymentMutation();
    const { updateContractPaymentMutateAsync } = useUpdateContractPaymentMutation();
    const { deleteContractPaymentMutateAsync } = useDeleteContractPaymentMutation();
  
    useEffect(() => {
      if (!contractPayment.nextCursor) {
        return;
      }
      const isExist = prevCursor.find(item => item === contractPayment.nextCursor)
      if (!isExist) {
        setPrevCursor([...prevCursor, contractPayment.nextCursor])
      }
    }, [contractPayment.nextCursor]);
  
    const prevPageAction = () => {
      if (!contractPayment.nextCursor) {
        setPageParam(prevCursor[prevCursor.length - 2] || '')
      } else {
        const prev = prevCursor.findIndex(item => item === contractPayment.nextCursor)
        setPageParam(prevCursor[prev - 2] || '')
      }
  
    };
  
    const nextPageAction = () => {
      setPageParam(contractPayment.nextCursor)
    }
  
    const { openDeleteConfirm } = useDeleteConfirm();
  
    const handleDeleteAction = async () => {
      if (!itemChecked) {
        return
      }
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await deleteContractPaymentMutateAsync(itemChecked)
          if (!res.error) {
            contractPayment.refetch()
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
          <ContractPaymentModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit={true} contractID={params.budgetId} title="Cập nhật" refetchList={contractPayment.refetch}/>
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
        contractPayment.refetch()
        return true;
      }
      return false;
    }, [contractPayment]);
  
    const handleOnFilter = useCallback((values) => {
      // setPageParam(() => ({ ...values }));
      return true;
    }, []);
  
    const handleOnCancelFilter = useCallback(() => {
      // setPageParam({});
    }, []);
  
    useEffect(()=> {
      contractPayment.refetch()
      }, [keyword])
  
    return (
        <>
            {itemChecked && (
                <ActionMenuTopBar deleteAction={handleDeleteAction} editAction={handleEditAction} updatePermission={true} deletePermission={true}/>
            )}
            <button
              className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
              onClick={() =>
                openModal(
                  <div className={
                      "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
                    }
                  >
                    <ContractPaymentModal onFinish={handleFinishForm} contractID={params.budgetId} refetchList={contractPayment.refetch} title="Tạo mới" />
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
                    contractPayment?.listContractPayment?.map((item:any, i: number) => (
                        <tr key={i}>
                            <td className={"border-0.5 border-primary-border p-2 text-center align-middle"}>
                            <input
                                className="form-check-input line mr-2"
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