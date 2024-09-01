/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/
import { ProtectedRoute } from "routes/components";

/*=====3.LAYOUTS=====*/
import { StoreLayout } from "views/store/shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';

import AdminFunctionalTab from "views/store/pages/StoreAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/store/pages/StoreAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/store/pages/StoreAdminPage/pages/AdminAuthorTab";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    StoreHomePage,
    StoreDashboardPage,
    StoreImportPage,
    StoreExportPage,
    StoreDebtPage,
    StoreDetailPage,
} from "views/store/pages";

const StoreRouter: FC = () => {
    return (
        <ProtectedRoute path="/store/:path?">
            <StoreLayout>
                <Switch>
                    <Route path="/store/admin">
                        <LayoutSecondary pages={[
                            { id: '1', title: 'Nhóm chức năng', path: '/store/admin', navExact: true },
                            {
                            id: '2', title: 'Phân quyền chức năng', path: '/store/admin/2', location: (location) => {

                                // Get match params
                                const match = matchPath<{ id: string }>(location.pathname, { path: '/store/admin/:id/detail' })

                                // Push to state
                                return ({ pathname: '/store/admin/2', state: match ? match.params.id : null })
                            }
                            }
                        ]}>
                            <Route exact path="/store/admin" component={AdminFunctionalTab} />
                            <Route exact path="/store/admin/:id/detail" component={AdminDetail} />
                            <Route exact path="/store/admin/2" component={AdminAuthorTab} />
                        </LayoutSecondary>
                    </Route>
                    <Route exact path="/store/home" component={StoreHomePage}/>
                    <Route exact path="/store/dashboard" component={StoreDashboardPage}/>
                    <Route exact path="/store/import" component={StoreImportPage}/>
                    <Route
                        exact
                        path={"/store/import/:id"}
                        component={StoreDetailPage}
                    />
                    <Route exact path="/store/export" component={StoreExportPage}/>
                    <Route exact path="/store/debt" component={StoreDebtPage}/>                    
                    <Route exact path="/store/*" component={ErrorPage} />
                </Switch>
            </StoreLayout>
        </ProtectedRoute>
    )
};

export default StoreRouter;