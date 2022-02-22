/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import PersonalLayout from "views/layouts/PersonalLayout";

/*=====PAGES=====*/
import PersonalNotificationPage from "views/pages/personal/noti/PersonalNotificationPage";
import PersonalNotePage from "views/pages/personal/note/PersonalNotePage";
import PersonalBillPage from "views/pages/personal/bill/PersonalBillPage";
import PersonalHomePage from "views/pages/personal/home/PersonalHomePage";
import PersonalConfigPage from "views/pages/personal/config/PersonalConfigPage";
import PersonalFriendPage from "views/pages/personal/friends/PersonalFriendPage";
import PersonalHistoryPage from "views/pages/personal/history/PersonalHistoryPage";
import ConfigListDetail from "views/pages/personal/config/components/ConfigListDetail"; // ??? Khai báo ko thấy dùng
import ErrorPage from "views/pages/authentication/Error";

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