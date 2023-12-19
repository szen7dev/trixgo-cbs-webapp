import React, { FC, useCallback, useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import {debounce} from "lodash";
import moment from "moment";
import { VOUCHER_TYPES, LIMIT_DROPDOWN } from "apis/localdb/index";
import { formatNumberMoney } from "utils/cmcs";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import {
  useJournallList,
  useJournalByProperty
} from "services/hooks/accounting/useGeneralJournal";
import API from "apis/repository";
import { DropdownSearchableV2 } from "shareComponents/common";
import {useProjectCustom} from "services/hooks/items/useProject";
import {useDispatch} from "react-redux";
import {setFilterDropdown} from "redux/reducer/DocumentProjectSlice";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import {
	useQueryListAccount,
} from "services/hooks/cmcs/useContractIncome";

import { DropdownSearchable, Paginate } from "shareComponents/common";

const ITEM_ACCOUNT = "/api/item/accounts";

export const AccountingDetailPage: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const dispatch = useDispatch();

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const datahubRef = React.useRef<DropdownHandle>(null);
  const [departmentsID, setDepartmentsID] = useState<string[]>([]);
  const [accountKeyword, setAccountKeyword] = useState("");
  const [inputFilter, setInputFilter] = useState({ keyword: '', fromDate: new Date(new Date().getFullYear(), 0, 1), toDate: new Date(new Date().getFullYear(), 11, 31) });

  const params: any = useParams()
  let accountID : any
  
  if(params?.accountID){
    accountID = params?.accountID
  }else{
    accountID = "64c0ca9af8a43a0011a3435d" //**************** */
  }

  const [infoAccount, setInfoAccount] = useState({} as any);

	const [searchAccount, setSearchAccount] = useState();

  const { listAccount } = useQueryListAccount({
		limit: LIMIT_DROPDOWN,
		keyword: searchAccount,
	})

  useEffect(() => {
    const fetchDetailAccount = async (accountID: any) => {
      const { data } = await API.get(
        `${ITEM_ACCOUNT}?accountID=${accountID}`, {
        params: {
          // populates: {
          //   "path": "customer contract ipc subtype userCreate userUpdate company",
          //   "select": "name description bizfullname",
          // }
        }
      }
      )
      setInfoAccount(data?.data || {})
      return data
    }
    params.accountID && fetchDetailAccount(params.accountID)
  }, [params.accountID]);

  // accountID = departmentsID

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch, isFetching } = useJournallList({
    params: {
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 50,
        accountID,
        forward: 0,
        cancel: 0,
    },
    isFetchList: true
})

const { listJournalByProperty: dataS, listJournalByPropertyIsLoading, refetchListJournalByProperty } = useJournalByProperty({
  params: {
      option: 3,
      optionTerm: 1,
      fromDate: inputFilter.fromDate,
      toDate: inputFilter.toDate,
      arrAccIDs: [accountID],
  },
  isFetchList: true
})

// console.log(dataS)
// console.log(listDataWithPager)
// console.log({infoAccount})
console.log({accountID})
console.log({departmentsID})

let soDuDauKy = 0, soDuCuoiKy = 0
let phatSinhNo = 0, phatSinhCo = 0

if(dataS?.debitO.length){
  soDuDauKy = Number(soDuDauKy) + Number(dataS.debitO[0].amount)
}
if(dataS?.creditO.length){
  soDuDauKy = Number(soDuDauKy) - Number(dataS.creditO[0].amount)
}
if(dataS?.debitOF.length){
  soDuDauKy = Number(soDuDauKy) + Number(dataS.debitOF[0].amount)
}
if(dataS?.creditOF.length){
  soDuDauKy = Number(soDuDauKy) - Number(dataS.creditOF[0].amount)
}

if(dataS?.debitFT.length){
  phatSinhNo = Number(dataS.debitFT[0].amount)
}
if(dataS?.creditFT.length){
  phatSinhCo = Number(dataS.creditFT[0].amount)
}

let balance = soDuDauKy
soDuCuoiKy = Number(soDuDauKy) + Number(phatSinhNo) - Number(phatSinhCo)

// console.log('================')
// console.log(inputFilter.fromDate)
// console.log(inputFilter.toDate)

const handleOnChangeDate = useCallback((date, input) => { // 0: fromDate , 1: toDate
  if (input) {
    setInputFilter(() => ({ ...inputFilter, toDate: date }))
  } else {
    setInputFilter(() => ({ ...inputFilter, fromDate: date }))
  }

}, [])

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-2">
        <p className="text-lg">{infoAccount?.name}-{infoAccount?.description}</p>

          <DropdownSearchable
            placeholder="Tìm kiếm"
            className="w-[322px] px-2 bg-cbs-table-header"
            classNameInput="h-[30px] bg-cbs-table-header"
            isMultiple={false}
            allowClearValueSingleInput={false}
            showTriangle={true}
            maxWidthInput="max-w-none"
            renderSelectedItem={(item) => <span>{item.text}</span>}
            classNameItem="p-0"
            data={listAccount}
            formatItem={{
              id: "_id",
              text: "name",
            }}
            onSearchInputChange={debounce(
              (valueSearch) => setAccountKeyword(valueSearch),
              500
          )}
          />

        {/* <DropdownSearchableV2
            ref={datahubRef}
            className={"mr-1 border border-primary-border rounded-lg mb-2"}
            placeholder={"Tài khoản"}
            isMultiple={false}
            allowClearValueSingleInput={true}
            data={listAccount}
            formatItem={{
                id: "_id",
                text: "name"
            }}
            onSearchInputChange={debounce(
                (valueSearch) => setAccountKeyword(valueSearch),
                500
            )}
            onchangeValue={item => {
                const cloneIDs = [...departmentsID];
                cloneIDs.push(item._id);
                setDepartmentsID(cloneIDs);
                dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: cloneIDs}))

                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            onClearData={() => {
                setDepartmentsID([]);
                dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: []}))

                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            onMultipleRemoveValue={id => {
                const cloneIDs = [...departmentsID];
                const newList = cloneIDs.filter(selectId => selectId !== id);
                setDepartmentsID(newList);
                dispatch(setFilterDropdown({keyFilter: "departmentsID", dataFilter: newList}))

                setPageIndex(0);
                ref.current&&ref.current.resetPaginate();
            }}
            renderItem={(item) => (
                <p className={"min-w-[300px]"}>{item.text}</p>
            )}
            selectOneByOne={true}
        /> */}

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
              Tên phiếu
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
                styles.theadCode
              )}
            >
              Số hiệu
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
              Hợp đồng/Ngân sách
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
          </tr>
            {
              (listDataWithPager[pageIndex] ?? []).map((item, index) => {
                // console.log(item?.debit)
                // console.log(infoAccount?.nestedChilds)
                // console.log('==================')

                if(item?.debit && (infoAccount?.nestedChilds?.includes(item?.debit?._id) || accountID.toString() === item?.debit?._id.toString())){
                  
                  balance = Number(balance) + Number(item.amount)

                  return (
                    <tr key={index} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                      </td>
                      <td className="py-1 px-2 text-primary border-r border-primary-border">
                        <NavLink to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/${item?.voucher?._id}`}>
                          {item?.voucher?.name}
                        </NavLink>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.voucher?.sign}
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
                      <td className="py-1 px-2 text-primary border-r border-primary-border">
                        <NavLink to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/${item?.voucher?._id}`}>
                          {item?.voucher?.name}
                        </NavLink>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.voucher?.sign}
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
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                      
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
          </tr>
        </tbody>
      </table>
    </main>
  )
}