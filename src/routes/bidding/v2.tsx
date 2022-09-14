/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import BiddingLayout from "views/bidding/shareComponents/layouts/BiddingLayout/LayoutV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import { prefix } from "views/bidding/configs";
import DatahubContractorLayout from "views/datahub/sharedComponents/layouts/DatahubContractorLayout";
const BiddingHomePage = lazy(() => import("views/bidding/pages/BiddingHomePageV2"));
const BiddingDetailPage = lazy(() => import("views/datahub/pages/DatahubContractorDetail"));

const BiddingRouter: FC = () => {
  return (
    <BiddingLayout>
      <Switch>
        <Route exact path={prefix + "/home"} component={BiddingHomePage} />
        <Route exact path={prefix + "/home/contractor/:id"}>
          <DatahubContractorLayout>
            <BiddingDetailPage />
          </DatahubContractorLayout>
        </Route>
        <Route exact path={prefix + "/home/:id"} component={BiddingHomePage} />
        <Route path="/bidding/*" component={ErrorPage} />
      </Switch>
    </BiddingLayout>
  );
};

export default BiddingRouter;
