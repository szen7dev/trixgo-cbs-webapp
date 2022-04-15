/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { FinancialLayout } from "views/financial/sharedComponents/layouts/FinancialLayout";

/*=====PAGES=====*/
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
          <Route exact path={"/financial/cashbook"} component={FinCashbookPage} />
          <Route exact path={"/financial/cashflow"} component={FinancialCashFlowPage} />
          <Route exact path={"/financial/cashflow/:id"} component={FinancialPlanningDetailPage} />
        </Switch>
      </FinancialLayout>
    </ProtectedRoute>
  );
};

export default FinancialRouter;
