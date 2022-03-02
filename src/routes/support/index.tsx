/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { SupportLayout } from "views/support/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   SupportHomePage,
} from "views/support/pages";

const SupportRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/support/home"
                component={() =>
                    <SupportLayout>
                        <SupportHomePage />
                    </SupportLayout>
                }
            />
            <Route path="/support/*" component={ErrorPage} />
        </Switch>
    )
};

export default SupportRouter;