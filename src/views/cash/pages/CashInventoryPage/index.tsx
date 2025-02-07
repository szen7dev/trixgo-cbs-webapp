import { FC, useMemo, useState, useCallback } from "react";
import { formatNumberMoney } from "utils/cmcs";
import { FilterDateGroup }  from "views/accounting/shareComponents/common";
import downloadIcon from "assets/images/icons8-download-64.svg";
import { toast } from "react-toastify";
import { createLinkAndClick } from "utils";
import {
  useProductCustom,
  useQueryListByPropertyStoreChild
} from "services/hooks/useStoreProduct";
interface Props {
  outin?: number
}

export const CashInventoryPage: FC<Props> = ({ outin }) => {
  const today = new Date()
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth()+1, 0)
  const currentMonth = new Date().getMonth()
  const [inputFilter, setInputFilter] = useState({
    fromDate: new Date(new Date().getFullYear(), currentMonth-1, 1),
    toDate: lastDayOfMonth
  })

  const {
    data,
  }: any = useQueryListByPropertyStoreChild({
    option: 2,
    fromDate: inputFilter.fromDate,
    toDate: inputFilter.toDate,
  })

  let tonDauKy = 0, nhapTrongKy = 0, xuatTrongKy = 0, tonCuoiKy = 0
  let klTonDauKy = 0, klNhapTrongKy = 0, klXuatTrongKy = 0, klTonCuoiKy = 0
  if(data && data?.data){
    for(const item of data?.data){
      tonDauKy = tonDauKy + item.kcNoDauKy + item.noDauKy - item.kcCoDauKy - item.coDauKy
      nhapTrongKy = nhapTrongKy + item.noTrongKy
      xuatTrongKy = xuatTrongKy + item.coTrongKy
      tonCuoiKy = tonCuoiKy + item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy

      klTonDauKy = klTonDauKy + item.klKcNoDauKy + item.klNoDauKy - item.klKcCoDauKy - item.klCoDauKy
      klNhapTrongKy = klNhapTrongKy + item.klNoTrongKy
      klXuatTrongKy = klXuatTrongKy + item.klCoTrongKy
      klTonCuoiKy = klTonCuoiKy + item.klKcNoDauKy + item.klNoDauKy + item.klNoTrongKy - item.klCoTrongKy- item.klKcCoDauKy - item.klCoDauKy
    }
  }

  const handleOnChangeDate = useCallback((date, input) => {
  if (input) {
    setInputFilter((value) => ({ ...value, toDate: date }))
  } else {
    setInputFilter((value) => ({ ...value, fromDate: date }))
  }
  }, [])

  
  //_____Import, export excel
  const [stateExport, setStateExport] = useState<{ isExporting: boolean }>({
      isExporting: false,
  })
  const { exportByFilterAsync } = useProductCustom();
  const handleExportByFilter = async (param: any) => {
    try {
        setStateExport({ isExporting: true });
        const { error, data } = await exportByFilterAsync({
          option: param.option,
          filterParams: {
              option: param.option,
          }
        });

        if(error) {
            return toast.warn(data?.message);
        }

        data && createLinkAndClick(data, '_self');
    } catch (error: any) {
        toast.error(error.message)
    } finally {
        setStateExport({ isExporting: false });
    }
  }

  return (
    <div>
      <div className={"filter-bar flex flex-wrap border-b py-2"}>
        <div className="flex items-center">
          <FilterDateGroup fromDate={inputFilter.fromDate} endDate={inputFilter.toDate} onChangeDate={handleOnChangeDate} />
        </div>
        <button className={"flex items-center justify-center mx-1"} onClick={() => handleExportByFilter({option: 2})}>
            Download <img src={downloadIcon} alt={"-----"} className={"ml-2 w-[18px] h-[18px]"}/>
        </button>
      </div>

      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bbg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray font-bold">
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center" style={{ width: "40px" }}>TT</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Tài khoản</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Tồn quỹ đầu kỳ</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Thu</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Chi</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Tồn quỹ cuối kỳ</th>
          </tr>
          <tr className="text-left text-sm font-bold">
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border">{formatNumberMoney(tonDauKy.toFixed(0))}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(nhapTrongKy.toFixed(0))}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(xuatTrongKy.toFixed(0))}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tonCuoiKy.toFixed(0))}</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((item: any, index: any) => (
            <tr key={index} className="border-b border-primary-border h-10">
              <td className="py-1 px-2 border-r border-primary-border">{(index + 1)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-cbs-highlight-color">
                {item?.name}-{item?.description}
                {/* <p><i>{item?._id}</i></p>
                <NavLink className="text-primary" to={`/store/detailed-report/${item?._id}`}>
                  {item?.name}
                </NavLink> */}
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
                 {formatNumberMoney(Number(item.kcNoDauKy + item.noDauKy + item.noTrongKy - item.kcCoDauKy - item.coDauKy - item.coTrongKy).toFixed(0))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}