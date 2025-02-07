import React, { FC, useCallback, useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom"
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import { formatNumberMoney } from "utils/cmcs";
import { FilterDateGroup }  from "views/accounting/shareComponents/common";
import { useJournalByProperty } from "services/hooks/accounting/useGeneralJournal";
import {debounce} from "lodash";
import { DropdownSearchableV2 } from "shareComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { useFunda } from "services/hooks/items/useFunda";
import { toast } from "react-toastify";
import API from "apis/repository";
const ITEM_ACCOUNT = "/api/item/accounts";

export const AccountingDebtDetailPage1: FC = () => {
  const history = useHistory();
  const [pageIndex, setPageIndex] = useState(0)
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaId, setFundaId] = useState<string | null>();
  const [fundaKeyword, setFundaKeyword] = useState("");

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  const currentMonth = new Date().getMonth()

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1), 
    toDate: new Date(new Date().getFullYear(), 11, 31) 
  })
   
  const params: any = useParams();
  const [infoAccount, setInfoAccount] = useState({} as any);

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
        arrAccIDs: [params.accountID]
    },
    isFetchList: true
  })

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

  let noDauKy = 0, coDauKy = 0, noTrongKy = 0, coTrongKy = 0, noCuoiKy = 0, coCuoiKy = 0

  if(dataAll && dataAll?.arrCombine){
    for(const item of dataAll?.arrCombine){
      noDauKy = noDauKy + item.kcNoDauKy + item.noDauKy
      coDauKy = coDauKy + item.kcCoDauKy + item.coDauKy
      noTrongKy = noTrongKy + item.noTrongKy
      coTrongKy = coTrongKy + item.coTrongKy
      noCuoiKy = noCuoiKy + item.kcNoDauKy + item.noDauKy + item.noTrongKy 
      coCuoiKy = coCuoiKy + item.kcCoDauKy + item.coDauKy + item.coTrongKy
    }
  }

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
              <p className="text-lg mr-3">{infoAccount?.name}-{infoAccount?.description}</p>
            </div>
          </div>
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
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "5%"}}>
              Mã khách
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/6">
              Tên
            </th>
            <th colSpan={2} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Đầu kỳ
            </th>
            <th colSpan={2} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Trong kỳ
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Cuối kỳ
            </th>
          </tr>
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/6">
              
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Nợ đầu kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Có đầu kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Phát sinh nợ trong kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Phát sinh có trong kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Dư nợ cuối kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Dư có cuối kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Nợ-Có
            </th>
          </tr>
        </thead>

        <tbody className="">
          { 
            dataAll?.arrCombine?.map((item: any, index: any) => (
              <tr key={index} className="border-b border-primary-border h-10">
                <td className="py-1 px-2 border-r border-primary-border">
                    {item?.sign}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                  <NavLink to={`/accounting/debt-tracking/acc/${params.accountID}/cus/${item?._id}`}>
                    {item.name} - {item?.phone}
                  </NavLink>
                  {/* <p><i>{item?._id}</i></p> */}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcCoDauKy + item.coDauKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.noTrongKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.coTrongKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy + item.noTrongKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcCoDauKy + item.coDauKy + item.coTrongKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy))}
                </td>
              </tr>
            ))
          }

            <tr className={cn(
              "border-b border-primary-border h-10 font-bold",
              styles.bgFooterYellow
            )}>
              <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
                Tổng
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(noDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(coDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(noTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(coTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(noCuoiKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(coCuoiKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(noDauKy + noTrongKy - coDauKy - coTrongKy)}
              </td>
            </tr>
        </tbody>
      </table>
    </main>
  )
}