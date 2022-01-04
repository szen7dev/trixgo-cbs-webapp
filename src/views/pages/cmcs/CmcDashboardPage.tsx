import { FC } from "react";

import ReceivableReport from "./components/views/dashboard/ReceivableReport";
import RevenueBySectorReport from "./components/views/dashboard/RevenueBySectorReport";
import RevenueOverTimeReport from "./components/views/dashboard/RevenueOverTimeReport";
import CashFlowManagementReport from "./components/views/dashboard/CashFlowManagementReport";
import ProfileAndProductReport from "./components/views/dashboard/ProfileAndProductReport";
import CmcImagesReport from "./components/views/dashboard/CmcImagesReport";
import PaymentPlanReport from "./components/views/dashboard/PaymentPlanReport";
import TotalRevenueReport from "./components/views/dashboard/TotalRevenueReport";
import MoneyBackReport from "./components/views/dashboard/MoneyBackReport";
import CompanyPreviewReport from "./components/views/dashboard/CompanyPreviewReport";
import QuickReport from "./components/views/dashboard/QuickReport";
import StatusReport from "./components/views/dashboard/StatusReport";

// Import data từ API
import { useCmcs } from 'services/hooks/useCmcs';
import { useAuth } from "services/hooks/useAuth";

const CmcManagementReport: FC = () => {
  const { user } = useAuth();
  const { listContracts } = useCmcs({ companyID: user?.company._id });
  // console.log('============>>>>>>>>>>>>>>')
  // console.log(user)
  // console.log(listContracts)

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
          <StatusReport listContracts={listContracts} />
        </div>

        <div className="bg-primary-light px-6 h-64">
          <QuickReport />
        </div>
      </div>
    </main>
  );
};

export default CmcManagementReport;
