import { UIEvent, FocusEvent, ChangeEvent, FC, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import moment from "moment";
import { convertCurrency, convertCurrencyToNumber } from "utils/converter";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";
import CashFlowPlan from "typings/financial/cashFlowPlan";

type Props = {
  cashFlow: CashFlowPlan.CashFlowPlan,
  contracts: Contract[],
  onUpdate: (values: any, callback: (response: any) => void) => Promise<any>;
  onScrollContract: (e: UIEvent<HTMLDivElement>) => void;
  onSearchContract?: (keyword: string) => void;
  onChangeCheckbox: (ids: string[]) => void;
  itemsChecked: string[]
};

export const RowTableUpdateInline: FC<Props> = ({
  contracts, cashFlow, itemsChecked, onUpdate, onScrollContract, onSearchContract, onChangeCheckbox
}) => {
  const [sellerName, setSellerName] = useState(cashFlow.contract?.sellerInfo?.name);
  const [values, setValues] = useState({
    value: `${cashFlow.value}`,
    realValue: `${cashFlow.realValue}`,
  })

  const callbackUpdate = (response: any) => {
    if(response.contract?.sellerInfo?.name) {
      setSellerName(response.contract?.sellerInfo?.name)
    }
  }

  const getStateCheckbox = useCallback((id: string) => {
		return itemsChecked.includes(id);
	}, [itemsChecked]);

  const handleChangeCheckbox = () => {
    const cashFlowID = cashFlow._id;
		const isChecked = itemsChecked.includes(cashFlowID);
    let idsListNew: string[] = [];

		if(isChecked) {
      idsListNew = itemsChecked.filter(item => item !== cashFlowID);
    } else {
			idsListNew = [...itemsChecked, cashFlowID];
		};

    onChangeCheckbox(idsListNew)
	};

  return (
    <tr className="border-b border-primary-border h-10">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          className="form-check-input"
          type="checkbox"
          checked={getStateCheckbox(cashFlow._id)}
          onChange={handleChangeCheckbox}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Nội dung */}
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
        {/* Gói thầu/Hợp đồng */}
        <DropdownSearchable
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
          data={contracts.map(contract => ({
            value: contract._id,
            label: contract.name
          }))}
          initialValue={{
            value: cashFlow.contract?._id,
            label: cashFlow.contract?.name
          }}
          onSearchInputChange={onSearchContract}
          formatItem={{
            id: "value",
            text: "label",
          }}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {sellerName}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị kế hoạch */}
        <input
          type="text"
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          value={convertCurrency(values.value)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, value }))
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const value = convertCurrencyToNumber(e.target.value);
            if(!value) return;

            onUpdate({ cashFlowID: cashFlow._id, value }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ngày kế hoạch */}
        <input
          type="date"
          autoComplete="off"
          defaultValue={moment(cashFlow.date).format('YYYY-MM-DD')}
          className="w-full h-[32px] outline-none"
          onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
            const date = e.target.value;
            if(!date) return;

            onUpdate({ cashFlowID: cashFlow._id, date }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị thực tế */}
        <input
          type="text"
          className="w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          value={convertCurrency(values.realValue)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const realValue = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, realValue }))
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const realValue = convertCurrencyToNumber(e.target.value);
            if(!realValue) return;

            onUpdate({ cashFlowID: cashFlow._id, realValue }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ngày thực tế */}
        <input
          type="date"
          autoComplete="off"
          defaultValue={cashFlow.realDate ? moment(cashFlow.realDate).format('YYYY-MM-DD') : ''}
          className="w-full h-[32px] outline-none"
          onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
            const realDate = e.target.value;
            if(!realDate) return;

            onUpdate({ cashFlowID: cashFlow._id, realDate }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ghi chú */}
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
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <DropdownSearchable
          onchangeValue={debounce((value: any) => {
            if(!value) return;
            onUpdate({ cashFlowID: cashFlow._id, priority: +value?.id }, callbackUpdate)
          }, 700)}
          placeholder="Độ ưu tiên"
          maxWidthInput="max-w-none"
          data={[
            { value: 1, label: 'Bình thường' },
            { value: 2, label: 'Ưu tiên' },
          ]}
          formatItem={{
            id: "value",
            text: "label",
          }}
          initialValue={{
            value: cashFlow.priority,
            label: cashFlow.priority === 1 ? 'Bình thường' : 'Ưu tiên'
          }}
          inlineSearch={true}
        />
      </td>
    </tr>
  );
};