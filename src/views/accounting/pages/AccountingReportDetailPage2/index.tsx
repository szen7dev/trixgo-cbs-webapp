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
import { VOUCHER_TYPES } from "apis/localdb/index";

interface AccountingTicketsPageProps {
    option?: number
}

export const AccountingReportDetailPage2: FC<AccountingTicketsPageProps> = ({option}) => {
  const history = useHistory();
  const { reportID } = useParams<{ reportID: string }>();
  const { accountID } = useParams<{ accountID: string }>();

  const { listJournalByProperty } = useReportByProperty({
    params: {
        option,
        reportID,
        accountID
    },
    isFetchList: true
  })

  let total = 0
  {listJournalByProperty?.listData.map((item: any, index: any) => (
    total = Number(total) + item.amount
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
              {listJournalByProperty?.infoReport?.name} | {listJournalByProperty?.infoReport?.funda?.name} 
              | {listJournalByProperty?.infoAccount?.name}.{listJournalByProperty?.infoAccount?.description} 
              | Từ {moment(listJournalByProperty?.infoReport?.fromDate).format('DD/MM/YYYY')} 
              - Đến {moment(listJournalByProperty?.infoReport?.toDate).format('DD/MM/YYYY')} 
              </p>
        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: '90px'}}>
              Ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Nội dung
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              TK Nợ
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              TK Có
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Giá trị
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Ghi chú
            </th>
          </tr>
        </thead>
        <tbody className="">
          {listJournalByProperty?.listData.map((item: any, index: any) => (
            <tr key={item._id}  className="border-b border-primary-border">
                <td className="py-1 px-2 border-r border-primary-border">
                  {moment(item.date).format('DD/MM/YYYY')}
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                  <NavLink className="text-primary" to={`/accounting/${ (item?.voucher?.type && item?.voucher?.type >= 1) ? VOUCHER_TYPES[Number(item?.voucher?.type - 1)].slug : ''}/detail/${item?.voucher?._id}`}>
                    {item?.voucher?.name}
                  </NavLink>
                </td>
                <td className="py-1 px-2 border-r border-primary-border">{item?.debit?.name}</td>
                <td className="py-1 px-2 border-r border-primary-border">{item?.credit?.name}</td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(item.amount)}
                </td>
                <td className="py-1 px-2 border-r border-primary-border">{item?.note}</td>
              </tr>
          ))}
           <tr className="border-b border-primary-border font-bold styles_bgFooterYellow__2PorF">
              <td className="py-1 px-2 border-r border-primary-border">
                
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
                Tổng
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
              
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
               
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(total)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border"></td>
        </tr>
        </tbody>
      </table>

    </main>
  )
}