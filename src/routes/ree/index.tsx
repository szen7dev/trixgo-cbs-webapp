/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { ReeLayout } from "views/ree/shareComponents/layouts";

/*=====PAGES=====*/
import ReeHomePage from 'views/ree/ReeHomePage';
import ErrorPage from "views/authentication/Error";

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