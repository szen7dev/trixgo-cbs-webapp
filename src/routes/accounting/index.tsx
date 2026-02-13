/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Redirect, Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import LayoutSecondary from "views/ppt/sharedComponents/layouts/LayoutSecondary";
/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
  AccountingHomePage,
  AccountingTicketsPage,
  AccountingDashboardPage,
  AccountingTicketDetailPage,
  AccountingDetailPage,
  AccountingTBookPage,
  AccountingDiaryPage,
  AccountingInOutPage,
  AccountingInOutDetailPage1,
  AccountingInOutDetailPage2,
  AccountingDebtPage,
  AccountingDebtDetailPage1,
  AccountingDebtDetailPage2,
  AccountingVatInPage,
  AccountingVatOutPage,
  AccountingBalance,
  AccountingReportFinancePage,
  AccountingSupportToolsPage,
  AccountingReportDetailPage,
  AccountingReportDetailPage2,
  AccountingCashFlowPage,
  AccountingCashFlowDetailPage,
} from "views/accounting/pages";

import {
  ItemAccountPage,
  ItemFundaPage,
  ItemWarehousePage,
  ItemGoodsPage,
  AccountingAdminAuthorTab,
  AccountingAdminDetail,
  AccountingAdminFunctionalTab
} from "views/accounting/pages/AccountingAdminPage"

const AccountingRouter: FC = () => {
  return (
    <Switch>
       <Route path="/accounting/admin">
        <LayoutSecondary
          pages={[
            { id: "1", title: "Nhóm chức năng", path: "/accounting/admin", navExact: true },
            {
              id: "2", title: 'Phân quyền nhóm chức năng', path: '/accounting/admin/2', location: (location) => {
                // Get match params
                const match = matchPath<{ id: string }>(location.pathname, { path: '/accounting/admin/:id/detail' })
                // Push to state
                return ({ pathname: '/accounting/admin/2', state: match ? match.params.id : null })
              }
            },
            { id: "3", title: "Cấu hình khác", path: "/accounting/admin/3" },
            { id: "4", title: "Tài khoản", path: "/accounting/admin/account" },
            { id: "5", title: "Đơn vị cơ sở", path: "/accounting/admin/funda" },
            { id: "6", title: "Kho bãi", path: "/accounting/admin/warehouse" },
            { id: "7", title: "Hàng hóa, nguyên liệu", path: "/accounting/admin/goods" },
          ]}
        >
          <Route exact path="/accounting/admin" component={AccountingAdminFunctionalTab} />
          <Route exact path="/accounting/admin/:id/detail" component={AccountingAdminDetail} />
          <Route exact path="/accounting/admin/2" component={AccountingAdminAuthorTab} />
          <Route exact path={`/accounting/admin/account`} component={ItemAccountPage} />
          <Route exact path={`/accounting/admin/account/:parentID`} component={ItemAccountPage} />
          <Route exact path={`/accounting/admin/funda`} component={ItemFundaPage} />
          <Route exact path={`/accounting/admin/funda/:parentID`} component={ItemFundaPage} />
          <Route exact path={`/accounting/admin/warehouse`} component={ItemWarehousePage} />
          <Route exact path={`/accounting/admin/warehouse/:parentID`} component={ItemWarehousePage} />
          <Route exact path={`/accounting/admin/goods`} component={ItemGoodsPage} />
          <Route exact path={`/accounting/admin/goods/:parentID`} component={ItemGoodsPage} />
        </LayoutSecondary>
      </Route>
      <ProtectedRoute
        exact
        path="/accounting/support-tools"
        component={AccountingSupportToolsPage}
      />
      <Route exact path="/accounting">
        <Redirect to="/accounting/home" />
      </Route>
      <ProtectedRoute exact path="/accounting/home" component={AccountingHomePage} />
      <ProtectedRoute
        exact
        path="/accounting/dashboard"
        component={AccountingDashboardPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/accbill/:fundaID?"
        component={() => <AccountingTicketsPage type={1} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/receipt/:fundaID?"
        component={() => <AccountingTicketsPage type={2} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/payment/:fundaID?"
        component={() => <AccountingTicketsPage type={3} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-import/:fundaID?"
        component={() => <AccountingTicketsPage type={4} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-export/:fundaID?"
        component={() => <AccountingTicketsPage type={5} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/invoices/:fundaID?"
        component={() => <AccountingTicketsPage type={6} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/debit-note/:fundaID?"
        component={() => <AccountingTicketsPage type={7} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/credit-note/:fundaID?"
        component={() => <AccountingTicketsPage type={8} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/accbill/detail/:id"
        component={() => <AccountingTicketDetailPage type={1} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/receipt/detail/:id"
        component={() => <AccountingTicketDetailPage type={2} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/payment/detail/:id"
        component={() => <AccountingTicketDetailPage type={3} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-import/detail/:id"
        component={() => <AccountingTicketDetailPage type={4} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-export/detail/:id"
        component={() => <AccountingTicketDetailPage type={5} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/invoices/detail/:id"
        component={() => <AccountingTicketDetailPage type={6} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/debit-note/detail/:id"
        component={() => <AccountingTicketDetailPage type={7} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/credit-note/detail/:id"
        component={() => <AccountingTicketDetailPage type={8} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/detail"
        component={AccountingDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/tbook"
        component={AccountingTBookPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/diary"
        component={AccountingDiaryPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/import-export"
        component={AccountingInOutPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/import-export/acc/:accountID"
        component={AccountingInOutDetailPage1}
      />
            <ProtectedRoute
        exact
        path="/accounting/import-export/acc/:accountID/prod/:goodsID"
        component={AccountingInOutDetailPage2}
      />
      <ProtectedRoute
        exact
        path="/accounting/debt-tracking"
        component={AccountingDebtPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/debt-tracking/acc/:accountID"
        component={AccountingDebtDetailPage1}
      />
      <ProtectedRoute
        exact
        path="/accounting/debt-tracking/acc/:accountID/cus/:contactID"
        component={AccountingDebtDetailPage2}
      />
      <ProtectedRoute
        exact
        path="/accounting/vatin"
        component={AccountingVatInPage}
      />
            <ProtectedRoute
        exact
        path="/accounting/vatout"
        component={AccountingVatOutPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-balance"
        component={AccountingBalance}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-report"
        component={AccountingReportFinancePage}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-report/:parentID"
        component={AccountingReportFinancePage}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-report/funda/revenue/:reportID"
        component={() => <AccountingReportDetailPage option={1} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-report/funda/:reportID"
        component={() => <AccountingReportDetailPage option={2} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-report/funda/:reportID/:accountID"
        component={() => <AccountingReportDetailPage2 option={3}/>}
      />
      <ProtectedRoute
        exact
        path="/accounting/cashflow"
        component={AccountingCashFlowPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/cashflow/:cashFlowId"
        component={AccountingCashFlowDetailPage}
      />
      <Route path="/accounting/*" component={ErrorPage} />
    </Switch>
  )
}

export default AccountingRouter