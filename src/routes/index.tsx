import { FC, useEffect } from "react";

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import { RouteComponentProps } from 'react-router';

import AuthProvider from "services/providers/Auth";
import ProtectedRoute from "components/common/ProtectedRoute";
import ThemeProvider from "services/providers/Theme";
import ModalProvider from "services/providers/Modal";
import ChatProvider from "services/providers/Chat";

/*=====LAYOUTS=====*/
import FullPageLayout from "views/layouts/FullPage";
import MainLayout from "views/layouts/Main";
import HomeLayout from "views/layouts/HomeLayout";
import HelpCenterLayout from "views/layouts/HelpCenterLayout";
import AccountingLayout from "views/layouts/AccountingLayout";
import BiddingLayout from "views/layouts/BiddingLayout"; //*** */
import CmcsLayout from "views/layouts/CmcsLayout";
// import DocumentLayout from "views/layouts/DocumentLayout";
import FinLayout from "views/layouts/FinLayout";
import { HumanLayout } from "shareComponents/layouts/HumanLayout";
import OperationLayout from "views/layouts/OperationLayout"; //*** */
import PcmLayout from "views/layouts/PcmLayout";
import PersonalLayout from "views/layouts/PersonalLayout";
import ReeLayout from "views/layouts/ReeLayout"; //*** */
import SupportLayout from "views/layouts/SupportLayout";
import { TimesheetLayout } from "shareComponents/layouts/TimesheetLayout";
import KanbanBoardLayout from "views/layouts/KanbanBoardLayout";
import CmcsContractLayout from "views/layouts/CmcsContractLayout";
import OwnerLayout from "views/layouts/OwnerLayout";

/*=====PAGES=====*/
// Authentication pages
import SignInPage from "views/pages/authentication/SignIn";
import RegisterPage from "views/pages/authentication/Register";
import ResetPasswordPage from "views/pages/authentication/ResetPassword";
import ErrorPage from "views/pages/authentication/Error";

// Owner pages
import OwnerHomePage from "views/pages/owner/OwnerHomePage";
import OwnerGrantPage from "views/pages/owner/OwnerGrantPage";

// Human pages
import HumanHomePage from "views/humans/HumanHomePage";
import HumanCetificateFilterPage from "views/humans/HumanCetificateFilterPage";
import HumanOtherFilterPage from "views/humans/HumanOtherFilterPage";
import HumanExpiredPage from "views/humans/HumanExpiredPage";
import HumanInfo from "views/humans/components/HumanInfo";

// Personal pages
import PersonalNotificationPage from "views/pages/personal/noti/PersonalNotificationPage";
import PersonalNotePage from "views/pages/personal/note/PersonalNotePage";
import PersonalBillPage from "views/pages/personal/bill/PersonalBillPage";
import PersonalHomePage from "views/pages/personal/home/PersonalHomePage";
import PersonalConfigPage from "views/pages/personal/config/PersonalConfigPage";
import PersonalFriendPage from "views/pages/personal/friends/PersonalFriendPage";
import PersonalHistoryPage from "views/pages/personal/history/PersonalHistoryPage";
import ConfigListDetail from "views/pages/personal/config/components/ConfigListDetail";

// Help pages
import HelpCenterPage from "views/pages/help/HelpCenterPage";

// Accounting pages
import AccountingDashboardPage from "views/accounting/AccountingDashboardPage";
import AccountingTicketsPage from "views/accounting/AccountingTicketsPage";
import AccountingDetailPage from "views/accounting/AccountingDetailPage";
import AccountingDiaryPage from "views/accounting/Diary";
import AccountingInOutPage from "views/accounting/ImportExport/AccountingInOutPage";
import AccountingDebtPage from "views/accounting/Debt/AccountingDebtPage";
import AccountingVatPage from "views/accounting/VAT/AccountingVatPage";
import AccountingReportFinancePage from "views/accounting/FinanceReport/AccountingReportFinancePage";
import AccountingSupportToolsPage from "views/accounting/SupportTool/AccountingSupportToolsPage";
import AccountingTicketDetailPage from "views/accounting/AccountingTicketDetailPage";
import AccountingAdminPage from "views/accounting/admin/AccountingAdminPage";
import ReceivablesCustomers from "views/accounting/Debt/components/ReceivablesCustomers";
import ReceivablesCustomersCode from "views/accounting/Debt/components/ReceivablesCustomersCode";
import AccountingTBookPage from "views/accounting/TBook/AccountingTBookPage";

