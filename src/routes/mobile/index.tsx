/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch } from "react-router-dom";

/*=====3.LAYOUTS=====*/
import { MobileLayout } from "views/mobile/shareComponents/layouts";
import { ProtectedRoute } from "routes/components";

/*=====4.HOOK=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    MobilePcmPage
} from "views/mobile/pages";

const FnbPage = lazy(() => import('views/mobile/pages/FnbPage'));

const MobileRouter: FC = () => {
    return (
        <MobileLayout>
            <Switch>
                <Route
                    exact
                    path="/mobile/pcm/:id"
                    component={() =>
                        <MobilePcmPage />
                    }
                />

                <Route exact path="/mobile/activity/:id/:rad" component={FnbPage} />
               
                <ProtectedRoute path="/item/*" component={ErrorPage} />
            </Switch>
        </MobileLayout>
    )
};

export default MobileRouter