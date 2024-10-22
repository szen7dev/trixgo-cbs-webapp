import React, { FC, useCallback, useState } from "react";
import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { formatNumberMoney } from "utils/cmcs";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import { DropdownSearchableV2 } from "shareComponents/common";
import {
  useReportList, useReportByProperty
} from "services/hooks/accounting/useReport";

interface AccountingTicketsPageProps {
    option?: number
}

export const AccountingReportDetailPage: FC<AccountingTicketsPageProps> = ({option}) => {
  const history = useHistory();
  const { reportID } = useParams<{ reportID: string }>();

  const { listJournalByProperty } = useReportByProperty({
    params: {
        option,
        reportID
    },
    isFetchList: true
  })

  let revenue = 0, expense = 0
  {listJournalByProperty?.listData1[0]._credit.map((item: any, index: any) => (
    revenue = Number(revenue) + item.amount
  ))}
  {listJournalByProperty?.listData1[0]._debit.map((item: any, index: any) => (
    revenue = Number(revenue) - item.amount
  ))}

  {listJournalByProperty?.listData2[0]._credit.map((item: any, index: any) => (
    expense = Number(expense) - item.amount
  ))}
  {listJournalByProperty?.listData2[0]._debit.map((item: any, index: any) => (
    expense = Number(expense) + item.amount
  ))}

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-3">
        
        <div className="filter-bar flex flex-wrap px-4 py-1">
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
            <p className="text-lg mr-5">
              {listJournalByProperty?.infoReport?.name} - {listJournalByProperty?.infoReport?.funda?.name} 
              {option == 1 ? ' - Doanh thu ' : ' - Chi phí '}
              | Từ {moment(listJournalByProperty?.infoReport?.fromDate).format('DD/MM/YYYY')} 
              - Đến {moment(listJournalByProperty?.infoReport?.toDate).format('DD/MM/YYYY')} 
              </p>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "5%"}}>
              TT
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "20%"}}>
              Nội dung
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Doanh thu/Giảm trừ doanh thu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Chi phí/Giảm trừ chi phí
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Lợi nhuận
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Ghi chú
            </th>
          </tr>
        </thead>
        <tbody className="">
        {listJournalByProperty?.listData1[0]._credit.map((item: any, index: any) => (
          <tr key={item._id}  className="border-b border-primary-border">
              <td className="py-1 px-2 border-r border-primary-border">
                {index + 1}
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
              <NavLink to={`/accounting/financial-report/funda/${reportID}/${item?._id?.account?._id}`} className="text-cbs-highlight-color">
                  {item?._id?.account?.name} - {item?._id?.account?.description}
                </NavLink>
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(item.amount)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
            </tr>
        ))}
        {listJournalByProperty?.listData1[0]._debit.map((item: any, index: any) => (
          <tr key={item._id}  className="border-b border-primary-border">
              <td className="py-1 px-2 border-r border-primary-border">
                {index + 1}
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
              <NavLink to={`/accounting/financial-report/funda/${reportID}/${item?._id?.account?._id}`} className="text-cbs-highlight-color">
                  {item?._id?.account?.name} - {item?._id?.account?.description}
                </NavLink>
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                -{formatNumberMoney(item.amount)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
            </tr>
        ))}

        {listJournalByProperty?.listData2[0]._debit.map((item: any, index: any) => (
          <tr key={item._id}  className="border-b border-primary-border">
              <td className="py-1 px-2 border-r border-primary-border">
                {index + 1}
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
              <NavLink to={`/accounting/financial-report/funda/${reportID}/${item?._id?.account?._id}`} className="text-cbs-highlight-color">
                  {item?._id?.account?.name} - {item?._id?.account?.description}
                </NavLink>
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(item.amount)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
            </tr>
        ))}
        {listJournalByProperty?.listData2[0]._credit.map((item: any, index: any) => (
          <tr key={item._id}  className="border-b border-primary-border">
              <td className="py-1 px-2 border-r border-primary-border">
                {index + 1}
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
              <NavLink to={`/accounting/financial-report/funda/${reportID}/${item?._id?.account?._id}`} className="text-cbs-highlight-color">
                  {item?._id?.account?.name} - {item?._id?.account?.description}
                </NavLink>
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right"></td>
              <td className="py-1 px-2 border-r border-primary-border">
                -{formatNumberMoney(item.amount)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
            </tr>
        ))}
         <tr className="border-b border-primary-border font-bold styles_bgFooterYellow__2PorF">
              <td className="py-1 px-2 border-r border-primary-border">
                
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
                Tổng
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
              {formatNumberMoney(revenue)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(expense)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(revenue - expense)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
        </tr>
        </tbody>
      </table>

    </main>
  )
}