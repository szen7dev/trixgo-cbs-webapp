/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ReeLayoutV2 } from "views/ree/shareComponents/layoutsV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   ReeHomePage,
} from "views/ree/pages";

const ReeRouterV2: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/ree/home"
                component={() =>
                    <ReeLayoutV2>
                        <ReeHomePage />
                    </ReeLayoutV2>
                }
            />
            <Route path="/ree/*" component={ErrorPage} />
        </Switch>
    )
};

export default ReeRouterV2;