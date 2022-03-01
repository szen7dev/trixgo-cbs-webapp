/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { BiddingLayout } from "views/bidding/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   BiddingHomePage,
} from "views/bidding/pages";

const BiddingRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/bidding/home"
                component={() =>
                    <BiddingLayout>
                        <BiddingHomePage />
                    </BiddingLayout>
                }
            />
            <Route path="/media/*" component={ErrorPage} />
        </Switch>
    )
};

export default BiddingRouter;