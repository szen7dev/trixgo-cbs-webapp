import { FC, useCallback, useEffect, useState } from "react";
import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import "react-datepicker/dist/react-datepicker.css";
import { SearchInput, Paginate } from "shareComponents/common";
import { CreateNewTicket, DropdownFilterButton, ActionAccountingGroup } from "views/accounting/shareComponents/common";
import { formatNumberMoney } from "utils/cmcs"
import { useModal } from "services/hooks/useModal";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import moment from "moment";
import { DATE_FORMAT, DATE_FORMAT_TIME, VOUCHER_TYPES } from "apis/localdb/index";

import {
  UseAccountingVoucherList,
  useCreateAccountingVoucherMutation,
  useUpdateAccountingVoucherMutation,
  useDeleteAccountingVoucherMutation,
} from "services/hooks/accounting/useAccountingVoucher";
import { NavLink } from "react-router-dom";
import TriangleDown from "assets/icons/TriangleDown";

import { Popover } from "shareComponents/common";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import debounce from "lodash/debounce";

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingTicketsPage: FC<AccountingTicketsPageProps> = ({ type = 1 }) => {
  const { openModal } = useModal();
  const [pageParam, setPageParam] = useState('');
  const [keyword, setKeyword] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);
  const accountingVoucher = UseAccountingVoucherList(pageParam, keyword, type);
  const { assigned, checkboxRef, checked, handleChangeCheckbox, handleCheckAll } = useCheckedList(accountingVoucher?.listAccountingVoucher || []);

  const { createAccountingVoucherMutateAsync } = useCreateAccountingVoucherMutation();
  const { updateAccountingVoucherMutateAsync } = useUpdateAccountingVoucherMutation();
  const { deleteAccountingVoucherMutateAsync } = useDeleteAccountingVoucherMutation();

  useEffect(() => {
    if (!accountingVoucher.nextCursor) {
      return;
    }
    const isExist = prevCursor.find(item => item === accountingVoucher.nextCursor)
    if (!isExist) {
      setPrevCursor([...prevCursor, accountingVoucher.nextCursor])
    }
  }, [accountingVoucher.nextCursor]);

  const prevPageAction = () => {
    if (!accountingVoucher.nextCursor) {
      setPageParam(prevCursor[prevCursor.length - 2] || '')
    } else {
      const prev = prevCursor.findIndex(item => item === accountingVoucher.nextCursor)
      setPageParam(prevCursor[prev - 2] || '')
    }

  };

  const nextPageAction = () => {
    setPageParam(accountingVoucher.nextCursor)
  }

  const handleFinishForm = useCallback(async (values, isEdit = false) => {
    let res: any
    if (isEdit) {
      res = await updateAccountingVoucherMutateAsync(values);
    } else {
      res = await createAccountingVoucherMutateAsync(values);
    }

    if (res.code && res.code !== 200) {
      return false;
    }

    if (!res.error) {
      accountingVoucher.refetch()
      return true;
    }
    return false;
  }, [accountingVoucher]);

  const { openDeleteConfirm } = useDeleteConfirm();

  const handleAction = async (data: any, action: any) => {

    switch (action) { // 1. In, 2. Copy 3. Cập nhật 4. Xóa
      case 1:
        break;
      case 2:
        break;
      case 3:
        openModal(

          <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>

            <CreateNewTicket onFinish={handleFinishForm} type={type} isEdit={true} idEdit={data._id} contractId={data?.contract?._id} title="Cập nhật" />
          </div>
        )
        break;
      case 4:
        openDeleteConfirm({
          deleteAction: async () => {
            const res = await deleteAccountingVoucherMutateAsync(data._id)
            if (!res.error) {
              accountingVoucher.refetch()
            }
          },
        });
        break;

      default:
        break;
    }

  }

  const handleOnFilter = useCallback((values) => {

    // setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    // setPageParam({});
  }, []);

  // Xử lý sự kiện tìm kiếm
  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }, 500);

  return (
    <div className={"relative min-h-full"}>
      <div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Danh sách</div>
          <SearchInput classNameWrapper={"ml-4"} onChange={onChangeSearch} />

          {/* <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          /> */}
        </div>
        <button
          onClick={() =>
            openModal(
              <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
                <CreateNewTicket onFinish={handleFinishForm} type={type} title="Phiếu mới" />
              </div>
            )
          }
          className={"bg-green-success h-[32px] text-white rounded px-5"}>
          Tạo mới
        </button>
        <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
          <img alt={"Icon"} src={ThreeDotsVertical} />
        </button>
      </div>
      <table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
        <thead className="">
          <tr className="text-primary-gray whitespace-nowrap align-middle text-left relative z-1">
            <th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
              <input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" onClick={handleCheckAll} ref={checkboxRef} />
              <button onClick={e => { e.stopPropagation(); }} className="ml-1.5 align-top">
                <TriangleDown className='inline-block' />
              </button>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Nội dung
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Ngày hạch toán
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Loại phiếu
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Số hiệu
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Mã khách
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Hợp đồng
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Giá trị/Thành tiền
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Ghi chú
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-min px-2">
            </th>
          </tr>
        </thead>
        <tbody className="text-small">
          {
            accountingVoucher?.listAccountingVoucher?.map((item: any) => {
              return (
                <tr key={item._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
                  <td className="pt-2.5 pb-3 px-4 border-b border-cbs-border text-left">
                    <input className="cbs-checkbox" type="checkbox" checked={Boolean(assigned[item._id])} onChange={e => handleChangeCheckbox(e, item)} />
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-cbs-highlight-color text-medium" style={{ maxWidth: '250px' }}>
                    <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/${item._id}`}>
                      <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                        <p className="text-2-line-clamp">{`${item.name}`}</p>
                      </Popover>
                    </NavLink>
                    <p className={"mt-1 text-gray-500"}>{item.userCreate.bizfullname} {moment(item.createAt).isValid() && moment(item.createAt).format(DATE_FORMAT_TIME)}</p>
                  </td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{VOUCHER_TYPES.find(element => element.value === item.type)?.text}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.sign}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.customer.name}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.contract?.name}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{formatNumberMoney(item.amount)}</td>
                  <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.note}</td>
                  <td className="pt-2.5 pb-3 px-4 border-b border-cbs-border">
                    <ActionAccountingGroup data={item} handleAction={handleAction} />
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <Paginate
        totalPages={accountingVoucher.totalPage}
        totalRecord={accountingVoucher.totalRecord} hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </div >
  )
};
