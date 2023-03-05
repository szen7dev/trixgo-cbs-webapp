/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====3.LAYOUTS=====*/
import { MobileLayout } from "views/mobile/shareComponents/layouts";
import { ProtectedRoute } from "routes/components";

/*=====4.HOOK=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    MobilePcmPage,
} from "views/mobile/pages";

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
               
                <ProtectedRoute path="/item/*" component={ErrorPage} />
            </Switch>
        </MobileLayout>
    )
};

export default MobileRouter