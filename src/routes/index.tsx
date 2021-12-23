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

// Layouts
import FullPageLayout from "views/layouts/FullPage";
import MainLayout from "views/layouts/Main";
import HomeLayout from "views/layouts/HomeLayout";
import KanbanBoardLayout from "views/layouts/KanbanBoardLayout";
import PcmLayout from "views/layouts/PcmLayout";
import CmcsLayout from "views/layouts/CmcsLayout";

// Authentication Pages
import SignInPage from "views/pages/authentication/SignIn";
import RegisterPage from "views/pages/authentication/Register";
import ResetPasswordPage from "views/pages/authentication/ResetPassword";
import ErrorPage from "views/pages/authentication/Error";

// Dashboard Pages
import DashboardPage from "views/pages/dashboard";

// KanbanBoardPage Pages
import KanbanBoardPage from "views/pages/kanbanBoard";

// Customers Pages
import CustomersPage from "views/pages/customers";

// Orders Pages
import OrdersPage from "views/pages/orders";

// Campaigns Pages
import CampaignsPage from "views/pages/campaigns";

// Team Pages
import HumansPage from "views/pages/humans";
import HumanInfo from "views/pages/humans/components/HumanInfo";

// Messages pages
import MessagesHomePage from "views/pages/messages/home";
import MessagesDetailPage from "views/pages/messages/detail";

// Tasks Pages
import TasksHomePage from "views/pages/tasks/home";
import TaskDetailPage from "views/pages/tasks/detail";
import TaskDashboardType2 from "views/pages/tasks/dashboard/Type2";

// Teaser Pages
import TeaserPage from "views/pages/teaser";

// Applications Pages
import ApplicationsPage from "views/pages/applications";

// Settings Pages
import SettingsPage from "views/pages/settings";

// Project pages
import ProjectCategoryPage from "views/pages/ppt/ProjectCategoryPage";
import ProjectDeployingPage from "views/pages/ppt/ProjectDeployingPage";
import ProjectInvestPage from "views/pages/ppt/ProjectInvestPage";
import ProjectHomePage from "views/pages/ppt/ProjectHomePage";
import ProjectReportPage from "views/pages/ppt/ProjectReportPage";
import ProjectBudgetPage from "views/pages/ppt/ProjectBudgetPage";
import ProjectProgressPage from "views/pages/ppt/ProjectProgressPage";

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

// Social pages
import SocialHomePage from "views/pages/media/screens/HomePage";
import SocialPostPage from "views/pages/media/screens/PostPage";
import SocialCommentsPage from "views/pages/media/screens/CommetsPage";

// Document pages
import DocumentLayoutContainer from "views/pages/document/layouts/DocumentLayoutContainer";

//Financial
import FinancialPlanningDetailPage from "views/pages/financial/planning/FinancialPlanningDetailPage";

// Cmc pages
import CmcsPage from "views/pages/cmcs";
import CmcManagementReport from "views/pages/cmcs/components/CmcManagementReport";
import FinancialCashFlowPage from "../views/pages/financial/planning/FinancialCashFlowPage";

// Support pages
import SupportPage from "views/pages/support/components/home";
import RegisterDashboardPage from "views/pages/support/components/register";

