import React, { FC, useCallback, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { formatNumberMoney } from "utils/cmcs";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import TriangleDown from "assets/icons/TriangleDown";
import { Popover } from "shareComponents/common";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import debounce from "lodash/debounce";
import { useDeleteConfirm } from "services/hooks/useDeleteConfirm";
import { SearchInput } from "shareComponents/common";
import { DropdownSearchableV2 } from "shareComponents/common";
import { useFunda } from "services/hooks/items/useFunda";
import { useContact } from "services/hooks/items/useContact";
import { useUserSystem } from 'services/hooks/users/useUserSystem';
import {
  CreateNewTicket,
  ActionAccountingGroup,
  FilterDateGroup
} from "views/accounting/shareComponents/common";

import {
  UseAccountingVoucherList,
  useCreateAccountingVoucherMutation,
  useUpdateAccountingVoucherMutation,
  useDeleteAccountingVoucherMutation,
} from "services/hooks/accounting/useAccountingVoucher";
import { DATE_FORMAT, DATE_FORMAT_TIME, VOUCHER_TYPES } from "apis/localdb/index";
import {
  useReportList
} from "services/hooks/accounting/useReport";

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingReportFinancePage: FC<AccountingTicketsPageProps> = ({ type = 1 }) => {
  const { openModal } = useModal();
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  const history = useHistory();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const fundaIDParams = searchParams.get("fundaID")

  const [pageParam, setPageParam] = useState('');

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaID, setFundaID] = useState<string | null>(fundaIDParams);
  const [customerID, setCustomerID] = useState<string | null>();
  const [userID, setUserID] = useState<string | null>();

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  });

  const [fundaKeyword, setFundaKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");
  const [userKeyword, setUserKeyword] = useState("");

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { list: listCustomer } = useContact({
		params: { keyword: contactKeyword },
    isFetchList: true
	})

  const { data: listUser } = useUserSystem({
    keyword: userKeyword,
    limit: 5,
    isFetch: true
	}, true)

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useReportList({
    params: {
        type,
        fundaID,
        customerID,
        userCreateID: userID,
        keyword: inputFilter.keyword,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 20,
    },
    isFetchList: true
  })

  const accountingVoucher = UseAccountingVoucherList(pageParam, type, inputFilter);
  const { assigned, checkboxRef, handleChangeCheckbox, handleCheckAll } = useCheckedList(accountingVoucher?.listAccountingVoucher || []);

  const { createAccountingVoucherMutateAsync } = useCreateAccountingVoucherMutation();
  const { updateAccountingVoucherMutateAsync } = useUpdateAccountingVoucherMutation();
  const { deleteAccountingVoucherMutateAsync } = useDeleteAccountingVoucherMutation();

  const handleFinishForm = useCallback(async (values, isEdit = false) => {
    // console.log(values)
    let res: any
    if (isEdit) {
      res = await updateAccountingVoucherMutateAsync(values);
    } else {
      // res = await createAccountingVoucherMutateAsync({ ...values, fundaID }); // truyền fundaID từ URL
      res = await createAccountingVoucherMutateAsync({ ...values });
    }

    if (res.code && res.code !== 200) {
      return false;
    }

    if (!res.error) {
      refetch()
      return true;
    }
    return false;
  }, [listDataWithPager]);

  const { openDeleteConfirm } = useDeleteConfirm();

  const handleAction = async (data: any, action: any) => {
    switch (action) { // 1. In, 2. Copy 3. Cập nhật 4. Xóa
      case 1:
        break;
      case 2:
        openModal(
          <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
            <CreateNewTicket
              onFinish={handleFinishForm}
              type={type}
              isEdit={false}
              idEdit={data._id}
              contractId={data?.contract?._id}
              title="Copy phiếu"
            />
          </div>
        )
        break;
      case 3:
        openModal(
          <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
            <CreateNewTicket
              onFinish={handleFinishForm}
              type={type}
              isEdit={true}
              idEdit={data._id}
              contractId={data?.contract?._id}
              title="Cập nhật"
            />
          </div>
        )
        break;
      case 4:
        openDeleteConfirm({
          deleteAction: async () => {
            const res = await deleteAccountingVoucherMutateAsync(data._id)
            if (!res.error) {
              refetch()
            }
          },
        });
        break;

      default:
        break;
    }
  }

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter((value) => ({ ...value, keyword: event.target.value }))
  }, 500);

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
  }, [])

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-3">
        <SearchInput classNameWrapper={"mr-1"} onChange={onChangeSearch} />
        <div className="flex items-center">
          <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
          <button
            onClick={() =>
              openModal(
                <div className={"bg-white inline-block w-screen h-screen overflow-hidden transition-all transform bg-primary-light shadow-xl rounded absolute left-0 right-0 top-0"}>
                  <CreateNewTicket onFinish={handleFinishForm} type={type} title="Phiếu mới" />
                </div>
              )
            }
            className={"bg-green-success h-[32px] text-white rounded px-3"}>
            Tạo mới
          </button>
          <div className="absolute right-0">
            <PaginateV2
                ref={ref}
                totalRecord={totalRecord}
                totalPages={totalPage}
                limit={20}
                hasNextPage={hasNextPage}
                isFetching={isLoading}
                nextPageAction={() => {
                  fetchNextPage();
                    setPageIndex(oldState => oldState+1)
                }}
                prevPageAction={() => {
                    setPageIndex(oldState => oldState-1)
                }}
            />
          </div>
        </div>
      </header>

      <section className="mt-4">
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
                TT
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Nội dung
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Từ ngày
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Đến ngày
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Doanh thu
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
               Chi phí
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Lợi nhuận
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Ghi chú
              </span>
            </th>
          </tr>
        </thead>
        <tbody className="text-small">
          
        </tbody>
      </table>
      </section>
    </main>
  )
}