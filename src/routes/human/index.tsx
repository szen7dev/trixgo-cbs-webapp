/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====LAYOUTS=====*/
import { HumanLayout } from "shareComponents/layouts/HumanLayout";
import ProtectedRoute from "components/common/ProtectedRoute";

/*=====PAGES=====*/
import HumanHomePage from "views/humans/HumanHomePage";
import HumanCetificateFilterPage from "views/humans/HumanCetificateFilterPage";
import HumanOtherFilterPage from "views/humans/HumanOtherFilterPage";
import HumanExpiredPage from "views/humans/HumanExpiredPage";
import HumanInfo from "views/humans/components/HumanInfo";
import ErrorPage from "views/pages/authentication/Error";

const HumanRouter: FC = () => {
    return (
        <>
            <Route path="/human">
                <HumanLayout>
                    <Switch>
                        <ProtectedRoute exact path="/human/home" component={HumanHomePage} />
                        <ProtectedRoute exact path="/human/cetificate" component={HumanCetificateFilterPage} />
                        <ProtectedRoute exact path="/human/other" component={HumanOtherFilterPage} />
                        <ProtectedRoute exact path="/human/expired" component={HumanExpiredPage} />
                        <ProtectedRoute exact path="/human/home/hid=:id" component={HumanInfo} />
                        <Route path="/human/*" component={ErrorPage} />
                    </Switch>
                </HumanLayout>
            </Route>
        </>
    )
};

export default HumanRouter;