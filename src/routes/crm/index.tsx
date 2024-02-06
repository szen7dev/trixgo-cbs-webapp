/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import { ProtectedRoute } from "routes/components";

/*=====3.LAYOUTS=====*/
import { CrmLayout } from "views/crm/shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';
import AdminFunctionalTab from "views/crm/pages/CrmAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/crm/pages/CrmAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/crm/pages/CrmAdminPage/pages/AdminAuthorTab";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    CrmHomePage,
    CrmDashboardPage,
    CrmCustomerPage,
    CrmSupportPage,
    CrmJourneyPage,
    CrmOrderPage,
    CrmAffiliatePage,
    CrmCustomerInfoPage,
    CrmBookingPage,
} from "views/crm/pages";
import { FnBHomePage } from "views/fnb/pages/FnbHomePage/index";

const CrmRouter: FC = () => {
    return (
        <ProtectedRoute path="/crm/:path?">
            <CrmLayout>
                <Switch>
                    <Route path="/crm/admin">
                        <LayoutSecondary pages={[
                                { id: '1', title: 'Nhóm chức năng', path: '/crm/admin', navExact: true },
                                {
                                id: '2', title: 'Phân quyền chức năng', path: '/crm/admin/2', location: (location) => {

                                    // Get match params
                                    const match = matchPath<{ id: string }>(location.pathname, { path: '/crm/admin/:id/detail' })

                                    // Push to state
                                    return ({ pathname: '/crm/admin/2', state: match ? match.params.id : null })
                                }
                                }
                            ]}>
                            <Route exact path="/crm/admin" component={AdminFunctionalTab} />
                            <Route exact path="/crm/admin/:id/detail" component={AdminDetail} />
                            <Route exact path="/crm/admin/2" component={AdminAuthorTab} />
                        </LayoutSecondary>          
                    </Route> 
                    <Route exact path="/crm/home" component={CrmHomePage}/>
                    <Route exact path="/crm/dashboard" component={CrmDashboardPage}/>
                    <Route exact path="/crm/customer" component={CrmCustomerPage}/>
                    <Route exact path="/crm/support" component={CrmSupportPage}/>
                    <Route exact path="/crm/journey" component={CrmJourneyPage}/>
                    <Route exact path="/crm/booking" component={CrmBookingPage}/>
                    <Route exact path="/crm/order" component={() => FnBHomePage({ type: 1})}/>
                    <Route exact path="/crm/affiliate" component={CrmAffiliatePage}/>
                    <Route exact path="/crm/customer/cid=:id" component={CrmCustomerInfoPage} />         
                    <Route exact path="/crm/*" component={ErrorPage} />
                </Switch>
            </CrmLayout>
        </ProtectedRoute>
    )
}

export default CrmRouter