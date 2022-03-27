import { FC, useCallback, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import cn from "classnames";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { CONTRACT_COME_IN_STATUS, DATE_FORMAT } from "apis/localdb/index";

import { SearchInput, Paginate } from "shareComponents/common";
import { IncomeFormModal, DropdownFilterButton, ActionMenuTopBar } from "views/cmcs/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import { APP_ID } from "apis/localdb"

import styles from 'views/cmcs/styles/styles.module.css';

import PolygonIcon from "assets/images/icon-polygon.svg";

import { UseContractIncomeList, useCreateContractMutation, useUpdateContractMutation, useDeleteContractMutation } from "services/hooks/cmcs/useContractIncome";
import { useHistoryTraffics } from "services/hooks/useAuth";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";

export const CmcIncomePage: FC = () => {
  const [itemChecked, setItemChecked] = useState('');

  const [pageParam, setPageParam] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);

  const { openModal } = useModal();

  const contractIncome = UseContractIncomeList(pageParam);
  const { createContractMutateAsync, loading } = useCreateContractMutation();
  const { updateContractMutateAsync } = useUpdateContractMutation();
  const { deleteContractMutateAsync } = useDeleteContractMutation();

  const { createHistoryTraffics } = useHistoryTraffics();

  useEffect(() => {
    createHistoryTraffics(
      {
        "appID": APP_ID.CMCS.id,
        "menuID": APP_ID.CMCS.menuCmcsApp.income.id,
        "type": 1
      }
    )
  }, [])

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
        <IncomeFormModal onFinish={handleFinishForm} idEdit={itemChecked} isEdit title="Cập nhật" />
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
        <IncomeFormModal onFinish={handleFinishForm} title="Tạo mới" />
      </div>
    )
  }

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
          <p className="text-lg">Hợp đồng bán ra</p>
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
          {itemChecked && (
            <div className="border-l-2 border-primary-border ml-5 pl-5">
              <ActionMenuTopBar deleteAction={handleDeleteAction} editAction={handleEditAction} />
            </div>
          )}
        </div>
        <button
          className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
          onClick={handleAddAction}
        >
          Tạo mới
        </button>
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
          {contractIncome?.listContractIncome?.map((item: any) => {
            return (
              <tr key={item._id} className="border-b border-primary-border ">
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
                <Link to={"/cmcs/contract/" + (item._id) + "/home"}>
                  <td className="py-1 px-2">
                    {item.name}
                    <p className="text-primary-gray">{item?.project?.sign} | {item.sign}</p>
                  </td>
                </Link>
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

      <Paginate totalPages={contractIncome.totalPage} totalRecord={contractIncome.totalRecord} hasNextPage prevPageAction={() => prevPageAction()} nextPageAction={() => nextPageAction()} />
    </main>
  );
};

// export const CmcIncomePage: FC = () => {
//   return (
//     <>kkkkk</>
//   );
// }