/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { OwnerLayoutV2 } from "views/owner/shareComponents/layoutsV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    OwnerHomePage,
} from "views/owner/pages";
import { OwnerMemberPage } from "views/owner/pages/OwnerMember";
import { OwnerGrantPage } from "views/owner/pages/OwnerGrant";
import { OwnerDocsManagementPage } from "views/owner/pages/OwnerDocsManagement";
import { OwnerConfigPage } from "views/owner/pages/OwnerConfigPage";
import { OwnerPaymentPage } from "views/owner/pages/OwnerPaymentPage";
import { OwnerTrafficPage } from "views/owner/pages/OwnerTrafficPage";
import { OwnerStoragePage } from "views/owner/pages/OwnerStoragePage";
import { OwnerWorkflowPage } from "views/owner/pages/OwnerWorkflowPage";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';
import AdminFunctionalTab from "views/owner/pages/OwnerAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/owner/pages/OwnerAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/owner/pages/OwnerAdminPage/pages/AdminAuthorTab";

const OwnerRouterV2: FC = () => {
    return (
        <OwnerLayoutV2>
            <Switch>
                <Route path="/owner/admin">
                    <LayoutSecondary pages={[
                        { id: '1', title: 'Nhóm chức năng', path: '/owner/admin', navExact: true },
                        {
                        id: '2', title: 'Phân quyền chức năng', path: '/owner/admin/2', location: (location) => {
                            // Get match params
                            const match = matchPath<{ id: string }>(location.pathname, { path: '/owner/admin/:id/detail' })
                            // Push to state
                            return ({ pathname: '/owner/admin/2', state: match ? match.params.id : null })
                        }
                        }
                    ]}>
                        <Route exact path="/owner/admin" component={AdminFunctionalTab} />
                        <Route exact path="/owner/admin/:id/detail" component={AdminDetail} />
                        <Route exact path="/owner/admin/2" component={AdminAuthorTab} />
                    </LayoutSecondary>
                </Route>
                <ProtectedRoute exact path="/owner/home" component={OwnerHomePage}/>
                <ProtectedRoute exact path="/owner/members" component={OwnerMemberPage}/>
                <ProtectedRoute exact path="/owner/grant" component={OwnerGrantPage}/>
                <ProtectedRoute exact path="/owner/grant/documents-management/:appID/:companyID/:appName" component={OwnerDocsManagementPage}/>
                <ProtectedRoute exact path="/owner/payment" component={OwnerPaymentPage}/>
                <ProtectedRoute exact path="/owner/config" component={OwnerConfigPage}/>
                <ProtectedRoute exact path="/owner/traffic" component={OwnerTrafficPage}/>
                <ProtectedRoute exact path="/owner/storage" component={OwnerStoragePage}/>
                <ProtectedRoute exact path="/owner/workflow" component={OwnerWorkflowPage}/>
                <ProtectedRoute path="/owner/*" component={ErrorPage}/>
            </Switch>
        </OwnerLayoutV2>
    )
};

export default OwnerRouterV2;