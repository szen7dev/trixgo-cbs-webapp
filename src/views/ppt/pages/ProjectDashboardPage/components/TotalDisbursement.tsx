import { FC } from "react";

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import CashIcon from "assets/images/icons8-cash.svg";
import { useCmcsDashboard } from 'services/hooks/cmcs/useContractIPC';

const TotalDisbursement: FC<any> = ({ projectID }) => {

  //Tiền về/Giải ngân
  const { cmcsContractPaymentAmountByMonth } = useCmcsDashboard({ params: { outin: 2, projectID } });
  let cmcsContractPaymentAmountByMonthAll = 0;
  cmcsContractPaymentAmountByMonth?.forEach((item: any) => {
    cmcsContractPaymentAmountByMonthAll += item?.amount;
  });

  // Nghiệm thu
  const { cmcsContractIPCAmountByMonth } = useCmcsDashboard({ params: { outin: 2, projectID } });
  let cmcsContractIPCAmountByMonthAll = 0;
  cmcsContractIPCAmountByMonth?.forEach((item: any) => {
    cmcsContractIPCAmountByMonthAll += item?.amount;
  });

  const percentDisbursement = ((cmcsContractPaymentAmountByMonthAll/cmcsContractIPCAmountByMonthAll)*100).toFixed(0);
  cmcsContractPaymentAmountByMonthAll = +(cmcsContractPaymentAmountByMonthAll / 1000000000).toFixed(3);

  return (
    <div className="bg-primary-light h-full w-full">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">Giải ngân</p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
            <img src={CashIcon} alt="CashIcon" />
          </div>
          <div className="ml-4">
            <div>
              <span className="font-bold text-2xl text-black	">{cmcsContractPaymentAmountByMonthAll} tỷ </span>
              <span className="text-xs text-primary-gray">({percentDisbursement}%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalDisbursement;
