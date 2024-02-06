/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import { ProtectedRoute } from "routes/components";

/*=====3.LAYOUTS=====*/
import { PaymentLayout } from "views/payment/shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';

import AdminFunctionalTab from "views/payment/pages/PaymentAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/payment/pages/PaymentAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/payment/pages/PaymentAdminPage/pages/AdminAuthorTab";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    PaymentHomePage,
    PaymentDashboardPage,
    PaymentPrepaidPage,
    PaymentActivityPage
} from "views/payment/pages";

const PaymentRouter: FC = () => {
    return (
        <ProtectedRoute path="/payment/:path?">
            <PaymentLayout>
                <Switch>
                    <Route path="/payment/admin">
                        <LayoutSecondary pages={[
                                { id: '1', title: 'Nhóm chức năng', path: '/payment/admin', navExact: true },
                                {
                                id: '2', title: 'Phân quyền chức năng', path: '/payment/admin/2', location: (location) => {

                                    // Get match params
                                    const match = matchPath<{ id: string }>(location.pathname, { path: '/payment/admin/:id/detail' })

                                    // Push to state
                                    return ({ pathname: '/payment/admin/2', state: match ? match.params.id : null })
                                }
                                }
                            ]}>
                            <Route exact path="/payment/admin" component={AdminFunctionalTab} />
                            <Route exact path="/payment/admin/:id/detail" component={AdminDetail} />
                            <Route exact path="/payment/admin/2" component={AdminAuthorTab} />
                        </LayoutSecondary>
                    </Route> 
                    <Route exact path="/payment/home" component={PaymentHomePage}/>
                    <Route exact path="/payment/dashboard" component={PaymentDashboardPage}/>
                    <Route exact path="/payment/prepaid" component={PaymentPrepaidPage}/>
                    <Route exact path="/payment/activity" component={PaymentActivityPage}/>
                    <Route exact path="/payment/*" component={ErrorPage} />
                </Switch>
            </PaymentLayout>
        </ProtectedRoute>
    )
}

export default PaymentRouter