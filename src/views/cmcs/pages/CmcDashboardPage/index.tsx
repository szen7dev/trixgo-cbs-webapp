import { FC, useState } from "react";
import classnames from "classnames";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import RevenueBySectorReport from "./components/RevenueBySectorReport";
import RevenueOverTimeReport from "./components/RevenueOverTimeReport";
// import { ReceivableReport } from "./components/";
// import CashFlowManagementReport from "./components/CashFlowManagementReport";
// import ProfileAndProductReport from "./components/ProfileAndProductReport";
// import CmcImagesReport from "./components/CmcImagesReport";
// import PaymentPlanReport from "./components/PaymentPlanReport";
import TotalRevenueReport from "./components/TotalRevenueReport";
import AcceptanceReport from "./components/AcceptanceReport";
import MoneyBackReport from "./components/MoneyBackReport";
// import CompanyPreviewReport from "./components/CompanyPreviewReport";
// import QuickReport from "./components/QuickReport";
// import StatusReport from "./components/StatusReport";

// import FilterIcon from "assets/images/icons8-filter.svg";

// Import data từ API
// import { useCmcs } from 'services/hooks/useCmcs';
import { useAuth } from "services/hooks/auth/useAuth";
import { useContractDashboard } from 'services/hooks/items/useContract';
import { useCmcsDashboard } from 'services/hooks/cmcs/useContractIPC';

import CustomMap from "./components/CustomMap";
import DebtChart from "./components/DebtChart";
import { AdvanceGuarantee } from "./components/AdvanceGuarantee";
import { ContractPerformanceGuarantee } from "./components/ContractPerformanceGuarantee";
import FilterDropdown from "./components/FilterDropdown";

const reportYears = [2022, 2021, 2020, 2019, 2018];

