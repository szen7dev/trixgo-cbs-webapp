/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { InspectionLayout } from "views/inspection/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    InspectionHomePage,
} from "views/inspection/pages";

const InspectionRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/inspection/home"
                component={() =>
                    <InspectionLayout>
                        <InspectionHomePage />
                    </InspectionLayout>
                }
            />
            <Route path="/ree/*" component={ErrorPage} />
        </Switch>
    )
};

export default InspectionRouter;