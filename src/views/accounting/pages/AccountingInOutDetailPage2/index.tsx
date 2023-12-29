import React, { FC, useCallback, useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom"
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import {debounce} from "lodash";
import moment from "moment";
import { formatNumberMoney } from "utils/cmcs";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import { DropdownSearchableV2 } from "shareComponents/common";
import {useDispatch} from "react-redux";
import {setFilterDropdown} from "redux/reducer/DocumentProjectSlice";
import PaginateV2 from "../../../../shareComponents/common/PaginateV2";
import {
	useAccount,
} from "services/hooks/items/useAccount";
import { VOUCHER_TYPES, LIMIT_DROPDOWN } from "apis/localdb/index";
import API from "apis/repository";
import {
  useJournallList,
  useJournalByProperty
} from "services/hooks/accounting/useGeneralJournal";
const ITEM_ACCOUNT = "/api/item/accounts";

export const AccountingInOutDetailPage2: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)
  const dispatch = useDispatch();

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const datahubRef = React.useRef<DropdownHandle>(null);
  const [departmentsID, setDepartmentsID] = useState<string[]>([]);
  const [accountKeyword, setAccountKeyword] = useState("");
  const [inputFilter, setInputFilter] = useState({ keyword: '', fromDate: new Date(new Date().getFullYear(), 0, 1), toDate: new Date(new Date().getFullYear(), 11, 31) });
  
  const [infoAccount, setInfoAccount] = useState({} as any);

	const [searchAccount, setSearchAccount] = useState();

  const { listDataWithPager, isLoading, totalRecord, totalPage, fetchNextPage, hasNextPage } = useAccount({
    params: {
      limit: 5,
      keyword: searchAccount,
    },
    isFetchList: true
  })

  // const { listJournalByProperty: dataS, listJournalByPropertyIsLoading, refetchListJournalByProperty } = useJournalByProperty({
  //   params: {
  //       option: 3,
  //       optionTerm: 1,
  //       fromDate: inputFilter.fromDate,
  //       toDate: inputFilter.toDate,
  //       // arrAccIDs: [accountID],
  //   },
  //   isFetchList: true
  // })

// console.log(listAccountWithPager)
// console.log({totalRecord})
// console.log({totalPages})

// console.log(dataS)
// console.log(listDataWithPager)
// console.log({infoAccount})
// console.log({accountID})
// console.log({departmentsID})

const handleOnChangeDate = useCallback((date, input) => {
  if (input) {
    setInputFilter((value) => ({ ...value, toDate: date }))
  } else {
    setInputFilter((value) => ({ ...value, fromDate: date }))
  }
 }, [])

  return (
    <main className="h-full">
      <header className="h-[50px] w-full border border-primary-border flex items-center justify-between px-2">
        <p className="text-lg">---Tên cơ sở được lựa chọn---</p>

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
              limit={5}
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

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border" style={{width: "3.5%"}}>
              TK
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border w-1/12">
              Mô tả
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              TỒN ĐẦU KỲ
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              NHẬP
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              XUẤT
            </th>
            <th colSpan={3} className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              TỒN CUỐI KỲ
            </th>
          </tr>
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
             
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
          {
            (listDataWithPager[pageIndex] ?? []).map((item: any, index: any) => (
              <tr key={index} className="border-b border-primary-border h-10">
                <td className="py-1 px-2 border-r border-primary-border">
                  {item.name}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                  <NavLink to={`/accounting/import-export/${item?._id}`}>
                    {item?.description}
                    </NavLink>
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                 
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                 
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                 
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                 
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                  
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                  
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                 
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                  
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                  
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                 
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                  
                 </td>
                 <td className="py-1 px-2 border-r border-primary-border">
                  
                 </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </main>
  )
}