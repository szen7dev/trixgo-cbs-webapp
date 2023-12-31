import React, { FC, useCallback, useState } from "react";
import { NavLink } from "react-router-dom"
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import {debounce} from "lodash";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import { FilterDateGroup } from "views/accounting/shareComponents/common";
import { DropdownSearchableV2 } from "shareComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { VOUCHER_TYPES } from "apis/localdb/index";
import { useJournalList } from "services/hooks/accounting/useGeneralJournal";
import { useFunda } from "services/hooks/items/useFunda";

export const AccountingDiaryPage: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaId, setFundaId] = useState<string | null>();
  const [fundaKeyword, setFundaKeyword] = useState("");

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  })

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage } = useJournalList({
    params: {
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 10,
        forward: 0,
        cancel: 0,
        fundaID: fundaId,
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
                limit={10}
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
      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
          <thead className="h-10 bg-cbs-table-header border border-primary-border text-primary-gray">
            <tr>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadCode
                )}
              >
                Ngày
              </th>
              <th className="w-1/12 border-r border-primary-border px-2 font-normal">
                Tên phiếu
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Nội dung
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadCode
                )}
              >
                Số hiệu
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Mã khách
              </th>
              <th className="w-1/12 border-r border-primary-border px-2 font-normal">
                Tài khoản đối ứng
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Số tiền nợ
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Số tiền có
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Hợp đồng
              </th>
              <th
                className={cn(
                  "border-r border-primary-border px-2 font-normal",
                  styles.theadContent
                )}
              >
                Sản phẩm
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Ghi chú
              </th>
            </tr>
          </thead>
          <tbody>
            {
              (listDataWithPager[pageIndex] ?? []).map((item, index) => {
                const jsx = [];

                if(item?.debit){
                  jsx.push(
                    <tr key={index + "debit"} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                          {item?.voucher?.name}
                        </NavLink>
                        <p><i>{item?.funda?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.voucher?.sign}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customerDebit?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.debit?.name}-{item?.debit?.description}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(item?.amount)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">

                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.contract?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.goods?.name}
                        <p className="text-primary-gray"><i>{item?.warehouse?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.note}
                      </td>
                    </tr>
                  )
                }

                if(item?.credit){
                  jsx.push(
                    <tr key={index + "credit"} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.voucher?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {(item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].text : ''}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                          {item?.voucher?.name}
                        </NavLink>
                        <p><i>{item?.funda?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.voucher?.sign}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customerCredit?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.credit?.name}-{item?.credit?.description}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">

                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {formatNumberMoney(item?.amount)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.contract?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.goods?.name}
                        <p className="text-primary-gray"><i>{item?.warehouse?.name}</i></p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.note}
                      </td>
                    </tr>
                  )
                }

                return jsx
              })
          }
          </tbody>
        </table>
      </section>
    </main>
  )
}