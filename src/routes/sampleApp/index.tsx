import { FC } from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "components/common/ProtectedRoute";

// Dashboard pages
import SampleAppPage1 from 'views/sampleApp/page1';

const SampleAppRouter: FC = () => {
    return (
        <Route exact path="/">
            <ProtectedRoute
                exact
                path="/sample-app/page1"
                component={SampleAppPage1}
            />
        </Route>
    )
};

export default SampleAppRouter;