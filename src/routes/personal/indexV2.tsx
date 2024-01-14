/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { PersonalLayoutV2 } from "views/personal/shareComponents/layoutsV2";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   PersonalHomePage, PersonalHistoriesPage
} from "views/personal/pages";

const PersonalRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/personal/home"
                component={() =>
                    <PersonalLayoutV2>
                        <PersonalHomePage />
                    </PersonalLayoutV2>
                }
            />
            <Route
                exact
                path="/personal/histories"
                component={() =>
                    <PersonalLayoutV2>
                        <PersonalHistoriesPage />
                    </PersonalLayoutV2>
                }
            />
            <Route path="/personal/*" component={ErrorPage} />
        </Switch>
    )
};

export default PersonalRouter;