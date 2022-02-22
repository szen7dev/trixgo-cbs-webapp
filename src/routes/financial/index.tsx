/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import ProtectedRoute from "components/common/ProtectedRoute";
import FinLayout from "views/layouts/FinLayout";

/*=====PAGES=====*/
import FinHomePage from "views/pages/financial/FinHomePage";
import FinDashboardPage from "views/pages/financial/FinDashboardPage";
import FinCashbookPage from "views/pages/financial/FinCashbookPage";
import FinancialCashFlowPage from "views/pages/financial/planning/FinancialCashFlowPage";
import FinancialPlanningDetailPage from "views/pages/financial/planning/FinancialPlanningDetailPage";

const FinancialRouter: FC = () => {
    return (
        <Route path="/fin/:path?">
            <FinLayout>
                <Switch>
                    <ProtectedRoute
                        exact
                        path={"/fin/home"}
                        component={FinHomePage}
                    />
                    <ProtectedRoute
                        // exact
                        path={"/fin/dashboard"}
                        component={FinDashboardPage}
                    />
                    <ProtectedRoute
                        // exact
                        path={"/fin/cashbook"}
                        component={FinCashbookPage}
                    />
                    <ProtectedRoute
                        exact
                        path={"/fin/cashflow"}
                        component={FinancialCashFlowPage}
                    />
                    <ProtectedRoute
                        exact
                        path={"/fin/cashflow/:id"}
                        component={FinancialPlanningDetailPage}
                    />
                </Switch>
            </FinLayout>
        </Route>
    )
};

export default FinancialRouter;