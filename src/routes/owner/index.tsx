/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { OwnerLayout } from "views/owner/shareComponents/layouts";

/*=====PAGES=====*/
import OwnerHomePage from "views/owner/OwnerHomePage";
import OwnerGrantPage from "views/owner/OwnerGrantPage";
import ErrorPage from "views/authentication/Error";

const OwnerRouter: FC = () => {
    return (
        <Route path="/owner">
            <OwnerLayout>
                <Switch>
                    <Route exact path="/owner/home" component={OwnerHomePage} />
                    <Route exact path="/owner/grant-permission" component={OwnerGrantPage} />
                    <Route path="/owner/*" component={ErrorPage} />
                </Switch>
            </OwnerLayout>
        </Route>
    )
};

export default OwnerRouter;