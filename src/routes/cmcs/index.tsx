/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import { CmcsLayout, CmcsContractLayout } from "views/cmcs/shareComponents/layouts";

/*=====PAGES=====*/
import CmcHomePage from "views/cmcs/CmcHomePage";
import CmcDashboardPage from "views/cmcs/CmcDashboardPage";
import CmcPortfolioPage from "views/cmcs/CmcPortfolioPage";
import CmcIncomePage from "views/cmcs/CmcIncomePage";
import CmcExpensePage from "views/cmcs/CmcExpensePage";
import CmcGuaranteePage from "views/cmcs/CmcGuaranteePage";
import ContractAdminPage from "views/cmcs/components/views/contract/ContractAdminPage";
import ContractHome from "views/cmcs/components/views/contract/ContractHome";
import ContractDashBoard from "views/cmcs/components/views/contract/ContractDashBoard";
import ContractEditor from "views/cmcs/components/views/contract/ContractEditor";
import ContractBill from "views/cmcs/components/views/contract/ContractBill";
import ContractBudget from "views/cmcs/components/views/contract/ContractBudget";
import ContractProduce from "views/cmcs/components/views/contract/ContractProduce";
import ContractIpc from "views/cmcs/components/views/contract/ContractIpc";
import ContractProduct from "views/cmcs/components/views/contract/ContractProduct";

const CmcsRouter: FC = () => {
    return (
        <>
            <Route path="/cmcs/:path">
                <Switch>
                    <Route
                        exact
                        path="/cmcs/home"
                        component={() => (
                            <CmcsLayout>
                                <CmcHomePage />
                            </CmcsLayout>
                        )}
                    />
                    <Route
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
                        path="/cmcs/income"
                        component={() => (
                            <CmcsLayout>
                                <CmcIncomePage />
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
                        path="/cmcs/guarantee"
                        component={() => (
                            <CmcsLayout>
                                <CmcGuaranteePage />
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
                    />
                </Switch>
            </Route>
        </>
    )
};

export default CmcsRouter;