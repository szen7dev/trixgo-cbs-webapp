/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { LayoutPrimary } from "shareComponents/layouts";
import { FinancialLayoutV2 } from "views/financial/sharedComponents/layoutsV2/FinancialLayout";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';

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
import FinancialAdminFunctionalTab from "views/financial/pages/FinancialAdminPage/pages/FinancialAdminFunctionalTab";
import FinancialAdminDetail from "views/financial/pages/FinancialAdminPage/pages/FinancialAdminDetail";
import FinancialAdminAuthorTab from "views/financial/pages/FinancialAdminPage/pages/FinancialAdminAuthorTab";

const FinancialRouterV2: FC = () => {
  return (
    <ProtectedRoute path="/convert/financial/:path?">
      <FinancialLayoutV2>
        <Switch>
          <Route exact path={"/convert/financial/home"} component={HomePage} />
          <Route exact path={"/convert/financial/dashboard"} component={DashboardPage} />

          <Route path="/convert/financial/(cashbook|cashbook-report|cashbook-other)">
            <LayoutPrimary
              pages={[
                { id: "1", title: "Tổng hợp quỹ", path: "/convert/financial/cashbook-report" },
                { id: "2", title: "Sổ quỹ công ty", path: "/convert/financial/cashbook" },
                { id: "3", title: "Sổ quỹ khác", path: "/convert/financial/cashbook-other" },
              ]}
            >
              <Route exact path={`/convert/financial/cashbook-report`} component={CashBookReportPage} />
              <Route exact path={`/convert/financial/cashbook`} component={CashBookPage} />
              <Route exact path={`/convert/financial/cashbook/:cashbookId`} component={CashBookDetailPage} />
              <Route exact path={`/convert/financial/cashbook-other`} component={CashBookPage} />
            </LayoutPrimary>
          </Route>

          <Route path="/convert/financial/(cashflow|cashflow-other)">
            <LayoutPrimary
              pages={[
                { id: "1", title: "Kế hoạch tài chính", path: "/convert/financial/cashflow" },
                { id: "2", title: "Kế hoạch tài chính khác", path: "/convert/financial/cashflow-other" },
              ]}
            >
              <Route exact path={"/convert/financial/cashflow"} component={CashFlowPage} />
              <Route exact path={"/convert/financial/cashflow/:cashFlowId"} component={CashFlowDetailPage} />
              <Route exact path={"/convert/financial/cashflow-other"} component={CashFlowPage} />
            </LayoutPrimary>
          </Route>

          <Route path="/convert/financial/admin">
            <LayoutSecondary pages={[
              { id: '1', title: 'Nhóm chức năng', path: '/convert/financial/admin', navExact: true },
              {
                id: '2', title: 'Phân quyền chức năng', path: '/convert/financial/admin/2', location: (location) => {
                  // Get match params
                  const match = matchPath<{ id: string }>(location.pathname, { path: '/convert/financial/admin/:id/detail' })
                  // Push to state
                  return ({ pathname: '/convert/financial/admin/2', state: match ? match.params.id : null })
                }
              }
            ]}>
              <Route exact path="/convert/financial/admin" component={FinancialAdminFunctionalTab} />
              <Route exact path="/convert/financial/admin/:id/detail" component={FinancialAdminDetail} />
              <Route exact path="/convert/financial/admin/2" component={FinancialAdminAuthorTab} />
            </LayoutSecondary>
          </Route>
        </Switch>
      </FinancialLayoutV2>
    </ProtectedRoute>
  );
};

export default FinancialRouterV2;
