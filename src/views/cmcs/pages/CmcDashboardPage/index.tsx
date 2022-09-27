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
import AcceptanceReport from "./components/AcceptanceReport";
import MoneyBackReport from "./components/MoneyBackReport";
import CompanyPreviewReport from "./components/CompanyPreviewReport";
import QuickReport from "./components/QuickReport";
import StatusReport from "./components/StatusReport";

import FilterIcon from "assets/images/icons8-filter.svg";

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
    <section className=" w-full">
      {/* tab */}
      <div className="flex justify-between px-2">
        <div><ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
          <li className="mr-2" role="presentation">
            <button className="inline-block p-2 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500" id="profile-tab" data-tabs-target="#sell" type="button" role="tab" aria-controls="profile" aria-selected="true">
              Bán ra
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400  dark:border-gray-700" id="dashboard-tab" data-tabs-target="#" type="button" role="tab" aria-controls="dashboard" aria-selected="false">
              Mua vào
            </button>
          </li>
          <li className="mr-2" role="presentation">
            <button className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400  dark:border-gray-700" id="settings-tab" data-tabs-target="#" type="button" role="tab" aria-controls="settings" aria-selected="false">
              Công nợ khách
            </button>
          </li>
        </ul></div>
        <div>
          <div className=" flex items-center">
            <span className="text-primary text-sm">
              Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
            </span>
            <div className="w-14 h-10 flex items-center justify-center rounded ml-2">
              <img src={FilterIcon} alt="Filter" />
            </div>
          </div>
        </div>
      </div>
      {/* end tab */}
      <div className="flex justify-between">
        {/* filter by year */}
        <div className={"header-table flex py-4 w-full top-0 bg-white"}>
          <button
            // onClick={() => setFilter("all")}
            className={
              "py-1 px-4 mx-2 rounded-full border border-primary-border "
              // +
              // (filter === "all"
              //   ? "text-white bg-cbs-secondary border-none"
              //   : "text-primary-gray bg-white")
            }
          >
            Tất cả
          </button>
          <button
            // onClick={() => setFilter("unread")}
            className={
              "py-1 px-4 mx-2 rounded-full border border-primary-border "
              // +
              // (filter === "unread"
              //   ? "text-white bg-cbs-secondary border-none"
              //   : "text-primary-gray bg-white")
            }
          >
            2022
          </button>
          <button
            // onClick={() => setFilter("read")}
            className={
              "py-1 px-4 mx-2 rounded-full border border-primary-border "
              // +
              // (filter === "read"
              //   ? "text-white bg-cbs-secondary border-none"
              //   : "text-primary-gray bg-white")
            }
          >
            2021
          </button>
          <button
            // onClick={() => setFilter("read")}
            className={
              "py-1 px-4 mx-2 rounded-full border border-primary-border "
              // +
              // (filter === "read"
              //   ? "text-white bg-cbs-secondary border-none"
              //   : "text-primary-gray bg-white")
            }
          >
            2020
          </button>
        </div>
        <div className="w-1/4 flex items-center">
          <div className="w-5/6 flex flex-col gap-3">
            <div className="flex justify-between text-xs">
              <div>
                <span className="text-primary-gray">Bắt đầu: </span>
                <span><b>1/1/21</b></span>
              </div>
              <div>
                <span className="text-primary-gray">Kết thúc: </span>
                <span><b>31/12/21</b></span>
              </div>
            </div>

            <div className="w-full border h-2">
              <div
                className="bg-primary"
                style={{ width: "82%", marginTop: -0.25, height: 7 }}
              ></div>
            </div>
          </div>

          <p className="w-1/6 text-primary text-sm px-4 pt-3">82%</p>
        </div>
      </div>
      {/* end filter by year */}
      {/* content */}
      <div className="flex bg-gray-custom gap-2 justify-around p-3">
        {/* left */}
        <div className="w-3/5 flex flex-col gap-2">

          <div className="flex justify-between gap-2">
            <div className="w-1/3 border	"><TotalRevenueReport /></div>
            <div className="w-1/3 border	"><AcceptanceReport /></div>
            <div className="w-1/3 border	"><MoneyBackReport /></div>
          </div>

          <div className="">
            {/* biểu đồ */}
            <RevenueOverTimeReport/>
          </div>

          <div className="flex gap-2">
            <div className="w-2/3">
              <RevenueBySectorReport />
            </div>
            <div className="w-1/3">
              công nợ
            </div>
          </div>

        </div>
        {/* end left */}
        {/* right */}
        <div className="w-2/5 flex flex-col gap-2">
          {/* map */}
          <div className="h-40">map here</div>
          {/* end map */}
          <div className="flex gap-2">
            <div className="w-1/2 h-40">Bảo lãnh tạm ứng</div>
            <div className="w-1/2 h-40">Bảo lãnh thực hiện hợp đồng</div>
          </div>
        </div>
        {/* end right */}
      </div>
    </section>
  );
};
export default CmcDashboardPage;