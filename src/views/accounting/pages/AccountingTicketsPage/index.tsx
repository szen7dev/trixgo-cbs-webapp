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
  useVoucherList
} from "services/hooks/accounting/useAccVoucher";

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingTicketsPage: FC<AccountingTicketsPageProps> = ({ type = 1 }) => {
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

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useVoucherList({
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
        <SearchInput classNameWrapper={"mr-1 border border-primary-border"} onChange={onChangeSearch} />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Đơn vị cơ sở"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listFunda}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setFundaKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              if (searchParams.has('fundaID')) {
                searchParams.delete('fundaID');

                history.replace({
                  search: searchParams.toString(),
                })
              }
              setFundaID("");
            }}
            onchangeValue={item => {
                history.push({ search: `?fundaID=${item._id}` })
                setFundaID(item._id);
                setPageIndex(0);
                ref.current && ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Mã khách"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listCustomer}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setContactKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setCustomerID("");
            }}
            onchangeValue={item => {
                setCustomerID(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Người tạo phiếu"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listUser}
            formatItem={{
                id: "_id",
                text: "fullname",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setUserKeyword(valueSearch),
                500
            )}
            onClearData={() => {
              setUserID("");
            }}
            onchangeValue={item => {
                setUserID(item._id);
                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        />
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
          {/* <div className={"relative z-5 inline-block"}>
            <button onClick={() => setShowOption(!showOption)}
              className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg"}
              >
                <DotsVerticalIcon/>
            </button>
            {
                showOption &&
                <div className={"absolute right-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                    <div className={"flex items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1"}>Chức năng khác</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>

                    <div className={"mb-4"}>
                        <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}>
                            Tải excel
                        </button>
                    </div>
                </div>
            }
          </div> */}
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
                Loại phiếu
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Số hiệu
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Ngày hạch toán
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
              <span className="pl-2 border-l border-cbs-border">
                Nội dung
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Mã khách
              </span>
            </th>
            <th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
              <span className="pl-2 border-l border-cbs-border">
                Hợp đồng/Khoản mục phí
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
            (listDataWithPager[pageIndex] ?? []).map((item, index) => {
              if(item?.cancel == 0){
                if(item?.forward == 1){
                  return (
                    <tr key={item._id} className="text-left hover:bg-cbs-active-comment" style={{ color: "orange" }}>
                      <td className="pt-2.5 pb-3 px-4 border-b border-cbs-border text-left">
                        <input className="cbs-checkbox" type="checkbox" checked={Boolean(assigned[item._id])} onChange={e => handleChangeCheckbox(e, item)} />
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {VOUCHER_TYPES.find(element => element.value === item.type)?.text}
                        <p><i>Kết chuyển cuối kỳ</i></p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.sign}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-medium" style={{ maxWidth: '250px' }}>
                        <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/detail/${item._id}`}>
                          <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                            <p className="text-2-line-clamp">{`${item.name}`}</p>
                          </Popover>
                        </NavLink>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.funda?.name}</p>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.userCreate?.fullname} {moment(item.createAt).isValid() && moment(item.createAt).format(DATE_FORMAT_TIME)}</p>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkFunda?.name}</p>
                        {/* <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkVoucher?.name}</p> */}
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.customer?.name}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.contract?.name}
                        <p className="text-primary"><i>{item.subtype?.name}</i></p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{formatNumberMoney(item.amount)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.note}</td>
                      <td className="pt-2.5 pb-3 pr-2 border-b border-cbs-border">
                        <ActionAccountingGroup data={item} handleAction={handleAction} />
                      </td>
                    </tr>
                  )
                }else{
                  return (
                    <tr key={item._id} className="text-left hover:bg-cbs-active-comment">
                      <td className="pt-2.5 pb-3 px-4 border-b border-cbs-border text-left">
                        <input className="cbs-checkbox" type="checkbox" checked={Boolean(assigned[item._id])} onChange={e => handleChangeCheckbox(e, item)} />
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{VOUCHER_TYPES.find(element => element.value === item.type)?.text}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.sign}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-medium" style={{ maxWidth: '250px' }}>
                        <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/detail/${item._id}`}>
                          <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                            <p className="text-2-line-clamp text-cbs-highlight-color font-bold">{`${item.name}`}</p>
                          </Popover>
                        </NavLink>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.funda?.name}</p>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.userCreate?.fullname} {moment(item.createAt).isValid() && moment(item.createAt).format(DATE_FORMAT_TIME)}</p>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkFunda?.name}</p>
                        {/* <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkVoucher?.name}</p> */}
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.customer?.name}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.contract?.name}
                        <p className="text-primary"><i>{item.subtype?.name}</i></p>
                      </td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{formatNumberMoney(item.amount)}</td>
                      <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.note}</td>
                      <td className="pt-2.5 pb-3 pr-2 border-b border-cbs-border">
                        <ActionAccountingGroup data={item} handleAction={handleAction} />
                      </td>
                    </tr>
                  )
                }
              }else{
                return (
                  <tr key={item._id} className="text-left hover:bg-cbs-active-comment" style={{ color: "red" }}>
                    <td className="pt-2.5 pb-3 px-4 border-b border-cbs-border text-left">
                      <input className="cbs-checkbox" type="checkbox" checked={Boolean(assigned[item._id])} onChange={e => handleChangeCheckbox(e, item)} />
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                      {VOUCHER_TYPES.find(element => element.value === item.type)?.text}
                      <p><i>Phiếu hủy</i></p>
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.sign}</td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{moment(item.date).isValid() && moment(item.date).format(DATE_FORMAT)}</td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-medium" style={{ maxWidth: '250px' }}>
                      <NavLink to={`/accounting/${VOUCHER_TYPES.find(item => item.value === type)?.slug}/detail/${item._id}`}>
                        <Popover onMouseEnterTooltip={false} tooltip={`${item.name}`} classTooltip="w-[336px] whitespace-normal left-0" >
                          <p className="text-2-line-clamp">{`${item.name}`}</p>
                        </Popover>
                      </NavLink>
                      <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.funda?.name}</p>
                      <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.userCreate?.fullname} {moment(item.createAt).isValid() && moment(item.createAt).format(DATE_FORMAT_TIME)}</p>
                      <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkFunda?.name}</p>
                        {/* <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.linkVoucher?.name}</p> */}
                    </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.customer?.name}</td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">
                        {item.contract?.name}
                        <p className="text-primary"><i>{item.subtype?.name}</i></p>
                      </td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-right">{formatNumberMoney(item.amount)}</td>
                    <td className="pt-2.5 pb-3 px-2 border-b border-cbs-border">{item.note}</td>
                    <td className="pt-2.5 pb-3 pr-2 border-b border-cbs-border">
                      <ActionAccountingGroup data={item} handleAction={handleAction} />
                    </td>
                  </tr>
                )
              }
            })
          }
        </tbody>
      </table>
      </section>
    </main>
  )
}