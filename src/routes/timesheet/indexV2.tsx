import { FC } from "react";
import { Switch } from "react-router-dom";

import { ProtectedRoute } from "routes/components";
/*=====LAYOUTS=====*/
import { TimesheetLayoutV2 } from "views/timesheet/shareComponents/layoutsV2";

/*=====PAGES=====*/
import { TimesheetHomePage, TimesheetDetailPage } from "views/timesheet/pages";

const TimesheetAppRouterV2: FC = () => {
  return (
    <>
      <TimesheetLayoutV2>
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
      </TimesheetLayoutV2>
    </>
  );
};

export default TimesheetAppRouterV2;
