/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/

/*=====PAGES=====*/
import {
    DocumentDashboardPage,
    DocumentHomePage
} from 'views/document/pages';

import ErrorPage from 'views/authentication/Error';

const DocumentRouter: FC = () => {
    return (
        <Switch>
            <Route exact path="/document/home" component={DocumentHomePage} />
            <Route exact path="/document/dashboard" component={DocumentDashboardPage} />
            <Route path="/document/*" component={ErrorPage} />
        </Switch>
    )
};

export default DocumentRouter;