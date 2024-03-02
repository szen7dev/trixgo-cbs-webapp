import React, { FC, useCallback, useState, useEffect } from "react";
import { useHistory, NavLink, useLocation } from "react-router-dom";
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import { debounce } from "lodash";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import { DropdownSearchableV2, Loader } from "shareComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { useQueryListAccount } from "services/hooks/cmcs/useContractIncome";
import { useFunda } from "services/hooks/items/useFunda";
import { useWarehouse } from "services/hooks/items/useWarehouse";
import { VOUCHER_TYPES, LIMIT_DROPDOWN } from "apis/localdb/index";
import API from "apis/repository";
import {
  useJournalList,
  useJournalByProperty
} from "services/hooks/accounting/useGeneralJournal";
import { toast } from "react-toastify";
import { useContact } from "services/hooks/items/useContact";

const ITEM_ACCOUNT = "/api/item/accounts";

export const AccountingDetailPage: FC = () => {
  const [pageIndex, setPageIndex] = useState(0)
  
  const history = useHistory();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const accountIdParams = searchParams.get("accountId")

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [accountId, setAccountId] = useState<string | null>(accountIdParams);
  const [fundaId, setFundaId] = useState<string | null>();
  const [warehouseId, setWarehouseId] = useState<string | null>();
  const [customerID, setCustomerID] = useState<string | null>();

  const [accountKeyword, setAccountKeyword] = useState("");
  const [fundaKeyword, setFundaKeyword] = useState("");
  const [warehouseKeyword, setWarehouseKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  const currentMonth = new Date().getMonth()

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
    toDate: lastDayOfMonth
  });

  const [infoAccount, setInfoAccount] = useState({} as any);

  const { listAccount, isLoading: isLoadingListAccount } = useQueryListAccount({
		limit: LIMIT_DROPDOWN,
		keyword: accountKeyword,
	})

  const { list: listCustomer } = useContact({
		params: { keyword: contactKeyword },
    isFetchList: true
	})

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { list: listWarehouse } = useWarehouse({
		params: { keyword: warehouseKeyword },
    isFetchList: true
	})

  const { listDataWithPager, isLoading: isLoadingJournallList, totalRecord, totalPage, fetchNextPage, hasNextPage } = useJournalList({
    params: {
        limit: 50,
        forward: 0,
        cancel: 0,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        accountID: accountId,
        fundaID: fundaId,
        warehouseID: warehouseId,
        contactID: customerID,
    },
    isFetchList: true
  })

  const { listJournalByProperty: dataS } = useJournalByProperty({
    params: {
        option: 3,
        optionTerm: 1,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        arrAccIDs: [accountId],
        fundaID: fundaId,
        warehouseID: warehouseId,
    },
    isFetchList: true
  })

  let soDuDauKy = 0, soDuCuoiKy = 0
  let phatSinhNo = 0, phatSinhCo = 0

  if(dataS?.debitO?.length){
    soDuDauKy = Number(soDuDauKy) + Number(dataS.debitO[0].amount)
  }
  if(dataS?.creditO?.length){
    soDuDauKy = Number(soDuDauKy) - Number(dataS.creditO[0].amount)
  }
  if(dataS?.debitOF?.length){
    soDuDauKy = Number(soDuDauKy) + Number(dataS.debitOF[0].amount)
  }
  if(dataS?.creditOF?.length){
    soDuDauKy = Number(soDuDauKy) - Number(dataS.creditOF[0].amount)
  }

  if(dataS?.debitFT?.length){
    phatSinhNo = Number(dataS.debitFT[0].amount)
  }
  if(dataS?.creditFT?.length){
    phatSinhCo = Number(dataS.creditFT[0].amount)
  }

  let balance = soDuDauKy
  soDuCuoiKy = Number(soDuDauKy) + Number(phatSinhNo) - Number(phatSinhCo)

  const handleOnChangeDate = useCallback((date, input) => { // 0: fromDate , 1: toDate
    if (input) {
      setInputFilter(() => ({ ...inputFilter, toDate: date }))
    } else {
      setInputFilter(() => ({ ...inputFilter, fromDate: date }))
    }
  }, [])

  useEffect(() => {
    if(isLoadingListAccount || accountId || !listAccount?.length) return

    const accId = listAccount[0]._id

    setAccountId(accId)
    history.push({ search: `?accountId=${accId}` })
  }, [isLoadingListAccount, accountId])

  useEffect(() => {
    if(!accountId) return

    const fetchDetailAccount = async (accountId: string) => {
      const response = await API.get(
        `${ITEM_ACCOUNT}?accountID=${accountId}`
      )
      const { data, error } = response.data

      if(!data || error) {
        return toast.error("Error fetching account detail")
      }

      setInfoAccount(data)
    }

    fetchDetailAccount(accountId)
  }, [accountId]);

  if(!accountId || isLoadingJournallList) {
    return <Loader className="border-primary" />
  }

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-2">
        <p className="text-lg mr-5">{infoAccount?.name}-{(infoAccount?.description && infoAccount?.description.length > 25) ? `${infoAccount?.description.substring(0, 25)}...` : infoAccount?.description}</p>
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg"}
            placeholder={"Tài khoản"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listAccount}
            formatItem={{
                id: "_id",
                text: "name",
                description: "description",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setAccountKeyword(valueSearch),
                500
            )}
            onchangeValue={item => {
                history.push({ search: `?accountId=${item._id}` })
                setAccountId(item._id);

                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}-{item.description}</p>
            )}
            selectOneByOne={true}
        />

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
            onchangeValue={item => {
                setFundaId(item._id);
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
            placeholder={"Kho bãi"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listWarehouse}
            formatItem={{
                id: "_id",
                text: "name",
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setWarehouseKeyword(valueSearch),
                500
            )}
            onchangeValue={item => {
                setWarehouseId(item._id);
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
                limit={50}
                hasNextPage={hasNextPage}
                isFetching={isLoadingJournallList}
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

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadDate
              )}
            >
              Ngày
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phiếu
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Số hiệu
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadContent
              )}
            >
              Nội dung
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCusCode
              )}
            >
              Mã khách
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Tài khoản đối ứng
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phát sinh nợ
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Phát sinh có
            </th>
            <th
              className={cn(
                "py-1 px-2 font-normal border-r border-primary-border",
                styles.theadCode
              )}
            >
              Dư Nợ-Có
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Khoản mục phí/Hợp đồng/Ngân sách
            </th>
            <th className="w-1/12 py-1 px-2 font-normal border-r border-primary-border">
              Sản phẩm
            </th>
            <th className="w-1/12 py-1 px-2 font-normal">Ghi chú</th>
          </tr>
        </thead>

        <tbody className="bg-primary-light">
          <tr
            className={cn(
              "border-b border-primary-border h-10",
              styles.bgBlueLight
            )}
          >
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              Đầu kỳ
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
              {formatNumberMoney(soDuDauKy)}
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
          </tr>
            {
              (listDataWithPager[pageIndex] ?? []).map((item, index) => {
                // console.log(item?.debit)
                // console.log(infoAccount?.nestedChilds)
                // console.log('==================')

                if(item?.debit && (infoAccount?.nestedChilds?.includes(item?.debit?._id) || accountId.toString() === item?.debit?._id.toString())){

                  balance = Number(balance) + Number(item.amount)

                  return (
                    <tr key={index} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.voucher?.sign}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                          {item?.voucher?.name}
                        </NavLink>
                        <p className="text-gray-500"><i>{item?.funda?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customerDebit?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.credit?.name}-{item?.credit?.description}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(item?.amount)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">

                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(balance)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        <p className="text-[12px] text-primary"><i>{item?.subtype?.name}</i></p>
                        <p className="text-gray-500 text-[12px]"><i>{item?.contract?.name}</i></p>
                        <p className="text-gray-500 text-[12px]"><i>{item?.budgetWork?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.goods?.name}
                        <p className="text-gray-500 text-[12px]"><i>{item?.warehouse?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.note}
                      </td>
                    </tr>
                  )
                }else{
                  balance = Number(balance) - Number(item.amount)

                  return (
                    <tr key={index} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.voucher?.sign}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                          {item?.voucher?.name}
                        </NavLink>
                        <p className="text-gray-500"><i>{item?.funda?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customerCredit?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.debit?.name}-{item?.debit?.description}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">

                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(item?.amount)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(balance)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        <p className="text-[12px] text-primary"><i>{item?.subtype?.name}</i></p>
                        <p className="text-gray-500 text-[12px]"><i>{item?.contract?.name}</i></p>
                        <p className="text-gray-500 text-[12px]"><i>{item?.budgetWork?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.goods?.name}
                        <p className="text-gray-500 text-[12px]"><i>{item?.warehouse?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.note}
                      </td>
                    </tr>
                  )
                }
              })
          }
          <tr
            className={cn(
              "border-b border-primary-border h-10",
              styles.bgFooterYellow
            )}
          >
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border">
              Cuối kỳ
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
              {formatNumberMoney(phatSinhNo)}
            </td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
              {formatNumberMoney(phatSinhCo)}
            </td>
            <td className="py-1 px-2 font-bold border-r border-primary-border text-right">
              {formatNumberMoney(soDuCuoiKy)}
            </td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
            <td className="py-1 px-2 border-r border-primary-border">{""}</td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}