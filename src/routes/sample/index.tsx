/*=====LIBRARY=====*/
import { FC } from "react";
import { Route } from "react-router-dom";

/*=====LAYOUTS=====*/
import { SampleLayout } from "views/sample/shareComponents/layouts";
import ProtectedRoute from "components/common/ProtectedRoute";

/*=====PAGES=====*/
import ErrorPage from "views/authentication/Error";

import { 
    SamplePage, 
} from "views/sample/pages";

const SampleAppRouter: FC = () => {
    return (
        <>
            <Route path="/sample">
                <SampleLayout>
                    <Switch>
                        <ProtectedRoute exact path="/sample/home" component={SamplePage} />
                        <Route path="/human/*" component={ErrorPage} />
                    </Switch>
                </SampleLayout>
            </Route>
        </>
    )
};

export default SampleAppRouter;