import { FC } from "react";

import ReceivableReport from "./views/dashboard/ReceivableReport";
import RevenueBySectorReport from "./views/dashboard/RevenueBySectorReport";
import RevenueOverTimeReport from "./views/dashboard/RevenueOverTimeReport";
import CashFlowManagementReport from "./views/dashboard/CashFlowManagementReport";
import ProfileAndProductReport from "./views/dashboard/ProfileAndProductReport";
import CmcImagesReport from "./views/dashboard/CmcImagesReport";
import PaymentPlanReport from "./views/dashboard/PaymentPlanReport";
import TotalRevenueReport from "./views/dashboard/TotalRevenueReport";
import MoneyBackReport from "./views/dashboard/MoneyBackReport";
import CompanyPreviewReport from "./views/dashboard/CompanyPreviewReport";
import QuickReport from "./views/dashboard/QuickReport";
import StatusReport from "./views/dashboard/StatusReport";

const CmcManagementReport: FC = () => {
  return (
    <main className="flex w-full bg-cbs-gray h-max p-3">
      <div className="w-2/3 h-full mr-">
        <CompanyPreviewReport />

        <div className="h-[176px] w-full flex mb-3">
          <div className="w-3/5 flex gap-3">
            <div className="w-1/2 flex flex-col justify-between">
              <TotalRevenueReport />
            </div>

            <div className="w-1/2 flex flex-col justify-between">
              <MoneyBackReport />
            </div>
          </div>

          <div className="w-2/5 mr-3 ml-3">
            <PaymentPlanReport />
          </div>
        </div>

        <div className="h-[222px] w-full flex mb-3">
          <div className="w-2/5 mr-3">
            <RevenueBySectorReport />
          </div>
          <div className="w-3/5 mr-3">
            <RevenueOverTimeReport />
          </div>
        </div>

        <div className="mr-3 mb-3">
          <CmcImagesReport />
        </div>

        <div className="w-full h-64 flex">
          <div className="w-3/5 mr-3">
            <CashFlowManagementReport />
          </div>

          <div className="w-1/5 mr-3">
            <ReceivableReport />
          </div>

          <div className="w-1/5 mr-3">
            <ProfileAndProductReport />
          </div>
        </div>
      </div>

      <div className="w-1/3 h-full">
        <div className="h-[640px] mb-3">
          <StatusReport />
        </div>

        <div className="bg-primary-light px-6 h-64">
          <QuickReport />
        </div>
      </div>
    </main>
  );
};

export default CmcManagementReport;
