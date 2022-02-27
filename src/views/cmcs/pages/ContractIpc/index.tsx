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

import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import { useParams } from "react-router-dom";

import {
  UseContractIPCList,
  useCreateContractIPCMutation,
  useUpdateContractIPCMutation,
  useDeleteContractIPCMutation,
} from "services/hooks/useContractIPC";

export const ContractIpc: FC = () => {
  const [itemChecked, setItemChecked] = useState('');

  const [pageParam, setPageParam] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);

  const { openModal } = useModal();
  const params: any = useParams();

  const contractIPC = UseContractIPCList(pageParam, params.id);

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

  const nextPageAction = () => {
    setPageParam(contractIPC.nextCursor)
  }

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
        <ContractIpcModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit={true} contractID={params.id} title="Cập nhật" />
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

  const handleOnFilter = useCallback((values) => {
    console.log('🚀 ~ handleOnFilter ~ values', values)

    // setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    // setPageParam({});
  }, []);

  return (
    <main className="relative min-h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Nghiệm thu hoàn thành</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            // eslint-disable-next-line no-console
            onChange={(event) => console.log(event.target.value)}
          />
          {/* <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          /> */}
          <div className="border-l-2 border-primary-border ml-5 pl-5">
            {itemChecked && (
              <div className="border-l-2 border-primary-border ml-5 pl-5">
                <ActionMenuTopBar deleteAction={handleDeleteAction} editAction={handleEditAction} />
              </div>
            )}
          </div>
          <div className="flex items-center">
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
                    <ContractIpcModal onFinish={handleFinishForm} contractID={params.id} title="Tạo mới" />
                  </div>
                )
              }
            >
              Tạo mới
            </button>
            <button className="w-10 h-10 rounded-full bg-cbs-left-menu flex items-center justify-center">
              <img src={Vertical3Dots} alt="3Dots" />
            </button>
          </div>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[50px] border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input mr-2"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <img src={PolygonIcon} alt="Polygon" />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Nội dung
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày tháng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Mã hiệu
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Đề nghị tạm ứng/thanh toán (1)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Thời hạn thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Đã thanh toán (2)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Còn lại chưa thanh toán (3=1-2)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal w-1/6")}>
              <div className="font-normal pl-2">Ghi chú</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {contractIPC?.listContractIPC?.map((item: any) => {
            return (
              <tr key={item._id} className="border-b border-primary-border h-[50px]">
                <td className="py-1 px-2 text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    checked={itemChecked === item._id}
                    onChange={() => setItemChecked(item._id)}
                    style={{ marginLeft: "-23px" }}
                  />
                </td>
                <td className="py-1 px-2">
                  {item.name}
                </td>
                <td className="py-1 px-2"> {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
                <td className="py-1 px-2">{item.sign}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.acceptance || 0))}</td>
                <td className="py-1 px-2">{moment(item.date).isValid() && moment(item.timeForPayment).format(DATE_FORMAT)}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.amountPaid || 0))}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.acceptance || 0) - (item.amountPaid || 0))}</td>
                <td className="py-1 px-2">{item.description}</td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Paginate
        totalPages={contractIPC.totalPage}
        totalRecord={contractIPC.totalRecord} hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </main>
  );
};
