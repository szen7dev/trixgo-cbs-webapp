/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { OwnerLayout } from "views/owner/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    OwnerHomePage,
} from "views/owner/pages";
import { SupportGrantPage, SupportMemberPage } from "views/support/pages";

const OwnerRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/owner/home"
                component={() =>
                    <OwnerLayout>
                        <OwnerHomePage />
                    </OwnerLayout>
                }
            />
            <Route
                exact
                path="/owner/members"
                component={() =>
                    <OwnerLayout>
                        <SupportMemberPage />
                    </OwnerLayout>
                }
            />
            <Route
                exact
                path="/owner/grant"
                component={() =>
                    <OwnerLayout>
                        <SupportGrantPage />
                    </OwnerLayout>
                }
            />
            <Route path="/owner/*" component={ErrorPage} />
        </Switch>
    )
};

export default OwnerRouter;