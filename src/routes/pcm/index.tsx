/*=====1.LIBRARY=====*/
import { FC } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProtectedRoute } from "routes/components";

/*=====2.PROVIDERS=====*/
import { ModalProvider } from "views/document/contexts/modal";

/*=====3.LAYOUTS=====*/
import { HomeLayout } from "shareComponents/layouts";
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary';
import LayoutProjectSecondary from 'views/ppt/sharedComponents/layouts/LayoutProjectSecondary';

/*=====4.CONFIG ROUTE=====*/

/*=====5.COMPONENTS=====*/
import { ModalCreateDocument } from 'views/document/sharedComponents/common';

/*=====CONTEXTS=====*/
import { ProviderModalPost } from "views/pcm/contexts/post";
import CommentProvider from 'views/pcm/contexts/comment/comment.provider';

/*=====PAGES=====*/
import { Dashboard } from "views/homepage/pages";
import {
	DocumentDetailPage,
	DocumentFolderPage,
	DocumentHistoryPage,
	DocumentProjectPage,
	DocumentProfilePage,
	DocumentReportPage,
	DocumentDashboardPage
} from 'views/document/pages';

import {
	ProjectAdminManagementPage,
	ProjectBiddingPage,
	ProjectBudgetPage,
	ProjectCategoryPage,
	ProjectDashboardPortfolioPage,
	ProjectDashboardTaskPage,
	ProjectMarketPage,
	ProjectDrawing2Page,
	ProjectDrawingPage,
	ProjectFolderPage,
	ProjectHomePage,
	ProjectPaymentPage,
	ProjectPhotoPackagePage,
	ProjectPhotoPage,
	ProjectResourcePage,
	ProjectSchedulePage,
	ProjectInspectionPage,
	ProjectDashboardPage,
	ProjectInspectionTab2Page,
	ProjectInspectionTab3Page,
	ProjectInspectionDetailPage,
	ProjectDirectoryPage,
	// ProjectDocumentPage,
	// ProjectMomPage,
	// ProjectOtherPage,
	// ProjectProductionPage,
	// ProjectPunchPage,
	// ProjectReportPage,
	// ProjectRfaPage,
	// ProjectRfiPage,
} from 'views/ppt/pages';

import { PcmHome, PcmDetailTask } from 'views/pcm/pages';

import ProjectAdminFunctionalTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminFunctionalTab";
import ProjectAdminDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminDetail";
import ProjectAdminAuthorTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminAuthorTab";
import ProjectAdminProjectDetail from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectDetail";
import ProjectAdminProjectTab from "views/ppt/pages/ProjectAdminPage/pages/ProjectAdminProjectTab";

