/*=====1.LIBRARY=====*/
import { FC, useCallback, useState, useEffect } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

/*=====2.CSS=====*/
import styles from "views/support/styles/support.module.css";

/*=====3.ICONS=====*/

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput } from "shareComponents/common";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useFunda } from "services/hooks/items/useFunda";
import { createLinkAndClick } from "utils";
import moment from "moment";
import { useJournalList, useJournal } from "services/hooks/accounting/useGeneralJournal";
import { FilterDateGroup } from "views/accounting/shareComponents/common";

export const AccountingHomePage: FC = () => {
  const [keyword, setKeyword] = useState('');
  const { parentID } = useParams<{ parentID: string }>();

  const {
    deleteAsync,
    list: listFundas,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord
  } = useFunda({
    params: { keyword, isListParentOfListChilds: "1", parentID },
    isFetchList: true
  })

  const onChangeSearch = debounce((event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  }, 500);

  const today = new Date();
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  const currentMonth = new Date().getMonth()
  const [inputFilter, setInputFilter] = useState({
    fromDate: new Date(new Date().getFullYear(), currentMonth, 1),
    toDate: lastDayOfMonth
  })

  //_____Excel
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  })
  const { exportExcelAsync } = useJournal({})
  const handleExportExcel = async (param: any) => {
    try {
        console.log('Clicked with parameter:', param);
          setStateExport({ isExporting: true })
          const { error, data } = await exportExcelAsync({
              type: param.option,
              fromDate: inputFilter.fromDate,
              toDate: inputFilter.toDate,
            })

          if(error) {
              return toast.warn(data?.message);
          }

          data && createLinkAndClick(data, '_self')
      } catch (error: any) {
          toast.error(error.message)
      } finally {
          setStateExport({ isExporting: false })
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
    <main className="relative h-full">
      <header className="sticky top-0 bg-primary-light z-10">
        <div className="h-[50px] border border-primary-border flex items-center justify-between px-5">
          <div className="flex items-center">
            <p className="text-lg ml-2">Đơn vị cơ sở</p>
            <SearchInput
              classNameWrapper="ml-4 mr-2"
              classNameInput="outline-none w-[296px]"
              onChange={onChangeSearch}
            />
            <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
            <button className={"ml-10 px-4 py-2 text-left hover:bg-cbs-table-header text-cbs-highlight-color"}
              onClick={() => handleExportExcel({option: 4})}
            >
                Tải Báo cáo nhập liệu
            </button>
          </div>

        </div>
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-[38px] border-b border-primary-border">
          <tr className="text-left text-sm">
            <th className="w-1/6 py-1">
              <div className="border-r-2 border-gray-300 font-normal pl-4">
                Nội dung
              </div>
            </th>
            <th className={cn("py-1 font-normal", styles.theadTwelvePercent)}>
              <div className="border-r-2 border-gray-300 font-normal pl-4">
                Mã hiệu
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {listFundas.length ? listFundas.map((item: any) => (
            <tr key={item._id} className="border-b border-primary-border h-10 pl-4">

              <td className="py-1 px-2 pl-4">
                <Link to={`/accounting/accbill/${item._id}`}>
                  {<b>{item?.name}</b>}
                </Link>
              </td>
              <td className="py-1 px-2 pl-4">{item.sign}</td>
            </tr>
          )) : <></>}
        </tbody>
      </table>

      {hasNextPage && (
        <div className="w-full flex justify-center my-5">
          <button onClick={fetchNextPage}>
            <span className="text-primary">
              {`Xem thêm (${totalRecord - listFundas.length})`}
            </span>
          </button>
        </div>
      )}
    </main>
  )
}