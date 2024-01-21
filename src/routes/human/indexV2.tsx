/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';

/*=====4.CONFIG ROUTE=====*/
import HumanAdminFunctionalTab from "views/human/pages/HumanAdminPage/pages/HumanAdminFunctionalTab";
import HumanAdminDetail from "views/human/pages/HumanAdminPage/pages/HumanAdminDetail";
import HumanAdminAuthorTab from "views/human/pages/HumanAdminPage/pages/HumanAdminAuthorTab";

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";

import {
        HumanHomePage,
        HumanDashboardPage,
        HumanDocumentPage,
        HumanInfo,
    } from "views/human/pages";

const HumanRouterV2: FC = () => {
    return (
        <Switch>
          <Route path="/human/admin">
              <LayoutSecondary pages={[
                { id: '1', title: 'Nhóm chức năng', path: '/human/admin', navExact: true },
                {
                  id: '2', title: 'Phân quyền chức năng', path: '/human/admin/2', location: (location) => {
                    // Get match params
                    const match = matchPath<{ id: string }>(location.pathname, { path: '/human/admin/:id/detail' })
                    // Push to state
                    return ({ pathname: '/human/admin/2', state: match ? match.params.id : null })
                  }
                }
              ]}>
                <Route exact path="/human/admin" component={HumanAdminFunctionalTab} />
                <Route exact path="/human/admin/:id/detail" component={HumanAdminDetail} />
                <Route exact path="/human/admin/2" component={HumanAdminAuthorTab} />
              </LayoutSecondary>
          </Route>
          <ProtectedRoute exact path="/human/dashboard" component={HumanDashboardPage} />
          <ProtectedRoute exact path="/human/home" component={() => < HumanHomePage type = {1}/>} />
          <ProtectedRoute exact path="/human/document" component={HumanDocumentPage} />
          <ProtectedRoute exact path="/human/home/hid=:id" component={HumanInfo} />
          <ProtectedRoute exact path="/human/customer" component={() => < HumanHomePage type = {2}/>} />
          <Route path="/human/*" component={ErrorPage} />
        </Switch>
    )
};

export default HumanRouterV2;