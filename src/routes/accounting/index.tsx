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
  AccountingDebtPage,
  ReceivablesCustomers,
  ReceivablesCustomersCode,
  AccountingVatPage,
  AccountingReportFinancePage,
  AccountingSupportToolsPage,
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
        path="/accounting/:fundaID/accbill"
        component={() => <AccountingTicketsPage type={1} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/receipt"
        component={() => <AccountingTicketsPage type={2} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/payment"
        component={() => <AccountingTicketsPage type={3} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/goods-import"
        component={() => <AccountingTicketsPage type={4} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/goods-export"
        component={() => <AccountingTicketsPage type={5} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/invoices"
        component={() => <AccountingTicketsPage type={6} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/debit-note"
        component={() => <AccountingTicketsPage type={7} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/:fundaID/credit-note"
        component={() => <AccountingTicketsPage type={8} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/accbill/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/receipt/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/payment/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-import/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-export/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/invoices/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/debit-note/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/credit-note/:id"
        component={AccountingTicketDetailPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/detail/:accountID?"
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
        path="/accounting/import-export/:accountID"
        component={AccountingInOutPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/debt-tracking"
        component={AccountingDebtPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/debt-tracking/account=:id"
        component={ReceivablesCustomers}
      />
      <ProtectedRoute
        exact
        path="/accounting/debt-tracking/account/:id/customer/:id"
        component={ReceivablesCustomersCode}
      />
      <ProtectedRoute
        exact
        path="/accounting/vat"
        component={AccountingVatPage}
      />
      <ProtectedRoute
        exact
        path="/accounting/financial-report"
        component={AccountingReportFinancePage}
      />
      <ProtectedRoute
        exact
        path="/accounting/support-tools"
        component={AccountingSupportToolsPage}
      />

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
      <Route path="/accounting/*" component={ErrorPage} />
    </Switch>
  )
}
export default AccountingRouter