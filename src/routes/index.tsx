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
import DocumentLayout from "views/layouts/DocumentLayout";
import FinLayout from "views/layouts/FinLayout";
import HumanLayout from "views/layouts/HumanLayout";
import OperationLayout from "views/layouts/OperationLayout"; //*** */
import PcmLayout from "views/layouts/PcmLayout";
import PersonalLayout from "views/layouts/PersonalLayout";
import ReeLayout from "views/layouts/ReeLayout"; //*** */
import SupportLayout from "views/layouts/SupportLayout";
import TimesheetLayout from "views/layouts/TimesheetLayout";
import KanbanBoardLayout from "views/layouts/KanbanBoardLayout";
import CmcsContractLayout from "views/layouts/CmcsContractLayout";
import ProjectLayout from "views/layouts/ProjectLayout";
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

// Dashboard pages
import DashboardPage from "views/pages/dashboard";

// KanbanBoardPage pages
import KanbanBoardPage from "views/pages/kanbanBoard";

// Human pages
import HumanHomePage from "views/pages/humans/HumanHomePage";
import HumanCetificateFilterPage from "views/pages/humans/HumanCetificateFilterPage";
import HumanOtherFilterPage from "views/pages/humans/HumanOtherFilterPage";
import HumanExpiredPage from "views/pages/humans/HumanExpiredPage";
import HumanInfo from "views/pages/humans/components/HumanInfo";

// Tasks pages
import TasksHomePage from "views/pages/tasks/home";
import TaskDetailPage from "views/pages/tasks/detail";
import TaskDashboardType2 from "views/pages/tasks/dashboard/Type2";

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

// Project pages (Project and Construction Management)
import ProjectAppAdminPage from "views/pages/ppt/permission/ProjectAppAdminPage";
import ProjectCategoryPage from "views/pages/ppt/ProjectCategoryPage";
import ProjectDeployingPage from "views/pages/ppt/ProjectDeployingPage";
import ProjectPortfolioPage from "views/pages/ppt/ProjectPortfolioPage";
import ProjectHomePage from "views/pages/ppt/ProjectHomePage";
import ProjectDashBoardPage from "views/pages/ppt/ProjectDashBoardPage";
import ProjectFolderPage from "views/pages/ppt/ProjectFolderPage";
import ProjectSchedulePage from "views/pages/ppt/ProjectSchedulePage";
import ProjectBudgetPage from "views/pages/ppt/ProjectBudgetPage";
import ProjectBiddingPage from "views/pages/ppt/ProjectBiddingPage";
import ProjectPaymentPage from "views/pages/ppt/ProjectPaymentPage";
import ProjectDocumentPage from "views/pages/ppt/ProjectDocumentPage";
import ProjectPhotoPage from "views/pages/ppt/ProjectPhotoPage";
import ProjectDrawingPage from "views/pages/ppt/ProjectDrawingPage";
import ProjectRfiPage from "views/pages/ppt/ProjectRfiPage";
import ProjectRfaPage from "views/pages/ppt/ProjectRfaPage";
import ProjectInspectionPage from "views/pages/ppt/ProjectInspectionPage";
import ProjectPunchPage from "views/pages/ppt/ProjectPunchPage";
import ProjectResourcePage from "views/pages/ppt/ProjectResourcePage";
import ProjectMomPage from "views/pages/ppt/ProjectMomPage";
import ProjectReportPage from "views/pages/ppt/ProjectReportPage";
import ProjectDirectoryPage from "views/pages/ppt/ProjectDirectoryPage";
import ProjectAdminPage from "views/pages/ppt/ProjectAdminPage";
import DocumentDashboardPage from 'views/pages/document/screens/DocumentDashboardPage';
import ProjectDashboardTaskPage from "views/pages/ppt/ProjectDashboardTaskPage";
import ProjectPhotoPackagePage from "views/pages/ppt/ProjectPhotoPackagePage";
import AdminDetail from "views/pages/ppt/permission/components/AdminDetail";

