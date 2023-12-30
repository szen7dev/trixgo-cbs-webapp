import React, { FC, useCallback, useState } from "react";
import { NavLink } from "react-router-dom"
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { VOUCHER_TYPES } from "apis/localdb/index";
import {
  useVoucherList
} from "services/hooks/accounting/useAccVoucher";

export const AccountingVatOutPage: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  const ref = React.useRef<PaginateHandle>(null);

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  });

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage } = useVoucherList({
    params: {
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        limit: 10,
        forward: 0,
        cancel: 0,
        vat: 2,
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
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-6">
        <p className="text-lg">Bảng kê hóa đơn bán ra</p>

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
                Tên người mua
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Mã số thuế người mua
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Địa chỉ người mua
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Hợp đồng
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Mặt hàng	
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Doanh số bán chưa có thuế
              </th>
              <th className="border-r border-primary-border px-2 font-normal">
                Thuế GTGT phải nộp
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