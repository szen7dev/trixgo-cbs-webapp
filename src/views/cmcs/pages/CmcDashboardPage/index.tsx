import { FC } from "react";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { ReceivableReport } from "./components/";
import RevenueBySectorReport from "./components/RevenueBySectorReport";
import RevenueOverTimeReport from "./components/RevenueOverTimeReport";
import CashFlowManagementReport from "./components/CashFlowManagementReport";
import ProfileAndProductReport from "./components/ProfileAndProductReport";
import CmcImagesReport from "./components/CmcImagesReport";
import PaymentPlanReport from "./components/PaymentPlanReport";
import TotalRevenueReport from "./components/TotalRevenueReport";
import MoneyBackReport from "./components/MoneyBackReport";
import CompanyPreviewReport from "./components/CompanyPreviewReport";
import QuickReport from "./components/QuickReport";
import StatusReport from "./components/StatusReport";

// Import data từ API
import { useCmcs } from 'services/hooks/useCmcs';
import { useAuth } from "services/hooks/auth/useAuth";
const CmcDashboardPage: FC = () => {

  // --------- Check phân quyền
  useCheckPerAccessScreen({
    appID: APP_ID.CMCS.id,
    menuID: APP_ID.CMCS.menuCmcsApp.dashboard.id,
    type: "1"
  });
  // ---------

  const { user } = useAuth();
  const { listContracts } = useCmcs({ companyID: user?.company._id });

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
        <div className="h-[640px] overflow-scroll mb-3 bg-primary-light">
          <StatusReport listContracts={listContracts} />
        </div>

        <div className="bg-primary-light px-6 h-64">
          <QuickReport />
        </div>
      </div>
    </main>
  );
};
export default CmcDashboardPage;