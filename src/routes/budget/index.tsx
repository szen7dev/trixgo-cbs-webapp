/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { BudgetLayout } from "views/budget/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    BudgetHomePage,
    BudgetDetailPage
} from "views/budget/pages";

const BudgetRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/budget/home"
                component={() =>
                    <BudgetLayout>
                        <BudgetHomePage />
                    </BudgetLayout>
                }
            />
            <Route
                exact
                path="/budget/home/:budgetID"
                component={() =>
                    <BudgetLayout>
                        <BudgetDetailPage />
                    </BudgetLayout>
                }
            />
            <Route path="/budget/*" component={ErrorPage} />
        </Switch>
    )
};

export default BudgetRouter;