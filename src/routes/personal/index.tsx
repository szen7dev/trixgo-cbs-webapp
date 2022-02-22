/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { PersonalLayout } from "views/personal/shareComponents/layouts";

/*=====PAGES=====*/
import ErrorPage from "views/authentication/Error";

import { 
    PersonalNotificationPage, 
    PersonalNotePage,
    PersonalBillPage,
    PersonalHomePage,
    PersonalConfigPage,
    PersonalFriendPage,
    PersonalHistoryPage
} from "views/personal/pages";

const PersonalRouter: FC = () => {
    return (
        <>
            <Route path="/personal">
                <PersonalLayout>
                    <Switch>
                        <Route exact path="/personal/notifications" component={PersonalNotificationPage} />
                        <Route exact path="/personal/notes" component={PersonalNotePage} />
                        <Route exact path="/personal/bills" component={PersonalBillPage} />
                        <Route exact path="/personal/home" component={PersonalHomePage} />
                        <Route exact path="/personal/friends" component={PersonalFriendPage} />
                        <Route exact path="/personal/histories" component={PersonalHistoryPage} />
                        <Route exact path="/personal/config" component={PersonalConfigPage} />
                        <Route path="/personal/*" component={ErrorPage} />
                    </Switch>
                </PersonalLayout>
            </Route>
        </>
    )
};

export default PersonalRouter;