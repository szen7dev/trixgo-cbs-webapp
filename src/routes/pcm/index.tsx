/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
// import ErrorPage from "views/authentication/Error";

/*=====PAGES=====*/
import { PcmHomePage } from "views/pcm/pages";

const PCMRouter: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                exact
                path={"/pcm/home"}
                component={() => (
                    <HomeLayout>
                        <PcmHomePage />
                    </HomeLayout>
                )}
            />
        </Switch>
    )
};

export default PCMRouter;