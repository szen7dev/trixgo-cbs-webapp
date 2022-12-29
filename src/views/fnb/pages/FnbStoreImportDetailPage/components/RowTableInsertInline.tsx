import React, { ChangeEvent, FC, useState } from "react";
import debounce from "lodash/debounce";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";
import { useGoods } from "services/hooks/items/useGoods";

type Props = {
  onInsert: (values: any) => void;
};

const RowTableInsertInline: FC<Props> = ({ onInsert }) => {
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
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Nội dung */}
        {/* <input
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          placeholder="Nhập nội dung"
          onBlur={
          debounce((e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if(!value) return;
            onInsert({ name: value })
            e.target.value = ""
          }, 700)}
        /> */}
           <td className="px-2 table-cell box-border border border-gray-300 align-middle">
            <DropdownSearchable
              placeholder="Hàng hoá nguyên vật liệu"
              onchangeValue={debounce((value: any) => {
                if (!value) return;
                onInsert({ goodsID: value.id })
                // onUpdate({ cashBookID: cashBook._id, accountID: value?.id })
              }, 500)}
              // initialValue={{
              //   // ...cashBook.account && {
              //   //   value: cashBook.account?._id,
              //   //   label: `${cashBook.account?.name}-${cashBook.account?.description}`
              //   // }
              // }}
              data={listStorages?.map(item => ({
                value: item._id,
                label: `${item.name}`
              }))}
              formatItem={{
                id: "value",
                text: "label",
              }}
              // onScroll={onScrollAccount}
              onSearchInputChange={debounce((value)=> {
                setKeyword(value);
              }, 500)}
            />
          </td>
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
    </tr>
  );
};

export default RowTableInsertInline;