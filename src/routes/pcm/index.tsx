/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts/HomeLayout"; //ok

/*=====PAGES=====*/
import PcmHomePage from "views/pcm/pages/PcmHomePage";

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