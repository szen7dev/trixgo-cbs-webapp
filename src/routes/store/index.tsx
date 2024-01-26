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
} from "views/store/pages";

const StoreRouter: FC = () => {
    return (
        <>
            <StoreLayout>
                <Switch>
                    <ProtectedRoute exact path="/store/home" component={StoreHomePage}/>
                    <ProtectedRoute exact path="/store/dashboard" component={StoreDashboardPage}/>
                    <ProtectedRoute exact path="/store/import" component={StoreImportPage}/>
                    <ProtectedRoute exact path="/store/export" component={StoreExportPage}/>
                    <ProtectedRoute exact path="/store/debt" component={StoreDebtPage}/>

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
                    
                    <ProtectedRoute exact path="/store/*" component={ErrorPage} />
                </Switch>
            </StoreLayout>
        </>
    )
};

export default StoreRouter;