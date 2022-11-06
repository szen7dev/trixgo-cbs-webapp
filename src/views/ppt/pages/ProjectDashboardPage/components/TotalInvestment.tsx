import { FC } from "react";

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import CashIcon from "assets/images/icons8-cash.svg";

const TotalInvestment: FC<any> = ({ infoProject, year }) => {
  return (
    <div className="bg-primary-light w-1/4">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">Tổng mức đầu tư</p>
        <div className="flex items-center mt-4 flex-wrap">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center mr-4">
            <img src={CashIcon} alt="CashIcon" />
          </div>
          <div className="t-dashboard-sum-item-text">
            <div>
              <span className="font-bold text-2xl text-black	">{(Number(infoProject?.budget+infoProject?.vatBudget))/1000000000} tỷ </span>
              {/* <span className="text-xs text-primary-gray">(62%)</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalInvestment;
