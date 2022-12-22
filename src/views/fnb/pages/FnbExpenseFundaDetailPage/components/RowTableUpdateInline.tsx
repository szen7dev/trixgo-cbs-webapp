import { UIEvent, FocusEvent, ChangeEvent, FC, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import moment from "moment";
import { convertCurrency, convertCurrencyToNumber } from "utils/converter";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";
import CashFlowPlan from "typings/financial/cashFlowPlan";

type Props = {
  index: number,
  // cashFlow: CashFlowPlan.CashFlowPlan,
  cashFlow: any,
  contracts: Contract[],
  onUpdate: (values: any, callback: (response: any) => void) => Promise<any>;
  onScrollContract: (e: UIEvent<HTMLDivElement>) => void;
  onSearchContract?: (keyword: string) => void;
  onChangeCheckbox: (ids: string[]) => void;
  itemsChecked: string[]
};

const RowTableUpdateInline: FC<Props> = ({ index, contracts, cashFlow, itemsChecked, onUpdate, onScrollContract, onSearchContract, onChangeCheckbox }) => {
  const [sellerName, setSellerName] = useState(cashFlow.contract?.sellerInfo?.name);
  const [values, setValues] = useState({
    value: `${cashFlow.value}`,
    realValue: `${cashFlow.realValue}`,
  })

  const [quantity, setQuantity] = useState<any>(cashFlow.quantity);
  const [unitPrice, setUnitPrice] = useState<any>(cashFlow.unitPrice);

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
        {index+1}
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

            onUpdate({ bookID: cashFlow._id, name: value }, callbackUpdate)
          }, 700)}
        />
      </td>
   
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị kế hoạch */}
        <input
          type="number"
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          defaultValue={cashFlow.quantity}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, value }))
            setQuantity(e.target.value);
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const value = convertCurrencyToNumber(e.target.value);
            if(!value) return;

            onUpdate({ bookID: cashFlow._id, quantity: +value, unitPrice:+unitPrice }, callbackUpdate)
          }, 700)}
        />
      </td>

      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị kế hoạch */}
        <input
          type="number"
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px] text-right"
          }
          defaultValue={cashFlow.unitPrice}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const value = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, value }))
            setUnitPrice(e.target.value);
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const value = convertCurrencyToNumber(e.target.value);
            if(!value) return;

            onUpdate({ bookID: cashFlow._id, unitPrice: +value, quantity:+quantity }, callbackUpdate)
          }, 500)}
        />
      </td>
      
      <td className="px-2 table-cell box-border border border-gray-300 align-middle text-right">
        {convertCurrency(cashFlow?.amount)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {cashFlow?.userCreate?.fullname} {moment(cashFlow?.createAt).format("L")} {moment(cashFlow?.createAt).format("LT") }
      </td>
      
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị kế hoạch */}
        <input
          type="text"
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          defaultValue={cashFlow.note}
          onBlur={debounce((e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if(!value) return;

            onUpdate({ bookID: cashFlow._id, note: value }, callbackUpdate)
          }, 500)}
        />
      </td>
    </tr>
  );
};

export default RowTableUpdateInline;