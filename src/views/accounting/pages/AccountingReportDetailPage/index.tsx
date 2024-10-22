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
  const { openModal, closeModal } = useModal();
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const [recordSelected, toggleRecord] = React.useState<any>({});
  const history = useHistory();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const fundaIDParams = searchParams.get("fundaID")
  const { reportID } = useParams<{ reportID: string }>();

  const [pageParam, setPageParam] = useState('');

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const [keyword, setKeyword] = React.useState("")

  const { listJournalByProperty } = useReportByProperty({
    params: {
        option,
        reportID
    },
    isFetchList: true
  })

  console.log(listJournalByProperty)

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
              Ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Doanh thu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Chi phí
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Ghi chú
            </th>
          </tr>
        </thead>
        <tbody className="">
          
        </tbody>
      </table>

    </main>
  )
}