/*=====LIBRARY=====*/
import { FC } from "react";
import { Switch } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====LAYOUTS=====*/
import { MessagesLayoutV2 } from "views/messages/shareComponents/layouts/MessagesLayoutV2";

/*=====PAGES=====*/
import { MessagesHome } from "views/messages/pages/MessageHome";

const MessagesRouter: FC = () => {
    return (
        <>
            <MessagesLayoutV2>
                <Switch>
                    <ProtectedRoute exact path={"/messages"} component={MessagesHome} />
                </Switch>
            </MessagesLayoutV2>
        </>
    )
}

export default MessagesRouter;