/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import ProtectedRoute from "components/common/ProtectedRoute";

/*=====LAYOUTS=====*/
import HomeLayout from "views/layouts/HomeLayout";

/*=====PAGES=====*/
import DashboardPage from "views/pages/dashboard";
import ProjectAppAdminPage from "views/pages/ppt/permission/ProjectAppAdminPage";
import ProjectCategoryPage from "views/pages/ppt/ProjectCategoryPage";
import ProjectDeployingPage from "views/pages/ppt/ProjectDeployingPage";
import ProjectHomePage from "views/pages/ppt/ProjectHomePage";
import ProjectDashBoardPage from "views/pages/ppt/ProjectDashBoardPage";
import ProjectFolderPage from "views/pages/ppt/ProjectFolderPage";
import ProjectSchedulePage from "views/pages/ppt/ProjectSchedulePage";
import ProjectBudgetPage from "views/pages/ppt/ProjectBudgetPage";
import ProjectBiddingPage from "views/pages/ppt/ProjectBiddingPage";
import ProjectPaymentPage from "views/pages/ppt/ProjectPaymentPage";
import ProjectDocumentPage from "views/pages/ppt/ProjectDocumentPage";
import ProjectPhotoPage from "views/pages/ppt/ProjectPhotoPage";
import ProjectRfiPage from "views/pages/ppt/ProjectRfiPage";
import ProjectRfaPage from "views/pages/ppt/ProjectRfaPage";
import ProjectInspectionPage from "views/pages/ppt/ProjectInspectionPage";
import ProjectPunchPage from "views/pages/ppt/ProjectPunchPage";
import ProjectProductionPage from "views/pages/ppt/ProjectProductionPage";
import ProjectOtherPage from "views/pages/ppt/ProjectOtherPage";
// import ProjectResourcePage from "views/pages/ppt/ProjectResourcePage";
import ProjectMomPage from "views/pages/ppt/ProjectMomPage";
import ProjectReportPage from "views/pages/ppt/ProjectReportPage";
import ProjectDirectoryPage from "views/pages/ppt/ProjectDirectoryPage";
import ProjectAdminPage from "views/pages/ppt/ProjectAdminPage";
import DocumentDashboardPage from 'views/pages/document/screens/DocumentDashboardPage';
import ProjectPhotoPackagePage from "views/pages/ppt/ProjectPhotoPackagePage";
import ProjectDrawingRoutes from "views/pages/ppt/routes/ProjectDrawingRoutes";
import ProjectResourceRoutes from "views/pages/ppt/routes/ProjectResourceRoutes";
import ProjectDashboardRoutes from "views/pages/ppt/routes/ProjectDashboardRoutes";
import ProjectDashboardRoutes2 from "views/pages/ppt/routes/ProjectDashboardRoutes2";
import AdminDetail from "views/pages/ppt/permission/components/AdminDetail";
import TasksHomePage from "views/pages/tasks/home";
import TaskDetailPage from "views/pages/tasks/detail";
import ProjectLayout from "views/layouts/ProjectLayout";
import ErrorPage from "views/pages/authentication/Error";

const PCMRouter: FC = () => {
    return (
        <>
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
                        // exact
                        path={"/pcm/dashboard-portfolio"}
                        component={({ ...props }: RouteComponentProps) => (
                            <HomeLayout>
                                <ProjectDashboardRoutes2 {...props} />
                            </HomeLayout>
                        )}
                    />
                    <ProtectedRoute
                        // exact
                        path={"/pcm/dashboard-task"}
                        component={({ ...props }: RouteComponentProps) => (
                            <HomeLayout>
                                <ProjectDashboardRoutes {...props} />
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
                        component={({ ...props }: RouteComponentProps) => (
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
                                <ProjectDocumentPage {...props} />
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
                        path={"/pcm/project/:id/drawing"}
                        component={(props: RouteComponentProps) => (
                            <ProjectLayout>
                                <ProjectDrawingRoutes {...props} />
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
                        // exact
                        path={"/pcm/project/:id/resource"}
                        component={(props: RouteComponentProps) => (
                            <ProjectLayout>
                                <ProjectResourceRoutes {...props} />
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
                        path={"/pcm/project/:id/production"}
                        component={() => (
                            <ProjectLayout>
                                <ProjectProductionPage />
                            </ProjectLayout>
                        )}
                    />
                    <ProtectedRoute
                        exact
                        path={"/pcm/project/:id/other"}
                        component={() => (
                            <ProjectLayout>
                                <ProjectOtherPage />
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

            <Route path="/ppt/project/:id/document" component={PPTRoutes} />

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
        </>
    )
};

export default PCMRouter;