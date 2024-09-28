import React, { FC, useMemo } from "react";
import { formatNumberMoney } from "utils/cmcs";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { DropdownSearchableV2 } from "shareComponents/common";
import {
  useQueryListByPropertyStoreChild
} from "services/hooks/useStoreProduct";
interface Props {
  outin?: number
  // type?: number
}

export const CashInventoryPage: FC<Props> = ({ outin }) => {
  type PaginateHandle = React.ElementRef<typeof PaginateV2>;
  type DropdownHandle = React.ElementRef<typeof DropdownSearchableV2>;

  const {
    data,
  }: any = useQueryListByPropertyStoreChild({
    option: 2
  })

  const { tongNhap, tongXuat, tongTon } = useMemo(() => {
    let tongNhap = 0, tongXuat = 0, tongTon = 0

    if(data?.data && data.data.length) { 
      for(const item of data?.data){
        tongNhap = Number(tongNhap) + Number(item.income)
        tongXuat = Number(tongXuat) + Number(item.expense)
      }
      tongTon = tongNhap - tongXuat
    }
    
    return { tongNhap, tongXuat, tongTon }
  }, [data?.data])

  return (
    <div>
      <table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
        <thead className="bbg-cbs-table-header h-10 border-b border-primary-border">
          <tr className="text-left text-sm text-primary-gray font-bold">
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center" style={{ width: "40px" }}>TT</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Tài khoản</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Thu</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Chi</th>
            <th className="py-1 px-2 border-r border-l border-b border-primary-border text-center">Tồn</th>
          </tr>
          <tr className="text-left text-sm font-bold">
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border"></th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tongNhap)}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tongXuat)}</th>
            <th className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(tongTon)}</th>
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
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.income)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.expense)}</td>
              <td className="py-1 px-2 border-r border-primary-border text-right">{formatNumberMoney(item?.income - item?.expense)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}