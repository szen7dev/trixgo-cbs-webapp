/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { LayoutPrimary } from "shareComponents/layouts";
import { FinancialLayout } from "views/financial/sharedComponents/layouts/FinancialLayout";

/*=====PAGES=====*/
import {
  DashboardPage,
  HomePage,
  CashFlowPage,
  CashFlowDetailPage,
  CashBookPage,
  CashBookDetailPage,
  CashBookReportPage
} from 'views/financial/pages';

const FinancialRouter: FC = () => {
  return (
    <ProtectedRoute path="/financial/:path?">
      <FinancialLayout>
        <Switch>
          <Route exact path={"/financial/home"} component={HomePage} />
          <Route exact path={"/financial/dashboard"} component={DashboardPage} />

          <Route path="/financial/(cashbook|cashbook-report|cashbook-other)">
            <LayoutPrimary
              pages={[
                { id: "1", title: "Tổng hợp quỹ", path: "/financial/cashbook-report" },
                { id: "2", title: "Sổ quỹ công ty", path: "/financial/cashbook" },
                { id: "3", title: "Sổ quỹ khác", path: "/financial/cashbook-other" },
              ]}
            >
              <Route exact path={`/financial/cashbook-report`} component={CashBookReportPage} />
              <Route exact path={`/financial/cashbook`} component={CashBookPage} />
              <Route exact path={`/financial/cashbook/:cashbookId`} component={CashBookDetailPage} />
              <Route exact path={`/financial/cashbook-other`} component={CashBookPage} />
            </LayoutPrimary>
          </Route>

          <Route exact path={"/financial/cashflow"} component={CashFlowPage} />
          <Route exact path={"/financial/cashflow/:cashFlowId"} component={CashFlowDetailPage} />
        </Switch>
      </FinancialLayout>
    </ProtectedRoute>
  );
};

export default FinancialRouter;
