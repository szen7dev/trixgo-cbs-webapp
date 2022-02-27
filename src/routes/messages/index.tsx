/*=====LIBRARY=====*/
import { FC } from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====LAYOUTS=====*/
import { MessagesLayout } from "views/messages/shareComponents/layouts/MessagesLayout";

/*=====PAGES=====*/
import { MessagesHome } from "views/messages/pages/MessageHome";

const MessagesRouter: FC = () => {
    return (
        <>
            <MessagesLayout>
                <Switch>
                    <ProtectedRoute exact path={"/messages"} component={MessagesHome} />
                </Switch>
            </MessagesLayout>
        </>
    )
}

export default MessagesRouter;