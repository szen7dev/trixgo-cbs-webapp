/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { HumanLayout } from "views/human/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";

import { 
    HumanCetificateFilterPage, 
    HumanOtherFilterPage,
    HumanExpiredPage,
    HumanHomePage,
    HumanInfo
} from "views/human/pages";

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