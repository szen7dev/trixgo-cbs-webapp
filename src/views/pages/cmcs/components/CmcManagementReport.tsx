import { FC, useEffect } from "react";

import cn from "classnames";

import styles from "../styles.module.css";

import ReceivableReport from "./views/ReceivableReport";
import RevenueBySectorReport from "./views/RevenueBySectorReport";
import RevenueOverTimeReport from "./views/RevenueOverTimeReport";
import CashFlowManagementReport from "./views/CashFlowManagementReport";
import ProfileAndProductReport from "./views/ProfileAndProductReport";
import CmcImagesReport from "./views/CmcImagesReport";
import PaymentPlanReport from "./views/PaymentPlanReport";
import TotalRevenueReport from "./views/TotalRevenueReport";
import MoneyBackReport from "./views/MoneyBackReport";
import CompanyPreviewReport from "./views/CompanyPreviewReport";
import QuickReport from "./views/QuickReport";
import StatusReport from "./views/StatusReport";

const CmcManagementReport: FC = () => {
  useEffect(() => {
    document.title = "Trixgo - Quản lý hợp đồng";
  }, []);

  return (
    <main className={cn("flex w-full h-screen")}>
      <div className="w-3/4 h-full bg-primary-light">
        <CompanyPreviewReport />

        <div
          className={cn(
            "h-48 w-full flex",
            styles.borderLeft,
            styles.borderBottom
          )}
        >
          <div className="w-3/5 flex">
            <div
              className={cn(
                "w-1/2 flex flex-col justify-between",
                styles.borderRight
              )}
            >
              <TotalRevenueReport />
            </div>

            <div
              className={cn(
                "w-1/2 flex flex-col justify-between",
                styles.borderRight
              )}
            >
              <MoneyBackReport />
            </div>
          </div>

          <div className={cn("w-2/5 px-6 py-4", styles.borderRight)}>
            <PaymentPlanReport />
          </div>
        </div>

        <div
          className={cn(
            "h-60 w-full flex",
            styles.borderLeft,
            styles.borderBottom
          )}
        >
          <div className={cn("w-2/5 py-4 px-6", styles.borderRight)}>
            <RevenueBySectorReport />
          </div>
          <div className={cn("w-3/5 py-4 px-6", styles.borderRight)}>
            <RevenueOverTimeReport />
          </div>
        </div>

        <CmcImagesReport />

        <div
          className={cn(
            "w-full h-64 flex",
            styles.borderLeft,
            styles.borderBottom,
            styles.borderRight
          )}
        >
          <div className={cn("w-3/5 py-4 px-6", styles.borderRight)}>
            <CashFlowManagementReport />
          </div>

          <div className={cn("w-1/5 py-4 px-6", styles.borderRight)}>
            <ReceivableReport />
          </div>

          <div className="w-1/5 py-4 px-6 text-center">
            <ProfileAndProductReport />
          </div>
        </div>
      </div>

      <div className="w-1/4 h-full">
        <StatusReport />

        <div
          className={cn(
            "bg-primary-light px-6 h-64",
            styles.borderRight,
            styles.borderBottom
          )}
        >
          <QuickReport />
        </div>
      </div>
    </main>
  );
};

export default CmcManagementReport;
