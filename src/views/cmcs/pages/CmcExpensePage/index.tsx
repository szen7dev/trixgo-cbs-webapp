import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import cn from "classnames";
import moment from "moment";

/**
 * Components, Utils
 */
import { CONTRACT_COME_IN_STATUS, DATE_FORMAT } from "apis/localdb/index";
import { SearchInput, Paginate } from "shareComponents/common";
import { ExpenseFormModal, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs";
import { APP_ID } from "apis/localdb";

import styles from 'views/cmcs/styles/styles.module.css';

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useContractExpense } from 'services/hooks/cmcs/useContractExpense';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";

export const CmcExpensePage: FC = () => {
  // --------- Check phân quyền
  const payload: any = {
    appID: APP_ID.CMCS.id,
    menuID: APP_ID.CMCS.menuCmcsApp.expense.id,
    type: "1"
  };
  const { createPermission, updatePermission, deletePermission } = useCheckPerAccessScreen(payload);
  // ---------
  const { createHistoryTraffics } = useHistoryTraffics();
  useEffect(() => {
    createHistoryTraffics({...payload, type: 1});
  }, []);

  const [itemChecked, setItemChecked] = useState('');
  const [keyword, setKeyword] = useState('');
  const { openModal } = useModal();

  const {
    insertAsync: insertContractExpenseAsync,
    updateAsync: updateContractExpenseAsync,
    deleteAsync: deleteContractExpenseAsync,
    list: listContractExpense,
    totalRecord,
    totalPage,
    hasNextPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch: refetchContractsExpense
  } = useContractExpense({
    params: {
      outin: 2,
      keyword
    },
    isFetchList: true
  });

  const getStatusValue = (value: number) => {
    return CONTRACT_COME_IN_STATUS.find(item => item.value === value)?.text;
  }
  const handleFinishForm = useCallback(async (values, isEdit = false) => {
    let res: any
    if (isEdit) {
      res = await updateContractExpenseAsync(values);
    } else {
      res = await insertContractExpenseAsync(values);
    }

    if (res.code && res.code !== 200) {
      return false;
    }

    if (!res.error) {
      refetchContractsExpense()
      return true;
    }
    return false;
  }, []);

  const { openDeleteConfirm } = useDeleteConfirm();

  const handleDeleteAction = () => {
    openDeleteConfirm({
      deleteAction: async () => {
        const res = await deleteContractExpenseAsync({
          contractsID: [itemChecked]
        })
        if (!res.error) {
          refetchContractsExpense()
        }
      },
    });
  }
  const handleEditAction = () => {
    openModal(
      <div
        className={
          "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
        }
      >
        <ExpenseFormModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit title="Cập nhật" />
      </div>
    )
  }
  const handleAddAction = () => {
    openModal(
      <div
        className={
          "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
        }
      >
        <ExpenseFormModal onFinish={handleFinishForm} title="Tạo mới" />
      </div>
    )
  }

  return (
    <main className="relative min-h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Hợp đồng mua vào</p>
          <SearchInput
            classNameWrapper="ml-4"
            classNameInput="outline-none w-[296px]"
            onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
          />
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <ActionMenuTopBar
                deleteAction={handleDeleteAction}
                editAction={handleEditAction}
                updatePermission={updatePermission}
                deletePermission={deletePermission}
              />
            </div>
          )}
        </div>
        {createPermission &&
           <button
           className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
           onClick={handleAddAction}
         >
           Tạo mới
         </button>
        }
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[50px] border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                />
              </div>
            </th>
            <th className="w-1/5 pb-1 pt-1">
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Hợp đồng
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadSignDate)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Ngày ký
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị ký + phát sinh (gồm cả VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị nghiệm thu hoàn thành
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị xuất hóa đơn (VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị đề nghị tạm ứng+thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị đã tạm ứng, thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Còn lại phải thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="font-normal pl-2">Tình trạng</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {listContractExpense.map((item: any) => {
            return (
              <tr key={item._id} className="border-b border-primary-border ">
                <td className="py-1 px-2 text-center">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={itemChecked === item._id}
                    onChange={() => setItemChecked(item._id)}
                  />
                </td>
                <td className="py-1 px-2">
                  <Link to={"/cmcs/contract/" + (item._id) + "/home"}>
                    {item.name}
                    <p className="text-primary-gray">{item?.project?.sign} | {item.sign}</p>
                  </Link>
                </td>
                <td className="py-1 px-2"> {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.value || 0) + (item.vatValue || 0) + (item.plus || 0) + (item.vatPlus || 0))} </td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.acceptance || 0) + (item.vatAcceptance || 0) + (item.plusAcceptance || 0) + (item.vatPlusAcceptance || 0))}</td>
                <td className="py-1 px-2 text-right">0</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney(item.recommendedPayment || 0)}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.advancePaymentPaid || 0) + (item.amountPaid || 0))}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney(item.remainingPayment || 0)}</td>
                <td className="py-1 px-2">{getStatusValue(item.status)}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>

      <Paginate
        totalPages={totalPage}
        totalRecord={totalRecord}
        hasNextPage={hasNextPage}
        prevPageAction={fetchPreviousPage}
        nextPageAction={fetchNextPage}
      />
    </main>
  );
};