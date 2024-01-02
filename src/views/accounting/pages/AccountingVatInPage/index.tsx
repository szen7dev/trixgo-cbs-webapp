import React, { FC, useCallback, useState } from "react";
import { NavLink } from "react-router-dom"
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import { VOUCHER_TYPES } from "apis/localdb/index";
import {
  useVoucherList
} from "services/hooks/accounting/useAccVoucher";
import {debounce} from "lodash";
import { DropdownSearchableV2 } from "shareComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { useFunda } from "services/hooks/items/useFunda";

export const AccountingVatInPage: FC = () => {
  const [pageIndex, setPageIndex] = useState(0)
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaId, setFundaId] = useState<string | null>();
  const [fundaKeyword, setFundaKeyword] = useState("");

  const [showOption, setShowOption] = useState(false)

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  });

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage } = useVoucherList({
    params: {
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 10,
        forward: 0,
        cancel: 0,
        vat: 1,
        fundaID: fundaId,
    },
    isFetchList: true
  })

  // console.log(listDataWithPager)

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
      <p className="text-lg mr-5">Bảng kê hóa đơn mua vào</p>
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
      </header>

      <section className="mt-4">
      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
          <thead className="h-10 bg-cbs-table-header border border-primary-border text-primary-gray">
            <tr>
              <th className="border-r border-primary-border px-2 font-normal">
                Số hóa đơn
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Ngày, tháng, năm lập hóa đơn
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Ngày hoạch toán
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Tên người bán	
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Mã số thuế người bán
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Địa chỉ người bán
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Hợp đồng
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Mặt hàng	
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Doanh số mua chưa có thuế
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Thuế GTGT đủ điều kiện khấu trừ thuế
              </th>
            </tr>
          </thead>

          <tbody>
            {
              (listDataWithPager[pageIndex] ?? []).map((item, index) => {
                return (
                  <tr key={index + "debit"} className="border-b border-primary-border h-10">
                      <td className="py-1 px-2 border-r border-primary-border text-primary">
                        <NavLink to={`/accounting/${ (item?.type && item?.type >= 1) ? VOUCHER_TYPES[Number(item?.type - 1)].slug : ''}/detail/${item?._id}`}>
                          {item?.sign}/{item?.signInvoice}
                        </NavLink>
                        <p className={"mt-1 text-gray-500 text-gray-500 text-[12px]"}>{item?.funda?.name}</p>
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.date).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {moment(item?.dateInvoice).format('DD/MM/YYYY')}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customer?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customer?.taxid}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.customer?.address}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.contract?.name}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border">
                        {item?.commodity}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(item?.revenue)}
                      </td>
                      <td className="py-1 px-2 border-r border-primary-border text-right">
                        {formatNumberMoney(item?.tax)}
                      </td>
                    </tr>
                )
              })
          }
          </tbody>
        </table>
      </section>
    </main>
  )
}