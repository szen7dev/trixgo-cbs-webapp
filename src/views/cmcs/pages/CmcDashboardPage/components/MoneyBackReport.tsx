import { FC } from "react";

import ArrowDownBoldIcon from "assets/images/icons8-arrow-down-bold-red.svg";
import CashIcon from "assets/images/icons8-cash.svg";

const MoneyBackReport: FC = () => {
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
              <span className="font-bold text-2xl">42 tỷ </span>
              <span className="text-xs text-primary-gray">(62%)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-12 bg-secondary-light flex items-center mt-1">
        <p className="w-1/2 px-5 text-primary-gray">So với cùng kỳ năm trước</p>
        <div className="w-1/2 flex justify-center items-center">
          <img src={ArrowDownBoldIcon} alt="Arrow Down" />
          <span className="text-sm text-primary-gray ml-1">-0.95%</span>
        </div>
      </div>
    </div>
  );
};

export default MoneyBackReport;
