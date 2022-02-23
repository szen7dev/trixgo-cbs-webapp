/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { PcmHomeLayout } from "views/pcm/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
// import ErrorPage from "views/authentication/Error";

import { 
    PcmHomePage, 
} from "views/pcm/pages";

const PCMRouter: FC = () => {
    return (
        <>
            <Route path="/pcm/:path?">
                <Switch>
                    <ProtectedRoute 
                        exact
                        path={"/pcm/home"}
                        component={() => (
                            <PcmHomeLayout>
                                <PcmHomePage />
                            </PcmHomeLayout>
                        )}
                    />
                </Switch>
            </Route>  
        </>
    )
};

export default PCMRouter;