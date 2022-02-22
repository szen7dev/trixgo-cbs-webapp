/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import OwnerLayout from "views/layouts/OwnerLayout";

/*=====PAGES=====*/
import OwnerHomePage from "views/pages/owner/OwnerHomePage";
import OwnerGrantPage from "views/pages/owner/OwnerGrantPage";
import ErrorPage from "views/pages/authentication/Error";

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