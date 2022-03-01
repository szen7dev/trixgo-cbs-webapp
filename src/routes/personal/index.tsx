/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { PersonalLayout } from "views/personal/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   PersonalHomePage,
} from "views/personal/pages";

const PersonalRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/personal/home"
                component={() =>
                    <PersonalLayout>
                        <PersonalHomePage />
                    </PersonalLayout>
                }
            />
            <Route path="/personal/*" component={ErrorPage} />
        </Switch>
    )
};

export default PersonalRouter;