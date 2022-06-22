import { FC } from "react";
import moment from "moment";

import { convertCurrency } from "utils/converter";
import CashFlowPlan from "typings/financial/cashFlowPlan";

type Props = {
  cashFlow: CashFlowPlan.CashFlowPlan,
};

export const RowTableView: FC<Props> = ({ cashFlow }) => {
  return (
    <tr className="border-b border-primary-border h-10">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Nội dung */}
        {cashFlow.name}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Gói thầu/Hợp đồng */}
        {cashFlow.contract ? cashFlow.contract?.name : ''}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Nhà thầu */}
        {(cashFlow.contract && cashFlow.contract.sellerInfo) ? cashFlow.contract?.sellerInfo?.name : ''}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị kế hoạch */}
        {convertCurrency(cashFlow.value)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ngày kế hoạch */}
        {cashFlow.date ? moment(cashFlow.date).format('YYYY-MM-DD') : ''}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Giá trị thực tế */}
        {convertCurrency(cashFlow.realValue)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ngày thực tế */}
        {cashFlow.realDate ? moment(cashFlow.realDate).format('YYYY-MM-DD') : ''}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Ghi chú */}
        {cashFlow.note}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {/* Độ ưu tiên */}
        {cashFlow.priority === 1 ? 'Bình thường' : 'Ưu tiên'}
      </td>
    </tr>
  );
};