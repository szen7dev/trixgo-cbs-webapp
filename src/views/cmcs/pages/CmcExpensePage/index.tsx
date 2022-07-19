import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { Menu } from '@headlessui/react';
import { toast } from "react-toastify";
import cn from "classnames";
import moment from "moment";

/**
 * Components, Utils
 */
import { CONTRACT_COME_IN_STATUS, DATE_FORMAT } from "apis/localdb/index";
import { SearchInput, Paginate, DropdownOption, Loader } from "shareComponents/common";
import { IncomeFormModal, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs";
import { APP_ID } from "apis/localdb";
import styles from 'views/cmcs/styles/styles.module.css';
import { createLinkAndClick } from 'utils';

/**
 * Hooks
 */
import { useModal } from "services/hooks/useModal";
import { useContractExpense, useContractCustom } from 'services/hooks/cmcs/useContractExpense';
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
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
		isExporting: false,
	});

  const { exportContractAsync } = useContractCustom({});

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
      res = await updateContractExpenseAsync({ ...values, outin: 2 });
    } else {
      res = await insertContractExpenseAsync({ ...values, outin: 2 });
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
        <IncomeFormModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit title="Cập nhật" outin={2} />
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
        <IncomeFormModal onFinish={handleFinishForm} title="Tạo mới" outin={2}/>
      </div>
    )
  }

  const handleExportReport = async () => {
    try {
			setStateExport({ isExporting: true });
			const { error, data } = await exportContractAsync({
        filterParams: { keyword, outin: 2 }, type: 'in'
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
        <div className="task-management-header-right-block flex items-center">
          {createPermission &&
            <button
            className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-3"
            onClick={handleAddAction}
          >
            Tạo mới
          </button>
          }
          <DropdownOption>
            <Menu.Item onClick={handleExportReport}>
              <div className={"w-full hover:bg-gray-100 flex items-center px-4 py-3"}>
                <img src="/images/common/icons8-download-48.png" alt="Download Excel" />
                <div className={"flex-1 text-left ml-4"}>
                  Download Excel
                </div>
              </div>
            </Menu.Item>
          </DropdownOption>
        </div>
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
                Sản lượng (gồm cả VAT)
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-2">
                Giá trị nghiệm thu hoàn thành
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
            console.log(listContractExpense)
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
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.value || 0) + (item.vatValue || 0) + (item.plus || 0) + (item.vatPlus || 0) )} </td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.produce || 0) + (item.vatProduce || 0) + (item.plusProduce || 0) + (item.vatPlusProduce || 0))}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.acceptance || 0) + (item.vatAcceptance || 0) + (item.plusAcceptance || 0) + (item.vatPlusAcceptance || 0))}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney(item.recommendedPayment || 0)}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney((item.advancePaymentPaid || 0) + (item.amountPaid || 0))}</td>
                <td className="py-1 px-2 text-right">{formatNumberMoney(item.remainingPayment | 0)}</td>
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