import React, { ChangeEvent, FC } from "react";
import debounce from "lodash/debounce";

import { DropdownSearchable } from "shareComponents/common";
import { Contract } from "typings/cmcs";

type Props = {
  onInsert: (values: any) => void;
};

export const RowTableInsertInline: FC<Props> = ({ onInsert }) => {
  return (
    <tr className="border-b border-primary-border h-10">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Nội dung */}
        <input
          className={
            "w-full h-full focus-visible:outline-blue-600 px-[16px] py-[9px]"
          }
          placeholder="Nhập nội dung"
          onBlur={debounce((e: React.FocusEvent<HTMLInputElement>) => {
            const value = e.target.value;
            if(!value) return;

            onInsert({ name: value })
          }, 700)}
        />
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle"></td>
    </tr>
  );
};