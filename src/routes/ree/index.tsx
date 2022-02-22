/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import ReeLayout from "views/layouts/ReeLayout";

/*=====PAGES=====*/
import ReeHomePage from 'views/pages/ree/ReeHomePage';
import ErrorPage from "views/pages/authentication/Error";

const ReeRouter: FC = () => {
    return (
        <Route path="/ree">
            <ReeLayout>
                <Switch>
                    <Route exact path="/ree/home" component={ReeHomePage} />
                    <Route exact path="/ree/other" component={ReeHomePage} />
                    <Route path="/ree /*" component={ErrorPage} />
                </Switch>
            </ReeLayout>
        </Route>
    )
};

export default ReeRouter;