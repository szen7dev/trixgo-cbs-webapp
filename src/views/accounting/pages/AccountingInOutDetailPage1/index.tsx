import { FC, useCallback, useState } from "react";
import { NavLink, useParams } from "react-router-dom"
import DotsVerticalIcon from "assets/icons/DotsVertical";
import Close from "assets/icons/Close";
import cn from "classnames";
import styles from 'views/accounting/styles/styles.module.css';
import { formatNumberMoney } from "utils/cmcs";
import {
  FilterDateGroup
} from "views/accounting/shareComponents/common";
import {
  useJournalByProperty
} from "services/hooks/accounting/useGeneralJournal";

export const AccountingInOutDetailPage1: FC = () => {
  const [showOption, setShowOption] = useState(false)
  const [inputFilter, setInputFilter] = useState({ keyword: '', fromDate: new Date(new Date().getFullYear(), 0, 1), toDate: new Date(new Date().getFullYear(), 11, 31) });
 
  const params: any = useParams();

  const { listJournalByProperty: dataAll } = useJournalByProperty({
    params: {
        option: 9,
        optionTerm: 1,
        fromDate: inputFilter.fromDate,
        toDate: inputFilter.toDate,
        arrAccIDs: [params.accountID]
    },
    isFetchList: true
  })

  let tonDauKy = 0, nhapTrongKy = 0, xuatTrongKy = 0, tonCuoiKy = 0

  if(dataAll && dataAll?.arrCombine){
    for(const item of dataAll?.arrCombine){
      tonDauKy = tonDauKy + item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy
      nhapTrongKy = nhapTrongKy + item.noTrongKy
      xuatTrongKy = xuatTrongKy + item.coTrongKy
      tonCuoiKy = tonCuoiKy + item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy
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
        </div>
        
      </header>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray">
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Sản phẩm, nguyên liệu
            </th>
            <th className="py-1 px-2 font-normal border-r border-primary-border">
              Đơn vị
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Tồn đầu kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Nhập trong kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Xuất trong kỳ
            </th>
            <th className="px-2 font-normal border-r border-l border-b border-primary-border text-center">
              Tồn cuối kỳ
            </th>
          </tr>
        </thead>

        <tbody className="">
          { 
            dataAll?.arrCombine.map((item: any, index: any) => (
              <tr key={index} className="border-b border-primary-border h-10">
                <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                  <NavLink to={`/accounting/import-export/${item?._id}`}>
                    {item.name}
                  </NavLink>
                </td>
                <td className="py-1 px-2 border-r border-primary-border">
                    {item?.unit}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.noTrongKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.coTrongKy))}
                </td>
                <td className="py-1 px-2 border-r border-primary-border text-right">
                  {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy))}
                </td>
              </tr>
            ))
          }

            <tr className={cn(
              "border-b border-primary-border h-10 font-bold",
              styles.bgFooterYellow
            )}>
              <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                Tổng
              </td>
              <td className="py-1 px-2 border-r border-primary-border">
                  
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(tonDauKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(nhapTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(xuatTrongKy)}
              </td>
              <td className="py-1 px-2 border-r border-primary-border text-right">
                {formatNumberMoney(tonCuoiKy)}
              </td>
            </tr>
        </tbody>
      </table>
    </main>
  )
}