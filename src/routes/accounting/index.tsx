/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { AccountingLayout } from "views/accounting/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import { 
    AccountingDashboardPage, 
    AccountingTicketsPage,
    AccountingDetailPage,
    AccountingDiaryPage,
    AccountingInOutPage,
    AccountingDebtPage,
    AccountingVatPage,
    AccountingReportFinancePage,
    AccountingSupportToolsPage,
    AccountingTicketDetailPage,
    AccountingAdminPage,
    ReceivablesCustomers,
    ReceivablesCustomersCode,
    AccountingTBookPage,
} from "views/accounting/pages";

const AccountingRouter: FC = () => {
    return (
        <Route path="/accounting/:path?">
            <AccountingLayout>
                <Switch>
                    <Route exact path="/accounting">
                        <Redirect to="/accounting/home" />
                    </Route>
                    <ProtectedRoute
                        exact
                        path="/accounting/home"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/dashboard"
                        component={AccountingDashboardPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/accbill"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/receipt"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/payment"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/goods-import"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/goods-export"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/invoices"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/debit-note"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/credit-note"
                        component={AccountingTicketsPage}
                    />
                    <ProtectedRoute
                        exact
                        path="/accounting/home/:id"
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
                    <ProtectedRoute
                        exact
                        path="/accounting/admin"
                        component={AccountingAdminPage}
                    />
                </Switch>
            </AccountingLayout>
        </Route>
    )
};

export default AccountingRouter;