/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { PersonalLayout } from "views/personal/shareComponents/layouts";

/*=====PAGES=====*/
import PersonalNotificationPage from "views/personal/pages/PersonalNotificationPage";
import PersonalNotePage from "views/personal/pages/PersonalNotePage";
import PersonalBillPage from "views/personal/pages/PersonalBillPage";
import PersonalHomePage from "views/personal/pages/PersonalHomePage";
import PersonalConfigPage from "views/personal/pages/PersonalConfigPage";
import PersonalFriendPage from "views/personal/pages/PersonalFriendPage";
import PersonalHistoryPage from "views/personal/pages/PersonalHistoryPage";
// import ConfigListDetail from "views/personal/ConfigListDetail";
import ErrorPage from "views/authentication/Error";

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