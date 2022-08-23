/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch, Redirect, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/
import { ModalProvider } from "views/document/contexts/modal";

/*=====3.LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts";
import LayoutSecondary from "views/ppt/sharedComponents/layouts/LayoutSecondary";
import LayoutProjectSecondary from "views/ppt/sharedComponents/layouts/LayoutProjectSecondary";

/*=====4.CONFIG ROUTE=====*/

/*=====5.COMPONENTS=====*/
import { ModalCreateDocument } from "views/document/sharedComponents/common";

/*=====CONTEXTS=====*/
import { ProviderModalPost as ProviderModalMedia } from "views/media/contexts/post";
import { ProviderModalPost as ProviderModalPcm } from "views/pcm/contexts/post";

/*=====PAGES=====*/
import { DashboardV2 } from "views/homepage/pages";
import {
  DocumentDetailPage,
  DocumentFolderPage,
  DocumentProjectPage,
  DocumentProfilePage,
  DocumenDatahubContactPage,
  DocumentDashboardPage,
  DocumentOfPackagePage,
  DocumentOfTypePage,
} from "views/document/pages";

import {
  ProjectAdminManagementPage,
  ProjectBiddingPage,
  ProjectBudgetPage,
  ProjectCashFlowPlanPage,
  ProjectCashFlowPlanChildPage,
  ProjectCategoryPage,
  ProjectDashboardPortfolioPage,
  ProjectDashboardTaskPage,
  ProjectMarketPage,
  ProjectDrawing2Page,
  ProjectDrawingPage,
  ProjectFolderPage,
  ProjectHomePage,
  ProjectPaymentPage,
  ProjectSubjectPage,
  ProjectSubjectCompanyOfAssigneePage,
  ProjectSubjectCompanyOfAuthorPage,
  ProjectPhotoContractPage,
  ProjectPhotoPage,
  ProjectResourcePage,
  ProjectSchedulePage,
  ProjectInspectionPage,
  ProjectDashboardPage,
  ProjectInspectionTab2Page,
  ProjectInspectionTab3Page,
  ProjectInspectionDetailPage,
  ProjectDirectoryPage,
  ProjectMilestonePage
} from "views/ppt/pages";

import ProjectAdminFunctionalTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminFunctionalTab";
import ProjectAdminDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminDetail";
import ProjectAdminAuthorTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminAuthorTab";
import ProjectAdminProjectDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectDetail";
import ProjectAdminProjectTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectTab";
import ProjectAdminPositionTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminPositionTab";
const PcmDetailTaskV2             = lazy(() => import('views/pcm/pages/PcmDetailTaskV2'));

// const PcmHomePage                 = lazy(() => import('views/pcm/pages/PcmHome'));
const PcmHomePage                 = lazy(() => import('views/pcm/pages/PcmHomeV2'));
const PcmDetailTaskPage           = lazy(() => import('views/pcm/pages/PcmDetailTask'));
const PcmGroupPage                = lazy(() => import('views/pcm/pages/PcmGroup'));
const PcmTaskGroupPage            = lazy(() => import('views/pcm/pages/PcmTaskGroup'));
const PcmReportPage               = lazy(() => import('views/pcm/pages/PcmReport'));
const PcmReportQuickPage          = lazy(() => import('views/pcm/pages/PcmReportQuick'));
const PcmTasksReportPage          = lazy(() => import('views/pcm/pages/PcmTasksReport'));

const PcmPrintTaskTypeOnePage     = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeOne'));
const PcmPrintTaskTypeTwoPage     = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeTwo'));
const PcmPrintTaskTypeThreePage   = lazy(() => import('views/pcm/pages/PcmPrintTaskTypeThree'));

