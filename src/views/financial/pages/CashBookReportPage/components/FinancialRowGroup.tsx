import { FC, useEffect, useRef, useState } from "react";
import classNames from "classnames";

import MenuChildRow from "views/financial/planning/components/FinancialCashFlowDetail/MenuChildRow";
import { RightClickMenuWrapper } from "shareComponents/common";
import { convertCurrency } from "utils/converter";
import { CashBookAmountByProperty } from "typings/financial/cashBook";

interface Report {
	company: {
		_id: string;
		name: string;
		sign: string;
		image: string;
		amountCashCompany: number;
		amountBankDepositsCompany: number;
	};
	cashBooks: CashBookAmountByProperty[];
}

interface Props extends Report {
  index: number;
  show: boolean;
  forceUpdateValue?: string | number;
}

const FinancialRowGroup: FC<Props> = ({ index, company, cashBooks, forceUpdateValue, show }) => {
    const [state, setState] = useState<boolean>(show);
    const wrapperRef = useRef<HTMLTableSectionElement>(null);

    useEffect(() => {
      setState(show);
    }, [show, forceUpdateValue]);

    return (
      <RightClickMenuWrapper
        contextMenu={<MenuChildRow />}
        customRenderTag={"tbody"}
        className="text-black"
      >
        <tr className="text-right">
          <th className="bg-gray-300 px-1.5 relative">
            <div
              className={classNames("absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2", {
                hidden: state,
              })}
            />
            <button
              className="relative inline-block text-white rounded bg-gray-600 w-5 h-5"
              onClick={() => setState(!state)}
            >
              {state ? "+" : "-"}
            </button>
          </th>
          <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0 text-center">
            A{index + 1}
          </th>
          <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0 text-left">
            {company.name}
          </th>
          <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">
            {convertCurrency(company.amountCashCompany)}
          </th>
          <th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">
            {convertCurrency(company.amountBankDepositsCompany)}
          </th>
        </tr>
        {cashBooks.map(({ _id: { account }, income, expense }: any, index: number) => (
          <tr key={index} className={classNames("", { hidden: state })}>
            <td className="bg-gray-300 px-1.5 py-2 relative">
              <div
                className={classNames(
                  "absolute left-1/2 bg-cbs-subtext top-0 w-[1px]",
                  index === cashBooks.length - 1 ? "h-1/2" : "h-full"
                )}
              />
              {index === cashBooks.length - 1 && (
                <div className="absolute left-1/2 bg-cbs-subtext w-1/2 top-1/2 h-[1px]" />
              )}
            </td>
            <td className="px-2.5 py-2 bg-cbs-table-header border-0.5 border-cbs-border border-l-0">
              {index + 1}
            </td>
            <td className="text-left py-2 px-3 border-0.5 border-cbs-border border-l-0">
              {account?.description}
            </td>
            <td className="text-right py-2 px-2 border-0.5 border-cbs-border border-l-0">
              {account?.name?.includes('111') && convertCurrency(income - expense)}
            </td>
            <td className="text-right py-2 px-2 border-0.5 border-cbs-border border-l-0">
              {account?.name.includes('112') && convertCurrency(income - expense)}
            </td>
          </tr>
        ))}
      </RightClickMenuWrapper>
    );
};

export default FinancialRowGroup;