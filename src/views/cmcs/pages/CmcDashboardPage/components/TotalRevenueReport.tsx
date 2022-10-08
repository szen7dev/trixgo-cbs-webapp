import { FC, useMemo } from "react";
import { formatNumberMoney } from "utils";
import { useContractDashboard } from 'services/hooks/items/useContract';

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import ArrowUpBoldIcon from "assets/images/icons8-arrow-top-bold-green.svg";
import MushroomIcon from "assets/images/icons8-mushroom.svg";

const TotalRevenueReport: FC<any> = ({
  contractAmountByMonthAll, contractAmountByMonth, outinSelected, yearSelected
}) => {
  const { contractAmountByMonth: contractAmountPrevious } = useContractDashboard({
    params: { outin: outinSelected, year: yearSelected - 1 }
  });

  const percentGrowth = useMemo(() => {
    if(!contractAmountPrevious || !contractAmountPrevious.length) return 0;
    if(!contractAmountByMonth || !contractAmountByMonth.length) return 0;

    const amountLastYear = contractAmountPrevious.reduce((total: number, item: any) =>
      total += item?.amount
    , 0)

    const amountCurrentYear = contractAmountByMonth.reduce((total: number, item: any) =>
      total += item?.amount
    , 0)

    if(amountLastYear === 0) return 0;

    const percentGrowth = (amountCurrentYear - amountLastYear) / amountLastYear * 100;

    return percentGrowth.toFixed(2);
  }, [contractAmountByMonth, contractAmountPrevious])

  return (
    <div className="bg-primary-light h-full">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">
          Giá trị ký
        </p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
            <img src={MushroomIcon} alt="MushroomIcon" />
          </div>
          <div className="ml-4">
            <div>
              <span className="font-bold text-2xl">{formatNumberMoney(contractAmountByMonthAll)} tỷ </span>
              <span className="text-xs text-primary-gray">({percentGrowth}%)</span>
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

export default TotalRevenueReport;
