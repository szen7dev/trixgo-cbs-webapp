import { FC, useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

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

/*=====PAGES=====*/
// Authentication Pages
import SignInPage from "views/pages/authentication/SignIn";
import RegisterPage from "views/pages/authentication/Register";
import ResetPasswordPage from "views/pages/authentication/ResetPassword";
import ErrorPage from "views/pages/authentication/Error";

// Dashboard Pages
import DashboardPage from "views/pages/dashboard";

// KanbanBoardPage Pages
import KanbanBoardPage from "views/pages/kanbanBoard";

// Human pages
import HumanHomePage from "views/pages/humans/HumanHomePage";
import HumanCetificateFilterPage from "views/pages/humans/HumanCetificateFilterPage";
import HumanOtherFilterPage from "views/pages/humans/HumanOtherFilterPage";
import HumanExpiredPage from "views/pages/humans/HumanExpiredPage";
import HumanInfo from "views/pages/humans/components/HumanInfo";

// Messages pages

// Tasks pages
import TasksHomePage from "views/pages/tasks/home";
import TaskDetailPage from "views/pages/tasks/detail";
import TaskDashboardType2 from "views/pages/tasks/dashboard/Type2";

// Personal pages
import PersonalNotificationPage from "views/pages/personal/PersonalNotificationPage";
import PersonalNotePage from "views/pages/personal/PersonalNotePage";
import PersonalBillPage from "views/pages/personal/PersonalBillPage";
import PersonalHomePage from "views/pages/personal/PersonalHomePage";
import PersonalConfigPage from "views/pages/personal/PersonalConfigPage";
import PersonalFriendPage from "views/pages/personal/PersonalFriendPage";
import PersonalHistoryPage from "views/pages/personal/PersonalHistoryPage";

// Help pages
import HelpCenterPage from "views/pages/help/HelpCenterPage";

// Project pages (Project and Construction Management)
import ProjectCategoryPage from "views/pages/ppt/ProjectCategoryPage";
import ProjectDeployingPage from "views/pages/ppt/ProjectDeployingPage";
import ProjectInvestPage from "views/pages/ppt/ProjectInvestPage";
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

// Accounting pages
import AccountingTicketsPage from "views/pages/accounting/AccountingTicketsPage";
import AccountingDetailPage from "views/pages/accounting/AccountingDetailPage";
import AccountingDiaryPage from "views/pages/accounting/AccountingDiaryPage";
import AccountingInOutPage from "views/pages/accounting/AccountingInOutPage";
import AccountingDebtPage from "views/pages/accounting/AccountingDebtPage";
import AccountingVatPage from "views/pages/accounting/AccountingVatPage";
import AccountingReportFinancePage from "views/pages/accounting/AccountingReportFinancePage";
import AccountingSupportToolsPage from "views/pages/accounting/AccountingSupportToolsPage";
import AccountingTicketDetailPage from "views/pages/accounting/AccountingTicketDetailPage";

// Bidding pages
import BiddingHomePage from "views/pages/bidding/BiddingHomePage";
import BiddingOtherPage from "views/pages/bidding/BiddingOtherPage";

// Social pages
import SocialHomePage from "views/pages/media/screens/HomePage";
import SocialPostPage from "views/pages/media/screens/PostPage";
import SocialCommentsPage from "views/pages/media/screens/CommetsPage";

// Document pages
import DocumentLayoutContainer from "views/pages/document/layouts/DocumentLayoutContainer";

// Financial pages
import FinancialCashFlowPage from "../views/pages/financial/planning/FinancialCashFlowPage";
import FinancialPlanningDetailPage from "views/pages/financial/planning/FinancialPlanningDetailPage";

// Cmcs pages
import CmcHomePage from "views/pages/cmcs/CmcHomePage";
import CmcDashboardPage from "views/pages/cmcs/CmcDashboardPage";
import CmcPortfolioPage from "views/pages/cmcs/CmcPortfolioPage";
import CmcIncomePage from "views/pages/cmcs/CmcIncomePage";
import CmcExpensePage from "views/pages/cmcs/CmcExpensePage";
import CmcGuaranteePage from "views/pages/cmcs/CmcGuaranteePage";
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

// Timesheet pages
import TimesheetHomePage from 'views/pages/timesheet/home'
import TimesheetDetailPage from 'views/pages/timesheet/detail'
import MessageList from "../views/pages/messages/list";
import MessagesHome from "../views/pages/messages/home/index_v2";

const Routes: FC = () => {
  useEffect(() => {
    document.title = "CBS | Quản trị doanh nghiệp";
  }, []);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
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
                    </Switch>
                  </SupportLayout>
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
                      <Route exact path="/personal/notification" component={PersonalNotificationPage}/>
                      <Route exact path="/personal/note" component={PersonalNotePage}/>
                      <Route exact path="/personal/bill" component={PersonalBillPage}/>
                      <Route exact path="/personal/home" component={PersonalHomePage}/>
                      <Route exact path="/personal/friend" component={PersonalFriendPage}/>
                      <Route exact path="/personal/history" component={PersonalHistoryPage}/>
                      <Route exact path="/personal/config" component={PersonalConfigPage}/>
                      <Route path="/personal/*" component={ErrorPage} />
                    </Switch>
                  </PersonalLayout>
                </Route>

                <Route path="/bidding">
                  <BiddingLayout>
                    <Switch>
                      <Route exact path="/bidding/home" component={BiddingHomePage}/>
                      <Route exact path="/bidding/other" component={BiddingOtherPage}/>
                      <Route path="/bidding/*" component={ErrorPage} />
                    </Switch>
                  </BiddingLayout>
                </Route>

                <Route path="/operation">
                  <OperationLayout>
                    <Switch>
                    <Route exact path="/operation/home" component={PersonalNotificationPage}/>
                      <Route exact path="/operation/other" component={PersonalNotePage}/>
                      <Route path="/operation/*" component={ErrorPage} />
                    </Switch>
                  </OperationLayout>
                </Route>

                <Route path="/ree">
                  <ReeLayout>
                    <Switch>
                    <Route exact path="/ree/home" component={PersonalNotificationPage}/>
                      <Route exact path="/ree/other" component={PersonalNotePage}/>
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
                          <ProjectInvestPage />
                        </HomeLayout>
                      )}
                    />
                    <ProtectedRoute
                      exact
                      path={"/pcm/dashboard-task"}
                      component={() => (
                        <HomeLayout>
                          <KanbanBoardPage />
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
                      exact
                      path={"/pcm/project/:id/folder"}
                      component={() => (
                        <ProjectLayout>
                          <ProjectFolderPage />
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
                      exact
                      path={"/pcm/project/:id/bidding"}
                      component={() => (
                        <ProjectLayout>
                          <ProjectBiddingPage />
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
                      exact
                      path={"/pcm/project/:id/document"}
                      component={() => (
                        <ProjectLayout>
                          <ProjectDocumentPage />
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
                        component={SocialHomePage}
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
                  <Switch>
                    {/*<ProtectedRoute*/}
                    {/*  exact*/}
                    {/*  path="/messages"*/}
                    {/*  component={MessagesHomePage}*/}
                    {/*/>*/}
                    {/*<ProtectedRoute*/}
                    {/*  exact*/}
                    {/*  path="/messages/detail"*/}
                    {/*  component={MessagesDetailPage}*/}
                    {/*/>*/}
                    {/*<Route path="/messages/*" component={ErrorPage} />*/}

                    <ProtectedRoute exact path={"/messages"} component={MessagesHome}/>
                  </Switch>
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
                        path="/accounting/diary"
                        component={AccountingDiaryPage}
                      />
                      <ProtectedRoute
                        exact
                        path="/accounting/in-out"
                        component={AccountingInOutPage}
                      />
                      <ProtectedRoute
                        exact
                        path="/accounting/debt"
                        component={AccountingDebtPage}
                      />
                      <ProtectedRoute
                        exact
                        path="/accounting/diary"
                        component={AccountingDiaryPage}
                      />
                      <ProtectedRoute
                        exact
                        path="/accounting/vat"
                        component={AccountingVatPage}
                      />
                      <ProtectedRoute
                        exact
                        path="/accounting/report-finance"
                        component={AccountingReportFinancePage}
                      />
                      <ProtectedRoute
                        exact
                        path="/accounting/support-tools"
                        component={AccountingSupportToolsPage}
                      />
                    </Switch>
                  </AccountingLayout>
                </Route>

                <Route exact path="/fin/home">
                  <Redirect to="/fin/cashflow" />
                </Route>
                <Route path="/fin/:path?">
                  <FinLayout>
                    <Switch>
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
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
