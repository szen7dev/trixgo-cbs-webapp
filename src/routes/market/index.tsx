/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { MarketLayout } from "views/market/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    MarketHomePage,
} from "views/market/pages";

const MarketRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/market/home"
                component={() =>
                    <MarketLayout>
                        <MarketHomePage />
                    </MarketLayout>
                }
            />
            <Route path="/market/*" component={ErrorPage} />
        </Switch>
    )
};

export default MarketRouter;