import { FC } from "react";

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import CashIcon from "assets/images/icons8-cash.svg";

const TotalInvestment: FC<any> = ({ infoProject }) => {
  return (
    <div className="bg-primary-light h-full w-full">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">Tổng mức đầu tư</p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
            <img src={CashIcon} alt="CashIcon" />
          </div>
          <div className="ml-4">
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
