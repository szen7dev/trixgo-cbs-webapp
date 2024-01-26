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
   PersonalHomePage, 
   PersonalHistoriesPage,
   PersonalStoragePage,
} from "views/personal/pages";

const PersonalRouter: FC = () => {
    return (
        <PersonalLayoutV2>
            <Switch>
                <Route exact path="/personal/home" component={PersonalHomePage}/>
                <Route exact path="/personal/histories" component={PersonalHistoriesPage}/>
                <Route exact path="/personal/storage" component={PersonalStoragePage}/>
                <Route path="/personal/*" component={ErrorPage} />
            </Switch>
        </PersonalLayoutV2>
    )
};

export default PersonalRouter;