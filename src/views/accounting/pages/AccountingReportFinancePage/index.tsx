import React, { FC, useCallback, useState } from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { useModal } from "services/hooks/useModal";
import { formatNumberMoney } from "utils/cmcs";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import TriangleDown from "assets/icons/TriangleDown";
import debounce from "lodash/debounce";
import { SearchInput } from "shareComponents/common";
import { DropdownSearchableV2 } from "shareComponents/common";
import { toast } from "react-toastify";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import {
  DialogForm,
} from "views/accounting/shareComponents/common";
import {
  useReportList, useMutationDocument
} from "services/hooks/accounting/useReport";

interface AccountingTicketsPageProps {
  type?: number
}

export const AccountingReportFinancePage: FC<AccountingTicketsPageProps> = ({ type = 1 }) => {
  const { openModal, closeModal } = useModal();
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  const history = useHistory();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const fundaIDParams = searchParams.get("fundaID")

  const [pageParam, setPageParam] = useState('');

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaID, setFundaID] = useState<string | null>(fundaIDParams);
  const [customerID, setCustomerID] = useState<string | null>();
  const [userID, setUserID] = useState<string | null>();

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  });

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage, refetch } = useReportList({
    params: {
        // type,
        // fundaID,
        // customerID,
        // userCreateID: userID,
        // keyword: inputFilter.keyword,
        // fromDate: inputFilter.fromDate,
        // toDate: inputFilter.toDate,
        limit: 20,
    },
    isFetchList: true
  })

  const {
    insertDocumentAsync,
    updateDocumentAsync,
  } = useMutationDocument();

  const handleCreateReport = React.useCallback(
    async (values) => {
      try {
        const isCreated = await insertDocumentAsync(values);
        if (!isCreated.error) {
          toast.success('Khởi tạo thành công');
          refetch();
          closeModal();
          return null;
        }
        toast.error(isCreated?.data?.message);
        throw new Error("Can not create!");
      } catch (err) {
        return null;
      }
    },
    [closeModal, insertDocumentAsync, refetch]
  );

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilter((value) => ({ ...value, keyword: event.target.value }))
  }, 500);

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
  }, [])

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center px-3">
        <SearchInput classNameWrapper={"mr-1"} onChange={onChangeSearch} />
        <div className="flex items-center">
          <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
          <button
          className={"bg-green-success h-[32px] text-white rounded px-5"}
          onClick={() =>
            openModal(
              <div className="t-main-search text-left transition-all transform bg-primary-light shadow-xl rounded my-20 align-top inline-block">
                <DialogForm
                  title="Tạo mới"
                  onSubmit={handleCreateReport}
                  // outin={Number(outin)}
                  // type={Number(type)}
                  // fundaName={""}
                  // projectName={""}
                  // assigneeName={""}
                  // warehouseName={""}
                  // customerName={""}
                />
              </div>
            )
          }
        >
          Tạo mới
        </button>
          <div className="absolute right-0">
            <PaginateV2
                ref={ref}
                totalRecord={totalRecord}
                totalPages={totalPage}
                limit={20}
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
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "3%"}}>
            TT
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
            Nội dung
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
            Từ ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
            Đến ngày
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
            Doanh thu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
            Chi phí
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
          {listDataWithPager[pageIndex] && listDataWithPager[pageIndex].map((item: any, index: any) => (
            <tr key={item._id}  className="border-b border-primary-border">
                <td className="py-1 px-2 border-r border-primary-border">{index + 1}</td>
                <td className="py-1 px-2 border-r border-primary-border">{item.name}</td>
                <td className="py-1 px-2 border-r border-primary-border">{moment(item.fromDate).format('DD/MM/YYYY HH:mm')}</td>
                <td className="py-1 px-2 border-r border-primary-border">{moment(item.toDate).format('DD/MM/YYYY HH:mm')}</td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(item.revenue)}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(item.expense)}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(item.profit)}
                </td>
                <td className="py-1 px-2 border-r border-primary-border">{item.note}</td>
            </tr>
            ))}
        </tbody>
      </table>

    </main>
  )
}