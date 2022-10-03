import { FC } from "react";

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import CashIcon from "assets/images/icons8-cash.svg";
import { useCmcsDashboard } from 'services/hooks/cmcs/useContractIPC';
import { useContractDashboard } from 'services/hooks/items/useContract';

const TotalAcceptance: FC<any> = ({ projectID }) => {
   // Nghiệm thu
   const { cmcsContractIPCAmountByMonth } = useCmcsDashboard({ params: { outin: 2, projectID } });

   let cmcsContractIPCAmountByMonthAll = 0;
   cmcsContractIPCAmountByMonth?.forEach((item: any) => {
     cmcsContractIPCAmountByMonthAll += item?.amount;
   });

   // Giá trị ký
   const { contractAmountByMonth } = useContractDashboard({ params: { outin: 2, projectID } });

   let contractAmountByMonthAll = 0;
   contractAmountByMonth?.forEach((item: any) => {
     contractAmountByMonthAll += item?.amount;
   });

   const percentAcceptance = ((cmcsContractIPCAmountByMonthAll/contractAmountByMonthAll)*100).toFixed(0)
   cmcsContractIPCAmountByMonthAll = +(cmcsContractIPCAmountByMonthAll / 1000000000).toFixed(3);

  return (
    <div className="bg-primary-light h-full w-full">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">Nghiệm thu</p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
            <img src={CashIcon} alt="CashIcon" />
          </div>
          <div className="ml-4">
            <div>
              <span className="font-bold text-2xl text-black	">{cmcsContractIPCAmountByMonthAll} tỷ </span>
              <span className="text-xs text-primary-gray">({percentAcceptance}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAcceptance;
