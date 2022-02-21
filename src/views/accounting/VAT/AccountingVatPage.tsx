import { FC, useState } from "react";

import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import VATTab from "./tabs/VATTab";

import ThreeDotVerticalIcon from "assets/images/icon-3dots-vertical-gray.svg";

const AccountingVatPage: FC = () => {
  const [toggleTab, setToggleTab] = useState(1);

  const handleToggleTab = (index: number) => {
    setToggleTab(index);
  };

  return (
    <main className="w-full h-full">
      <div className="sticky flex justify-between items-center top-0 bg-primary-light z-10 h-10 px-6">
        <div className="h-full">
          <button
            className={
              toggleTab === 1
                ? "w-auto h-full py-2 px-4 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full py-2 px-4 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(1)}
          >
            Bảng kê mua vào
          </button>
          <button
            className={
              toggleTab === 2
                ? "w-auto h-full py-2 px-4 font-bold text-sm border-b-2 border-primary"
                : "w-auto h-full py-2 px-4 text-sm text-primary-gray"
            }
            onClick={() => handleToggleTab(2)}
          >
            Bảng kê bán ra
          </button>
        </div>

        <div className="flex items-center">
          <p className="text-primary mr-3">From 1/1/2021 - To 31/12/202</p>
          <FinancialCashFlowFilterButton />
          <div className="w-9 h-9 ml-3 bg-cbs-gray rounded-full flex items-center justify-center cursor-pointer hover:bg-accent-light">
            <img src={ThreeDotVerticalIcon} alt="Three Dot" />
          </div>
        </div>
      </div>

      <VATTab toggleTab={toggleTab} />
    </main>
  );
};

export default AccountingVatPage;
