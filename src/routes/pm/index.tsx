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
import { DocumentSearchHeaderContent, ModalCreateDocument } from "views/document/sharedComponents/common";

/*=====CONTEXTS=====*/
import { ProviderModalPost as ProviderModalMedia } from "views/media/contexts/post";
import { ProviderModalPost as ProviderModalPcm } from "views/pcm/contexts/post";

/*=====PAGES=====*/

import {
  ProjectCashFlowPlanPage,
  ProjectCashFlowPlanChildPage,
  ProjectCategoryPage,
  ProjectResourcePage,
  ProjectSchedulePage,
  ProjectInspectionPage,
  ProjectInspectionTab2Page,
  ProjectInspectionTab3Page,
  ProjectInspectionTab4Page,
  ProjectInspectionDetailPage,
  ProjectDashboardPortfolioPage,
  ProjectDashboardTaskPage,
  ProjectMarketPage,
} from "views/ppt/pages";

import {
  DocumentDashboardPage,
} from "views/document/pages";

import ProjectAdminFunctionalTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminFunctionalTab";
import ProjectAdminDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminDetail";
import ProjectAdminAuthorTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminAuthorTab";
import ProjectAdminProjectDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectDetail";
import ProjectAdminProjectTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectTab";
import ProjectAdminPositionTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminPositionTab";
import { PmProjectLayout } from "../../shareComponents/layouts/PmLayout/PmProjectLayout";
import { PmHeaderContent } from "../../shareComponents/layouts/PmLayout/components";
import LayoutProjectSecondaryV2 from "views/ppt/sharedComponents/layouts/LayoutProjectSecondaryV2";
// import {DocumentProjectLayout} from "views/document/sharedComponents/layouts/DocumentProjectLayout";

const DocumentOfPackagePage = lazy(() => import("views/document/pages/DocumentOfPackagePage"))
const DocumentOfTypePage = lazy(() => import("views/document/pages/DocumentOfTypePage"))
const DocumentDetailPage = lazy(() => import("views/document/pages/DocumentDetailPage"))
const DocumentFolderPage = lazy(() => import("views/document/pages/DocumentFolderPage"))
const DocumenDatahubContactPage = lazy(() => import("views/document/pages/DocumenDatahubContactPage"))
const DocumentProfilePage = lazy(() => import("views/document/pages/DocumentProfilePage"))
const DocumentProjectPage = lazy(() => import("views/document/pages/DocumentProjectPage"))
const DocumentProjectPageV2 = lazy(() => import("views/document/pages/DocumentProjectPageV2"))
const DocumentPublishOrg = lazy(() => import("views/document/pages/DocumentPublishOrg"))
const DocumentProfileCate = lazy(() => import("views/document/pages/DocumentProfileCate"))
const DocumentProfileTypeList = lazy(() => import("views/document/pages/DocumentProfileTypeList"))
const DocumentListProfileByCate = lazy(() => import("views/document/pages/DocumentListProfileByCate"))
const DocumentProjectPublishOrgByProfileType = lazy(() => import("views/document/pages/DocumentProjectPublishOrgByProfileType"))

