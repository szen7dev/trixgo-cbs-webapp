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
    BiddingOtherPage,
} from "views/bidding/pages";

const BiddingRouter: FC = () => {
    return (
        <Route path="/bidding">
            <BiddingLayout>
                <Switch>
                    <Route exact path="/bidding/home" component={BiddingHomePage} />
                    <Route exact path="/bidding/exp" component={BiddingOtherPage} />
                    <Route path="/bidding/*" component={ErrorPage} />
                </Switch>
            </BiddingLayout>
        </Route>
    )
};

export default BiddingRouter;