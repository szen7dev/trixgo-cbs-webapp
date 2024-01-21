import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

import { ProtectedRoute } from "routes/components";
/*=====LAYOUTS=====*/
import { TimesheetLayout } from "views/timesheet/shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';

/*=====PAGES=====*/
import { TimesheetHomePage, TimesheetDetailPage, SalaryHomePage, SalaryDetailPage } from "views/timesheet/pages";
import TimesheetAdminFunctionalTab from "views/timesheet/pages/TimesheetAdminPage/pages/TimesheetAdminFunctionalTab";
import TimesheetAdminDetail from "views/timesheet/pages/TimesheetAdminPage/pages/TimesheetAdminDetail";
import TimesheetAdminAuthorTab from "views/timesheet/pages/TimesheetAdminPage/pages/TimesheetAdminAuthorTab";
import ErrorPage from "views/authentication/Error";

const TimesheetAppRouter: FC = () => {
  return (
    <>
      <TimesheetLayout>
        <Switch>
          <ProtectedRoute
            exact
            path="/timesheet/home"
            component={() => <TimesheetHomePage type={1} />}
          />
          <ProtectedRoute
            exact
            path={"/timesheet/home/:id"}
            component={TimesheetDetailPage}
          />
          <ProtectedRoute
            exact
            path="/timesheet/mine"
            component={() => <TimesheetHomePage type={2} />}
          />
          <ProtectedRoute
            exact
            path={"/timesheet/mine/:id"}
            component={TimesheetDetailPage}
          />
          <ProtectedRoute
            exact
            path="/timesheet/salary"
            component={SalaryHomePage}
          />
          <ProtectedRoute
            exact
            path={"/timesheet/salary/:id"}
            component={SalaryDetailPage}
          />

          <LayoutSecondary pages={[
                { id: '1', title: 'Nhóm chức năng', path: '/timesheet/admin', navExact: true },
                {
                  id: '2', title: 'Phân quyền chức năng', path: '/timesheet/admin/2', location: (location) => {

                    // Get match params
                    const match = matchPath<{ id: string }>(location.pathname, { path: '/timesheet/admin/:id/detail' })

                    // Push to state
                    return ({ pathname: '/timesheet/admin/2', state: match ? match.params.id : null })
                  }
                }
              ]}>
              <Route exact path="/timesheet/admin" component={TimesheetAdminFunctionalTab} />
              <Route exact path="/timesheet/admin/:id/detail" component={TimesheetAdminDetail} />
              <Route exact path="/timesheet/admin/2" component={TimesheetAdminAuthorTab} />
          </LayoutSecondary>

          <ProtectedRoute exact path="/timesheet/*" component={ErrorPage} />
        </Switch>
      </TimesheetLayout>
    </>
  );
};

export default TimesheetAppRouter;