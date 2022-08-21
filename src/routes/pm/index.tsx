/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch, Redirect, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/
import { ModalProvider } from "views/document/contexts/modal";

/*=====3.LAYOUTS=====*/
import { PmLayout } from "shareComponents/layouts";
import LayoutSecondary from "views/ppt/sharedComponents/layouts/LayoutSecondary";
import LayoutProjectSecondary from "views/ppt/sharedComponents/layouts/LayoutProjectSecondary";

/*=====4.CONFIG ROUTE=====*/

/*=====5.COMPONENTS=====*/
import { ModalCreateDocument } from "views/document/sharedComponents/common";

/*=====CONTEXTS=====*/
import { ProviderModalPost as ProviderModalMedia } from "views/media/contexts/post";
import { ProviderModalPost as ProviderModalPcm } from "views/pcm/contexts/post";

/*=====PAGES=====*/

import {
  ProjectAdminManagementPage,
  ProjectCashFlowPlanPage,
  ProjectCashFlowPlanChildPage,
  ProjectCategoryPage,
  ProjectResourcePage,
  ProjectSchedulePage,
  ProjectInspectionPage,
  ProjectInspectionTab2Page,
  ProjectInspectionTab3Page,
  ProjectInspectionDetailPage,
  ProjectMilestonePage
} from "views/ppt/pages";

import ProjectAdminFunctionalTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminFunctionalTab";
import ProjectAdminDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminDetail";
import ProjectAdminAuthorTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminAuthorTab";
import ProjectAdminProjectDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectDetail";
import ProjectAdminProjectTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectTab";
import ProjectAdminPositionTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminPositionTab";
import {PmProjectLayout} from "../../shareComponents/layouts/PmLayout/PmProjectLayout";
import {PmHeaderContent} from "../../shareComponents/layouts/PmLayout/components";
import {DocumentProjectLayout} from "../../views/document/pages/DocumentProjectPage/DocumentProjectLayout";

const DocumentOfPackagePage       = lazy(() => import("views/document/pages/DocumentOfPackagePage"))
const DocumentOfTypePage          = lazy(() => import("views/document/pages/DocumentOfTypePage"))
const DocumentDetailPage          = lazy(() => import("views/document/pages/DocumentDetailPage"))
const DocumentFolderPage          = lazy(() => import("views/document/pages/DocumentFolderPage"))
const DocumenDatahubContactPage   = lazy(() => import("views/document/pages/DocumenDatahubContactPage"))
const DocumentProfilePage         = lazy(() => import("views/document/pages/DocumentProfilePage"))
const DocumentProjectPage         = lazy(() => import("views/document/pages/DocumentProjectPage"))
const ProjectSubjectCompanyOfAuthorPage            = lazy(() => import("views/ppt/pages/ProjectSubjectCompanyOfAuthorPage"))
const ProjectPaymentPage          = lazy(() => import("views/ppt/pages/ProjectPaymentPage"))
const ProjectBiddingPage          = lazy(() => import("views/ppt/pages/ProjectBiddingPage"))
const ProjectBudgetPage           = lazy(() => import("views/ppt/pages/ProjectBudgetPage"))
const ProjectBudgetDetailPage     = lazy(() => import("views/ppt/pages/ProjectBudgetDetailPage"))
const ProjectSubjectCompanyOfAssigneePage          = lazy(() => import("views/ppt/pages/ProjectSubjectCompanyOfAssigneePage"))
const ProjectSubjectPage          = lazy(() => import("views/ppt/pages/ProjectSubjectPage"))
const ProjectFolderPage           = lazy(() => import("views/ppt/pages/ProjectFolderPage"))
const ProjectDashboardPage        = lazy(() => import("views/ppt/pages/ProjectDashboardPage"))
const ProjectPhotoContractPage    = lazy(() => import("views/ppt/pages/ProjectPhotoContractPage"))
const ProjectPhotoPage            = lazy(() => import("views/ppt/pages/ProjectPhotoPage"))
const ProjectDrawingPageV2        = lazy(() => import("views/ppt/pages/ProjectDrawingPageV2"))
const ProjectDirectoryPageV2      = lazy(() => import("views/ppt/pages/ProjectDirectoryPageV2"))
const ProjectHomePageV2           = lazy(() => import("views/ppt/pages/ProjectHomePageV2"))
const PcmGroupPage                = lazy(() => import('views/pcm/pages/PcmGroup'));
const PcmTaskGroupPage            = lazy(() => import('views/pcm/pages/PcmTaskGroup'));
const PcmReportQuickPage          = lazy(() => import('views/pcm/pages/PcmReportQuick'));

