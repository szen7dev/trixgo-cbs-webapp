import { UIEvent, FocusEvent, ChangeEvent, FC, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import moment from "moment";
import { convertCurrency, convertCurrencyToNumber } from "utils/converter";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";
import CashFlowPlan from "typings/financial/cashFlowPlan";

type Props = {
  index: number,
  cashFlow: CashFlowPlan.CashFlowPlan,
  contracts: Contract[],
  onUpdate: (values: any, callback: (response: any) => void) => Promise<any>;
  onScrollContract: (e: UIEvent<HTMLDivElement>) => void;
  onSearchContract?: (keyword: string) => void;
  onChangeCheckbox: (ids: string[]) => void;
  itemsChecked: string[]
};

const RowTableUpdateInline: FC<Props> = ({ index, contracts, cashFlow, onUpdate, onScrollContract, onSearchContract, onChangeCheckbox }) => {
  const [sellerName, setSellerName] = useState(cashFlow.contract?.sellerInfo?.name);
  const [values, setValues] = useState({
    revenue: `${cashFlow.revenue}`,
    expense: `${cashFlow.expense}`,
  })

  const callbackUpdate = (response: any) => {
    if(response.contract?.sellerInfo?.name) {
      setSellerName(response.contract?.sellerInfo?.name)
    }
  }
  
  return (
    <tr className="border-b border-primary-border h-10">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {index}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          defaultValue={cashFlow.name}
          onBlur={debounce((e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if(!value) return;

            onUpdate({ cashFlowID: cashFlow._id, name: value }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* <DropdownSearchable
          onchangeValue={debounce((value: any) => {
            if(!value) return;
            onUpdate({ cashFlowID: cashFlow._id, contractID: value?.id }, callbackUpdate)
          }, 700)}
          placeholder="Hợp đồng"
          isMultiple={false}
          allowClearValueSingleInput={false}
          showTriangle={true}
          maxWidthInput="max-w-none"
          onScroll={onScrollContract}
          onSearchInputChange={onSearchContract}
          data={contracts.map(contract => ({
            value: contract._id,
            label: contract.name
          }))}
          initialValue={{
            value: cashFlow.contract?._id,
            label: cashFlow.contract?.name
          }}
          formatItem={{
            id: "value",
            text: "label",
          }}
        /> */}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          type="text"
          className="w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          value={convertCurrency(values.revenue)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const revenue = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, revenue }))
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const revenue = convertCurrencyToNumber(e.target.value);
            if(!revenue) return;

            onUpdate({ cashFlowID: cashFlow._id, revenue }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          type="text"
          className="w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          value={convertCurrency(values.expense)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const expense = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, expense }))
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const expense = convertCurrencyToNumber(e.target.value);
            if(!expense) return;

            onUpdate({ cashFlowID: cashFlow._id, expense }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashFlow.actualRevenue)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashFlow.actualExpense)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          defaultValue={cashFlow.note}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const note = e.target.value;
            if(!note) return;

            onUpdate({ cashFlowID: cashFlow._id, note }, callbackUpdate)
          }, 700)}
        />
      </td>
    </tr>
  );
};

export default RowTableUpdateInline;