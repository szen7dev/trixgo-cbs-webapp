import { FC, useMemo } from "react";
import { formatNumberMoney } from "utils";
import { useCmcsDashboard } from 'services/hooks/cmcs/useContractIPC';

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import ArrowUpBoldIcon from "assets/images/icons8-arrow-top-bold-green.svg";
import CashIcon from "assets/images/icons8-cash.svg";

const MoneyBackReport: FC <any> = ({
  cmcsContractPaymentAmountByMonthAll, cmcsContractPaymentAmountByMonth, outinSelected, yearSelected
}) => {
  const { cmcsContractPaymentAmountByMonth: cmcsContractPaymentAmountByMonthPrevious } = useCmcsDashboard({
    params: { outin: outinSelected, year: yearSelected - 1 }
  });

  const percentGrowth = useMemo(() => {
    if(!cmcsContractPaymentAmountByMonthPrevious || !cmcsContractPaymentAmountByMonthPrevious.length) return 0;
    if(!cmcsContractPaymentAmountByMonth || !cmcsContractPaymentAmountByMonth.length) return 0;

    const amountLastYear = cmcsContractPaymentAmountByMonthPrevious.reduce((total: number, item: any) =>
      total += item?.amount
    , 0)

    const amountCurrentYear = cmcsContractPaymentAmountByMonth.reduce((total: number, item: any) =>
      total += item?.amount
    , 0)

    if(amountLastYear === 0) return 0;

    const percentGrowth = (amountCurrentYear - amountLastYear) / amountLastYear * 100;

    return percentGrowth.toFixed(2);
  }, [cmcsContractPaymentAmountByMonth, cmcsContractPaymentAmountByMonthPrevious])

  return (
    <div className="bg-primary-light h-full">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">Tiền về 2021</p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
            <img src={CashIcon} alt="CashIcon" />
          </div>
          <div className="ml-4">
            <div>
              <span className="font-bold text-2xl">{formatNumberMoney(cmcsContractPaymentAmountByMonthAll)} tỷ </span>
              <span className="text-xs text-primary-gray">(62%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 bg-secondary-light flex items-center mt-1">
        <p className="w-1/2 px-5 text-primary-gray">So với cùng kỳ năm trước</p>
        <div className="w-1/2 flex justify-center items-center">
          {percentGrowth < 0 ? (
            <>
              <img src={ArrowDownBoldIcon} alt="Arrow Down" />
              <span className="text-sm text-primary-gray ml-1">{percentGrowth}%</span>
            </>
          ) : (
            <>
              <img src={ArrowUpBoldIcon} alt="Arrow Up" />
              <span className="text-sm text-primary-gray ml-1">+{percentGrowth}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoneyBackReport;
