/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

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
                    component={() => <Redirect to="/item/home/1" />}
                />
                <Route
                    exact
                    path="/item/home/1"
                    component={() => <ItemHomePage type={1} />}
                />
                <Route
                    exact
                    path="/item/home/2"
                    component={() => <ItemHomePage type={2} />}
                />
                <Route
                    exact
                    path="/item/home/3"
                    component={() => <ItemHomePage type={3} />}
                />
                <Route
                    exact
                    path="/item/home/4"
                    component={() => <ItemHomePage type={4} />}
                />
                <Route
                    exact
                    path="/item/home/5"
                    component={() => <ItemHomePage type={5} />}
                />
                <Route
                    exact
                    path="/item/home/6"
                    component={() => <ItemHomePage type={6} />}
                />
                <Route
                    exact
                    path="/item/home/7"
                    component={() => <ItemHomePage type={7} />}
                />
                <Route
                    exact
                    path="/item/home/8"
                    component={() => <ItemHomePage type={8} />}
                />
                <Route
                    exact
                    path="/item/home/9"
                    component={() => <ItemHomePage type={9} />}
                />
                <Route
                    exact
                    path="/item/home/10"
                    component={() => <ItemHomePage type={10} />}
                />
                <Route
                    exact
                    path="/item/home/11"
                    component={() => <ItemHomePage type={11} />}
                />
                <Route
                    exact
                    path="/item/home/12"
                    component={() => <ItemHomePage type={12} />}
                />
                <Route
                    exact
                    path="/item/home/13"
                    component={() => <ItemHomePage type={13} />}
                />
                <Route
                    exact
                    path="/item/home/14"
                    component={() => <ItemHomePage type={14} />}
                />
                <Route
                    exact
                    path="/item/home/15"
                    component={() => <ItemHomePage type={15} />}
                />
                <Route
                    exact
                    path="/item/home/16"
                    component={() => <ItemHomePage type={16} />}
                />
                <Route
                    exact
                    path="/item/home/17"
                    component={() => <ItemHomePage type={17} />}
                />
                <Route
                    exact
                    path="/item/home/18"
                    component={() => <ItemHomePage type={18} />}
                />
                <Route
                    exact
                    path="/item/home/19"
                    component={() => <ItemHomePage type={19} />}
                />
                <Route
                    exact
                    path="/item/home/20"
                    component={() => <ItemHomePage type={20} />}
                />
                <Route
                    exact
                    path="/item/home/21"
                    component={() => <ItemHomePage type={21} />}
                />
                <Route
                    exact
                    path="/item/home/22"
                    component={() => <ItemHomePage type={22} />}
                />
                <Route path="/item/*" component={ErrorPage} />
            </Switch>
        </ItemLayout>
    )
};

export default ItemRouter;