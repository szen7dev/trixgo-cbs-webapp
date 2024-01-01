/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";

/*=====4.HOOK=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    ItemHomePage,
    ItemChildPage,
    ItemCustomerPage,
    ItemStoragePage,
    ItemGoodsPage,
    ItemFundasPage,
    ItemFundasPageMember
} from "views/item/pages";
import { ItemLayout } from "views/item/shareComponents/layouts";

const ItemRouter: FC = () => {
    return (
        <ItemLayout>
            <Switch>
                <ProtectedRoute exact path="/item/contact" component={ItemCustomerPage} />
                <ProtectedRoute exact path="/item/contact/:parentID" component={ItemCustomerPage} />
                
                <ProtectedRoute exact path="/item/storage" component={ItemStoragePage} />
                <ProtectedRoute exact path="/item/storage/:parentID" component={ItemStoragePage} />

                <ProtectedRoute exact path="/item/goods" component={ItemGoodsPage} />
                <ProtectedRoute exact path="/item/goods/:parentID" component={ItemGoodsPage} />

                <ProtectedRoute exact path="/item/fundas" component={ItemFundasPage} />
                <ProtectedRoute exact path="/item/fundas/:parentID" component={ItemFundasPage} />
                <ProtectedRoute exact path="/item/fundas/:fundaID/members" component={ItemFundasPageMember} />

                <ProtectedRoute
                    exact
                    path="/item/home"
                    component={() => <Redirect to="/item/home/1" />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/1"
                    component={() => <ItemHomePage type={1} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/2"
                    component={() => <ItemHomePage type={2} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/3"
                    component={() => <ItemHomePage type={3} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/4"
                    component={() => <ItemHomePage type={4} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/5"
                    component={() => <ItemHomePage type={5} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/6"
                    component={() => <ItemHomePage type={6} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/7"
                    component={() => <ItemHomePage type={7} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/8"
                    component={() => <ItemHomePage type={8} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/9"
                    component={() => <ItemHomePage type={9} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/10"
                    component={() => <ItemHomePage type={10} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/11"
                    component={() => <ItemHomePage type={11} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/12"
                    component={() => <ItemHomePage type={12} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/13"
                    component={() => <ItemHomePage type={13} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/14"
                    component={() => <ItemHomePage type={14} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/15"
                    component={() => <ItemHomePage type={15} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/16"
                    component={() => <ItemHomePage type={16} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/17"
                    component={() => <ItemHomePage type={17} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/18"
                    component={() => <ItemHomePage type={18} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/19"
                    component={() => <ItemHomePage type={19} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/20"
                    component={() => <ItemHomePage type={20} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/21"
                    component={() => <ItemHomePage type={21} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/22"
                    component={() => <ItemHomePage type={22} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/23"
                    component={() => <ItemHomePage type={23} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/:type/:parentId"
                    component={() => <ItemChildPage />}
                />
                <ProtectedRoute path="/item/*" component={ErrorPage} />
            </Switch>
        </ItemLayout>

    )
};

export default ItemRouter;