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
} from "views/crm/pages";

const CrmRouter: FC = () => {
    return (
        <>
            <CrmLayout>
                <Switch>
                    <ProtectedRoute
                    exact
                    path="/crm/home"
                    component={CrmHomePage}
                    />

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
                    
                    <ProtectedRoute exact path="/crm/*" component={ErrorPage} />
                </Switch>
            </CrmLayout>
        </>
    )
};

export default CrmRouter;