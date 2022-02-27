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

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingTicketsPage: FC<AccountingTicketsPageProps> = ({ type = 1 }) => {
  const { openModal } = useModal();
  const [pageParam, setPageParam] = useState('');
  const [prevCursor, setPrevCursor] = useState([null]);
  const accountingVoucher = UseAccountingVoucherList(pageParam, type);

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
    console.log('🚀 ~ handleOnFilter ~ values', values)

    // setPageParam(() => ({ ...values }));
    return true;
  }, []);

  const handleOnCancelFilter = useCallback(() => {
    // setPageParam({});
  }, []);

  return (
    <div className={"relative min-h-full"}>
      <div className={"financial-cashflow-listing-heading flex items-center border-b py-2 px-6"}>
        <div className={"flex items-center flex-1"}>
          <div className={"text-lg"}>Danh sách</div>
          <SearchInput classNameWrapper={"ml-4"} onChange={event => console.log(event.target.value)} />

          <DropdownFilterButton
            onSubmit={handleOnFilter}
            onCancel={handleOnCancelFilter}
            initialValues={{}}
          />
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
      <div className={"financial-cashflow-table"}>
        <div className={"relative table border-collapse w-full"}>
          <div className={"header flex table-row sticky z-10"}>
            <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
              <div className={"flex items-center"}>
                <input className="form-check-input mr-2" type="checkbox" value="" id="flexCheckDefault" />
                <TriangleDown />
              </div>
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12 text-gray-500"}>
              Nội dung
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Ngày chứng từ
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Loại phiếu
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Số hiệu
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Mã khách
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Hợp đồng
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Giá trị/Thành tiền
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
              Ghi chú
            </div>
            <div className={"px-2 py-4 table-cell box-border border-b align-middle text-gray-500"}>
            </div>
          </div>
          {accountingVoucher?.listAccountingVoucher?.map((item: any) => {
            return (
              <div key={item._id} className={"body-table row flex table-row"}>
                <div className={"px-6 py-4 table-cell box-border border-b align-middle w-3"}>
                  <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b align-middle w-2/12"}>
                  <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/${item._id}`}>
                    <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal" >
                      <p className="text-2-line-clamp">{`${item.name}`}</p>
                    </Popover>
                  </NavLink>

                  <p className={"mt-1 text-gray-500"}>{item.userCreate.fullname} {moment(item.createAt).isValid() && moment(item.createAt).format(DATE_FORMAT_TIME)}</p>
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {VOUCHER_TYPES.find(element => element.value === item.type)?.text}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {item.sign}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {item.customer.name}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {item.contract?.name}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {formatNumberMoney(item.amount)}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  {item.note}
                </div>
                <div className={"px-2 py-4 table-cell box-border border-b"}>
                  <ActionAccountingGroup data={item} handleAction={handleAction} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <Paginate
        totalPages={accountingVoucher.totalPage}
        totalRecord={accountingVoucher.totalRecord} hasNextPage
        prevPageAction={() => prevPageAction()}
        nextPageAction={() => nextPageAction()} />
    </div >
  )
};