// Accounting pages
import AccountingDashboardPage from "views/pages/accounting/AccountingDashboardPage";
import AccountingTicketsPage from "views/pages/accounting/AccountingTicketsPage";
import AccountingDetailPage from "views/pages/accounting/AccountingDetailPage";
import AccountingDiaryPage from "views/pages/accounting/Diary/AccountingDiaryPage";
import AccountingInOutPage from "views/pages/accounting/ImportExport/AccountingInOutPage";
import AccountingDebtPage from "views/pages/accounting/Debt/AccountingDebtPage";
import AccountingVatPage from "views/pages/accounting/VAT/AccountingVatPage";
import AccountingReportFinancePage from "views/pages/accounting/FinanceReport/AccountingReportFinancePage";
import AccountingSupportToolsPage from "views/pages/accounting/SupportTool/AccountingSupportToolsPage";
import AccountingTicketDetailPage from "views/pages/accounting/AccountingTicketDetailPage";
import AccountingAdminPage from "views/pages/accounting/admin/AccountingAdminPage";
import ReceivablesCustomers from "views/pages/accounting/Debt/components/ReceivablesCustomers";
import ReceivablesCustomersCode from "views/pages/accounting/Debt/components/ReceivablesCustomersCode";
import AccountingTBookPage from "views/pages/accounting/TBook/AccountingTBookPage";

// Bidding pages
import BiddingHomePage from "views/pages/bidding/BiddingHomePage";
import BiddingOtherPage from "views/pages/bidding/BiddingOtherPage";

// Social pages
import SocialHomePage from "views/pages/media/screens/HomePage";
import SocialPostPage from "views/pages/media/screens/PostPage";
import SocialCommentsPage from "views/pages/media/screens/CommetsPage";
import SocialCategoryPage from "views/pages/media/screens/CategoryPage";

// Document pages
import DocumentLayoutContainer from "views/pages/document/layouts/DocumentLayoutContainer";

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

// Timesheet pages
import TimesheetHomePage from 'views/pages/timesheet/home';
import TimesheetDetailPage from 'views/pages/timesheet/detail';
import MessageList from "../views/pages/messages/list";
import MessagesHome from "../views/pages/messages/home/index_v2";

// Ree pages
import ReeHomePage from 'views/pages/ree/ReeHomePage';

// Operation pages
import OperationHomePage from 'views/pages/operation/OperationHomePage';
import OperationNewsPage from 'views/pages/operation/OperationNewsPage';
import OperationRfsPage from 'views/pages/operation/OperationRfsPage';
import OperationProjectPage from 'views/pages/operation/OperationProjectPage';
import SocialLayoutPrimary from "views/pages/media/layouts/SocialLayoutPrimary";
import DeleteConfirmProvider from "../services/providers/DeleteConfirm";
import MessagesLayout from "../views/layouts/MessagesLayout";

