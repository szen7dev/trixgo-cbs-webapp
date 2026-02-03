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
import { useJournalList, useJournal } from "services/hooks/accounting/useGeneralJournal";
import { useFunda } from "services/hooks/items/useFunda";
import { useContact } from "services/hooks/items/useContact";
import { toast } from "react-toastify";
import { read, utils } from 'xlsx';
import { createLinkAndClick } from "utils";

export const AccountingDashboardPage: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [pageIndex, setPageIndex] = useState(0)

  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;
  const ref = React.useRef<PaginateHandle>(null);
  const accountRef = React.useRef<DropdownHandle>(null);

  const [fundaId, setFundaId] = useState<string | null>();
  const [customerID, setCustomerID] = useState<string | null>();

  const [fundaKeyword, setFundaKeyword] = useState("");
  const [contactKeyword, setContactKeyword] = useState("");

  // const today = new Date();
  // const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0);
  // const currentMonth = new Date().getMonth()

  const [inputFilter, setInputFilter] = useState({
    keyword: '',
    fromDate: new Date(new Date().getFullYear(), 0, 1),
    toDate: new Date(new Date().getFullYear(), 11, 31)
  })

  const { list: listFunda } = useFunda({
		params: { keyword: fundaKeyword },
    isFetchList: true
	})

  const { list: listCustomer } = useContact({
		params: { keyword: contactKeyword },
    isFetchList: true
	})

  const handleOnChangeDate = useCallback((date, input) => {
    if (input) {
      setInputFilter((value) => ({ ...value, toDate: date }))
    } else {
      setInputFilter((value) => ({ ...value, fromDate: date }))
    }
  }, [])

  //_____Excel
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
    isExporting: false,
  })
  const { exportExcelAsync } = useJournal({})
  const handleExportExcel = async (param: any) => {
    try {
          setStateExport({ isExporting: true })
          const { error, data } = await exportExcelAsync({ 
              type: param.option,
              filterParams: {
                fromDate: inputFilter.fromDate,
                toDate: inputFilter.toDate,
                limit: 10,
                forward: 0,
                cancel: 0,
                fundaID: fundaId,
              }
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

  return (
    <main className="h-full">
      <header className="h-[50px] w-full flex items-center px-2">
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
              renderItem={(item) => (
                  <p className={"min-w-[300px]"}>{item.text}</p>
              )}
              selectOneByOne={true}
          />
          <DropdownSearchableV2
              ref={accountRef}
              className={"mr-1 border border-primary-border rounded-lg"}
              placeholder={"Mã khách"}
              isMultiple={false}
              allowClearValueSingleInput={true}
              data={listCustomer}
              formatItem={{
                  id: "_id",
                  text: "name",
              }}
              onSearchInputChange={debounce(
                  (valueSearch) => setContactKeyword(valueSearch),
                  500
              )}
              onClearData={() => {
                setCustomerID("");
              }}
              onchangeValue={item => {
                  setCustomerID(item._id);
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
              <div className={"text-cbs-highlight-color"}>
                  <button className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                    onClick={() => handleExportExcel({option: 1})}
                  >
                      Tải Báo Cáo Quản Trị Excel
                  </button>
              </div>
          </div>
        </header>
    </main>
  )
}