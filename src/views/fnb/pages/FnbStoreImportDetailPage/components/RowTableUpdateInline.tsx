import { UIEvent, FocusEvent, ChangeEvent, FC, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import moment from "moment";
import { convertCurrency, convertCurrencyToNumber } from "utils/converter";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";
import { useGoods } from "services/hooks/items/useGoods";
import { FNB_BOOK_PLAN, FNB_CHANNEL, FNB_BOOK_OUTIN, FNB_BOOK_TYPE, APP_ID, FNB_BOOK_STORE } from "apis/localdb";

type Props = {
  index: number,
  cashFlow: any,
  contracts: Contract[],
  onUpdate: (values: any, callback: (response: any) => void) => Promise<any>;
  onScrollContract: (e: UIEvent<HTMLDivElement>) => void;
  onSearchContract?: (keyword: string) => void;
  onChangeCheckbox: (ids: string[]) => void;
  itemsChecked: string[]
};

const RowTableUpdateInline: FC<Props> = ({ index, cashFlow, itemsChecked, onUpdate, onChangeCheckbox }) => {
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

  const [keyword, setKeyword] = useState('');
  const {
    deleteAsync,
    list: listStorages,
    hasNextPage,
    refetch,
    fetchNextPage,
    totalRecord
} = useGoods({
    params: { keyword, isListParentOfListChilds: "1" }, // Khi keyword thay đổi giá trị => API thay đổi data => refretch kết quả
    isFetchList: true
});

  return (
    <tr className="border-b border-primary-border h-10">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {index+1}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ngày tháng */}
        <input type="date" autoComplete="off" 
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          defaultValue={moment(cashFlow.date).format('YYYY-MM-DD')}
          onBlur={debounce((e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if(!value) return;

            onUpdate({ bookID: cashFlow._id, date: value }, callbackUpdate)
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {FNB_BOOK_PLAN[Number(cashFlow?.plan)-1].text}/
        {FNB_BOOK_OUTIN[Number(cashFlow?.outin)-1].text}/
        {FNB_CHANNEL[Number(cashFlow?.revenueType)-1].text}/
        {FNB_BOOK_TYPE[Number(cashFlow?.expenseType)-1].text}/
        {(cashFlow?.storeType && cashFlow?.storeType >= 1) ? FNB_BOOK_STORE[Number(cashFlow?.storeType)-1].text : ''}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
           <DropdownSearchable
              placeholder="Hàng hoá nguyên vật liệu"
              onchangeValue={debounce((value: any) => {
                if (!value) return;
                 onUpdate({ bookID: cashFlow._id, goodsID: value.id }, callbackUpdate)
              }, 500)}
              initialValue={{
                  value: cashFlow?.goods?._id,
                  label: cashFlow?.goods?.name,
              }}
              data={listStorages?.map(item => ({
                value: item._id,
                label: `${item.name}`
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              onSearchInputChange={debounce((value)=> {
                setKeyword(value);
              }, 500)}
            />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {cashFlow?.goods?.unit}
      </td>

      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
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
        {cashFlow?.userCreate?.fullname}
        <p><i>{moment(cashFlow?.createAt).format("DD/MM/YYYY HH:mm")}</i></p>
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