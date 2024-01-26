/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
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
import { OwnerTrafficPage } from "views/owner/pages/OwnerTrafficPage";
import { OwnerStoragePage } from "views/owner/pages/OwnerStoragePage";
import { OwnerWorkflowPage } from "views/owner/pages/OwnerWorkflowPage";

const OwnerRouterV2: FC = () => {
    return (
        <OwnerLayoutV2>
            <Switch>
                <ProtectedRoute exact path="/owner/home" component={OwnerHomePage}/>
                <ProtectedRoute exact path="/owner/members" component={OwnerMemberPage}/>
                <ProtectedRoute exact path="/owner/grant" component={OwnerGrantPage}/>
                <ProtectedRoute exact path="/owner/grant/documents-management/:appID/:companyID/:appName" component={OwnerDocsManagementPage}/>
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