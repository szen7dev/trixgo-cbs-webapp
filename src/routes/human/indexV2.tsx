/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";

import {
        HumanHomePage,
        HumanDocumentPage,
        HumanInfo,
    } from "views/human/pages";

const HumanRouterV2: FC = () => {
    return (
        <Switch>
            <ProtectedRoute exact path="/human/home" component={HumanHomePage} />
            <ProtectedRoute exact path="/human/document" component={HumanDocumentPage} />
            <ProtectedRoute exact path="/human/home/hid=:id" component={HumanInfo} />
            <Route path="/human/*" component={ErrorPage} />
        </Switch>
    )
};

export default HumanRouterV2;