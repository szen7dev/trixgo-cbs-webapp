/*=====1.LIBRARY=====*/
import {FC, lazy} from "react";
import { Route, Switch, matchPath } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { CmcsLayout, CmcsContractLayout } from "views/cmcs/shareComponents/layouts";
import { ProtectedRoute } from "routes/components";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import ErrorPage from "views/authentication/Error";
import LayoutSecondary from "views/cmcs/shareComponents/layouts/LayoutSecondary";
import {CmcsLayoutV2} from "../../shareComponents/layouts/CmcsLayout";

const CmcsAdminFunctionalTab       = lazy(() => import("views/cmcs/pages/CmcAdminPage/pages/CmcsAdminFunctionalTab"))
const CmcsAdminDetail       = lazy(() => import("views/cmcs/pages/CmcAdminPage/pages/CmcsAdminDetail"))
const CmcsAdminAuthorTab       = lazy(() => import("views/cmcs/pages/CmcAdminPage/pages/CmcsAdminAuthorTab"))
const CmcsAdminContractTab       = lazy(() => import("views/cmcs/pages/CmcAdminPage/pages/CmcsAdminContractTab"))
const CmcsAdminContractDetail       = lazy(() => import("views/cmcs/pages/CmcAdminPage/pages/CmcsAdminContractDetail"))
// const CmcHomePage         = lazy(() => import("views/cmcs/pages/CmcHomePage"))
const CmcHomePageV2       = lazy(() => import("views/cmcs/pages/CmcHomePageV2"))
const CmcIncomePage       = lazy(() => import("views/cmcs/pages/CmcIncomePage"))
const CmcPartnerPage      = lazy(() => import("views/cmcs/pages/CmcPartnerPage"))
const CmcGuaranteePage    = lazy(() => import("views/cmcs/pages/CmcGuaranteePage"))
const ContractHome        = lazy(() => import("views/cmcs/pages/ContractHome"))
const ContractIpc         = lazy(() => import("views/cmcs/pages/ContractIpc"))
const ContractPayment     = lazy(() => import("views/cmcs/pages/ContractPayment"))
const ContractProduce     = lazy(() => import("views/cmcs/pages/ContractProduce"))
const ContractExpense     = lazy(() => import("views/cmcs/pages/ContractExpense"))
const ContractAdminPage   = lazy(() => import("views/cmcs/pages/ContractAdminPage"))
const CmcDashboardPage    = lazy(() => import("views/cmcs/pages/CmcDashboardPage"))
const ContractDashBoard   = lazy(() => import("views/cmcs/pages/ContractDashBoard"))
const CmcExpensePage      = lazy(() => import("views/cmcs/pages/CmcExpensePage"))
const ContractEditor      = lazy(() => import("views/cmcs/pages/ContractEditor"))
const ContractBill        = lazy(() => import("views/cmcs/pages/ContractBill"))
const ContractBudget      = lazy(() => import("views/cmcs/pages/ContractBudget"))
const ContractProduct     = lazy(() => import("views/cmcs/pages/ContractProduct"))

const CmcsRouter: FC = () => {
    return (
        <Switch>
            <ProtectedRoute
                path="/cmcs/admin"
                component={() => (
                    <CmcsLayoutV2>
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

                    </CmcsLayoutV2>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/home"
                component={() => (
                    <CmcsLayoutV2>
                        <CmcHomePageV2 />
                    </CmcsLayoutV2>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/income"
                component={() => (
                    <CmcsLayoutV2>
                        <CmcIncomePage />
                    </CmcsLayoutV2>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/partner"
                component={() => (
                    <CmcsLayoutV2>
                        <CmcPartnerPage />
                    </CmcsLayoutV2>
                )}
            />
            <ProtectedRoute
                exact
                path="/cmcs/expense"
                component={() => (
                    <CmcsLayoutV2>
                        <CmcExpensePage />
                    </CmcsLayoutV2>
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
                path="/cmcs/guarantee"
                component={() => (
                    <CmcsLayoutV2>
                        <CmcGuaranteePage />
                    </CmcsLayoutV2>
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
                // path="/cmcs/contract/:id/expense"
                path="/cmcs/contract/:id/spending"
                component={() => (
                    <CmcsContractLayout>
                        <ContractExpense />
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