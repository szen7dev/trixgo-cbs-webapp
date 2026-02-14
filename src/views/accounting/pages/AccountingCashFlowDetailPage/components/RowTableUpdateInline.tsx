import { UIEvent, FocusEvent, ChangeEvent, FC, useState } from "react";
import debounce from "lodash/debounce";
import { convertCurrency, convertCurrencyToNumber } from "utils/converter";

import { DropdownSearchable } from "shareComponents/common";
import CashFlowPlan from "typings/financial/cashFlowPlan";

type Props = {
  index: number,
  cashFlow: CashFlowPlan.CashFlowPlan,
  contracts: any,
  onUpdate: (values: any) => Promise<any>;
  onScrollContract: (e: UIEvent<HTMLDivElement>) => void;
  onSearchContract?: (keyword: string) => void;
  onChangeCheckbox: (ids: string[]) => void;
  itemsChecked: string[]
};

const RowTableUpdateInline: FC<Props> = ({ index, contracts, cashFlow, onUpdate, onScrollContract, onSearchContract }) => {
  const [values, setValues] = useState({
    revenue: `${cashFlow.revenue}`,
    expense: `${cashFlow.expense}`,
  })
  
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

            onUpdate({ cashFlowID: cashFlow._id, name: value })
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <DropdownSearchable
          onchangeValue={debounce((value: any) => {
            if(!value) return;
            onUpdate({ cashFlowID: cashFlow._id, subtypeID: value?.id })
          }, 700)}
          placeholder="Chọn"
          isMultiple={false}
          allowClearValueSingleInput={false}
          showTriangle={true}
          maxWidthInput="max-w-none"
          onScroll={onScrollContract}
          onSearchInputChange={onSearchContract}
          data={contracts.map((item: any) => ({
            value: item._id,
            label: item.name
          }))}
          initialValue={{
            value: cashFlow.subtype?._id,
            label: cashFlow.subtype?.name
          }}
          formatItem={{
            id: "value",
            text: "label",
          }}
        />
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

            onUpdate({ cashFlowID: cashFlow._id, revenue })
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

            onUpdate({ cashFlowID: cashFlow._id, expense })
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

            onUpdate({ cashFlowID: cashFlow._id, note })
          }, 700)}
        />
      </td>
    </tr>
  );
};

export default RowTableUpdateInline;