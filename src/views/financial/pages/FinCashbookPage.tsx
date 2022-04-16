import { FC } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { LayoutPrimary } from "views/media/shareComponents/layouts/LayoutPrimary";
import PageOne from "../planning/components/FinancialCashbook/PageOne";
import PageTwo from "../planning/components/FinancialCashbook/PageTwo";
import PageTwoDetail from "../planning/components/FinancialCashbook/PageTwoDetail";

const pages = [
  { id: "1", title: "Tổng hợp quỹ", path: "/financial/cashbook", state: 1 },
  { id: "2", title: "Sổ quỹ công ty", path: "/financial/cashbook", state: 2 },
  { id: "3", title: "Sổ quỹ khác", path: "/financial/cashbook", state: 3 },
];

const FinDashboardPage: FC<RouteComponentProps> = ({ location }) => {
  return (
    <LayoutPrimary pages={pages} value={location.state || 1}>
      <Switch>
        <Route exact path="/financial/cashbook">
          {(!location.state || location.state === 1) && <PageOne />}
          {location.state === 2 && <PageTwo />}
          {location.state === "3" && <h1>Sổ quỹ</h1>}
        </Route>
        <Route path="/financial/cashbook/:cashbookId">
          <PageTwoDetail />
        </Route>
      </Switch>
    </LayoutPrimary>
  );
};

export default FinDashboardPage;
