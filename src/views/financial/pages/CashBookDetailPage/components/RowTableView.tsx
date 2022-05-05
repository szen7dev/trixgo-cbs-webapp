import { FC } from "react";
import moment from "moment";
import { convertCurrency } from "utils/converter";

import { CashBook } from "typings/financial/cashBook";

type Props = {
  cashBook: CashBook;
};

const RowTableView: FC<Props> = ({ cashBook }) => {
  return (
    <tr className="text-left cursor-pointer">
      {/* Ngày Tháng */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {cashBook.date ? moment(cashBook.date).format('YYYY-MM-DD') : ''}
      </td>
      {/* Nội dung */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {cashBook.name}
      </td>
      {/* Tài khoản */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {cashBook.account ? `${cashBook.account?.name}-${cashBook.account?.description}` : ''}
      </td>
      {/* Mã khách */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {cashBook.customer ? cashBook.customer?.name : ''}
      </td>
      {/* Gói thầu/Hợp đồng */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {cashBook.contract ? cashBook.contract?.name : ''}
      </td>
      {/* Thu */}
      <td className="px-2 py-2 min-w-[120px] table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashBook.income)}
      </td>
      {/* Chi */}
      <td className="px-2 py-2 min-w-[120px] table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashBook.expense)}
      </td>
      {/* Tồn */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashBook.previousInventory)}
      </td>
      {/* Mô tả/Ghi chú */}
      <td className="px-2 py-2 table-cell box-border border border-gray-300 align-middle">
        {cashBook.note}
      </td>
    </tr>
  );
};

export default RowTableView;