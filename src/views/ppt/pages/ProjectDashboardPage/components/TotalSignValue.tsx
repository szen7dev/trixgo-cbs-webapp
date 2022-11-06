import { FC } from "react";

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import CashIcon from "assets/images/icons8-cash.svg";
import { useContractDashboard } from 'services/hooks/items/useContract';
import { Link } from "react-router-dom";

const TotalSignValue: FC<any> = ({ projectID ,infoProject, year}) => {
  // Giá trị ký
  const { contractAmountByMonth } = useContractDashboard({ params: { outin: 2, projectID } });

  let contractAmountByMonthAll = 0;
  contractAmountByMonth?.forEach((item: any) => {
    contractAmountByMonthAll += item?.amount;
  });
  
  const TotalInvestment = Number(infoProject?.budget+infoProject?.vatBudget);
  const percentSign = ((contractAmountByMonthAll/TotalInvestment)*100).toFixed(0);

  contractAmountByMonthAll = +(contractAmountByMonthAll / 1000000000).toFixed(3);
  return (
    <Link to={`/pm/project/${projectID}/dashboard/tab/2`} className="bg-primary-light w-1/4">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg"> Giá trị ký</p>
        <div className="flex items-center mt-4 flex-wrap">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center mr-4">
            <img src={CashIcon} alt="CashIcon" />
          </div>
          <div className="t-dashboard-sum-item-text">
            <div>
              <span className="font-bold text-2xl text-black">{contractAmountByMonthAll} tỷ </span>
              <span className="text-xs text-primary-gray">({percentSign}%)</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TotalSignValue;
