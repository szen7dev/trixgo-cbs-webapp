/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import BiddingLayout from "views/layouts/BiddingLayout";

/*=====PAGES=====*/
import BiddingHomePage from "views/pages/bidding/BiddingHomePage";
import BiddingOtherPage from "views/pages/bidding/BiddingOtherPage";
import ErrorPage from "views/pages/authentication/Error";

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