const PCMRouter: FC = () => {
  return (
      <ProviderModalMedia>
        <ProviderModalPcm>
          <Switch>

            {/* Điều hướng về danh sách dự án */}
            <ProtectedRoute exact path="/pm/home">
              <Redirect to="/pm/projects" />
            </ProtectedRoute>

            <ProtectedRoute path="/pm">
              <Switch>

                {/* Admin dự án */}
                <Route path="/pm/admin">
                  <PmLayout>
                    <LayoutSecondary
                        pages={[
                          { id: "1", title: "Nhóm chức năng", path: "/pcm/admin", navExact: true },
                          {
                            id: "2",
                            title: "Phân quyền chức năng",
                            path: "/pcm/admin/2",
                            location: (location) => {
                              // Get match params
                              const match = matchPath<{ id: string }>(location.pathname, {
                                path: "/pcm/admin/:id/detail",
                              });
                              // Push to state
                              return { pathname: "/pcm/admin/2", state: match ? match.params.id : null };
                            },
                          },
                          { id: "3", title: "Dự án", path: "/pcm/admin/3" },
                          { id: "4", title: "Chức danh", path: "/pcm/admin/4" },
                        ]}
                    >
                      <Route exact path="/pm/admin" component={ProjectAdminFunctionalTab} />
                      <Route exact path="/pm/admin/:id/detail" component={ProjectAdminDetail} />
                      <Route exact path="/pm/admin/2" component={ProjectAdminAuthorTab} />
                      <Route exact path="/pm/admin/3" component={ProjectAdminProjectTab} />
                      <Route exact path="/pm/admin/4" component={ProjectAdminPositionTab} />
                      <Route
                          exact
                          path="/pm/admin/:id/project"
                          component={ProjectAdminProjectDetail}
                      />
                    </LayoutSecondary>
                  </PmLayout>
                </Route>

                {/* Danh sách dự án */}
                <Route exact path="/pm/projects">
                  <PmLayout>
                    <ProjectCategoryPage/>
                  </PmLayout>
                </Route>

                {/* Chi tiết bên trong 1 Dự án */}
                <Route path="/pm/project/:id">
                  <Switch>
                    <Route
                        exact
                        path="/pm/project/:id/admin/:tab"
                        component={ProjectAdminManagementPage}
                    />
                    <Route
                        exact
                        path="/pm/project/:id/admin/:tab/:itemID"
                        component={ProjectAdminManagementPage}
                    />
                    <Route
                        exact
                        path="/pm/project/:id/admin/:tab/:itemID/members"
                        component={ProjectAdminManagementPage}
                    />

                    <Route exact path="/pm/project/:id/home" >
                      <PmProjectLayout
                          headerSearch={<PmHeaderContent/>}
                      >
                        <ProjectHomePageV2/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/dashboard">
                      <PmProjectLayout>
                        <ProjectDashboardPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/responses" component={PcmReportQuickPage} />
                    <Route exact path="/pm/project/:id/milestone/:milestoneID" component={ProjectMilestonePage} />
                    <Route exact path="/pm/project/:id/folder" render={(props) => (
                        <PmProjectLayout>
                          <ProjectFolderPage {...props}/>
                        </PmProjectLayout>
                    )}/>
                    <Route exact path="/pm/project/:id/folder/:groupID" render={(props) => (
                        <PmProjectLayout>
                          <ProjectFolderPage {...props}/>
                        </PmProjectLayout>
                    )}/>
                    <Route exact path="/pm/project/:id/schedule">
                      <PmProjectLayout>
                        <ProjectSchedulePage/>
                      </PmProjectLayout>
                    </Route>

                    <Route exact path="/pm/project/:id/budget"
                           render={({match}) => <Redirect to={`/pm/project/${match.params.id}/budget/type/1`}/>}
                    />
                    <Route exact path="/pm/project/:id/budget/type/:type">
                      <PmProjectLayout>
                        <ProjectBudgetPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/budget/type/:type/detail/:budgetId/tab"
                           render={({match}) => <Redirect to={`/pm/project/${match.params.id}/budget/type/${match.params.type}/detail/${match.params.budgetId}/tab/1`}/>}
                    />
                    <Route path="/pm/project/:id/budget/type/:type/detail/:budgetId/tab/:tab">
                      <PmProjectLayout>
                        <ProjectBudgetDetailPage/>
                      </PmProjectLayout>
                    </Route>

                    <Route path="/pm/project/:id/(cash-flow|cash-flow-1|cash-flow-2)">
                      <Route
                          exact
                          path="/pm/project/:id/cash-flow-1"
                          component={() => <ProjectCashFlowPlanPage outin={1} />}
                      />
                      <Route
                          exact
                          path="/pm/project/:id/cash-flow-2"
                          component={() => <ProjectCashFlowPlanPage outin={2} />}
                      />
                      <Route exact path="/pm/project/:id/cash-flow/:cashFlowID/:outin" component={ProjectCashFlowPlanChildPage} />
                    </Route>
                    <Route exact path={["/pm/project/:id/bidding", "/pm/project/:id/bidding/(2|3)"]}>
                      <PmProjectLayout>
                        <Route exact path="/pm/project/:id/bidding" component={ProjectBiddingPage} />
                        <Route
                            exact
                            path="/pm/project/:id/bidding/2"
                            component={() => <>Sample Data</>}
                        />
                        <Route
                            exact
                            path="/pm/project/:id/bidding/3"
                            component={() => <>Sample Data</>}
                        />
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/payment">
                      <PmProjectLayout>
                        <ProjectPaymentPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/payment/company/:companyID/subtype/:subtype">
                      <PmProjectLayout>
                        <ProjectSubjectCompanyOfAuthorPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/subject">
                      <PmProjectLayout>
                        <ProjectSubjectPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/subject/company/:companyID">
                      <PmProjectLayout>
                        <ProjectSubjectCompanyOfAssigneePage/>
                      </PmProjectLayout>
                    </Route>

                    {/*<Route*/}
                    {/*    exact*/}
                    {/*    path="/pm/project/:id/document"*/}
                    {/*    render={({match}) => <Redirect to={`/pm/project/${match.params.id}/document/type/1`}/>}*/}
                    {/*/>*/}
                    {/*<Route*/}
                    {/*    exact*/}
                    {/*    path="/pm/project/:id/document/type/:type"*/}
                    {/*>*/}
                    {/*  <PmProjectLayout>*/}
                    {/*    <DocumentProjectPage/>*/}
                    {/*  </PmProjectLayout>*/}
                    {/*</Route>*/}
                    <Route
                        exact
                        path={["/pm/project/:id/document", "/pm/project/:id/document/(1|2|3|4)"]}
                    >
                      <PmProjectLayout>
                        <DocumentProjectLayout>
                          <ModalProvider>
                            <Switch>
                              <Route
                                  exact
                                  path="/pm/project/:id/document"
                                  component={DocumentProjectPage}
                              />
                              <Route
                                  exact
                                  path="/pm/project/:id/document/1"
                                  component={DocumentProfilePage}
                              />
                              <Route
                                  exact
                                  path="/pm/project/:id/document/2"
                                  component={DocumenDatahubContactPage}
                              />
                              <Route
                                  exact
                                  path="/pm/project/:id/document/3"
                                  component={DocumentFolderPage}
                              />
                              {/* <Route exact path='/pcm/project/:id/document/3' component={DocumentReportPage} />
                    <Route exact path='/pcm/project/:id/document/4' component={DocumentHistoryPage} /> */}
                            </Switch>
                            <ModalCreateDocument />
                          </ModalProvider>
                        </DocumentProjectLayout>
                      </PmProjectLayout>
                    </Route>
                    <Route
                        exact
                        path="/pm/project/:id/document/1/type/:type"
                    >
                      <PmProjectLayout>
                        <DocumentOfTypePage/>
                      </PmProjectLayout>
                    </Route>
                    <Route
                        exact
                        path="/pm/project/:id/document/1/datahubContact/:datahubContactID"
                    >
                      <PmProjectLayout>
                        <DocumentOfTypePage/>
                      </PmProjectLayout>
                    </Route>
                    <Route
                        exact
                        path="/pm/project/:id/package/:packageID"
                    >
                      <PmProjectLayout>
                        <DocumentOfPackagePage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/group" component={PcmGroupPage} />
                    <Route exact path="/pm/project/:id/group/:groupID" component={PcmTaskGroupPage} />
                    <Route exact path="/pm/project/:id/document/:docID">
                      <PmProjectLayout>
                        <DocumentDetailPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route exact path="/pm/project/:id/photo">
                      <PmProjectLayout>
                        <ProjectPhotoPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route
                        exact
                        path="/pm/project/:id/photo/:contractID"
                    >
                      <PmProjectLayout>
                        <ProjectPhotoContractPage/>
                      </PmProjectLayout>
                    </Route>
                    <Route path="/pm/project/:id/drawing">
                      <PmProjectLayout>
                        <ProjectDrawingPageV2/>
                      </PmProjectLayout>
                    </Route>
                    <Route path="/pm/project/:id/resource">
                      <LayoutSecondary
                          pages={[
                            { id: "1", title: "Danh sách", path: "/pcm/project/:id/resource/1" },
                            {
                              id: "2",
                              title: "Gói thầu",
                              path: "/pcm/project/:id/resource",
                              navExact: true,
                            },
                            { id: "3", title: "Báo cáo quản trị", path: "/pcm/project/:id/resource/2" },
                          ]}
                      >
                        <Route exact path="/pm/project/:id/resource" component={ProjectResourcePage} />
                        <Route
                            exact
                            path="/pm/project/:id/resource/1"
                            component={() => <>Sample Data</>}
                        />
                        <Route
                            exact
                            path="/pm/project/:id/resource/2"
                            component={() => <>Sample Data</>}
                        />
                      </LayoutSecondary>
                    </Route>
                    <Route exact path="/pm/project/:id/inspection" component={ProjectInspectionPage} />
                    <Route exact path="/pm/project/:id/inspection/(tabs2|tabs3)">
                      <LayoutSecondary
                          pages={[
                            {
                              id: "1",
                              title: "Tất cả",
                              path: "/pcm/project/:id/inspection",
                              navExact: true,
                            },
                            { id: "2", title: "Gói thầu", path: "/pcm/project/:id/inspection/tabs2" },
                            {
                              id: "3",
                              title: "Báo cáo quản trị",
                              path: "/pcm/project/:id/inspection/tabs3",
                            },
                          ]}
                      >
                        <Route
                            exact
                            path="/pm/project/:id/inspection/tabs2"
                            component={ProjectInspectionTab2Page}
                        />
                        <Route
                            exact
                            path="/pm/project/:id/inspection/tabs3"
                            component={ProjectInspectionTab3Page}
                        />
                      </LayoutSecondary>
                    </Route>
                    <Route exact path="/pm/project/:id/directory">
                      <PmProjectLayout>
                        <ProjectDirectoryPageV2/>
                      </PmProjectLayout>
                    </Route>
                    <Route
                        exact
                        path="/pm/project/:id/inspection/:item"
                        component={ProjectInspectionDetailPage}
                    />
                  </Switch>
                </Route>

              </Switch>
            </ProtectedRoute>
          </Switch>
        </ProviderModalPcm>
      </ProviderModalMedia>
  );
};

export default PCMRouter;
