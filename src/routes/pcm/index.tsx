/*=====1.LIBRARY=====*/
import { FC, lazy } from "react";
import { Route, Switch, Redirect, matchPath } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/
// import { ModalProvider } from "views/document/contexts/modal";

/*=====3.LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts";
import LayoutSecondary from "views/ppt/sharedComponents/layouts/LayoutSecondary";
import { FnbRiskReportPage } from "views/fnb/pages/FnbRiskReportPage/index";
import { FnbRiskReportDetailPage } from "views/fnb/pages/FnbRiskReportDetailPage/index";

/*=====4.CONFIG ROUTE=====*/

/*=====5.COMPONENTS=====*/
// import { ModalCreateDocument } from "views/document/sharedComponents/common";

/*=====CONTEXTS=====*/
import { ProviderModalPost as ProviderModalMedia } from "views/media/contexts/post";
import { ProviderModalPost as ProviderModalPcm } from "views/pcm/contexts/post";

/*=====PAGES=====*/
import { DashboardV2 } from "views/homepage/pages";
import {
  DocumentDashboardPage,
} from "views/document/pages";

import {
  ProjectCategoryPage,
  ProjectDashboardPortfolioPage,
  ProjectDashboardTaskPage,
  ProjectMarketPage,
} from "views/ppt/pages";

import ProjectAdminFunctionalTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminFunctionalTab";
import ProjectAdminDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminDetail";
import ProjectAdminAuthorTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminAuthorTab";
import ProjectAdminProjectDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectDetail";
import ProjectAdminProjectTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectTab";
import ProjectAdminPositionTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminPositionTab";
import ProjectNew from "views/ppt/pages/ProjectNew";
import ProjectKpis from "views/ppt/pages/ProjectKpis";
import UserKpiDetail from "views/ppt/pages/ProjectKpis/UserKpiDetail";

const PcmDetailTaskV2             = lazy(() => import('views/pcm/pages/PcmDetailTaskV2'));
const PcmTagPage                  = lazy(() => import('views/pcm/pages/PcmTagPage'));
const PcmTagProjectPage           = lazy(() => import('views/pcm/pages/PcmTagPage/PcmTagProjectPage'));
const PcmTag3ProjectCompanyPage   = lazy(() => import('views/pcm/pages/PcmTagPage/PcmTag3ProjectCompanyPage'));
const PcmTag3ProjectCompanySubTypePage = lazy(() => import('views/pcm/pages/PcmTagPage/PcmTag3ProjectCompanySubTypePage'));
const PcmHomePage                 = lazy(() => import('views/pcm/pages/PcmHomeV2'));
const PcmUserPage                 = lazy(() => import('views/pcm/pages/PcmUserPage'));
const PcmUserProjectPage          = lazy(() => import('views/pcm/pages/PcmUserProjectPage'));
const PcmReportPage               = lazy(() => import('views/pcm/pages/PcmReport'));
const PcmTasksReportPage          = lazy(() => import('views/pcm/pages/PcmTasksReport'));

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
                <Route exact path="/pcm/kpi-report" component={FnbRiskReportPage} />
                <Route exact path="/pcm/kpi-report/:fundaID" component={FnbRiskReportDetailPage} />
                <Route exact path="/pcm/projects" component={ProjectCategoryPage} />
                <Route exact path="/pcm/market" component={ProjectMarketPage} />
                <Route exact path="/pcm/new" component={ProjectNew} />
                <Route exact path="/pcm/kpis" component={ProjectKpis} />
                <Route exact path="/pcm/kpis/:userID" component={UserKpiDetail} />
                {/* test link */}
                <Route exact path="/pcm/kpis/userID" component={UserKpiDetail} />
                {/* end test link */}
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

                <Route exact path="/pcm/users/:tab?" component={() => <PcmUserPage />} />
                <Route exact path="/pcm/users/project/:projectID" component={() => <PcmUserProjectPage />} />
                <Route exact path="/pcm/bidding/:tab?" component={() => <PcmHomePage subtype={4} option={1} draft={0}/>} />
                <Route exact path="/pcm/delivery/:tab?" component={() => <PcmHomePage subtype={9} type={2} option={2} draft={0}/>} />
                <Route exact path="/pcm/payment/:tab?" component={() => <PcmHomePage subtype={3} type={2} option={3} draft={0}/>} />
                <Route exact path="/pcm/mine" component={() => <ProjectNew />} />
                <Route exact path="/pcm/assign/:tab?" component={() => <PcmHomePage type={2} option={5} draft={0}/>} />
                <Route exact path="/pcm/bookmark/:tab?" component={() => <PcmHomePage type={3} option={6} draft={0}/>} />
                <Route exact path="/pcm/related/:tab?" component={() => <PcmHomePage type={5} option={7} draft={0}/>} />
                <Route exact path="/pcm/draft/:tab?" component={() => <PcmHomePage type={4} option={8} draft={1}/>} />
                <Route exact path="/pcm/report" component={PcmReportPage} />
                <Route exact path="/pcm/report/:reportID" component={PcmTasksReportPage} />
                <Route exact path="/pcm/detail/:id" component={PcmDetailTaskV2} />
                {/* <Route exact path="/pcm/detail/:id/submit" component={PcmDetailTaskSubmit} /> */}
                <Route exact path="/pcm/tags/:tab?" component={PcmTagPage} />
                <Route exact path="/pcm/tags/:tab?/project/:projectID/detail" component={PcmTagProjectPage} />
                <Route exact path="/pcm/tags/:tab?/project/:projectID/company/:companyID" component={PcmTagProjectPage} />
                <Route exact path="/pcm/tags/:tab/:projectID/:companyID" component={PcmTag3ProjectCompanyPage} />
                <Route exact path="/pcm/tags/:tab/:projectID/:companyID/:subtype" component={PcmTag3ProjectCompanySubTypePage} />
              </Switch>
            </HomeLayout>
          </ProtectedRoute>
        </Switch>
      </ProviderModalPcm>
    </ProviderModalMedia>
  );
};

export default PCMRouter