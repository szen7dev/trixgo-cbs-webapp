/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { FinancialLayout } from "views/financial/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    FinancialHomePage,
} from "views/financial/pages";

const FinancialRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/financial/home"
                component={() =>
                    <FinancialLayout>
                        <FinancialHomePage />
                    </FinancialLayout>
                }
            />
            <Route path="/media/*" component={ErrorPage} />
        </Switch>
    )
};

export default FinancialRouter;