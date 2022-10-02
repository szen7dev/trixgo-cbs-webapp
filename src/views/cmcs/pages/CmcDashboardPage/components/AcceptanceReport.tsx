import { FC } from "react";
import {formatNumberMoney} from "utils";

import ArrowUpBoldIcon from "assets/images/icons8-arrow-top-bold-green.svg";
import MushroomIcon from "assets/images/icons8-mushroom.svg";

const AcceptanceReport: FC<any> = ({cmcsContractIPCAmountByMonthAll}) => {
  return (
    <div className="bg-primary-light h-full">
      <div className="px-6 py-4">
        <p className="font-bold text-primary-gray text-lg">
          Nghiệm thu
        </p>
        <div className="flex items-center mt-4">
          <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center">
            <img src={MushroomIcon} alt="MushroomIcon" />
          </div>
          <div className="ml-4">
            <div>
              <span className="font-bold text-2xl">{formatNumberMoney(cmcsContractIPCAmountByMonthAll)} tỷ </span>
              <span className="text-xs text-primary-gray">(68%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 bg-secondary-light flex items-center mt-1">
        <p className="w-1/2 px-5 text-primary-gray">So với cùng kỳ năm trước</p>
        <div className="w-1/2 flex justify-center items-center">
          <img src={ArrowUpBoldIcon} alt="Arrow Up" />
          <span className="text-sm text-primary-gray ml-1">+2.86%</span>
        </div>
      </div>
    </div>
  );
};

export default AcceptanceReport;
