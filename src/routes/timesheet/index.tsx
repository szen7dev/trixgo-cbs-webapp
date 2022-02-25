import { FC } from "react";
import { Route, Switch } from "react-router-dom";

import { ProtectedRoute } from "shareComponents/common/ProtectedRoute";
/*=====LAYOUTS=====*/
import { TimesheetLayout } from "views/timesheet/shareComponents/layouts";

/*=====PAGES=====*/
import {TimesheetHomePage, TimesheetDetailPage} from "views/timesheet/pages";

const TimesheetAppRouter: FC = () => {
  return (
    <Route path="/timesheet/:path?">
      <TimesheetLayout>
        <Switch>
          <ProtectedRoute
            exact
            path="/timesheet/home"
            component={TimesheetHomePage}
          />
          <ProtectedRoute
            exact
            path={"/timesheet/home/:id"}
            component={TimesheetDetailPage}
          />
        </Switch>
      </TimesheetLayout>
    </Route>
  );
};

export default TimesheetAppRouter;
