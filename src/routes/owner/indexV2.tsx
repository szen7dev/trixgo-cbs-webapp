/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

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

const OwnerRouterV2: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/owner/home"
                component={() =>
                    <OwnerLayoutV2>
                        <OwnerHomePage />
                    </OwnerLayoutV2>
                }
            />
            <Route
                exact
                path="/owner/members"
                component={() =>
                    <OwnerLayoutV2>
                        <OwnerMemberPage />
                    </OwnerLayoutV2>
                }
            />
            <Route
                exact
                path="/owner/grant"
                component={() =>
                    <OwnerLayoutV2>
                        <OwnerGrantPage />
                    </OwnerLayoutV2>
                }
            />
            <Route
                exact
                path="/owner/grant/documents-management/:appID/:companyID/:appName"
                component={() =>
                    <OwnerLayoutV2>
                        <OwnerDocsManagementPage />
                    </OwnerLayoutV2>
                }
            />
            <Route path="/owner/*" component={ErrorPage} />
        </Switch>
    )
};

export default OwnerRouterV2;