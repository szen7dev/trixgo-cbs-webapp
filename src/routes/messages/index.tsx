/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "components/common/ProtectedRoute";

/*=====LAYOUTS=====*/
import { MessagesLayout } from "views/messages/shareComponents/layouts/MessagesLayout";

/*=====PAGES=====*/
import MessagesHome from "views/messages/home";

const MessagesRouter: FC = () => {
    return (
        <>
            <Route path="/messages/:path?">
                <MessagesLayout>
                    <Switch>
                        <ProtectedRoute exact path={"/messages"} component={MessagesHome} />
                    </Switch>
                </MessagesLayout>
            </Route>
        </>
    )
}

export default MessagesRouter;