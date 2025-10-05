/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect, matchPath } from "react-router-dom";

/*=====3.LAYOUTS=====*/
import { ProtectedRoute } from "routes/components";

/*=====4.HOOK=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    ItemHome,
    ItemHomePage,
    ItemChildPage,
    ItemCustomerPage,
    ItemStoragePage,
    ItemGoodsPage,
    ItemFundasPage,
    ItemFundasPageMember
} from "views/item/pages";
import { ItemLayout } from "views/item/shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';
import AdminFunctionalTab from "views/item/pages/ItemAdminPage/pages/AdminFunctionalTab";
import AdminDetail from "views/item/pages/ItemAdminPage/pages/AdminDetail";
import AdminAuthorTab from "views/item/pages/ItemAdminPage/pages/AdminAuthorTab";

const ItemRouter: FC = () => {
    return (
        <ItemLayout>
            <Switch>
                <Route path="/item/admin">
                    <LayoutSecondary pages={[
                        { id: '1', title: 'Nhóm chức năng', path: '/item/admin', navExact: true },
                        {
                        id: '2', title: 'Phân quyền chức năng', path: '/item/admin/2', location: (location) => {
                            // Get match params
                            const match = matchPath<{ id: string }>(location.pathname, { path: '/item/admin/:id/detail' })
                            // Push to state
                            return ({ pathname: '/item/admin/2', state: match ? match.params.id : null })
                        }
                        }
                    ]}>
                        <Route exact path="/item/admin" component={AdminFunctionalTab} />
                        <Route exact path="/item/admin/:id/detail" component={AdminDetail} />
                        <Route exact path="/item/admin/2" component={AdminAuthorTab} />
                    </LayoutSecondary>
                </Route>
                <ProtectedRoute exact path="/item/home" component={ItemHomePage} />
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
                    path="/item/home/1"
                    component={() => <ItemHome type={1} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/2"
                    component={() => <ItemHome type={2} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/3"
                    component={() => <ItemHome type={3} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/4"
                    component={() => <ItemHome type={4} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/5"
                    component={() => <ItemHome type={5} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/6"
                    component={() => <ItemHome type={6} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/7"
                    component={() => <ItemHome type={7} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/8"
                    component={() => <ItemHome type={8} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/9"
                    component={() => <ItemHome type={9} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/10"
                    component={() => <ItemHome type={10} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/11"
                    component={() => <ItemHome type={11} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/12"
                    component={() => <ItemHome type={12} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/13"
                    component={() => <ItemHome type={13} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/14"
                    component={() => <ItemHome type={14} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/15"
                    component={() => <ItemHome type={15} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/16"
                    component={() => <ItemHome type={16} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/17"
                    component={() => <ItemHome type={17} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/18"
                    component={() => <ItemHome type={18} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/19"
                    component={() => <ItemHome type={19} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/20"
                    component={() => <ItemHome type={20} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/21"
                    component={() => <ItemHome type={21} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/22"
                    component={() => <ItemHome type={22} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/23"
                    component={() => <ItemHome type={23} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/24"
                    component={() => <ItemHome type={24} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/25"
                    component={() => <ItemHome type={25} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/26"
                    component={() => <ItemHome type={26} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/27"
                    component={() => <ItemHome type={27} />}
                />
                <ProtectedRoute
                    exact
                    path="/item/home/28"
                    component={() => <ItemHome type={28} />}
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