const PCMRouter: FC = () => {
	return (
		<Switch>
			<ProtectedRoute
				exact
				path={"/"}
				component={() => (
					<HomeLayout>
						<Dashboard />
					</HomeLayout>
				)}
			/>
			<Route exact path="/pcm">
				<Redirect to="/pcm/home" />
			</Route>
			<ProtectedRoute path="/pcm/project/:id">
				<LayoutProjectSecondary>
					<Switch>
						<Route exact path="/pcm/project/:id/admin" component={ProjectAdminManagementPage} />
						<Route exact path="/pcm/project/:id/admin/group/:groupID" component={ProjectAdminManagementPage} />
						<Route exact path="/pcm/project/:id/home" component={ProjectHomePage} />
						<Route exact path="/pcm/project/:id/dashboard" component={ProjectDashboardPage} />
						<Route exact path='/pcm/project/:id/folder' component={ProjectFolderPage} />
						<Route exact path='/pcm/project/:id/schedule' component={ProjectSchedulePage} />
						<Route path="/pcm/project/:id/budget">
							<LayoutSecondary pages={[
								{ id: '1', title: 'Ngân sách', path: '/pcm/project/:id/budget', navExact: true },
								{ id: '2', title: 'Kế hoạch', path: '/pcm/project/:id/budget/2' },
							]}>
								<Route exact path='/pcm/project/:id/budget' component={ProjectBudgetPage} />
								<Route exact path='/pcm/project/:id/budget/2' component={() => <>Sample Data</>} />
							</LayoutSecondary>
						</Route>
						<Route exact path={['/pcm/project/:id/bidding', '/pcm/project/:id/bidding/(2|3)']}>
							<LayoutSecondary pages={[
								{ id: '1', title: 'Hồ sơ dự thầu', path: '/pcm/project/:id/bidding', navExact: true },
								{ id: '2', title: 'Hồ sơ mời thầu', path: '/pcm/project/:id/bidding/2' },
								{ id: '3', title: 'Tư vấn thầu', path: '/pcm/project/:id/bidding/3' },
							]}>
								<Route exact path='/pcm/project/:id/bidding' component={ProjectBiddingPage} />
								<Route exact path='/pcm/project/:id/bidding/2' component={() => <>Sample Data</>} />
								<Route exact path='/pcm/project/:id/bidding/3' component={() => <>Sample Data</>} />
							</LayoutSecondary>
						</Route>
						<Route exact path='/pcm/project/:id/payment' component={ProjectPaymentPage} />
						<Route exact path={['/pcm/project/:id/document', '/pcm/project/:id/document/(1|2|3|4)']}>
							<LayoutSecondary pages={[
								{ id: '1', title: 'Hồ sơ dự thầu', path: '/pcm/project/:id/document', navExact: true },
								{ id: '2', title: 'Phân loại', path: '/pcm/project/:id/document/1' },
								{ id: '3', title: 'Thư mục', path: '/pcm/project/:id/document/2' },
								{ id: '4', title: 'Báo cáo', path: '/pcm/project/:id/document/3' },
								{ id: '5', title: 'Lịch sử upload file', path: '/pcm/project/:id/document/4' },
							]}>
								<ModalProvider>
									<Switch>
										<Route exact path='/pcm/project/:id/document' component={DocumentProjectPage} />
										<Route exact path='/pcm/project/:id/document/1' component={DocumentProfilePage} />
										<Route exact path='/pcm/project/:id/document/2' component={DocumentFolderPage} />
										<Route exact path='/pcm/project/:id/document/3' component={DocumentReportPage} />
										<Route exact path='/pcm/project/:id/document/4' component={DocumentHistoryPage} />
									</Switch>
									<ModalCreateDocument />
								</ModalProvider>
							</LayoutSecondary>
						</Route>
						<Route exact path='/pcm/project/:id/document/:docID' component={DocumentDetailPage} />
						<Route exact path='/pcm/project/:id/photo' component={ProjectPhotoPage} />
						<Route exact path='/pcm/project/:id/photo/package/:packageId' component={ProjectPhotoPackagePage} />
						<Route path='/pcm/project/:id/drawing'>
							<LayoutSecondary pages={[
								{ id: '1', title: 'Bản vẽ', path: '/pcm/project/:id/drawing', navExact: true },
								{ id: '2', title: 'Chỉ dẫn kỹ thuật', path: '/pcm/project/:id/drawing/1' },
								{ id: '3', title: 'Quản lý phiên bản', path: '/pcm/project/:id/drawing/2' },
							]}>
								<Route exact path='/pcm/project/:id/drawing' component={ProjectDrawingPage} />
								<Route exact path='/pcm/project/:id/drawing/1' component={() => <>Sample Data</>} />
								<Route exact path='/pcm/project/:id/drawing/2' component={ProjectDrawing2Page} />
							</LayoutSecondary>
						</Route>
						<Route path='/pcm/project/:id/resource'>
							<LayoutSecondary pages={[
								{ id: '1', title: 'Danh sách', path: '/pcm/project/:id/resource/1' },
								{ id: '2', title: 'Gói thầu', path: '/pcm/project/:id/resource', navExact: true },
								{ id: '3', title: 'Báo cáo quản trị', path: '/pcm/project/:id/resource/2' },
							]}>
								<Route exact path='/pcm/project/:id/resource' component={ProjectResourcePage} />
								<Route exact path='/pcm/project/:id/resource/1' component={() => <>Sample Data</>} />
								<Route exact path='/pcm/project/:id/resource/2' component={() => <>Sample Data</>} />
							</LayoutSecondary>
						</Route>
						<Route exact path='/pcm/project/:id/inspection' component={ProjectInspectionPage} />
						<Route exact path='/pcm/project/:id/inspection/(tabs2|tabs3)'>
							<LayoutSecondary pages={[
								{ id: '1', title: 'Tất cả', path: '/pcm/project/:id/inspection', navExact: true },
								{ id: '2', title: 'Gói thầu', path: '/pcm/project/:id/inspection/tabs2' },
								{ id: '3', title: 'Báo cáo quản trị', path: '/pcm/project/:id/inspection/tabs3' },
							]}>
								<Route exact path='/pcm/project/:id/inspection/tabs2' component={ProjectInspectionTab2Page} />
								<Route exact path='/pcm/project/:id/inspection/tabs3' component={ProjectInspectionTab3Page} />
							</LayoutSecondary>
						</Route>
						<Route exact path='/pcm/project/:id/directory' component={ProjectDirectoryPage} />
						<Route exact path='/pcm/project/:id/inspection/:item' component={ProjectInspectionDetailPage} />
					</Switch>
				</LayoutProjectSecondary>
			</ProtectedRoute>
			<ProtectedRoute path="/pcm">
				<HomeLayout>
					<Switch>
						<Route path="/pcm/admin">
							<LayoutSecondary pages={[
								{ id: '1', title: 'Nhóm chức năng', path: '/pcm/admin', navExact: true },
								{ id: '2', title: 'Phân quyền chức năng', path: '/pcm/admin/2', },
								{ id: '3', title: 'Dự án', path: '/pcm/admin/3', },
							]}>
								<Route exact path="/pcm/admin" component={ProjectAdminFunctionalTab} />
								<Route exact path="/pcm/admin/:id/detail" component={ProjectAdminDetail} />
								<Route exact path="/pcm/admin/2" component={ProjectAdminAuthorTab} />
								<Route exact path="/pcm/admin/3" component={ProjectAdminProjectTab} />
								<Route exact path="/pcm/admin/:id/project" component={ProjectAdminProjectDetail} />
							</LayoutSecondary>
						</Route>

						<Route exact path="/pcm/detail/:id" component={PcmDetailTask} />

						<Route exact path="/pcm/home" component={PcmHome} />
						<Route exact path="/pcm/assign" component={() => <PcmHome type={2} />} />
						<Route exact path="/pcm/bookmark" component={() => <PcmHome type={3} />} />
						<Route exact path="/pcm/projects" component={ProjectCategoryPage} />
						<Route exact path="/pcm/market" component={ProjectMarketPage} />
						<Route exact path="/pcm/(dashboard-portfolio|dashboard-task|dashboard-document)">
							<LayoutSecondary pages={[
								{ id: '1', title: 'Dashboard1', path: '/pcm/dashboard-portfolio', },
								{ id: '2', title: 'Dashboard2', path: '/pcm/dashboard-task', },
								{ id: '3', title: 'Dashboard3', path: '/pcm/dashboard-document', },
							]}>
								<Route exact path="/pcm/dashboard-portfolio" component={ProjectDashboardPortfolioPage} />
								<Route exact path="/pcm/dashboard-task" component={ProjectDashboardTaskPage} />
								<Route exact path="/pcm/dashboard-document" component={DocumentDashboardPage} />
							</LayoutSecondary>
						</Route>
					</Switch>
				</HomeLayout>
			</ProtectedRoute>
		</Switch>
	)
};

export default PCMRouter;