const Routes: FC = () => {
    useEffect(() => {
        document.title = "CBS | Quản trị doanh nghiệp";
    }, []);

    return (
        <Router>
            <AuthProvider>
                <ThemeProvider>
                    <DeleteConfirmProvider>
                        <ChatProvider>
                            <ModalProvider>
                                <Switch>
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
                                                <Route exact path="/owner/home" component={OwnerHomePage}/>
                                                <Route exact path="/owner/grant-permission" component={OwnerGrantPage}/>
                                                <Route path="/owner /*" component={ErrorPage} />
                                            </Switch>
                                        </OwnerLayout>
                                    </Route>

                                    <Route path="/help">
                                        <HelpCenterLayout>
                                            <Switch>
                                                <Route exact path="/help/home" component={HelpCenterPage}/>
                                                <Route path="/help/*" component={ErrorPage} />
                                            </Switch>
                                        </HelpCenterLayout>
                                    </Route>

                                    <Route path="/personal">
                                        <PersonalLayout>
                                            <Switch>
                                                <Route exact path="/personal/notifications" component={PersonalNotificationPage}/>
                                                <Route exact path="/personal/notes" component={PersonalNotePage}/>
                                                <Route exact path="/personal/bills" component={PersonalBillPage}/>
                                                <Route exact path="/personal/home" component={PersonalHomePage}/>
                                                <Route exact path="/personal/friends" component={PersonalFriendPage}/>
                                                <Route exact path="/personal/histories" component={PersonalHistoryPage}/>
                                                <Route exact path="/personal/config" component={PersonalConfigPage}/>
                                                <Route path="/personal/*" component={ErrorPage} />
                                            </Switch>
                                        </PersonalLayout>
                                    </Route>

                                    <Route path="/bidding">
                                        <BiddingLayout>
                                            <Switch>
                                                <Route exact path="/bidding/home" component={BiddingHomePage}/>
                                                <Route exact path="/bidding/exp" component={BiddingOtherPage}/>
                                                <Route path="/bidding/*" component={ErrorPage} />
                                            </Switch>
                                        </BiddingLayout>
                                    </Route>

                                    <Route path="/operation">
                                        <OperationLayout>
                                            <Switch>
                                                <Route exact path="/operation/home" component={OperationHomePage}/>
                                                <Route exact path="/operation/news" component={OperationNewsPage}/>
                                                <Route exact path="/operation/rfs" component={OperationRfsPage}/>
                                                <Route exact path="/operation/project" component={OperationProjectPage}/>
                                                <Route path="/operation/*" component={ErrorPage} />
                                            </Switch>
                                        </OperationLayout>
                                    </Route>

                                    <Route path="/ree">
                                        <ReeLayout>
                                            <Switch>
                                                <Route exact path="/ree/home" component={ReeHomePage}/>
                                                <Route exact path="/ree/other" component={ReeHomePage}/>
                                                <Route path="/ree /*" component={ErrorPage} />
                                            </Switch>
                                        </ReeLayout>
                                    </Route>

                                    <Route exact path="/">
                                        <Redirect to="/pcm/home" />
                                    </Route>

                                    <Route path="/pcm/:path?">
                                        <Switch>
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/admin"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <ProjectAppAdminPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/admin/detail/:id"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <AdminDetail />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/home"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <DashboardPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/projects"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <ProjectCategoryPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/market"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <ProjectDeployingPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/dashboard-portfolio"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <ProjectPortfolioPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/dashboard-task"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <ProjectDashboardTaskPage />
                                                        {/* <KanbanBoardPage /> */}
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/dashboard-document"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <DocumentDashboardPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/mine"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <TasksHomePage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/bookmark"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <TasksHomePage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/draft"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <TasksHomePage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/detail/:id"}
                                                component={() => (
                                                    <HomeLayout>
                                                        <TaskDetailPage />
                                                    </HomeLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/home"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectHomePage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/dashboard"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectDashBoardPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                path={"/pcm/project/:id/folder"}
                                                component={({ ...props }: RouteComponentProps ) => (
                                                    <ProjectLayout>
                                                        <ProjectFolderPage {...props} />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/schedule"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectSchedulePage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/budget"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectBudgetPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                // exact
                                                path={"/pcm/project/:id/bidding"}
                                                component={(props: RouteComponentProps) => (
                                                    <ProjectLayout>
                                                        <ProjectBiddingPage {...props} />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/payment"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectPaymentPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                // exact
                                                path={"/pcm/project/:id/document"}
                                                component={(props: RouteComponentProps) => (
                                                    <ProjectLayout>
                                                        <ProjectDocumentPage {...props}/>
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/photo"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectPhotoPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/photo/package/:packageId"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectPhotoPackagePage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/drawing"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectDrawingPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/rfi"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectRfiPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/rfa"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectRfaPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/inspection"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectInspectionPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/punch"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectPunchPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/resource"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectResourcePage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/mom"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectMomPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/report"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectReportPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/directory"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectDirectoryPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <ProtectedRoute
                                                exact
                                                path={"/pcm/project/:id/admin"}
                                                component={() => (
                                                    <ProjectLayout>
                                                        <ProjectAdminPage />
                                                    </ProjectLayout>
                                                )}
                                            />
                                            <Route path="/pcm/home/*" component={ErrorPage} />
                                        </Switch>
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
                                        <DocumentLayoutContainer />
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

                                    <Route path="/messages/:path?">
                                        <MessagesLayout>
                                            <Switch>
                                                <ProtectedRoute exact path={"/messages"} component={MessagesHome}/>
                                            </Switch>
                                        </MessagesLayout>
                                    </Route>

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
                                                    exact
                                                    path={"/fin/dashboard"}
                                                    component={FinDashboardPage}
                                                />
                                                <ProtectedRoute
                                                    exact
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

                                    <Route path="/timesheet/:path?">
                                        <TimesheetLayout>
                                            <Switch>
                                                <ProtectedRoute
                                                    exact
                                                    path="/timesheet/home"
                                                    component={TimesheetHomePage}
                                                />
                                                <ProtectedRoute
                                                    exact
                                                    path={"/timesheet/home/:id"}
                                                    component={TimesheetDetailPage}
                                                />
                                            </Switch>
                                        </TimesheetLayout>
                                    </Route>

                                    <Route path="*">
                                        <FullPageLayout>
                                            <Route path="/*" component={ErrorPage} />
                                        </FullPageLayout>
                                    </Route>
                                </Switch>
                            </ModalProvider>
                        </ChatProvider>
                    </DeleteConfirmProvider>
                </ThemeProvider>
            </AuthProvider>
        </Router>
    );
};

export default Routes;
