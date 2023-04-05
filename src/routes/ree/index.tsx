/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ReeLayout } from "views/ree/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   ReeHomePage,
} from "views/ree/pages";

const ReeRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/ree/home"
                component={() =>
                    <ReeLayout>
                        <ReeHomePage />
                    </ReeLayout>
                }
            />
            <Route path="/ree/*" component={ErrorPage} />
        </Switch>
    )
};

export default ReeRouter;