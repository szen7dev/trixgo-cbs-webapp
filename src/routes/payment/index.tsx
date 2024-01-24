/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { BudgetLayoutV2 } from "views/budget/shareComponents/layoutsV2";
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

const PaymentRouter: FC = () => {
    return (
        <Switch>
            <Route
                exact
                path="/payment/home"
                component={() =>
                    <BudgetLayoutV2>
                        <BudgetHomePage />
                    </BudgetLayoutV2>
                }
            />
            <Route
                exact
                path="/budget/home/:budgetID"
                component={() =>
                    <BudgetLayoutV2>
                        <BudgetDetailPage />
                    </BudgetLayoutV2>
                }
            />
            <Route path="/budget/admin">
                <BudgetLayoutV2>
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
                </BudgetLayoutV2>
            </Route>
            <Route path="/budget/*" component={ErrorPage} />
        </Switch>
    )
};

export default PaymentRouter;