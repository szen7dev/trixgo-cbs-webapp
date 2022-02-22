/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====LAYOUTS=====*/
import ProtectedRoute from "components/common/ProtectedRoute";
import AccountingLayout from "views/layouts/AccountingLayout";

/*=====PAGES=====*/
import AccountingDashboardPage from "views/accounting/AccountingDashboardPage";
import AccountingTicketsPage from "views/accounting/AccountingTicketsPage";
import AccountingDetailPage from "views/accounting/AccountingDetailPage";
import AccountingDiaryPage from "views/accounting/Diary";
import AccountingInOutPage from "views/accounting/ImportExport/AccountingInOutPage";
import AccountingDebtPage from "views/accounting/Debt/AccountingDebtPage";
import AccountingVatPage from "views/accounting/VAT/AccountingVatPage";
import AccountingReportFinancePage from "views/accounting/FinanceReport/AccountingReportFinancePage";
import AccountingSupportToolsPage from "views/accounting/SupportTool/AccountingSupportToolsPage";
import AccountingTicketDetailPage from "views/accounting/AccountingTicketDetailPage";
import AccountingAdminPage from "views/accounting/admin/AccountingAdminPage";
import ReceivablesCustomers from "views/accounting/Debt/components/ReceivablesCustomers";
import ReceivablesCustomersCode from "views/accounting/Debt/components/ReceivablesCustomersCode";
import AccountingTBookPage from "views/accounting/TBook/AccountingTBookPage";

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