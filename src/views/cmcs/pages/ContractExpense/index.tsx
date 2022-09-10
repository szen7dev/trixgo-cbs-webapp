import { FC, useCallback, useEffect, useState } from "react";

import cn from "classnames";
import debounce from "lodash/debounce";
import { useModal } from "services/hooks/useModal";

import { SearchInput, Paginate } from "shareComponents/common";
import { ContractExpenseModal, DropdownFilterButton, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import styles from 'views/cmcs/styles/styles.module.css';
import PolygonIcon from "assets/images/icon-polygon.svg";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";

import moment from "moment";
import { DATE_FORMAT, CONTRACT_EXPENSE_SUB_TYPES } from "apis/localdb/index";

import {
  UseContractProduceList,
  useCreateContractProduceMutation,
  useUpdateContractProduceMutation,
  useDeleteContractProduceMutation,
} from "services/hooks/cmcs/useContractProduce";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { useContractExpense } from "services/hooks/cmcs/useContractExpense";
import { useParams } from "react-router-dom";
import { useContractSpending } from "services/hooks/cmcs/useContractSpending";

const ContractExpense: FC = () => {
  const [itemChecked, setItemChecked] = useState('');
  const [pageParam, setPageParam] = useState('');
  const [keyword, setKeyword] = useState('');
  const [prevCursor, setPrevCursor] = useState<any>([null]);
  const { openModal } = useModal();
	const { id: contractID } = useParams<{ id: string }>();
  const { 
    isLoading,
    list: listContractExpense,
    info,
    totalRecord,
    totalPage,
    hasNextPage,
    refetch,
    fetchNextPage,
    fetchPreviousPage,
    nextCursor,
    insertAsync,
    updateAsync,
    deleteAsync } = useContractSpending({ params: { keyword, lastestID: pageParam, contractID, limit: 20  }, isFetchList: true })

  useEffect(() => {
    if (!nextCursor) {
      return;
    }
    const isExist = prevCursor.find((item: any) => item === nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, nextCursor])
    }
  }, [nextCursor]);

  const prevPageAction = () => {
    if (!nextCursor) {
      setPageParam(prevCursor[prevCursor.length - 2] || '')
    } else {
      const prev = prevCursor.findIndex((item: any) => item === nextCursor)
      setPageParam(prevCursor[prev - 2] || '')
    }
  };

  const nextPageAction = () => {
    setPageParam(nextCursor)
  }
  const { openDeleteConfirm } = useDeleteConfirm();
  const handleDeleteAction = async () => {
    if (!itemChecked) {
      return
    }
    openDeleteConfirm({
      deleteAction: async () => {
        // const res = await deleteContractProduceMutateAsync(itemChecked)
        // if (!res.error) {
        //   refetch()
        // }
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
        <ContractExpenseModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit={true} contractID={contractID} title="Cập nhật" />
      </div>
    )
  }

  const handleFinishForm = useCallback(async (values, isEdit = false) => {
    let res: any
    if (isEdit) {
      res = await updateAsync(values);
    } else {
      res = await insertAsync(values);
    }

    if (res.code && res.code !== 200) {
      return false;
    }

    if (!res.error) {
      refetch()
      return true;
    }
    return false;
  }, [listContractExpense]);

  const handleOnFilter = useCallback((values) => {
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
          <p className="text-lg">Chi phí</p>
          <SearchInput
            classNameWrapper="ml-20"
            classNameInput="outline-none w-[296px]"
            // eslint-disable-next-line no-console
            onChange={debounce(
							(event: any) => setKeyword(event.target.value), 500
						)}
          />
          {/* <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          /> */}
          <div className="border-l-2 border-primary-border ml-5 pl-5">
            {itemChecked && (
              <div className="border-l-2 border-primary-border ml-5 pl-5">
                <ActionMenuTopBar deleteAction={handleDeleteAction} editAction={handleEditAction} updatePermission={true} deletePermission={true}/>
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
                    <ContractExpenseModal onFinish={handleFinishForm} contractID={contractID} title="Thêm mới" />
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
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Phân loại
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ghi chú
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {listContractExpense?.map((item: any) => {
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
                <td className="py-1 px-2">{item.name}</td>
                <td className="py-1 px-2">{moment(item.date).format("L")}</td>
                <td className="py-1 px-2">{CONTRACT_EXPENSE_SUB_TYPES[item.subtype -1].text}</td>
                <td className="py-1 px-2">{formatNumberMoney(item.value)}</td>
                <td className="py-1 px-2">{item.note}</td>
              </tr>
            )
          })}

        </tbody>
      </table>

      <Paginate
        totalPages={totalPage}
        totalRecord={totalRecord} hasNextPage
        limit={20}
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </main>
  );
};
export default ContractExpense;