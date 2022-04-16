/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { LayoutPrimary } from "shareComponents/layouts";
import { FinancialLayout } from "views/financial/sharedComponents/layouts/FinancialLayout";

/*=====PAGES=====*/
import {
  CashBookPage,
  CashBookReportPage
} from 'views/financial/pages';

import FinHomePage from "views/financial/pages/FinHomePage";
import FinDashboardPage from "views/financial/pages/FinDashboardPage";
import FinCashbookPage from "views/financial/pages/FinCashbookPage";
import FinancialCashFlowPage from "views/financial/planning/FinancialCashFlowPage";
import FinancialPlanningDetailPage from "views/financial/planning/FinancialPlanningDetailPage";

const FinancialRouter: FC = () => {
  return (
    <ProtectedRoute path="/financial/:path?">
      <FinancialLayout>
        <Switch>
          <Route exact path={"/financial/home"} component={FinHomePage} />
          <Route exact path={"/financial/dashboard"} component={FinDashboardPage} />

          <Route path="/financial/cashbook">
            <LayoutPrimary
              pages={[
                { id: "1", title: "Tổng hợp quỹ", path: "/financial/cashbook-report" },
                { id: "2", title: "Sổ quỹ công ty", path: "/financial/cashbook" },
                { id: "3", title: "Sổ quỹ khác", path: "/financial/cashbook-other" },
              ]}
            >
              <Route exact path={`/financial/cashbook-report`} component={CashBookReportPage} />
              <Route exact path={`/financial/cashbook`} component={CashBookPage} />
              <Route exact path={`/financial/cashbook/:cashbookId`} component={CashBookPage} />
              <Route exact path={`/financial/cashbook-other`} component={CashBookPage} />
            </LayoutPrimary>
          </Route>

          <Route exact path={"/financial/cashflow"} component={FinancialCashFlowPage} />
          <Route exact path={"/financial/cashflow/:id"} component={FinancialPlanningDetailPage} />
        </Switch>
      </FinancialLayout>
    </ProtectedRoute>
  );
};

export default FinancialRouter;
