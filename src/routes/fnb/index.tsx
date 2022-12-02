/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { InspectionLayout } from "views/inspection/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    InspectionHomePage,
} from "views/inspection/pages";
import { FnBLayout } from "views/fnb/shareComponents/layouts/FnBLayout";
import { FnBHomePage } from "views/fnb/pages/FnbHomePage/index";
import { FnBProductPage } from "views/fnb/pages/FnbProductPage/index";

const FnbRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/fnb/home"
                component={() =>
                    <FnBLayout>
                        <FnBHomePage/>
                    </FnBLayout>
                }
            />
            <Route
                exact
                path="/fnb/product"
                component={() =>
                    <FnBLayout>
                        <FnBProductPage/>
                    </FnBLayout>
                }
            />
            
            <Route
                exact
                path="/fnb/shift"
                component={() =>
                    <FnBLayout>
                        <FnBHomePage/>
                    </FnBLayout>
                }
            />
            <Route path="/fnb/*" component={ErrorPage} />
        </Switch>
    )
};

export default FnbRouter;