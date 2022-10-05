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
import { BiddingReportPage } from "views/bidding/pages/BiddingReportPage";

const BiddingHomePage = lazy(() => import("views/bidding/pages/BiddingHomePageV2"));
const BiddingDetailPage = lazy(() => import("views/datahub/pages/DatahubContractorDetail"));
const BiddingContractorContract = lazy(
  () => import("views/datahub/pages/DatahubContractorContract")
);
const BiddingContractorFinancial = lazy(
  () => import("views/datahub/pages/DatahubContractorFinancial")
);
const BiddingContractorProfile = lazy(() => import("views/datahub/pages/DatahubContractorProfile"));
const BiddingContractorService = lazy(() => import("views/datahub/pages/DatahubContractorService"));

const navLinks = [
  { title: "Home", url: prefix + "/home/contractor/:id" },
  { title: "Dịch vụ", url: prefix + "/home/contractor/:id/service" },
  { title: "Tài chính", url: prefix + "/home/contractor/:id/financial" },
  { title: "Hợp đồng", url: prefix + "/home/contractor/:id/contract" },
  { title: "Hồ sơ năng lực", url: prefix + "/home/contractor/:id/profile" },
];

const BiddingRouter: FC = () => {
  return (
    <BiddingLayout>
      <Switch>
        <Route exact path={prefix + "/home"} component={BiddingHomePage} />
        <Route exact path={prefix + "/home/tag/:id"} component={BiddingHomePage} />
        <Route path={prefix + "/home/contractor/:id"}>
          <DatahubContractorLayout navLinks={navLinks}>
            <Route exact path={navLinks[0].url} component={BiddingDetailPage} />
            <Route exact path={navLinks[1].url} component={BiddingContractorService} />
            <Route exact path={navLinks[2].url} component={BiddingContractorFinancial} />
            <Route exact path={navLinks[3].url} component={BiddingContractorContract} />
            <Route exact path={navLinks[4].url} component={BiddingContractorProfile} />
          </DatahubContractorLayout>
        </Route>
        <Route exact path={prefix + "/report"} component={BiddingReportPage} />
        <Route path="/bidding/*" component={ErrorPage} />
      </Switch>
    </BiddingLayout>
  );
};

export default BiddingRouter;
