import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cn from "classnames";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { CONTRACT_COME_IN_STATUS, DATE_FORMAT } from "apis/localdb/index";
import { SearchInput, Paginate } from "shareComponents/common";
import { IncomeFormModal, DropdownFilterButton, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs";
import styles from 'views/cmcs/styles/styles.module.css';
import { UseContractListIsMember, useCreateContractMutation, useUpdateContractMutation, useDeleteContractMutation } from "services/hooks/cmcs/useContractIncome";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { debounce } from "lodash";

export const CmcPartnerPage: FC = () => {
  // --------- history traffic
  const payload: any = {
    appID: APP_ID.CMCS.id,
    menuID: APP_ID.CMCS.menuCmcsApp.partner.id,
    type: "1"
  };
  const { createPermission, updatePermission, deletePermission } = useCheckPerAccessScreen(payload);
  // ---------
  const { createHistoryTraffics } = useHistoryTraffics();
  useEffect(() => {
    createHistoryTraffics({...payload, type: 1});
  }, []);

  const [itemChecked, setItemChecked] = useState('');
  const [keyword, setKeyword] = useState("");
  const [pageParam, setPageParam] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);

  const { openModal } = useModal();

  const contractIncome = UseContractListIsMember(pageParam, keyword);
  const { createContractMutateAsync, loading } = useCreateContractMutation();
  const { updateContractMutateAsync } = useUpdateContractMutation();
  const { deleteContractMutateAsync } = useDeleteContractMutation();

  const prevPageAction = () => {
    if (!contractIncome.nextCursor) {
      setPageParam(prevCursor[prevCursor.length - 2] || '')
    } else {
      const prev = prevCursor.findIndex(item => item === contractIncome.nextCursor)
      setPageParam(prevCursor[prev - 2] || '')
    }
  };

  useEffect(() => {
    if (!contractIncome.nextCursor) {
      return;
    }
    const isExist = prevCursor.find(item => item === contractIncome.nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, contractIncome.nextCursor])
    }
  }, [contractIncome.nextCursor]);

  const nextPageAction = () => {
    setPageParam(contractIncome.nextCursor)
  }

  const getStatusValue = (value: number) => {
    return CONTRACT_COME_IN_STATUS.find(item => item.value === value)?.text;
  }
  const handleFinishForm = useCallback(async (values, isEdit = false) => {
    let res: any
    if (isEdit) {
      res = await updateContractMutateAsync(values);
    } else {
      res = await createContractMutateAsync(values);
    }
    if (res.code && res.code !== 200) {
      return false;
    }

    if (!res.error) {
      contractIncome.refetch()
      return true;
    }
    return false;
  }, [contractIncome]);

  const { openDeleteConfirm } = useDeleteConfirm();

  const handleDeleteAction = async () => {
    openDeleteConfirm({
      deleteAction: async () => {
        const res = await deleteContractMutateAsync(itemChecked)
        if (!res.error) {
          contractIncome.refetch()
        }
      },
    });
  }
  const handleEditAction = async () => {
    openModal(
      <div
        className={
          "inline-block w-screen h-screen overflow-hidden transition-all transform flex justify-center bg-transparent shadow-xl rounded absolute left-0 right-0 top-10"
        }
      >
        <IncomeFormModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit title="Cập nhật" outin={1}/>
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
        <IncomeFormModal onFinish={handleFinishForm} title="Tạo mới" outin={1}/>
      </div>
    )
  }
  
  return (
    <main className="relative min-h-full">
      <header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-12 px-6 border border-primary-border">
        <div className="flex items-center">
          <p className="text-lg">Hợp đồng đối tác</p>
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
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[50px] border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className={cn("pb-1 pt-1 text-center", styles.theadInput)}>
              <div className="border-r-2 border-gray-300 flex items-center justify-center">
                
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
                Còn lại phải tạm ứng, thanh toán
              </div>
            </th>
            <th className={cn("pb-1 pt-1 font-normal", styles.theadTenPercent)}>
              <div className="font-normal pl-2">Tình trạng</div>
            </th>
          </tr>
        </thead>

        <tbody>
          {contractIncome?.listContractIsMember?.map((item: any) => {
            return (
              <tr key={item._id} className="border-b border-primary-border ">
                <td className="py-1 px-2 text-center">
                  
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

      <Paginate totalPages={contractIncome.totalPage} totalRecord={contractIncome.totalRecord} hasNextPage prevPageAction={() => prevPageAction()} nextPageAction={() => nextPageAction()} />
    </main>
  );
};