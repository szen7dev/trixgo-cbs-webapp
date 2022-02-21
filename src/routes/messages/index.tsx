import { FC } from "react";
import {Route, Switch} from "react-router-dom";
import ProtectedRoute from "components/common/ProtectedRoute";
import MessagesHome from "views/messages/home";
import {MessagesLayout} from "views/messages/shareComponents/layouts/MessagesLayout";
const MessagesRoute:FC = () => {
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

export default MessagesRoute;