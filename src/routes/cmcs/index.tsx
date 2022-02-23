/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====2.PROVIDERS=====*/

/*=====3.LAYOUTS=====*/
import { CmcsLayout } from "views/cmcs/shareComponents/layouts/CmcsLayout";
import { ProtectedRoute } from "routes/components";

/*=====4.CONFIG ROUTE=====*/

/*=====5.PAGES/COMPONENTS=====*/
import {
    CmcHomePage,
    CmcIncomePage,
    CmcGuaranteePage,
} from "views/cmcs/pages";
import ErrorPage from "views/authentication/Error";

const CmcsRouter: FC = () => {
    return (
        <Switch>
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
            <ProtectedRoute
                exact
                path="/cmcs/guarantee"
                component={() => (
                    <CmcsLayout>
                        <CmcGuaranteePage />
                    </CmcsLayout>
                )}
            />
            {/* <Route
                exact
                path="/cmcs/dashboard"
                component={() => (
                    <CmcsLayout>
                        <CmcDashboardPage />
                    </CmcsLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/portfolio"
                component={() => (
                    <CmcsLayout>
                        <CmcPortfolioPage />
                    </CmcsLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/expenses"
                component={() => (
                    <CmcsLayout>
                        <CmcExpensePage />
                    </CmcsLayout>
                )}
            />
            
            <Route
                exact
                path="/cmcs/contract/:id/admin"
                component={() => (
                    <CmcsContractLayout>
                        <ContractAdminPage />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/home"
                component={() => (
                    <CmcsContractLayout>
                        <ContractHome />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/dashboard"
                component={() => (
                    <CmcsContractLayout>
                        <ContractDashBoard />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/editor"
                component={() => (
                    <CmcsContractLayout>
                        <ContractEditor />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/bill"
                component={() => (
                    <CmcsContractLayout>
                        <ContractBill />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/budget"
                component={() => (
                    <CmcsContractLayout>
                        <ContractBudget />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/produce"
                component={() => (
                    <CmcsContractLayout>
                        <ContractProduce />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/ipc"
                component={() => (
                    <CmcsContractLayout>
                        <ContractIpc />
                    </CmcsContractLayout>
                )}
            />
            <Route
                exact
                path="/cmcs/contract/:id/product"
                component={() => (
                    <CmcsContractLayout>
                        <ContractProduct />
                    </CmcsContractLayout>
                )}
            /> */}
        </Switch>
    )
};

export default CmcsRouter;