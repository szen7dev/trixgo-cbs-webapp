/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { MarketLayoutV2 } from "views/market/shareComponents/layoutsV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    MarketHomePage,
} from "views/market/pages";

const MarketRouterV2: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/market/home"
                component={() =>
                    <MarketLayoutV2>
                        <MarketHomePage />
                    </MarketLayoutV2>
                }
            />
            <Route path="/market/*" component={ErrorPage} />
        </Switch>
    )
};

export default MarketRouterV2;