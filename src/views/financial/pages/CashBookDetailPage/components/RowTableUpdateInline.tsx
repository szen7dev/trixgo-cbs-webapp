import { UIEvent, FocusEvent, ChangeEvent, FC, useState, useCallback } from "react";
import debounce from "lodash/debounce";
import moment from "moment";
import { convertCurrency, convertCurrencyToNumber } from "utils/converter";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";
import { CashBook } from "typings/financial/cashBook";
import { Contact } from "typings/items/contact";
import { Account } from "typings/items/account";

type Props = {
  cashBook: CashBook;
  contracts: Contract[];
  contacts: Contact[];
  accounts: Account[];
  inventory: number;
  previousInventory: number;
  onUpdate: (
    values: any,
    previousInventory?: number,
    callback?: (response: CashBook, previousInventory?: number) => void
  ) => Promise<any>;
  onScrollContract?: (e: UIEvent<HTMLDivElement>) => void;
  onScrollContact?: (e: UIEvent<HTMLDivElement>) => void;
  onScrollAccount?: (e: UIEvent<HTMLDivElement>) => void;
  onSearchContract?: (keyword: string) => void;
  onSearchContact?: (keyword: string) => void;
  onSearchAccount?: (keyword: string) => void;
  onChangeCheckbox: (ids: string[]) => void;
  itemsChecked: string[];
};

const RowTableUpdateInline: FC<Props> = ({
  contracts, contacts, accounts, cashBook, inventory, previousInventory, itemsChecked, onUpdate, onChangeCheckbox,
  onScrollContact, onScrollAccount, onScrollContract,
  onSearchContact, onSearchAccount, onSearchContract
}) => {
  const [values, setValues] = useState({
    inventory,
    expense: `${cashBook.expense}`,
    income: `${cashBook.income}`
  })

  const callbackUpdate = (response: CashBook, previousInventory?: number) => {
    if (response.income || response.expense) {
      setValues(previous => ({
        ...previous,
        inventory: ((previousInventory || 0) + response.income) - response.expense
      }))
    }
  }

  const getStateCheckbox = useCallback((id: string) => (
    itemsChecked.includes(id)
  ), [itemsChecked]);

  const handleChangeCheckbox = () => {
    const cashBookID = cashBook._id;
    const isChecked = itemsChecked.includes(cashBookID);
    let idsListNew: string[] = [];

    if (isChecked) {
      idsListNew = itemsChecked.filter(item => item !== cashBookID);
    } else {
      idsListNew = [...itemsChecked, cashBookID];
    };

    onChangeCheckbox(idsListNew)
  };

  return (
    <tr className="text-left cursor-pointer">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          className="form-check-input"
          type="checkbox"
          checked={getStateCheckbox(cashBook._id)}
          onChange={handleChangeCheckbox}
        />
      </td>
      {/* Ngày Tháng */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          type="date"
          autoComplete="off"
          defaultValue={moment(cashBook.date).format('YYYY-MM-DD')}
          className="border w-full border-primary-border rounded h-[32px] outline-none pl-1"
          onChange={debounce((e: ChangeEvent<HTMLInputElement>) => {
            const date = e.target.value;
            if (!date) return;

            onUpdate({ cashBookID: cashBook._id, date })
          }, 700)}
        />
      </td>
      {/* Nội dung */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          className="w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          defaultValue={cashBook.name}
          onBlur={debounce((e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if (!value) return;

            onUpdate({ cashBookID: cashBook._id, name: value })
          }, 700)}
        />
      </td>
      {/* Tài khoản */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <DropdownSearchable
          placeholder="Tài khoản"
          onchangeValue={debounce((value: any) => {
            if (!value) return;
            onUpdate({ cashBookID: cashBook._id, accountID: value?.id })
          }, 700)}
          initialValue={{
            ...cashBook.account && {
              value: cashBook.account?._id,
              label: `${cashBook.account?.name}-${cashBook.account?.description}`
            }
          }}
          data={accounts?.map(item => ({
            value: item._id,
            label: `${item.name}-${item.description}`
          }))}
          formatItem={{
            id: "value",
            text: "label",
          }}
          onScroll={onScrollAccount}
          onSearchInputChange={onSearchAccount}
        />
      </td>
      {/* Mã khách */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <DropdownSearchable
          placeholder="Mã khách"
          onchangeValue={debounce((value: any) => {
            if (!value) return;
            onUpdate({ cashBookID: cashBook._id, customerID: value?.id })
          }, 700)}
          initialValue={{
            ...cashBook.customer && {
              value: cashBook.customer?._id,
              label: cashBook.customer?.name
            }
          }}
          data={contacts.map(item => ({
            value: item._id,
            label: item.name
          }))}
          formatItem={{
            id: "value",
            text: "label",
          }}
          onScroll={onScrollContact}
          onSearchInputChange={onSearchContact}
        />
      </td>
      {/* Gói thầu/Hợp đồng */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <DropdownSearchable
          placeholder="Hợp đồng"
          onchangeValue={debounce((value: any) => {
            if (!value) return;
            onUpdate({ cashBookID: cashBook._id, contractID: value?.id })
          }, 700)}
          initialValue={{
            ...cashBook.contract && {
              value: cashBook.contract?._id,
              label: cashBook.contract?.name
            }
          }}
          data={contracts.map(contract => ({
            value: contract._id,
            label: contract.name
          }))}
          formatItem={{
            id: "value",
            text: "label",
          }}
          onScroll={onScrollContract}
          onSearchInputChange={onSearchContract}
        />
      </td>
      {/* Thu */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          type="text"
          className="w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          value={convertCurrency(values.income)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const income = convertCurrency(e.target.value);
            setValues(previous => ({ ...previous, income }))
          }}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const income = convertCurrencyToNumber(e.target.value);
            if (income < 0) return;

            onUpdate({ cashBookID: cashBook._id, income }, previousInventory, callbackUpdate)
          }, 700)}
        />
      </td>
      {/* Chi */}
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
            if (expense < 0) return;

            onUpdate({ cashBookID: cashBook._id, expense }, previousInventory, callbackUpdate)
          }, 700)}
        />
      </td>
      {/* Tồn */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(values.inventory)}
      </td>
      {/* Mô tả/Ghi chú */}
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        <input
          className="w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          defaultValue={cashBook.note}
          onBlur={debounce((e: FocusEvent<HTMLInputElement>) => {
            const note = e.target.value;
            if (!note) return;

            onUpdate({ cashBookID: cashBook._id, note })
          }, 700)}
        />
      </td>
    </tr>
  );
};

export default RowTableUpdateInline;