const ProjectMilestonePage = lazy(() => import("views/ppt/pages/ProjectMilestonePage"))
const ProjectAdminManagementPage = lazy(() => import("views/ppt/pages/ProjectAdminManagementPage"))
const ProjectSubjectCompanyOfAuthorPage = lazy(() => import("views/ppt/pages/ProjectSubjectCompanyOfAuthorPage"))
const ProjectPaymentPage = lazy(() => import("views/ppt/pages/ProjectPaymentPage"))
const ProjectBiddingPage = lazy(() => import("views/ppt/pages/ProjectBiddingPage"))
const ProjectBudgetPage = lazy(() => import("views/ppt/pages/ProjectBudgetPage"))
const ProjectBudgetDetailPage = lazy(() => import("views/ppt/pages/ProjectBudgetDetailPage"))
const ProjectBudgetSpendingDetailPage = lazy(() => import("views/ppt/pages/ProjectBudgetSpendingDetailPage"))
const ProjectSubjectCompanyOfAssigneePage = lazy(() => import("views/ppt/pages/ProjectSubjectCompanyOfAssigneePage"))
const ProjectSubjectPage = lazy(() => import("views/ppt/pages/ProjectSubjectPage"))
const ProjectFolderPage = lazy(() => import("views/ppt/pages/ProjectFolderPage"))
const ProjectDashboardPage = lazy(() => import("views/ppt/pages/ProjectDashboardPage"))
const ProjectPhotoContractPageV2 = lazy(() => import("views/ppt/pages/ProjectPhotoContractPageV2"))
const ProjectPhotoPage = lazy(() => import("views/ppt/pages/ProjectPhotoPage"))
const ProjectDrawingPageV2 = lazy(() => import("views/ppt/pages/ProjectDrawingPageV2"))
const ProjectDirectoryPageV2 = lazy(() => import("views/ppt/pages/ProjectDirectoryPageV2"))
const ProjectHomePageV2 = lazy(() => import("views/ppt/pages/ProjectHomePageV2"))
const PcmGroupPage = lazy(() => import('views/pcm/pages/PcmGroup'));
const PcmTaskGroupPage = lazy(() => import('views/pcm/pages/PcmTaskGroup'));
const PcmReportQuickPage = lazy(() => import('views/pcm/pages/PcmReportQuick'));

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
                      { id: "3", title: "Dự án phòng ban", path: "/pcm/admin/3" },
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
              <Route exact path="/pm/projects/:tab?">
                <PmLayout>
                  <ProjectCategoryPage />
                </PmLayout>
              </Route>

              <Route exact path="/pm/dashboard-portfolio" >
                <PmLayout>
                  <ProjectDashboardPortfolioPage />
                </PmLayout>
              </Route>

              <Route exact path="/pm/dashboard-task" >
                <PmLayout>
                  <ProjectDashboardTaskPage />
                </PmLayout>
              </Route>

              <Route exact path="/pm/dashboard-document" >
                <PmLayout>
                  <DocumentDashboardPage />
                </PmLayout>
              </Route>

              {/* Chi tiết bên trong 1 Dự án */}
              <Route path="/pm/project/:id">
                <Switch>
                  <Route
                    exact
                    path="/pm/project/:id/admin"
                    render={({ match }) => <Redirect to={`/pm/project/${match.params.id}/admin/members`} />}
                  />
                  <Route
                    exact
                    path="/pm/project/:id/admin/:tab"
                  >
                    <PmProjectLayout>
                      <ProjectAdminManagementPage />
                    </PmProjectLayout>
                  </Route>
                  <Route
                    exact
                    path="/pm/project/:id/admin/:tab/:itemID"
                  >
                    <PmProjectLayout>
                      <ProjectAdminManagementPage />
                    </PmProjectLayout>
                  </Route>
                  <Route
                    exact
                    path="/pm/project/:id/admin/:tab/:itemID/members"
                  >
                    <PmProjectLayout>
                      <ProjectAdminManagementPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/home" >
                    <PmProjectLayout
                      headerSearch={<PmHeaderContent />}
                    >
                      <ProjectHomePageV2 />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/dashboard">
                    <PmProjectLayout>
                      <ProjectDashboardPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/responses">
                    <PmProjectLayout>
                      <PcmReportQuickPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/milestone/:milestoneID">
                    <PmProjectLayout>
                      <ProjectMilestonePage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/folder" render={(props) => (
                    <PmProjectLayout>
                      <ProjectFolderPage {...props} />
                    </PmProjectLayout>
                  )} />
                  <Route exact path="/pm/project/:id/folder/:groupID" render={(props) => (
                    <PmProjectLayout>
                      <ProjectFolderPage {...props} />
                    </PmProjectLayout>
                  )} />
                  <Route exact path="/pm/project/:id/schedule">
                    <PmProjectLayout>
                      <ProjectSchedulePage />
                    </PmProjectLayout>
                  </Route>

                  <Route exact path="/pm/project/:id/budget"
                    render={({ match }) => <Redirect to={`/pm/project/${match.params.id}/budget/type/1`} />}
                  />
                  <Route exact path="/pm/project/:id/budget/type/:type">
                    <PmProjectLayout>
                      <ProjectBudgetPage />
                    </PmProjectLayout>
                  </Route>
                  {/* http://localhost:3000/pm/project/60a8cb540400462461cbff9f/budget/type/1/detail/6295600f7ff7d174a2be9d33/tab/1 */}
                  <Route path="/pm/project/:id/budget/type/:type(1)/detail/:budgetId/tab/:tab">
                    <PmProjectLayout>
                      <ProjectBudgetDetailPage />
                    </PmProjectLayout>
                  </Route>

                  <Route path="/pm/project/:id/budget/type/:type(4)/detail/:budgetId">
                    <PmProjectLayout>
                      <ProjectBudgetSpendingDetailPage />
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
                      <ProjectPaymentPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/payment/company/:companyID/subtype/:subtype">
                    <PmProjectLayout>
                      <ProjectSubjectCompanyOfAuthorPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/subject">
                    <PmProjectLayout>
                      <ProjectSubjectPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/subject/company/:companyID">
                    <PmProjectLayout>
                      <ProjectSubjectCompanyOfAssigneePage />
                    </PmProjectLayout>
                  </Route>

                  <Route
                    exact
                    path={["/pm/project/:id/document", "/pm/project/:id/document/:type(1|2|3|4)"]}
                  >

                    <ModalProvider>
                      <PmProjectLayout
                        headerSearch={<DocumentSearchHeaderContent />}
                      >
                        <Switch>
                          <Route
                            exact
                            path="/pm/project/:id/document"
                            component={DocumentProjectPage}
                          />
                          <Route
                            exact
                            path="/pm/project/:id/document/:type"
                            render={({ match }) => {
                              switch (match.params.type) {
                                case "1":
                                  return <DocumentProfilePage />;
                                case "2":
                                  return <DocumenDatahubContactPage />;
                                case "3":
                                  return <DocumentFolderPage />;
                                default:
                                  return null;
                              }
                            }}
                          />
                        </Switch>
                        <ModalCreateDocument />
                      </PmProjectLayout>
                    </ModalProvider>
                  </Route>
                  <Route
                    exact
                    path={[
                      "/pm/project/:id/document-v2",
                      "/pm/project/:id/document-v2/:type(1|2|3|4)",
                      "/pm/project/:id/document-v2/1/cate/:cateId",
                      "/pm/project/:id/document-v2/1/cate/:cateId/detail/:detailId",
                      "/pm/project/:id/document-v2/2/profile-type/:typeId",
                    ]}
                  >

                    <ModalProvider>
                      <PmProjectLayout>
                        <Switch>
                          <Route
                            exact
                            path="/pm/project/:id/document-v2"
                            component={DocumentProjectPageV2}
                          />
                          <Route
                            exact
                            path="/pm/project/:id/document-v2/:type"
                            render={({ match }) => {
                              switch (match.params.type) {
                                case "1":
                                  return <DocumentPublishOrg />;
                                case "2":
                                  return <DocumentProfileTypeList />;
                                case "3":
                                  return null;
                                default:
                                  return null;
                              }
                            }}
                          />
                          <Route
                            exact
                            path="/pm/project/:id/document-v2/1/cate/:cateId"
                            component={DocumentProfileCate}
                          />
                          <Route
                            exact
                            path="/pm/project/:id/document-v2/1/cate/:cateId/detail/:detailId"
                            component={DocumentListProfileByCate}
                          />
                          <Route
                            exact
                            path="/pm/project/:id/document-v2/2/profile-type/:typeId"
                            component={DocumentProjectPublishOrgByProfileType}
                          />
                        </Switch>
                        <ModalCreateDocument />
                      </PmProjectLayout>
                    </ModalProvider>
                  </Route>
                  <Route
                    exact
                    path="/pm/project/:id/document/1/type/:type"
                  >
                    <PmProjectLayout>
                      <DocumentOfTypePage />
                    </PmProjectLayout>
                  </Route>
                  <Route
                    exact
                    path="/pm/project/:id/document/1/datahubContact/:datahubContactID"
                  >
                    <PmProjectLayout>
                      <DocumentOfTypePage />
                    </PmProjectLayout>
                  </Route>
                  <Route
                    exact
                    path="/pm/project/:id/package/:packageID"
                  >
                    <PmProjectLayout>
                      <DocumentOfPackagePage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/group" component={PcmGroupPage} />
                  <Route exact path="/pm/project/:id/group/:groupID" component={PcmTaskGroupPage} />
                  <Route exact path="/pm/project/:id/document/:docID">
                    <PmProjectLayout>
                      <DocumentDetailPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/photo">
                    <PmProjectLayout>
                      <ProjectPhotoPage />
                    </PmProjectLayout>
                  </Route>
                  <Route
                    exact
                    path="/pm/project/:id/photo/:contractID"
                  >
                    <PmProjectLayout>
                      <ProjectPhotoContractPageV2 />
                    </PmProjectLayout>
                  </Route>
                  <Route path="/pm/project/:id/drawing">
                    <PmProjectLayout>
                      <ProjectDrawingPageV2 />
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

                  <Route exact path="/pm/project/:id/inspection" component={ProjectInspectionPage}>
                    <PmProjectLayout>
                      <ProjectInspectionPage />
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/inspection/(tabs2|tabs3|tabs4)">
                    <PmProjectLayout>
                      <LayoutSecondary
                        pages={[
                          { id: '1', title: 'Tất cả', path: '/pm/project/:id/inspection', navExact: true },
                          { id: '2', title: 'Gói thầu', path: '/pm/project/:id/inspection/tabs2' },
                          { id: '3', title: 'Báo cáo gói thầu', path: '/pm/project/:id/inspection/tabs3' },
                          { id: '4', title: 'Báo cáo quản trị', path: '/pm/project/:id/inspection/tabs4' },
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
                        <Route
                          exact
                          path="/pm/project/:id/inspection/tabs4"
                          component={ProjectInspectionTab4Page}
                        />
                      </LayoutSecondary>
                    </PmProjectLayout>
                  </Route>
                  <Route exact path="/pm/project/:id/directory">
                    <PmProjectLayout>
                      <ProjectDirectoryPageV2 />
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