// Bidding pages
import BiddingHomePage from "views/pages/bidding/BiddingHomePage";
import BiddingOtherPage from "views/pages/bidding/BiddingOtherPage";

// Social pages
import SocialHomePage from "views/pages/media/screens/HomePage";
import SocialPostPage from "views/pages/media/screens/PostPage";
import SocialCommentsPage from "views/pages/media/screens/CommetsPage";
import SocialCategoryPage from "views/pages/media/screens/CategoryPage";

// Document pages
import DocumentRoutes from "views/document/routes/DocumentRoutes";
import PPTRoutes from "views/pages/document/routes/PPTRoutes";

// Datahub pages
import DatahubRoutes from "views/pages/datahub"

// Financial pages
import FinHomePage from "views/pages/financial/FinHomePage";
import FinDashboardPage from "views/pages/financial/FinDashboardPage";
import FinCashbookPage from "views/pages/financial/FinCashbookPage";
import FinancialCashFlowPage from "views/pages/financial/planning/FinancialCashFlowPage";
import FinancialPlanningDetailPage from "views/pages/financial/planning/FinancialPlanningDetailPage";

// Cmcs pages
import CmcHomePage from "views/pages/cmcs/CmcHomePage";
import CmcDashboardPage from "views/pages/cmcs/CmcDashboardPage";
import CmcPortfolioPage from "views/pages/cmcs/CmcPortfolioPage";
import CmcIncomePage from "views/pages/cmcs/CmcIncomePage";
import CmcExpensePage from "views/pages/cmcs/CmcExpensePage";
import CmcGuaranteePage from "views/pages/cmcs/CmcGuaranteePage";
import ContractAdminPage from "views/pages/cmcs/components/views/contract/ContractAdminPage";
import ContractHome from "views/pages/cmcs/components/views/contract/ContractHome";
import ContractDashBoard from "views/pages/cmcs/components/views/contract/ContractDashBoard";
import ContractEditor from "views/pages/cmcs/components/views/contract/ContractEditor";
import ContractBill from "views/pages/cmcs/components/views/contract/ContractBill";
import ContractBudget from "views/pages/cmcs/components/views/contract/ContractBudget";
import ContractProduce from "views/pages/cmcs/components/views/contract/ContractProduce";
import ContractIpc from "views/pages/cmcs/components/views/contract/ContractIpc";
import ContractProduct from "views/pages/cmcs/components/views/contract/ContractProduct";

// Support pages
import SupportPage from "views/pages/support/components/home";
import RegisterDashboardPage from "views/pages/support/components/register";
import SupportCompanyPage from "views/pages/support/SupportCompanyPage";
import SupportGrantPage from "views/pages/support/SupportGrantPage";
import SupportMemberPage from "views/pages/support/SupportMemberPage";
import SupportItemPage from "views/pages/support/SupportItemPage";
import DocumentsManagement from "views/pages/support/components/grant/DocumentsManagement";

// Ree pages
import ReeHomePage from 'views/pages/ree/ReeHomePage';

// Operation pages
import OperationHomePage from 'views/pages/operation/OperationHomePage';
import OperationNewsPage from 'views/pages/operation/OperationNewsPage';
import OperationRfsPage from 'views/pages/operation/OperationRfsPage';
import OperationProjectPage from 'views/pages/operation/OperationProjectPage';
import SocialLayoutPrimary from "views/pages/media/layouts/SocialLayoutPrimary";
import DeleteConfirmProvider from "services/providers/DeleteConfirm";
import RightClickMenuProvider from "services/providers/RightClickMenu";

