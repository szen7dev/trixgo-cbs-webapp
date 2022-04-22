/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { LayoutPrimary } from "shareComponents/layouts";

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

import { ItemAccountPage, ItemFundaPage, ItemWarehousePage, ItemGoodsPage } from "views/accounting/pages/AccountingAdminPage";

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
        path="/accounting/accbill"
        component={() => <AccountingTicketsPage type={1} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/receipt"
        component={() => <AccountingTicketsPage type={2} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/payment"
        component={() => <AccountingTicketsPage type={3} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-import"
        component={() => <AccountingTicketsPage type={4} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/goods-export"
        component={() => <AccountingTicketsPage type={5} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/invoices"
        component={() => <AccountingTicketsPage type={6} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/debit-note"
        component={() => <AccountingTicketsPage type={7} />}
      />
      <ProtectedRoute
        exact
        path="/accounting/credit-note"
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
        <LayoutPrimary
          pages={[
            { id: "1", title: "Nhóm chức năng", path: "/accounting/admin" },
            { id: "2", title: "Phân quyền nhóm chức năng", path: "/accounting/admin/1" },
            { id: "3", title: "Cấu hình khác", path: "/accounting/admin/2" },
            { id: "4", title: "Account", path: "/accounting/admin/account" },
            { id: "5", title: "Funda", path: "/accounting/admin/funda" },
            { id: "6", title: "Warehouse", path: "/accounting/admin/warehouse" },
            { id: "7", title: "Goods", path: "/accounting/admin/goods" },
          ]}
        >
          <Route exact path={`/accounting/admin/account`} component={ItemAccountPage} />
          <Route exact path={`/accounting/admin/account/:parentID`} component={ItemAccountPage} />
          <Route exact path={`/accounting/admin/funda`} component={ItemFundaPage} />
          <Route exact path={`/accounting/admin/funda/:parentID`} component={ItemFundaPage} />
          <Route exact path={`/accounting/admin/warehouse`} component={ItemWarehousePage} />
          <Route exact path={`/accounting/admin/warehouse/:parentID`} component={ItemWarehousePage} />
          <Route exact path={`/accounting/admin/goods`} component={ItemGoodsPage} />
          <Route exact path={`/accounting/admin/goods/:parentID`} component={ItemGoodsPage} />
        </LayoutPrimary>
      </Route>
      <Route path="/accounting/*" component={ErrorPage} />
    </Switch>
  )
}
export default AccountingRouter