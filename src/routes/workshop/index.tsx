/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====LAYOUTS=====*/
import HelpCenterLayout from "views/layouts/HelpCenterLayout";

/*=====PAGES=====*/
import HelpCenterPage from "views/pages/help/HelpCenterPage";
import ErrorPage from "views/pages/authentication/Error";

const WorkshopRouter: FC = () => {
    return (
        <>
            <Route path="/help">
                <HelpCenterLayout>
                    <Switch>
                        <Route exact path="/help/home" component={HelpCenterPage} />
                        <Route path="/help/*" component={ErrorPage} />
                    </Switch>
                </HelpCenterLayout>
            </Route>

        </>
    )
};

export default WorkshopRouter;