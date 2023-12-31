import React, { FC, useCallback, useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom"
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import { formatNumberMoney } from "utils/cmcs";
import { FilterDateGroup }  from "views/accounting/shareComponents/common";
import { VOUCHER_TYPES } from "apis/localdb/index";
import { useJournalByProperty } from "services/hooks/accounting/useGeneralJournal";
import {debounce} from "lodash";
import moment from "moment";
import { DropdownSearchableV2 } from "shareComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { useJournalList } from "services/hooks/accounting/useGeneralJournal";
import { useFunda } from "services/hooks/items/useFunda";
import { toast } from "react-toastify";
import API from "apis/repository";
const ITEM_ACCOUNT = "/api/item/accounts";
const ITEM_CONTACT = "/api/item/contacts";

export const AccountingDebtDetailPage2: FC = () => {
  const history = useHistory();
  const [pageIndex, setPageIndex] = useState(0)
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaId, setFundaId] = useState<string | null>();
  const [fundaKeyword, setFundaKeyword] = useState("");

  const [showOption, setShowOption] = useState(false)
  const [inputFilter, setInputFilter] = useState({ keyword: '', fromDate: new Date(new Date().getFullYear(), 0, 1), toDate: new Date(new Date().getFullYear(), 11, 31) });
 
  const params: any = useParams();
  const [infoAccount, setInfoAccount] = useState({} as any);
  const [infoContact, setInfoContact] = useState({} as any);

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { listJournalByProperty: dataAll } = useJournalByProperty({
    params: {
      option: 10,
      optionTerm: 1,
      fromDate: inputFilter.fromDate,
      toDate: inputFilter.toDate,
      fundaID: fundaId,
      arrAccIDs: [params.accountID],
      contactID: params.contactID,
    },
    isFetchList: true
  })
  // console.log(params.accountID)
  // console.log(params.contactID)
  // console.log(dataAll?.arrCombine)

  const accountId = params.accountID
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
  }, [accountId])

  const contactId = params.contactID
  useEffect(() => {
    if(!accountId) return
    const fetchDetailContact = async (contactId: string) => {
      const response = await API.get(
        `${ITEM_CONTACT}?contactID=${contactId}`
      )
      const { data, error } = response.data
      if(!data || error) {
        return toast.error("Error fetching account detail")
      }
      setInfoContact(data)
    }
    fetchDetailContact(contactId)
  }, [contactId])

  let tonDauKy = 0, nhapTrongKy = 0, xuatTrongKy = 0, tonCuoiKy = 0
  if(dataAll && dataAll?.arrCombine){
    for(const item of dataAll?.arrCombine){
      tonDauKy = tonDauKy + item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy
      nhapTrongKy = nhapTrongKy + item.noTrongKy
      xuatTrongKy = xuatTrongKy + item.coTrongKy
      tonCuoiKy = tonCuoiKy + item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy
    }
  }
  let balance = tonDauKy

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage } = useJournalList({
    params: {
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 50,
        forward: 0,
        cancel: 0,
        fundaID: fundaId,
        accountID: params.accountID,
        contactID: params.contactID,
    },
    isFetchList: true
  })

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
  }, [])

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-2">
        <div className={"title-ticket-detail flex"}>
          <div className={"flex-1 flex items-center"}>
            <button
              type="button"
              className="p-2 rounded-3xl mr-2"
              onClick={() => history.goBack()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <p className="text-lg mr-3">{infoAccount?.name}-{infoAccount?.description}/{infoContact.name}</p>
          </div>
        </div>
        <DropdownSearchableV2
            ref={accountRef}
            className={"mr-1 border border-primary-border rounded-lg mb-2"}
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

        <div className="flex items-center">
          <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
          <div className={"relative z-5 inline-block"}>
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
          </div>
          <div className="absolute right-0">
            <PaginateV2
                ref={ref}
                totalRecord={totalRecord}
                totalPages={totalPage}
                limit={50}
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

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{ width: "6%" }}>
              Ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/6">
              Diễn giải
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{ width: "6%" }}>
              Số hiệu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/12">
              Hợp đồng
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/12">
              Tài khoản đối ứng	
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Phát sinh nợ	
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Phát sinh có	
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Dư nợ-có
            </th>
          </tr>
        </thead>

        <tbody className="">
          <tr
            className={cn(
              "border-b border-primary-border h-9 font-bold",
              styles.bgFooterYellow
            )}
          >
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border">Đầu kỳ</td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border">
                {formatNumberMoney(tonDauKy)}
              </td>
          </tr>
          {
            (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => {
              if(item?.debit && (infoAccount?.nestedChilds?.includes(item?.debit?._id) || accountId.toString() === item?.debit?._id.toString())){
                balance = Number(balance) + Number(item.amount)
                
                return (
                  <tr key={index} className="border-b border-primary-border h-10">
                    <td className="py-1 px-2 border-r border-primary-border">
                      {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                      <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                        {item?.voucher?.name}
                      </NavLink>
                      <p><i>{item?.funda?.name}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.voucher?.sign}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.contract?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.credit?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {formatNumberMoney(item?.amount)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                    
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {formatNumberMoney(balance)}
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
                    <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                      <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                        {item?.voucher?.name}
                      </NavLink>
                      <p><i>{item?.funda?.name}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.voucher?.sign}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.contract?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.debit?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                    
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {formatNumberMoney(item?.amount)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {formatNumberMoney(balance)}
                    </td>
                  </tr>
                )

              }
            })
          }
          <tr
            className={cn(
              "border-b border-primary-border h-9 font-bold",
              styles.bgFooterYellow
            )}
          >
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border">Cuối kỳ</td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border">
                {formatNumberMoney(tonCuoiKy)}
              </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}