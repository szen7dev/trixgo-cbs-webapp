/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { PersonalLayout } from "views/personal/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
   PersonalHomePage, PersonalFriendsPage, PersonalNotificationPage, PersonalBillPage, PersonalNotePage, PersonalConfigPage, PersonalHistoriesPage
} from "views/personal/pages";

const PersonalRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/personal/home"
                component={() =>
                    <PersonalLayout>
                        <PersonalHomePage />
                    </PersonalLayout>
                }
            />
            <Route
                exact
                path="/personal/friends"
                component={() =>
                    <PersonalLayout>
                        <PersonalFriendsPage />
                    </PersonalLayout>
                }
            />
            <Route
                exact
                path="/personal/notifications"
                component={() =>
                    <PersonalLayout>
                        <PersonalNotificationPage />
                    </PersonalLayout>
                }
            />
            <Route
                exact
                path="/personal/bills"
                component={() =>
                    <PersonalLayout>
                        <PersonalBillPage />
                    </PersonalLayout>
                }
            />
            <Route
                exact
                path="/personal/notes"
                component={() =>
                    <PersonalLayout>
                        <PersonalNotePage />
                    </PersonalLayout>
                }
            />
            <Route
                exact
                path="/personal/config"
                component={() =>
                    <PersonalLayout>
                        <PersonalConfigPage />
                    </PersonalLayout>
                }
            />
            <Route
                exact
                path="/personal/histories"
                component={() =>
                    <PersonalLayout>
                        <PersonalHistoriesPage />
                    </PersonalLayout>
                }
            />
            <Route path="/personal/*" component={ErrorPage} />
        </Switch>
    )
};

export default PersonalRouter;