const CmcDashboardPage: FC = () => {
  const [yearSelected, setYearSelected] = useState(2022);
  const [outinSelected, setOutinSelected] = useState(1);

  // --------- Check phân quyền
  useCheckPerAccessScreen({
    appID: APP_ID.CMCS.id,
    menuID: APP_ID.CMCS.menuCmcsApp.dashboard.id,
    type: "1"
  });
  // ---------

  const { user } = useAuth();
  // const { listContracts } = useCmcs({ companyID: user?.company._id });
  // Giá trị ký
  const { contractAmountByMonth } = useContractDashboard({ params: { outin: outinSelected, year: 2022 } });
  let contractAmountByMonthAll = 0;
  contractAmountByMonth?.forEach((item: any) => {
    contractAmountByMonthAll += item?.amount;
  });

  contractAmountByMonthAll = +(contractAmountByMonthAll / 1000000000).toFixed(3);

  // Nghiệm thu
  const { cmcsContractIPCAmountByMonth, cmcsContractPaymentAmountByMonth } = useCmcsDashboard({ params: { outin: outinSelected, year: 2022 } });

  let cmcsContractIPCAmountByMonthAll = 0;
  cmcsContractIPCAmountByMonth?.forEach((item: any) => {
    cmcsContractIPCAmountByMonthAll += item?.amount;
  });
  cmcsContractIPCAmountByMonthAll = +(cmcsContractIPCAmountByMonthAll / 1000000000).toFixed(3);

  //Tiền về/Giải ngân
  let cmcsContractPaymentAmountByMonthAll = 0;
  cmcsContractPaymentAmountByMonth?.forEach((item: any) => {
    cmcsContractPaymentAmountByMonthAll += item?.amount;
  });
  cmcsContractPaymentAmountByMonthAll = +(cmcsContractPaymentAmountByMonthAll / 1000000000).toFixed(3);

  return (
    <section className=" w-full">
      <div className="sticky top-0 z-10 bg-white">
        {/* tab */}
        <div className="flex justify-between px-2">
          <div><ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
            <li className="mr-2" role="presentation">
              <button
                className={classnames("inline-block p-2 rounded-t-lg border-b-2 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500", {
                  "border-blue-600 dark:border-blue-500 text-blue-600": outinSelected === 1
                })}
                id="profile-tab" data-tabs-target="#sell" type="button" role="tab" aria-controls="profile" aria-selected={false} onClick={() => setOutinSelected(1)}>
                Bán ra
              </button>
            </li>
            <li className="mr-2" role="presentation">
              <button
                className={classnames("inline-block p-2 rounded-t-lg border-b-2 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500", {
                  "border-blue-600 dark:border-blue-500 text-blue-600": outinSelected === 2
                })}
                id="dashboard-tab" data-tabs-target="#buy" type="button" role="tab" aria-controls="dashboard" aria-selected={true} onClick={() => setOutinSelected(2)}>
                Mua vào
              </button>
            </li>
            {/* <li className="mr-2" role="presentation">
              <button className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400  dark:border-gray-700" id="settings-tab" data-tabs-target="#" type="button" role="tab" aria-controls="settings" aria-selected="false">
                Công nợ khách hàng
              </button>
            </li> */}
          </ul></div>
          <div>
            <div className=" flex items-center">
              <span className="text-primary text-sm">
                {user?.company?.name}
              </span>
              <div className="w-14 h-10 flex items-center justify-center rounded ml-2">
                <FilterDropdown />
              </div>
            </div>
          </div>
        </div>
        {/* end tab */}
        <div className="flex justify-between">
          {/* filter by year */}
          <div className={"header-table flex py-4 w-full top-0 bg-white"}>
            {reportYears.map(year => (
              <button
                key={year}
                onClick={() => setYearSelected(year)}
                className={
                  classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
                    "text-white bg-cbs-secondary border-none": yearSelected === year
                  })
                }
              >
                {year}
              </button>
            ))}
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
      </div>
      {/* content */}
      <div className="flex bg-gray-custom gap-2 justify-around p-3">
        {/* left */}
        <div className="w-3/5 flex flex-col gap-2">

          <div className="flex justify-between gap-2">
            <div className="w-1/3 border">
              <TotalRevenueReport contractAmountByMonthAll={contractAmountByMonthAll} />
            </div>
            <div className="w-1/3 border">
              <AcceptanceReport cmcsContractIPCAmountByMonthAll={cmcsContractIPCAmountByMonthAll} />
            </div>
            <div className="w-1/3 border">
              <MoneyBackReport cmcsContractPaymentAmountByMonthAll={cmcsContractPaymentAmountByMonthAll} />
            </div>
          </div>

          <div>
            {/* biểu đồ */}
            <RevenueOverTimeReport
              data={{
                contractAmountByMonth,
                cmcsContractIPCAmountByMonth,
                cmcsContractPaymentAmountByMonth,
              }}
            />
          </div>

          <div className="flex gap-2 h-[222px]">
            <div className="w-2/3">
              <RevenueBySectorReport
                year={yearSelected}
                outin={outinSelected}
                companyID={user?.company?._id}
              />
            </div>
            <div className="w-1/3 bg-primary-light px-6 py-4">
              <div className="font-bold text-primary-gray text-lg">Công nợ</div>
              <div className="w-full">
                <DebtChart
                  outin={outinSelected}
                  companyID={user?.company?._id}
                />
              </div>
            </div>
          </div>

        </div>
        {/* end left */}
        {/* right */}
        <div className="w-2/5 flex flex-col gap-2">
          {/* map */}
          <div className="h-full bg-primary-light px-6 py-4 flex	flex-col gap-4">
            <div className="font-bold text-primary-gray text-lg">Khu vực triển khai</div>
            <CustomMap />
          </div>
          {/* end map */}
          <div className="flex gap-2">
            <div className="w-1/2  h-[222px] bg-primary-light px-6 py-4">
              <div className="font-bold text-primary-gray text-lg">Bảo lãnh tạm ứng</div>
              <div>
                <AdvanceGuarantee outin={outinSelected} />
              </div>
            </div>
            <div className="w-1/2 h-[222px] bg-primary-light px-6 py-4">
              <div className="font-bold text-primary-gray text-lg">Bảo lãnh thực hiện hợp đồng</div>
              <div>
                <ContractPerformanceGuarantee outin={outinSelected} />
              </div>
            </div>
          </div>
        </div>
        {/* end right */}
      </div>
    </section>
  );
};
export default CmcDashboardPage;