const Routes: FC = () => {

  useEffect(() => {
    document.title = "Trixgo | Quản trị doanh nghiệp";
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

                  <Route exact path="/">
                    <Redirect to="/dashboard" />
                  </Route>

                  <Route path="/dashboard">
                    <HomeLayout>
                      <Switch>
                        <ProtectedRoute
                          exact
                          path="/dashboard"
                          component={DashboardPage}
                        />
                        <Route path="/dashboard/*" component={ErrorPage} />
                      </Switch>
                    </HomeLayout>
                  </Route>

                  <Route path="/kanban-board">
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
                  </Route>

                <Route path="/customers">
                  <MainLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/customers"
                        component={CustomersPage}
                      />
                      <Route path="/customers/*" component={ErrorPage} />
                    </Switch>
                  </MainLayout>
                </Route>

                <Route path="/orders">
                  <MainLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/orders"
                        component={OrdersPage}
                      />
                      <Route path="/orders/*" component={ErrorPage} />
                    </Switch>
                  </MainLayout>
                </Route>

                <Route path="/campaigns">
                  <MainLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/campaigns"
                        component={CampaignsPage}
                      />
                      <Route path="/campaigns/*" component={ErrorPage} />
                    </Switch>
                  </MainLayout>
                </Route>

                <Route path="/human/home">
                  <HomeLayout>
                    <Switch>
                      <ProtectedRoute exact path="/human/home" component={HumansPage} />
                      <ProtectedRoute path="/human/home/hid=:id" component={HumanInfo} />
                    </Switch>
                  </HomeLayout>
                </Route>

                <Route path="/messages/:path?">
                  <MainLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/messages"
                        component={MessagesHomePage}
                      />
                      <ProtectedRoute
                        exact
                        path="/messages/detail"
                        component={MessagesDetailPage}
                      />
                      <Route path="/messages/*" component={ErrorPage} />
                    </Switch>
                  </MainLayout>
                </Route>

                <Route path="/pcm/:path?">
                  <PcmLayout>
                    <Switch>
                      <ProtectedRoute exact path={"/pcm/home"} component={TasksHomePage} />
                      <ProtectedRoute exact path={"/pcm/detail/:id"} component={TaskDetailPage} />
                      <ProtectedRoute exact path={"/pcm/dashboard/type=2"} component={TaskDashboardType2} />
                    </Switch>
                  </PcmLayout>
                </Route>

                <Route path="/teaser">
                  <HomeLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/teaser"
                        component={TeaserPage}
                      />
                      <Route path="/applications/*" component={ErrorPage} />
                    </Switch>
                  </HomeLayout>
                </Route>

                <Route path="/applications">
                  <MainLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/applications"
                        component={ApplicationsPage}
                      />
                      <Route path="/applications/*" component={ErrorPage} />
                    </Switch>
                  </MainLayout>
                </Route>

                <Route path="/settings">
                  <MainLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/settings"
                        component={SettingsPage}
                      />
                      <Route path="/settings/*" component={ErrorPage} />
                    </Switch>
                  </MainLayout>
                </Route>

                <Route path="/ppt">
                  <Switch>
                    <Route
                      exact
                      path="/ppt/page6"
                      component={ProjectProgressPage}
                    />
                    <Router>
                      <HomeLayout>
                        <Switch>
                          <Route
                            exact
                            path="/ppt/home"
                            component={ProjectCategoryPage}
                          />
                          <Route
                            exact
                            path="/ppt/page2"
                            component={ProjectDeployingPage}
                          />
                          <Route
                            exact
                            path="/ppt/page3"
                            component={ProjectInvestPage}
                          />
                          <Route
                            exact
                            path="/ppt/page4"
                            component={ProjectHomePage}
                          />
                          <Route
                            exact
                            path="/ppt/page5"
                            component={ProjectReportPage}
                          />
                          <Route
                            exact
                            path="/ppt/page7"
                            component={ProjectBudgetPage}
                          />
                          <Route path="/ppt/*" component={ErrorPage} />
                        </Switch>
                      </HomeLayout>
                    </Router>
                  </Switch>
                </Route>

                <Route path="/social">
                  <HomeLayout>
                    <Switch>
                      <ProtectedRoute
                        exact
                        path="/applications"
                        component={ApplicationsPage}
                      />
                      <Route exact path="/social/home" component={SocialHomePage} />
                      <Route exact path="/social/post/:mediaID" component={SocialPostPage} />
                      <Route exact path="/social/comments" component={SocialCommentsPage} />
                      <Route path="/social/*" component={ErrorPage} />
                    </Switch>
                  </HomeLayout>
                </Route>

                <Route path="/document">
									<DocumentLayoutContainer />
                </Route>

                <Route path="/accounting/:path?">
                  <HomeLayout>
                    <Switch>
                      <Route exact path="/accounting">
                        <Redirect to="/accounting/home" />
                      </Route>
                      <ProtectedRoute exact path="/accounting/home" component={AccountingTicketsPage} />
                      <ProtectedRoute exact path="/accounting/home/:id" component={AccountingTicketDetailPage} />
                      <ProtectedRoute exact path="/accounting/detail" component={AccountingDetailPage} />
                      <ProtectedRoute exact path="/accounting/diary" component={AccountingDiaryPage} />
                      <ProtectedRoute exact path="/accounting/in-out" component={AccountingInOutPage} />
                      <ProtectedRoute exact path="/accounting/debt" component={AccountingDebtPage} />
                      <ProtectedRoute exact path="/accounting/diary" component={AccountingDiaryPage} />
                      <ProtectedRoute exact path="/accounting/vat" component={AccountingVatPage} />
                      <ProtectedRoute exact path="/accounting/report-finance" component={AccountingReportFinancePage} />
                      <ProtectedRoute exact path="/accounting/support-tools" component={AccountingSupportToolsPage} />
                    </Switch>
                  </HomeLayout>
                </Route>

                <Route exact path="/fin/home">
                    <Redirect to="/fin/cashflow" />
                </Route>

                <Route path="/fin/:path?">
                  <HomeLayout>
                    <Switch>
                      <ProtectedRoute exact path={"/fin/cashflow"} component={FinancialCashFlowPage} />
                      <ProtectedRoute exact path={"/fin/cashflow/:id"} component={FinancialPlanningDetailPage} />
                    </Switch>
                  </HomeLayout>
                </Route>

                <Route path="/cmcs">
                  <CmcsLayout>
                    <Switch>
                      <Route exact path="/cmcs/home" component={CmcsPage} />
                      <Route exact path="/cmcs/dashboard" component={CmcManagementReport} />
                    </Switch>
									</CmcsLayout>
                </Route>

                <Route path="/support">
                  <HomeLayout>
                    <Switch>
                      <Route exact path="/support/home" component={SupportPage} />
                      <Route exact path="/support/register" component={RegisterDashboardPage} />
                    </Switch>
									</HomeLayout>
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