/*=====NEW ROUTE=====*/
import SampleAppRouter from "./sampleApp";
import AuthenticationRouter from "./authentication";
import MessagesRouter from "./messages";
import PersonalRouter from "./personal";
import PcmRouter from "./pcm";
import MediaRouter from "./media";
import DocumentRouter from "./document";
import HumanRouter from "./human";
import TimesheetRouter from "./timesheet";
import CmcsRouter from "./cmcs";
import AccountingRouter from "./accounting";
import FinancialRouter from "./financial";
import BiddingRouter from "./bidding";
import SupportRouter from "./support";
import ChattingRouter from "./chatting";
import DatahubRouter from "./datahub";
import WorkshopRouter from "./workshop";
import OperationRouter from "./operation";
import ReeRouter from "./ree";
import MarketRouter from "./market";
import QrcodeRouter from "./qrcode";

const Routes: FC = () => {
    useEffect(() => {
        document.title = "CBS | Quản trị doanh nghiệp";
    }, []);

    return (
        <Router>
            <AuthProvider>      {/* Xem lại chỗ này */}
                <ThemeProvider>
                    <RightClickMenuProvider>
                        <DeleteConfirmProvider>
                            <ChatProvider>
                                <ModalProvider>
                                    <Switch>
                                        <SampleAppRouter />
                                        <AuthenticationRouter />
                                        <MessagesRouter />
                                        <PersonalRouter />
                                        <PcmRouter />
                                        <MediaRouter />
                                        <DocumentRouter />
                                        <HumanRouter />
                                        <TimesheetRouter />
                                        <CmcsRouter />
                                        <AccountingRouter />
                                        <FinancialRouter />
                                        <BiddingRouter />
                                        <SupportRouter />
                                        <ChattingRouter />
                                        <DatahubRouter />
                                        <WorkshopRouter />
                                        <OperationRouter />
                                        <ReeRouter />
                                        <MarketRouter />
                                        <QrcodeRouter />
                                       
                                        <Route path="/authentication/:path?">
                                            <FullPageLayout isAuthentication>
                                                <Switch>
                                                    <Route exact path="/authentication">
                                                        <Redirect to="/authentication/sign-in" />
                                                    </Route>
                                                    <Route
                                                        exact
                                                        path="/authentication/sign-in"
                                                        component={SignInPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/authentication/register"
                                                        component={RegisterPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/authentication/reset-password"
                                                        component={ResetPasswordPage}
                                                    />
                                                    <Route path="/authentication/*" component={ErrorPage} />
                                                </Switch>
                                            </FullPageLayout>
                                        </Route>

                                        <Route path="/support">
                                            <SupportLayout>
                                                <Switch>
                                                    <Route
                                                        exact
                                                        path="/support/home"
                                                        component={SupportPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/support/register"
                                                        component={RegisterDashboardPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/support/companies"
                                                        component={SupportCompanyPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/support/grant"
                                                        component={SupportGrantPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/support/grant/documents-management"
                                                        component={DocumentsManagement}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/support/members"
                                                        component={SupportMemberPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/support/items"
                                                        component={SupportItemPage}
                                                    />
                                                    <Route path="/support/*" component={ErrorPage} />
                                                </Switch>
                                            </SupportLayout>
                                        </Route>

                                        <Route path="/owner">
                                            <OwnerLayout>
                                                <Switch>
                                                    <Route exact path="/owner/home" component={OwnerHomePage} />
                                                    <Route exact path="/owner/grant-permission" component={OwnerGrantPage} />
                                                    <Route path="/owner /*" component={ErrorPage} />
                                                </Switch>
                                            </OwnerLayout>
                                        </Route>

                                        <Route path="/help">
                                            <HelpCenterLayout>
                                                <Switch>
                                                    <Route exact path="/help/home" component={HelpCenterPage} />
                                                    <Route path="/help/*" component={ErrorPage} />
                                                </Switch>
                                            </HelpCenterLayout>
                                        </Route>

                                        <Route path="/personal">
                                            <PersonalLayout>
                                                <Switch>
                                                    <Route exact path="/personal/notifications" component={PersonalNotificationPage} />
                                                    <Route exact path="/personal/notes" component={PersonalNotePage} />
                                                    <Route exact path="/personal/bills" component={PersonalBillPage} />
                                                    <Route exact path="/personal/home" component={PersonalHomePage} />
                                                    <Route exact path="/personal/friends" component={PersonalFriendPage} />
                                                    <Route exact path="/personal/histories" component={PersonalHistoryPage} />
                                                    <Route exact path="/personal/config" component={PersonalConfigPage} />
                                                    <Route path="/personal/*" component={ErrorPage} />
                                                </Switch>
                                            </PersonalLayout>
                                        </Route>

                                        <Route path="/bidding">
                                            <BiddingLayout>
                                                <Switch>
                                                    <Route exact path="/bidding/home" component={BiddingHomePage} />
                                                    <Route exact path="/bidding/exp" component={BiddingOtherPage} />
                                                    <Route path="/bidding/*" component={ErrorPage} />
                                                </Switch>
                                            </BiddingLayout>
                                        </Route>

                                        <Route path="/operation">
                                            <OperationLayout>
                                                <Switch>
                                                    <Route exact path="/operation/home" component={OperationHomePage} />
                                                    <Route exact path="/operation/news" component={OperationNewsPage} />
                                                    <Route exact path="/operation/rfs" component={OperationRfsPage} />
                                                    <Route exact path="/operation/project" component={OperationProjectPage} />
                                                    <Route path="/operation/*" component={ErrorPage} />
                                                </Switch>
                                            </OperationLayout>
                                        </Route>

                                        <Route path="/ree">
                                            <ReeLayout>
                                                <Switch>
                                                    <Route exact path="/ree/home" component={ReeHomePage} />
                                                    <Route exact path="/ree/other" component={ReeHomePage} />
                                                    <Route path="/ree /*" component={ErrorPage} />
                                                </Switch>
                                            </ReeLayout>
                                        </Route>

                                        <Route path="/social">
                                            <HomeLayout>
                                                <Switch>
                                                    <Route
                                                        exact
                                                        path="/social/home"
                                                        component={() =>
                                                            <SocialLayoutPrimary>
                                                                <SocialHomePage />
                                                            </SocialLayoutPrimary>
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/social/home/2"
                                                        component={() =>
                                                            <SocialLayoutPrimary>
                                                                <SocialCategoryPage type="department" />
                                                            </SocialLayoutPrimary>
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/social/home/3"
                                                        component={() =>
                                                            <SocialLayoutPrimary>
                                                                <SocialCategoryPage type="digital-conversion" />
                                                            </SocialLayoutPrimary>
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/social/home/4"
                                                        component={() =>
                                                            <SocialLayoutPrimary>
                                                                <SocialCategoryPage type="system" />
                                                            </SocialLayoutPrimary>
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/social/home/5"
                                                        component={() =>
                                                            <SocialLayoutPrimary>
                                                                <SocialCategoryPage type="just-me" />
                                                            </SocialLayoutPrimary>
                                                        }
                                                    />
                                                    <Route
                                                        exact
                                                        path="/social/post/:mediaID"
                                                        component={SocialPostPage}
                                                    />
                                                    <Route
                                                        exact
                                                        path="/social/comments"
                                                        component={SocialCommentsPage}
                                                    />
                                                    <Route path="/social/*" component={ErrorPage} />
                                                </Switch>
                                            </HomeLayout>
                                        </Route>

                                        <Route path="/document">
                                            <DocumentRoutes />
                                        </Route>

                                        <Route path="/ppt/project/:id/document" component={PPTRoutes} />
                                        <Route path="/datahub">
                                            <DatahubRoutes />
                                        </Route>

                                        {/* <Route path="/kanban-board">
                  <KanbanBoardLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/kanban-board"
                        component={KanbanBoardPage}
                      />
                      <Route path="/kanban-board/*" component={ErrorPage} />
                    </Switch>
                  </KanbanBoardLayout>
                </Route> */}

                                        <Route path="/human">
                                            <HumanLayout>
                                                <Switch>
                                                    <ProtectedRoute exact path="/human/home" component={HumanHomePage} />
                                                    <ProtectedRoute exact path="/human/cetificate" component={HumanCetificateFilterPage} />
                                                    <ProtectedRoute exact path="/human/other" component={HumanOtherFilterPage} />
                                                    <ProtectedRoute exact path="/human/expired" component={HumanExpiredPage} />
                                                    <ProtectedRoute exact path="/human/home/hid=:id" component={HumanInfo} />
                                                    <Route path="/human/*" component={ErrorPage} />
                                                </Switch>
                                            </HumanLayout>
                                        </Route>

                                        <MessagesRouter/>

                                        <Route path="/accounting/:path?">
                                            <AccountingLayout>
                                                <Switch>
                                                    <Route exact path="/accounting">
                                                        <Redirect to="/accounting/home" />
                                                    </Route>
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/home"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/dashboard"
                                                        component={AccountingDashboardPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/accbill"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/receipt"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/payment"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/goods-import"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/goods-export"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/invoices"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/debit-note"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/credit-note"
                                                        component={AccountingTicketsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/home/:id"
                                                        component={AccountingTicketDetailPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/detail"
                                                        component={AccountingDetailPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/tbook"
                                                        component={AccountingTBookPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/diary"
                                                        component={AccountingDiaryPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/import-export"
                                                        component={AccountingInOutPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/debt-tracking"
                                                        component={AccountingDebtPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/debt-tracking/account=:id"
                                                        component={ReceivablesCustomers}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/debt-tracking/account/:id/customer/:id"
                                                        component={ReceivablesCustomersCode}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/vat"
                                                        component={AccountingVatPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/financial-report"
                                                        component={AccountingReportFinancePage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/support-tools"
                                                        component={AccountingSupportToolsPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path="/accounting/admin"
                                                        component={AccountingAdminPage}
                                                    />
                                                </Switch>
                                            </AccountingLayout>
                                        </Route>

                                        <Route path="/fin/:path?">
                                            <FinLayout>
                                                <Switch>
                                                    <ProtectedRoute
                                                        exact
                                                        path={"/fin/home"}
                                                        component={FinHomePage}
                                                    />
                                                    <ProtectedRoute
                                                        // exact
                                                        path={"/fin/dashboard"}
                                                        component={FinDashboardPage}
                                                    />
                                                    <ProtectedRoute
                                                        // exact
                                                        path={"/fin/cashbook"}
                                                        component={FinCashbookPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path={"/fin/cashflow"}
                                                        component={FinancialCashFlowPage}
                                                    />
                                                    <ProtectedRoute
                                                        exact
                                                        path={"/fin/cashflow/:id"}
                                                        component={FinancialPlanningDetailPage}
                                                    />
                                                </Switch>
                                            </FinLayout>
                                        </Route>

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

                                        <TimesheetAppRouter />

                                        <Route path="*">
                                            <FullPageLayout>
                                                <Route path="/*" component={ErrorPage} />
                                            </FullPageLayout>
                                        </Route>
                                    </Switch>
                                </ModalProvider>
                            </ChatProvider>
                        </DeleteConfirmProvider>
                    </RightClickMenuProvider>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default Routes;
