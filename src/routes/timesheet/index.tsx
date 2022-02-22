/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { TimesheetLayout } from "views/timesheet/shareComponents/layouts";
import { ProtectedRoute } from "routes/components";

/*=====PAGES=====*/
import TimesheetHomePage from 'views/timesheet/TimesheetHomePage';
import TimesheetDetailPage from 'views/timesheet/TimesheetDetailPage';

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
