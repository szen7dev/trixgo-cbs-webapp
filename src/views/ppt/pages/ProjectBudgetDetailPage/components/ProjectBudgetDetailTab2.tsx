import { FC, useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { useModal } from "services/hooks/useModal";

import { SearchInput, Paginate } from "shareComponents/common";
import { ContractProduceModal, DropdownFilterButton, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"

import styles from 'views/cmcs/styles/styles.module.css';

import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";

import moment from "moment";
import { DATE_FORMAT } from "apis/localdb/index";

import {
  UseContractProduceList,
  useCreateContractProduceMutation,
  useUpdateContractProduceMutation,
  useDeleteContractProduceMutation,
} from "services/hooks/cmcs/useContractProduce";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { useParams } from "react-router-dom";
interface Props {
    contractInfo: any
};

export const ProjectBudgetDetailTab2:FC<Props> = ({ contractInfo }) => {
    const [itemChecked, setItemChecked] = useState('');

    const [pageParam, setPageParam] = useState('');
    const [prevCursor, setPrevCursor] = useState([null]);
  
    const { openModal } = useModal();
    const params: any = useParams();
    const contractProduce = UseContractProduceList(pageParam, params.budgetId);
  
    const { createContractProduceMutateAsync } = useCreateContractProduceMutation();
    const { updateContractProduceMutateAsync } = useUpdateContractProduceMutation();
    const { deleteContractProduceMutateAsync } = useDeleteContractProduceMutation();
  
    useEffect(() => {
      if (!contractProduce.nextCursor) {
        return;
      }
      const isExist = prevCursor.find((item: any) => item === contractProduce.nextCursor)
      if (!isExist) {
        setPrevCursor([...prevCursor, contractProduce.nextCursor])
      }
    }, [contractProduce.nextCursor]);
  
    const prevPageAction = () => {
      if (!contractProduce.nextCursor) {
        setPageParam(prevCursor[prevCursor.length - 2] || '')
      } else {
        const prev = prevCursor.findIndex((item: any) => item === contractProduce.nextCursor)
        setPageParam(prevCursor[prev - 2] || '')
      }
  
    };
  
    const nextPageAction = () => {
      setPageParam(contractProduce.nextCursor)
    }
  
    const { openDeleteConfirm } = useDeleteConfirm();
  
    const handleDeleteAction = async () => {
      if (!itemChecked) {
        return
      }
      openDeleteConfirm({
        deleteAction: async () => {
          const res = await deleteContractProduceMutateAsync(itemChecked)
          if (!res.error) {
            contractProduce.refetch()
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
          <ContractProduceModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit={true} contractID={params.budgetId} title="Cập nhật" />
        </div>
      )
    }
  
    const handleFinishForm = useCallback(async (values, isEdit = false) => {
      let res: any
      if (isEdit) {
        res = await updateContractProduceMutateAsync(values);
      } else {
        res = await createContractProduceMutateAsync(values);
      }
  
      if (res.code && res.code !== 200) {
        return false;
      }
  
      if (!res.error) {
        contractProduce.refetch()
        return true;
      }
      return false;
    }, [contractProduce]);
  
    const handleOnFilter = useCallback((values) => {
  
      // setPageParam(() => ({ ...values }));
      return true;
    }, []);
  
    const handleOnCancelFilter = useCallback(() => {
      // setPageParam({});
    }, []);
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
                    // "inline-block w-[900px] h-[800px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
                    "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
                }
                >
                <ContractProduceModal onFinish={handleFinishForm} contractID={params.budgetId} title="Thêm mới" />
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
                    Sản lượng trước VAT
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng phần VAT
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng phát sinh trước VAT
                </th>
                <th className={"bg-cbs-table-header p-2 border-0.5 border-primary-border text-primary-gray font-normal text-left"}>
                    Sản lượng phát sinh phần VAT
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
                    {formatNumberMoney(contractInfo?.produce)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    {formatNumberMoney(contractInfo?.vatProduce)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    {formatNumberMoney(contractInfo?.plusProduce)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight font-bold text-primary-gray text-right"}>
                    {formatNumberMoney(contractInfo?.vatPlusProduce)}
                </td>
                <td className={"border-0.5 border-primary-border p-2 bg-cbs-table-highlight"}>
                </td>
            </tr>
            {
                contractProduce?.listContractProduce?.map((item: any, index: number) => (
                    <tr key={index}>
                        <td className={"border-0.5 border-primary-border p-2 text-center align-middle"}>
                            {/* <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/> */}
                            <input
                                className="form-check-input line mr-2"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={itemChecked === item._id}
                                onChange={() => setItemChecked(item._id)}
                            />
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
                            {formatNumberMoney((item.produce || 0))}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            {formatNumberMoney((item.vatProduce || 0))}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            {formatNumberMoney((item.plusProduce || 0))}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2 text-right"}>
                            {formatNumberMoney((item.vatPlusProduce || 0))}
                        </td>
                        <td className={"border-0.5 border-primary-border p-2"}>
                            {item.description}
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
        </>
    )
}