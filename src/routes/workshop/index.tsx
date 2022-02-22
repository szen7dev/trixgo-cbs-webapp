/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { WorkshopLayout } from "views/workshop/shareComponents/layouts";

/*=====PAGES=====*/
import HelpCenterPage from "views/workshop/pages/HelpCenterPage";
import ErrorPage from "views/authentication/Error";

const WorkshopRouter: FC = () => {
    return (
        <>
            <Route path="/help">
                <WorkshopLayout>
                    <Switch>
                        <Route exact path="/help/home" component={HelpCenterPage} />
                        <Route path="/help/*" component={ErrorPage} />
                    </Switch>
                </WorkshopLayout>
            </Route>

        </>
    )
};

export default WorkshopRouter;