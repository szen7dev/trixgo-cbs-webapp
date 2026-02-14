import { FC } from "react";

import { convertCurrency } from "utils/converter";
import CashFlowPlan from "typings/financial/cashFlowPlan";

type Props = {
  cashFlow: CashFlowPlan.CashFlowPlan,
};

const RowTableView: FC<Props> = ({ cashFlow }) => {
  return (
    <tr className="border-b border-primary-border h-10">
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {cashFlow.name}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {cashFlow.subtype ? cashFlow.subtype?.name : ''}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashFlow.revenue)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashFlow.expense)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashFlow.actualRevenue)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {convertCurrency(cashFlow.actualExpense)}
      </td>
      <td className="px-2 table-cell box-border border border-gray-300 align-middle">
        {cashFlow.note}
      </td>
    </tr>
  );
};

export default RowTableView;