/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { OperationLayout } from "views/operation/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   OperationHomePage,
} from "views/operation/pages";

const OperationRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/operation/home"
                component={() =>
                    <OperationLayout>
                        <OperationHomePage />
                    </OperationLayout>
                }
            />
            <Route path="/operation/*" component={ErrorPage} />
        </Switch>
    )
};

export default OperationRouter;