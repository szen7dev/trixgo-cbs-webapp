/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { BudgetLayout } from "views/budget/shareComponents/layouts";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import {
    BudgetHomePage,
    BudgetDetailPage
} from "views/budget/pages";
import LayoutSecondary from "views/ppt/sharedComponents/layouts/LayoutSecondary";
import BudgetAdminFunctionalTab from "views/budget/pages/BudgetAdminPage/pages/BudgetAdminFunctionalTab";
import BudgetAdminDetail from "views/budget/pages/BudgetAdminPage/pages/BudgetAdminDetail";
import BudgetAdminAuthorTab from "views/budget/pages/BudgetAdminPage/pages/BudgetAdminAuthorTab";

const BudgetRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/budget/home"
                component={() =>
                    <BudgetLayout>
                        <BudgetHomePage />
                    </BudgetLayout>
                }
            />
            <Route
                exact
                path="/budget/home/:budgetID"
                component={() =>
                    <BudgetLayout>
                        <BudgetDetailPage />
                    </BudgetLayout>
                }
            />
            <Route path="/budget/admin">
                <BudgetLayout>
                    <LayoutSecondary pages={[
                        { id: '1', title: 'Nhóm chức năng', path: '/budget/admin', navExact: true },
                        {
                            id: '2', title: 'Phân quyền chức năng', path: '/budget/admin/2', location: (location) => {
                                // Get match params
                                const match = matchPath<{ id: string }>(location.pathname, { path: '/budget/admin/:id/detail' })
                                // Push to state
                                return ({ pathname: '/budget/admin/2', state: match ? match.params.id : null })
                            }
                        }
                    ]}>
                        <Route exact path="/budget/admin" component={BudgetAdminFunctionalTab} />
                        <Route exact path="/budget/admin/:id/detail" component={BudgetAdminDetail} />
                        <Route exact path="/budget/admin/2" component={BudgetAdminAuthorTab} />
                    </LayoutSecondary>
                </BudgetLayout>
            </Route>
            <Route path="/budget/*" component={ErrorPage} />
        </Switch>
    )
};

export default BudgetRouter;