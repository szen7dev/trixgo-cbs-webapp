/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====3.LAYOUTS=====*/
import { ItemLayout } from "views/item/shareComponents/layouts";

/*=====4.HOOK=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    ItemHomePage
} from "views/item/pages";

const ItemRouter: FC = () => {
    return (
        <ItemLayout>
            <Switch>
                <Route
                    exact
                    path="/item/home"
                    component={ItemHomePage}
                />
                <Route path="/item/*" component={ErrorPage} />
            </Switch>
        </ItemLayout>
    )
};

export default ItemRouter;