/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { OperationLayoutV2 } from "views/operation/shareComponents/layoutsV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   OperationHomePage,
} from "views/operation/pages";

const OperationRouterV2: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/operation/home"
                component={() =>
                    <OperationLayoutV2>
                        <OperationHomePage />
                    </OperationLayoutV2>
                }
            />
            <Route path="/operation/*" component={ErrorPage} />
        </Switch>
    )
};

export default OperationRouterV2;