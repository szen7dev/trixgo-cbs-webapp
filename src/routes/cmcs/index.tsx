/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { CmcsLayout, CmcsContractLayout } from "views/cmcs/shareComponents/layouts";
import { ProtectedRoute } from "routes/components";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import {
    CmcHomePage,
    CmcIncomePage,
    CmcGuaranteePage,
    ContractHome,
    ContractIpc,
    ContractPayment,
    ContractProduce,
    ContractAdminPage,
    CmcDashboardPage,
    ContractDashBoard,
    CmcPortfolioPage,
    CmcExpensePage,
    ContractEditor,
    ContractBill,
    ContractBudget,
    ContractProduct
} from "views/cmcs/pages";
import ErrorPage from "views/authentication/Error";
import CmcsAdminFunctionalTab from "views/cmcs/pages/CmcAdminPage/pages/CmcsAdminFunctionalTab";
import CmcsAdminDetail from "views/cmcs/pages/CmcAdminPage/pages/CmcsAdminDetail";
import CmcsAdminAuthorTab from "views/cmcs/pages/CmcAdminPage/pages/CmcsAdminAuthorTab";
import LayoutSecondary from "views/cmcs/shareComponents/layouts/LayoutSecondary";
import CmcsAdminContractTab from "views/cmcs/pages/CmcAdminPage/pages/CmcsAdminContractTab";
import CmcsAdminContractDetail from "views/cmcs/pages/CmcAdminPage/pages/CmcsAdminContractDetail";

const CmcsRouter: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                path="/cmcs/admin"
                component={() => (
                    <CmcsLayout>
                        <Switch>
                            <Route path="/cmcs/admin">
                                <LayoutSecondary pages={[
                                    { id: '1', title: 'Nhóm chức năng', path: '/cmcs/admin', navExact: true },
                                    {
                                        id: '2', title: 'Phân quyền chức năng', path: '/cmcs/admin/2', location: (location) => {
                                            // Get match params
                                            const match = matchPath<{ id: string }>(location.pathname, { path: '/cmcs/admin/:id/detail' })
                                            // Push to state
                                            return ({ pathname: '/cmcs/admin/2', state: match ? match.params.id : null })
                                        }
                                    },
                                    { id: '3', title: 'Hợp đồng', path: '/cmcs/admin/3', },
                                ]}>
                                    <Route exact path="/cmcs/admin" component={CmcsAdminFunctionalTab} />
                                    <Route exact path="/cmcs/admin/:id/detail" component={CmcsAdminDetail} />
                                    <Route exact path="/cmcs/admin/2" component={CmcsAdminAuthorTab} />
                                    <Route exact path="/cmcs/admin/3" component={CmcsAdminContractTab} />
                                    <Route exact path="/cmcs/admin/:id/contract" component={CmcsAdminContractDetail} />
                                </LayoutSecondary>
                            </Route>
                        </Switch>

                    </CmcsLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/home"
                component={() => (
                    <CmcsLayout>
                        <CmcHomePage />
                    </CmcsLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/income"
                component={() => (
                    <CmcsLayout>
                        <CmcIncomePage />
                    </CmcsLayout>
                )}
            />
            {/* <ProtectedRoute
                exact
                path="/cmcs/portfolio"
                component={() => (
                    <CmcsLayout>
                        <CmcPortfolioPage />
                    </CmcsLayout>
                )}
            /> */}
            <ProtectedRoute
                exact
                path="/cmcs/expense"
                component={() => (
                    <CmcsLayout>
                        <CmcExpensePage />
                    </CmcsLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/guarantee"
                component={() => (
                    <CmcsLayout>
                        <CmcGuaranteePage />
                    </CmcsLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/home"
                component={() => (
                    <CmcsContractLayout>
                        <ContractHome />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/ipc"
                component={() => (
                    <CmcsContractLayout>
                        <ContractIpc />
                    </CmcsContractLayout>
                )}
            />

            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/payment"
                component={() => (
                    <CmcsContractLayout>
                        <ContractPayment />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/produce"
                component={() => (
                    <CmcsContractLayout>
                        <ContractProduce />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/admin"
                component={() => (
                    <CmcsContractLayout>
                        <ContractAdminPage />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/dashboard"
                component={() => (
                    <CmcsLayout>
                        <CmcDashboardPage />
                    </CmcsLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/dashboard"
                component={() => (
                    <CmcsContractLayout>
                        <ContractDashBoard />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/editor"
                component={() => (
                    <CmcsContractLayout>
                        <ContractEditor />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/bill"
                component={() => (
                    <CmcsContractLayout>
                        <ContractBill />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/budget"
                component={() => (
                    <CmcsContractLayout>
                        <ContractBudget />
                    </CmcsContractLayout>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/contract/:id/product"
                component={() => (
                    <CmcsContractLayout>
                        <ContractProduct />
                    </CmcsContractLayout>
                )}
            />
            <Route path="/cmcs/*" component={ErrorPage} />
        </Switch>
    )
};

export default CmcsRouter;