const PCMRouter: FC = () => {
  return (
    <ProviderModalMedia>
      <ProviderModalPcm>
        <Switch>

          {/* Trang chủ */}
          <ProtectedRoute
            exact
            path={"/pcm/home"}
            component={() => (
              <HomeLayout>
                <DashboardV2 />
              </HomeLayout>
            )}
          />

          <Route exact path="/">
            <Redirect to="/pcm/home" />
          </Route>

          <ProtectedRoute path="/pcm/project/:id">
            <LayoutProjectSecondary>
              <Switch>
                <Route
                  exact
                  path="/pcm/project/:id/admin/:tab"
                  component={ProjectAdminManagementPage}
                />
                <Route
                  exact
                  path="/pcm/project/:id/admin/:tab/:itemID"
                  component={ProjectAdminManagementPage}
                />
                <Route
                  exact
                  path="/pcm/project/:id/admin/:tab/:itemID/members"
                  component={ProjectAdminManagementPage}
                />
                <Route exact path="/pcm/project/:id/home" component={ProjectHomePage} />
                <Route exact path="/pcm/project/:id/dashboard" component={ProjectDashboardPage} />
                <Route exact path="/pcm/project/:id/responses" component={PcmReportQuickPage} />
                <Route exact path="/pcm/project/:id/milestone/:milestoneID" component={ProjectMilestonePage} />
                <Route exact path="/pcm/project/:id/folder" component={ProjectFolderPage} />
                <Route exact path="/pcm/project/:id/folder/:groupID" component={ProjectFolderPage} />
                <Route exact path="/pcm/project/:id/schedule" component={ProjectSchedulePage} />
                <Route path="/pcm/project/:id/(budget|cash-flow|cash-flow-1|cash-flow-2)">
                  <LayoutSecondary
                    pages={[
                      {
                        id: "1",
                        title: "Ngân sách",
                        path: "/pcm/project/:id/budget",
                        navExact: true,
                      },
                      {
                        id: "2",
                        title: "Kế hoạch thu",
                        path: "/pcm/project/:id/cash-flow-1"
                      },
                      {
                        id: "3",
                        title: "Kế hoạch chi",
                        path: "/pcm/project/:id/cash-flow-2"
                      },
                    ]}
                  >
                    <Route exact path="/pcm/project/:id/budget" component={ProjectBudgetPage} />
                    <Route
                      exact
                      path="/pcm/project/:id/cash-flow-1"
                      component={() => <ProjectCashFlowPlanPage outin={1} />}
                    />
                    <Route
                      exact
                      path="/pcm/project/:id/cash-flow-2"
                      component={() => <ProjectCashFlowPlanPage outin={2} />}
                    />
                    <Route exact path="/pcm/project/:id/cash-flow/:cashFlowID/:outin" component={ProjectCashFlowPlanChildPage} />
                  </LayoutSecondary>
                </Route>
                <Route exact path={["/pcm/project/:id/bidding", "/pcm/project/:id/bidding/(2|3)"]}>
                  <LayoutSecondary
                    pages={[
                      // {
                      //   id: "1",
                      //   title: "Hồ sơ dự thầu",
                      //   path: "/pcm/project/:id/bidding",
                      //   navExact: true,
                      // },
                      // { id: "2", title: "Hồ sơ mời thầu", path: "/pcm/project/:id/bidding/2" },
                      // { id: "3", title: "Tư vấn thầu", path: "/pcm/project/:id/bidding/3" },
                    ]}
                  >
                    <Route exact path="/pcm/project/:id/bidding" component={ProjectBiddingPage} />
                    <Route
                      exact
                      path="/pcm/project/:id/bidding/2"
                      component={() => <>Sample Data</>}
                    />
                    <Route
                      exact
                      path="/pcm/project/:id/bidding/3"
                      component={() => <>Sample Data</>}
                    />
                  </LayoutSecondary>
                </Route>
                <Route exact path="/pcm/project/:id/payment" component={ProjectPaymentPage} />
                <Route exact path="/pcm/project/:id/payment/company/:companyID/subtype/:subtype" component={ProjectSubjectCompanyOfAuthorPage} />
                <Route exact path="/pcm/project/:id/subject" component={ProjectSubjectPage} />
                <Route exact path="/pcm/project/:id/subject/company/:companyID" component={ProjectSubjectCompanyOfAssigneePage} />
                <Route
                  exact
                  path={["/pcm/project/:id/document", "/pcm/project/:id/document/(1|2|3|4)"]}
                >
                  <LayoutSecondary
                    pages={[
                      {
                        id: "1",
                        title: "Danh sách",
                        path: "/pcm/project/:id/document",
                        navExact: true,
                      },
                      { id: "2", title: "Phân loại", path: "/pcm/project/:id/document/1" },
                      { id: "3", title: "Danh bạ hệ thống", path: "/pcm/project/:id/document/2" },
                      { id: "4", title: "Gói thầu", path: "/pcm/project/:id/document/3" },
                      // { id: '4', title: 'Báo cáo', path: '/pcm/project/:id/document/3' },
                      // { id: '5', title: 'Lịch sử upload file', path: '/pcm/project/:id/document/4' },
                    ]}
                  >
                    <ModalProvider>
                      <Switch>
                        <Route
                          exact
                          path="/pcm/project/:id/document"
                          component={DocumentProjectPage}
                        />
                        <Route
                          exact
                          path="/pcm/project/:id/document/1"
                          component={DocumentProfilePage}
                        />
                        <Route
                          exact
                          path="/pcm/project/:id/document/2"
                          component={DocumenDatahubContactPage}
                        />
                        <Route
                          exact
                          path="/pcm/project/:id/document/3"
                          component={DocumentFolderPage}
                        />
                        {/* <Route exact path='/pcm/project/:id/document/3' component={DocumentReportPage} />
                      <Route exact path='/pcm/project/:id/document/4' component={DocumentHistoryPage} /> */}
                      </Switch>
                      <ModalCreateDocument />
                    </ModalProvider>
                  </LayoutSecondary>
                </Route>
                <Route
                  exact
                  path="/pcm/project/:id/document/1/type/:type"
                  component={DocumentOfTypePage}
                />
                <Route
                  exact
                  path="/pcm/project/:id/document/1/datahubContact/:datahubContactID"
                  component={DocumentOfTypePage}
                />
                <Route
                  exact
                  path="/pcm/project/:id/package/:packageID"
                  component={DocumentOfPackagePage}
                />
                <Route exact path="/pcm/project/:id/group" component={PcmGroupPage} />
                <Route exact path="/pcm/project/:id/group/:groupID" component={PcmTaskGroupPage} />
                <Route exact path="/pcm/project/:id/document/:docID" component={DocumentDetailPage} />
                <Route exact path="/pcm/project/:id/photo" component={ProjectPhotoPage} />
                <Route
                  exact
                  path="/pcm/project/:id/photo/contract/:contractID"
                  component={ProjectPhotoContractPage}
                />
                <Route path="/pcm/project/:id/drawing">
                  <LayoutSecondary
                    pages={[
                      { id: "1", title: "Bản vẽ", path: "/pcm/project/:id/drawing", navExact: true },
                      // { id: '2', title: 'Chỉ dẫn kỹ thuật', path: '/pcm/project/:id/drawing/1' },
                      // { id: '3', title: 'Quản lý phiên bản', path: '/pcm/project/:id/drawing/2' },
                    ]}
                  >
                    <Route exact path="/pcm/project/:id/drawing" component={ProjectDrawingPage} />
                    <Route
                      exact
                      path="/pcm/project/:id/drawing/:documentID"
                      component={ProjectDrawingPage}
                    />
                    <Route
                      exact
                      path="/pcm/project/:id/drawing/1"
                      component={() => <>Sample Data</>}
                    />
                    <Route exact path="/pcm/project/:id/drawing/2" component={ProjectDrawing2Page} />
                  </LayoutSecondary>
                </Route>
                <Route path="/pcm/project/:id/resource">
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
                    <Route exact path="/pcm/project/:id/resource" component={ProjectResourcePage} />
                    <Route
                      exact
                      path="/pcm/project/:id/resource/1"
                      component={() => <>Sample Data</>}
                    />
                    <Route
                      exact
                      path="/pcm/project/:id/resource/2"
                      component={() => <>Sample Data</>}
                    />
                  </LayoutSecondary>
                </Route>
                <Route exact path="/pcm/project/:id/inspection" component={ProjectInspectionPage} />
                <Route exact path="/pcm/project/:id/inspection/(tabs2|tabs3)">
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
                      path="/pcm/project/:id/inspection/tabs2"
                      component={ProjectInspectionTab2Page}
                    />
                    <Route
                      exact
                      path="/pcm/project/:id/inspection/tabs3"
                      component={ProjectInspectionTab3Page}
                    />
                  </LayoutSecondary>
                </Route>
                <Route exact path="/pcm/project/:id/directory" component={ProjectDirectoryPage} />
                <Route
                  exact
                  path="/pcm/project/:id/inspection/:item"
                  component={ProjectInspectionDetailPage}
                />
              </Switch>
            </LayoutProjectSecondary>
          </ProtectedRoute>
          
          <ProtectedRoute path="/pcm">
            <HomeLayout>
              <Switch>
                <Route path="/pcm/admin">
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
                    <Route exact path="/pcm/admin" component={ProjectAdminFunctionalTab} />
                    <Route exact path="/pcm/admin/:id/detail" component={ProjectAdminDetail} />
                    <Route exact path="/pcm/admin/2" component={ProjectAdminAuthorTab} />
                    <Route exact path="/pcm/admin/3" component={ProjectAdminProjectTab} />
                    <Route exact path="/pcm/admin/4" component={ProjectAdminPositionTab} />
                    <Route
                      exact
                      path="/pcm/admin/:id/project"
                      component={ProjectAdminProjectDetail}
                    />
                  </LayoutSecondary>
                </Route>

                <Route exact path="/pcm/detail/:id" component={PcmDetailTaskV2} />
                <Route exact path="/pcm/detail/:id/print/1" component={PcmPrintTaskTypeOnePage} />
                <Route exact path="/pcm/detail/:id/print/2" component={PcmPrintTaskTypeTwoPage} />
                <Route exact path="/pcm/detail/:id/print/3" component={PcmPrintTaskTypeThreePage} />

                <Route exact path="/pcm/mine" component={() => <PcmHomePage/>} />
                <Route exact path="/pcm/assign" component={() => <PcmHomePage type={2} />} />
                <Route exact path="/pcm/bookmark" component={() => <PcmHomePage type={3} />} />
                <Route exact path="/pcm/related" component={() => <PcmHomePage type={5} />} />
                <Route exact path="/pcm/report" component={PcmReportPage} />
                <Route exact path="/pcm/report/:reportID" component={PcmTasksReportPage} />
                <Route exact path="/pcm/projects" component={ProjectCategoryPage} />
                <Route exact path="/pcm/market" component={ProjectMarketPage} />
                <Route exact path="/pcm/(dashboard-portfolio|dashboard-task|dashboard-document)">
                  <LayoutSecondary
                    pages={[
                      { id: "1", title: "Báo cáo đầu tư", path: "/pcm/dashboard-portfolio" },
                      { id: "2", title: "Báo cáo quản trị công việc", path: "/pcm/dashboard-task" },
                      { id: "3", title: "Báo cáo quản trị hồ sơ", path: "/pcm/dashboard-document" },
                    ]}
                  >
                    <Route exact path="/pcm/dashboard-portfolio" component={ProjectDashboardPortfolioPage}
                    />
                    <Route exact path="/pcm/dashboard-task" component={ProjectDashboardTaskPage} />
                    <Route exact path="/pcm/dashboard-document" component={DocumentDashboardPage} />
                  </LayoutSecondary>
                </Route>
              </Switch>
            </HomeLayout>
          </ProtectedRoute>
        </Switch>
      </ProviderModalPcm>
    </ProviderModalMedia>
  );
};

export default PCMRouter;
