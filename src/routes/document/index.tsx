/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====LAYOUTS=====*/

/*=====PAGES=====*/
import { DocumentDashboardPage, DocumentHomePage } from 'views/document/pages';

import ErrorPage from 'views/authentication/Error';
import { ProtectedRoute } from "routes/components";
import LayoutSecondary from "views/document/sharedComponents/layouts/LayoutSecondary";
import DocumentAdminFunctionalTab from "views/document/pages/DocumentAdminPage/pages/DocumentAdminFunctionalTab";
import DocumentAdminDetail from "views/document/pages/DocumentAdminPage/pages/DocumentAdminDetail";
import DocumentAdminAuthorTab from "views/document/pages/DocumentAdminPage/pages/DocumentAdminAuthorTab";

const DocumentRouter: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                exact
                path="/document/home"
                component={DocumentHomePage}
            />
            <ProtectedRoute
                exact
                path="/document/dashboard"
                component={DocumentDashboardPage}
            />
            <ProtectedRoute
                path="/document/admin"
                component={() => (
                    <Switch>
                        <Route path="/document/admin">
                            <LayoutSecondary pages={[
                                { id: '1', title: 'Nhóm chức năng', path: '/document/admin', navExact: true },
                                {
                                    id: '2', title: 'Phân quyền chức năng', path: '/document/admin/2', location: (location) => {
                                        // Get match params
                                        const match = matchPath<{ id: string }>(location.pathname, { path: '/document/admin/:id/detail' })
                                        // Push to state
                                        return ({ pathname: '/document/admin/2', state: match ? match.params.id : null })
                                    }
                                }
                            ]}>
                                <Route exact path="/document/admin" component={DocumentAdminFunctionalTab} />
                                <Route exact path="/document/admin/:id/detail" component={DocumentAdminDetail} />
                                <Route exact path="/document/admin/2" component={DocumentAdminAuthorTab} />
                            </LayoutSecondary>
                        </Route>
                    </Switch>
                )}
            />
            <Route path="/document/*" component={ErrorPage} />
        </Switch>
    )
};

export default DocumentRouter;