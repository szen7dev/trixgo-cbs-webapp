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
                <Route
                    exact
                    path="/item/home/2"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/3"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/4"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/5"
                    component={ItemHomePage}
                />   
                <Route
                    exact
                    path="/item/home/6"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/7"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/8"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/9"
                    component={ItemHomePage}
                /> 
                <Route
                    exact
                    path="/item/home/10"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/11"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/12"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/13"
                    component={ItemHomePage}
                /> 
                <Route
                    exact
                    path="/item/home/14"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/15"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/16"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/17"
                    component={ItemHomePage}
                /> 
                <Route
                    exact
                    path="/item/home/18"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/19"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/20"
                    component={ItemHomePage}
                />
                <Route
                    exact
                    path="/item/home/21"
                    component={ItemHomePage}
                /> 
                <Route
                    exact
                    path="/item/home/22"
                    component={ItemHomePage}
                /> 
                <Route path="/item/*" component={ErrorPage} />
            </Switch>
        </ItemLayout>
    )
};

export default ItemRouter;