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
            <Route path="/owner/*" component={ErrorPage} />
        </Switch>
    )
};

export default OwnerRouter;