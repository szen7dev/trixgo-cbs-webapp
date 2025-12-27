/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import { ProtectedRoute } from "routes/components";

/*=====3.LAYOUTS=====*/
import { CashLayout } from "views/cash/shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';

import AdminFunctionalTab from "views/cash/pages/CashAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/cash/pages/CashAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/cash/pages/CashAdminPage/pages/AdminAuthorTab";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    CashHomePage,
    CashDashboardPage,
    CashPage,
    CashDetailedReportPage,
    CashInventoryPage,
    CashDetailPage,
    CashPageV2,
    CashDetailPageV2,
} from "views/cash/pages";

const CashRouter: FC = () => {
    return (
        <ProtectedRoute path="/cash/:path?">
            <CashLayout>
                <Switch>
                    <Route path="/cash/admin">
                        <LayoutSecondary pages={[
                            { id: '1', title: 'Nhóm chức năng', path: '/cash/admin', navExact: true },
                            {
                                id: '2', title: 'Phân quyền chức năng', path: '/cash/admin/2', location: (location) => {

                                    // Get match params
                                    const match = matchPath<{ id: string }>(location.pathname, { path: '/cash/admin/:id/detail' })

                                    // Push to state
                                    return ({ pathname: '/cash/admin/2', state: match ? match.params.id : null })
                                }
                            }
                        ]}>
                            <Route exact path="/cash/admin" component={AdminFunctionalTab} />
                            <Route exact path="/cash/admin/:id/detail" component={AdminDetail} />
                            <Route exact path="/cash/admin/2" component={AdminAuthorTab} />
                        </LayoutSecondary>
                    </Route>
                    <Route exact path="/cash/home" component={CashHomePage} />
                    <Route exact path="/cash/home/:id" component={CashDetailPage} />

                    <Route exact path="/cash/dashboard" component={CashDashboardPage} />
                    <Route exact path="/cash/inventory" component={CashInventoryPage} />
                    <Route exact path="/cash/detailed-report" component={CashDetailedReportPage} />
                    <Route exact path="/cash/detailed-report/:id" component={CashDetailedReportPage} />

                    <Route exact path="/cash/income-plan" component={() => <CashPage outin={2} type={1} />} />
                    <Route exact path="/cash/income-plan/:id" component={CashDetailPage} />
                    <Route exact path="/cash/expense-plan" component={() => <CashPage outin={1} type={1} />} />
                    <Route exact path="/cash/expense-plan/:id" component={CashDetailPage} />

                    <Route exact path="/cash/new-receipt" component={() => <CashPageV2 outin={2} type={7} />} />
                    <Route exact path="/cash/new-payment" component={() => <CashPageV2 outin={1} />} />
                    <Route exact path="/cash/new-receipt/:companyId" component={() => <CashPageV2 outin={2} type={7} />} />
                    <Route exact path="/cash/new-payment/:companyId" component={() => <CashPageV2 outin={1} />} />
                    <Route exact path="/cash/new-receipt-detail/:accountId" component={() => <CashDetailPageV2 outin={2} type={7} />} />
                    <Route exact path="/cash/new-payment-detail/:accountId" component={() => <CashDetailPageV2 outin={1} />} />

                    <Route exact path="/cash/receipt" component={() => <CashPage outin={2} type={7} />} />
                    <Route exact path="/cash/receipt/:id" component={CashDetailPage} />
                    <Route exact path="/cash/payment" component={() => <CashPage outin={1} type={7} />} />
                    <Route exact path="/cash/payment/:id" component={CashDetailPage} />

                    <Route exact path="/cash/credit" component={() => <CashPage outin={2} type={8} />} />
                    <Route exact path="/cash/credit/:id" component={CashDetailPage} />
                    <Route exact path="/cash/debit" component={() => <CashPage outin={1} type={8} />} />
                    <Route exact path="/cash/debit/:id" component={CashDetailPage} />

                    <Route exact path="/cash/*" component={ErrorPage} />
                </Switch>
            </CashLayout>
        </ProtectedRoute>
    )
};

export default CashRouter;