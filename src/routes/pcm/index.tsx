/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts/HomeLayout"; //ok

/*=====PAGES=====*/
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
                            <HomeLayout>
                                <PcmHomePage />
                            </HomeLayout>
                        )}
                    />
                </Switch>
            </Route>  
        </>
    )
};

export default PCMRouter;