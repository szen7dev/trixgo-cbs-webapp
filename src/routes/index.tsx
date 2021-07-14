import { FC } from "react";

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
import ExampleLayout from "views/layouts/Example";

// Main Pages
import SignInPage from "views/pages/main/SignIn";
import ErrorPage from "views/pages/main/Error";

// Dashboard Pages
import DashboardPage from "views/pages/dashboard";

// Customers Pages
import CustomersPage from "views/pages/customers";

// Orders Pages
import OrdersPage from "views/pages/orders";

// Campaigns Pages
import CampaignsPage from "views/pages/campaigns";

// Team Pages
import TeamPage from "views/pages/team";

// Messages pages
import MessagesHomePage from "views/pages/messages/home";
import MessagesDetailPage from "views/pages/messages/detail";

// Tasks Pages
import TasksPage from "views/pages/tasks";

// Applications Pages
import ApplicationsPage from "views/pages/applications";

// Settings Pages
import SettingsPage from "views/pages/settings";

// Example pages
import ExamplePage from "views/pages/example";

const Routes: FC = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
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
                    <Route path="/authentication/*" component={ErrorPage} />
                  </Switch>
                </FullPageLayout>
              </Route>

              <Route exact path="/">
                <Redirect to="/dashboard" />
              </Route>

              <Route path="/dashboard">
                <MainLayout>
                  <Switch>
                    <ProtectedRoute
                      exact
                      path="/dashboard"
                      component={DashboardPage}
                    />
                    <Route path="/dashboard/*" component={ErrorPage} />
                  </Switch>
                </MainLayout>
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

              <Route path="/team">
                <MainLayout>
                  <Switch>
                    <ProtectedRoute exact path="/team" component={TeamPage} />
                    <Route path="/team/*" component={ErrorPage} />
                  </Switch>
                </MainLayout>
              </Route>

              <Route path="/messages/:path?">
                <ChatProvider>
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
                </ChatProvider>
              </Route>

              <Route path="/tasks">
                <MainLayout>
                  <Switch>
                    <ProtectedRoute exact path="/tasks" component={TasksPage} />
                    <Route path="/tasks/*" component={ErrorPage} />
                  </Switch>
                </MainLayout>
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

              <Route path="/datahub">
                <MainLayout>
                  <h2>New content</h2>
                </MainLayout>
              </Route>

              <Route path="/example">
                <ExampleLayout>
                  <Switch>
                    <Route exact path="/example" component={ExamplePage} />
                    <Route path="/example/*" component={ErrorPage} />
                  </Switch>
                </ExampleLayout>
              </Route>

              <Route path="*">
                <FullPageLayout>
                  <Route path="/*" component={ErrorPage} />
                </FullPageLayout>
              </Route>
            </Switch>
          </ModalProvider>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default Routes;
