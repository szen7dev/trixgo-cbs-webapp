/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";
import { SampleLayout } from "views/sample/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
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
                        <Route path="/sample/*" component={ErrorPage} />
                    </Switch>
                </SampleLayout>
            </Route>
        </>
    )
};

export default SampleAppRouter;