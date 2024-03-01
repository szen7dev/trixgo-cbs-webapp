import React, { FC, useCallback, useState, useEffect } from "react";
import { NavLink, useParams, useHistory } from "react-router-dom"
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
import { useWarehouse } from "services/hooks/items/useWarehouse";
const ITEM_ACCOUNT = "/api/item/accounts";
const ITEM_GOODS = "/api/item/goods";

export const AccountingInOutDetailPage2: FC = () => {
  const history = useHistory();
  const [pageIndex, setPageIndex] = useState(0)
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaId, setFundaId] = useState<string | null>();
  const [warehouseId, setWarehouseId] = useState<string | null>();

  const [fundaKeyword, setFundaKeyword] = useState("");
  const [warehouseKeyword, setWarehouseKeyword] = useState("");

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  const currentMonth = new Date().getMonth()

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
    toDate: lastDayOfMonth
  })
   
  const params: any = useParams();
  const [infoAccount, setInfoAccount] = useState({} as any);
  const [infoGoods, setInfoGoods] = useState({} as any);

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { list: listWarehouse } = useWarehouse({
		params: { keyword: warehouseKeyword },
    isFetchList: true
	})

  const { listJournalByProperty: dataAll } = useJournalByProperty({
    params: {
        option: 9,
        optionTerm: 1,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        fundaID: fundaId,
        arrAccIDs: [params.accountID],
        goodsID: params.goodsID,
        warehouseID: warehouseId,
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

  const goodsId = params.goodsID
  useEffect(() => {
    if(!accountId) return
    const fetchDetailGoods = async (goodsId: string) => {
      const response = await API.get(
        `${ITEM_GOODS}?goodsID=${goodsId}`
      )
      const { data, error } = response.data
      if(!data || error) {
        return toast.error("Error fetching account detail")
      }
      setInfoGoods(data)
    }
    fetchDetailGoods(goodsId)
  }, [goodsId])

  let tonDauKy = 0, nhapTrongKy = 0, xuatTrongKy = 0, tonCuoiKy = 0
  let klTonDauKy = 0, klNhapTrongKy = 0, klXuatTrongKy = 0, klTonCuoiKy = 0
  let donGiaTonDauKy = 0

  if(dataAll && dataAll?.arrCombine){
    for(const item of dataAll?.arrCombine){
      tonDauKy = tonDauKy + item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy
      nhapTrongKy = nhapTrongKy + item.noTrongKy
      xuatTrongKy = xuatTrongKy + item.coTrongKy
      tonCuoiKy = tonCuoiKy + item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy

      klTonDauKy = klTonDauKy + item.klKcNoDauKy + item.klNoDauKy - item.klKcCoDauKy - item.klCoDauKy
      klNhapTrongKy = klNhapTrongKy + item.klNoTrongKy
      klXuatTrongKy = klXuatTrongKy + item.klCoTrongKy
      klTonCuoiKy = klTonCuoiKy + item.klKcNoDauKy + item.klNoDauKy + item.klNoTrongKy - item.klCoTrongKy- item.klKcCoDauKy - item.klCoDauKy
    }
  }
  if(klTonDauKy != 0){
    donGiaTonDauKy = Number(tonDauKy/klTonDauKy)
  }

  let balance = tonDauKy, quantityBalance = klTonDauKy

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage } = useJournalList({
    params: {
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 50,
        forward: 0,
        cancel: 0,
        fundaID: fundaId,
        accountID: params.accountID,
        goodsID: params.goodsID,
        warehouseID: warehouseId,
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
            <p className="text-lg mr-3">{infoAccount?.name}-{infoAccount?.description}/{infoGoods.name}</p>
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
            onClearData={() => {
              setFundaId("");
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
            onClearData={() => {
              setWarehouseId("");
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
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/6">
              Diễn giải
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Số hiệu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/6">
              Kho
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/12">
              Khách hàng
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Mã số thuế
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              NHẬP
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              XUẤT
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              TỒN
            </th>
          </tr>
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-primary-border"></th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              SL
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Đơn giá
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Thành tiền
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              SL
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Đơn giá
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Thành tiền
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              SL
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Đơn giá
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Thành tiền
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
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klTonDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(donGiaTonDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(tonDauKy)}
              </td>
          </tr>
          {
            (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => {
              if(item?.debit && (infoAccount?.nestedChilds?.includes(item?.debit?._id) || accountId.toString() === item?.debit?._id.toString())){
                
                balance = Number(balance) + Number(item.amount)
                quantityBalance = Number(quantityBalance) + Number(item.quantity)
                
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
                      {
                          item?.voucher?.modifyAt ?
                          <p className="text-gray-500 text-[10px]"><i>Updated: { moment(item?.voucher?.modifyAt).format('DD/MM/YYYY HH:mm')}</i></p>
                          : <></>
                        }
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-[10px]">
                      {item?.voucher?.sign}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.warehouse?.name}
                      <p><i>{item?.goods?.name}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.customerDebit?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.customerDebit?.taxid}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.quantity)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.unitprice)} 
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.amount)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(quantityBalance)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {quantityBalance != 0 ? formatNumberMoney(balance/quantityBalance) : 0}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(balance.toFixed(0))}
                    </td>
                  </tr>
                )

              }else{

                balance = Number(balance) - Number(item.amount)
                quantityBalance = Number(quantityBalance) - Number(item.quantity)

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
                      {
                          item?.voucher?.modifyAt ?
                          <p className="text-gray-500 text-[10px]"><i>Updated: { moment(item?.voucher?.modifyAt).format('DD/MM/YYYY HH:mm')}</i></p>
                          : <></>
                        }
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-[10px]">
                      {item?.voucher?.sign}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.warehouse?.name}
                      <p><i>{item?.goods?.name}</i></p>
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.customerCredit?.name}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border">
                      {item?.customerCredit?.taxid}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                    
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.quantity)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.unitprice)} 
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(item?.amount)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(quantityBalance)}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {quantityBalance != 0 ? formatNumberMoney(balance/quantityBalance) : 0}
                    </td>
                    <td className="py-1 px-2 border-r border-primary-border text-right">
                      {formatNumberMoney(balance.toFixed(0))}
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
              <td className="py-1 px-2 border-r border-primary-border">Tổng</td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klNhapTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
               {klNhapTrongKy != 0 ? formatNumberMoney(nhapTrongKy/klNhapTrongKy) : 0}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(nhapTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klXuatTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
               {klXuatTrongKy != 0 ? formatNumberMoney(xuatTrongKy/klXuatTrongKy) : 0}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(xuatTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(klTonCuoiKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {klTonCuoiKy != 0 ? formatNumberMoney(tonCuoiKy/klTonCuoiKy) : 0}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(tonCuoiKy.toFixed(0))}
              </td>
          </tr>
        </tbody>
      </table>
    </main>
  )
}