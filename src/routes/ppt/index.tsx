/*=====LIBRARY=====*/
import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ModalProvider } from "views/document/contexts/modal";

/*=====LAYOUTS=====*/
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary'

/*=====MODALS COMPONENT=====*/
import { ModalCreateDocument, ModalCreateDocumentChild } from 'views/document/sharedComponents/common';

/*=====PAGES=====*/
// import ErrorPage from 'views/authentication/Error'
import {
	DocumentDetailPage,
	DocumentFolderPage,
	DocumentHistoryPage,
	DocumentProjectPage,
	DocumentProfilePage,
	DocumentReportPage,
} from 'views/document/pages';
import {
	ProjectBiddingPage,
	ProjectBudgetPage,
	ProjectCategoryPage,
	ProjectDashboardPortfolioPage,
	ProjectDashboardTaskPage,
	ProjectMarketPage,
	ProjectDocumentPage,
	ProjectDrawing2Page,
	ProjectDrawingPage,
	ProjectFolderPage,
	ProjectHomePage,
	ProjectMomPage,
	ProjectOtherPage,
	ProjectPaymentPage,
	ProjectPhotoContractPage,
	ProjectPhotoPage,
	ProjectProductionPage,
	ProjectPunchPage,
	ProjectReportPage,
	ProjectResourcePage,
	ProjectRfaPage,
	ProjectRfiPage,
	ProjectSchedulePage,
	ProjectDashboardPage
} from 'views/ppt/pages'
import LayoutProjectSecondary from 'views/ppt/sharedComponents/layouts/LayoutProjectSecondary'
import { Dashboard } from 'views/homepage/pages';
import { HomeLayout } from 'shareComponents/layouts';

const PPTRoutes: FC = () => {
	return (
		<>
			<Switch>
				<Route exact path="/ppt/(home|projects|market|dashboard-portfolio|dashboard-task|dashboard-document)">
					<HomeLayout>
						<Switch>
							<Route exact path="/ppt/home" component={Dashboard} />
							<Route exact path="/ppt/projects" component={ProjectCategoryPage} />
							<Route exact path="/ppt/market" component={ProjectMarketPage} />
							<LayoutSecondary pages={[
								{ id: '1', title: 'Dashboard1', path: '/ppt/dashboard-portfolio', },
								{ id: '2', title: 'Dashboard2', path: '/ppt/dashboard-task', },
								{ id: '3', title: 'Dashboard3', path: '/ppt/dashboard-document', },
							]}>
								<Route exact path="/ppt/dashboard-portfolio" component={ProjectDashboardPortfolioPage} />
								<Route exact path="/ppt/dashboard-task" component={ProjectDashboardTaskPage} />
								<Route exact path="/ppt/dashboard-document" component={ProjectDashboardPage} />
							</LayoutSecondary>
						</Switch>
					</HomeLayout>
				</Route>
				<Route path="/ppt/project/:id">
					<LayoutProjectSecondary>
						<Switch>
							<Route exact path="/ppt/project/:id/home" component={ProjectHomePage} />
							<Route exact path="/ppt/project/:id/dashboard" component={ProjectDashboardPage} />
							<Route exact path='/ppt/project/:id/folder' component={ProjectFolderPage} />
							<Route exact path='/ppt/project/:id/schedule' component={ProjectSchedulePage} />
							<Route path="/ppt/project/:id/budget">
								<LayoutSecondary pages={[
									{ id: '1', title: 'Ngân sách', path: '/ppt/project/:id/budget', navExact: true },
									{ id: '2', title: 'Kế hoạch', path: '/ppt/project/:id/budget/2' },
								]}>
									<Route exact path='/ppt/project/:id/budget' component={ProjectBudgetPage} />
									<Route exact path='/ppt/project/:id/budget/2' component={() => <>hello</>} />
								</LayoutSecondary>
							</Route>
							<Route exact path={['/ppt/project/:id/bidding', '/ppt/project/:id/bidding/(2|3)']}>
								<LayoutSecondary pages={[
									{ id: '1', title: 'Hồ sơ dự thầu', path: '/ppt/project/:id/bidding', navExact: true },
									{ id: '2', title: 'Hồ sơ mời thầu', path: '/ppt/project/:id/bidding/2' },
									{ id: '3', title: 'Tư vấn thầu', path: '/ppt/project/:id/bidding/3' },
								]}>
									<Route exact path='/ppt/project/:id/bidding' component={ProjectBiddingPage} />
									<Route exact path='/ppt/project/:id/bidding/2' component={() => <>hello</>} />
									<Route exact path='/ppt/project/:id/bidding/3' component={() => <>hello</>} />
								</LayoutSecondary>
							</Route>
							<Route exact path='/ppt/project/:id/payment' component={ProjectPaymentPage} />
							<Route exact path={['/ppt/project/:id/document', '/ppt/project/:id/document/(1|2|3|4)']}>
								<LayoutSecondary pages={[
									{ id: '1', title: 'Danh sách', path: '/ppt/project/:id/document', navExact: true },
									{ id: '2', title: 'Phân loại', path: '/ppt/project/:id/document/1' },
									{ id: '3', title: 'Thư mục', path: '/ppt/project/:id/document/2' },
									// { id: '4', title: 'Báo cáo', path: '/ppt/project/:id/document/3' },
									// { id: '5', title: 'Lịch sử upload file', path: '/ppt/project/:id/document/4' },
								]}>
									<ModalProvider>
										<Switch>
											<Route exact path='/ppt/project/:id/document' component={DocumentProjectPage} />
											<Route exact path='/ppt/project/:id/document/1' component={DocumentProfilePage} />
											<Route exact path='/ppt/project/:id/document/2' component={DocumentFolderPage} />
											<Route exact path='/ppt/project/:id/document/3' component={DocumentReportPage} />
											<Route exact path='/ppt/project/:id/document/4' component={DocumentHistoryPage} />
										</Switch>
										<ModalCreateDocument />
									</ModalProvider>
								</LayoutSecondary>
							</Route>
							<Route exact path='/ppt/project/:id/document/:docID' component={DocumentDetailPage} />
							<Route exact path='/ppt/project/:id/photo' component={ProjectPhotoPage} />
							<Route exact path='/ppt/project/:id/photo/contract/:contractID' component={ProjectPhotoContractPage} />
							<Route path='/ppt/project/:id/drawing'>
								<LayoutSecondary pages={[
									{ id: '1', title: 'Bản vẽ', path: '/ppt/project/:id/drawing', navExact: true },
									// { id: '2', title: 'Chỉ dẫn kỹ thuật', path: '/ppt/project/:id/drawing/1' },
									// { id: '3', title: 'Quản lý phiên bản', path: '/ppt/project/:id/drawing/2' },
								]}>
									<Route exact path='/ppt/project/:id/drawing' component={ProjectDrawingPage} />
									<Route exact path='/ppt/project/:id/drawing/1' component={() => <>hello</>} />
									<Route exact path='/ppt/project/:id/drawing/2' component={ProjectDrawing2Page} />
								</LayoutSecondary>
							</Route>
							<Route path='/ppt/project/:id/resource'>
								<LayoutSecondary pages={[
									{ id: '1', title: 'Danh sách', path: '/ppt/project/:id/resource/1' },
									{ id: '2', title: 'Gói thầu', path: '/ppt/project/:id/resource', navExact: true },
									{ id: '3', title: 'Báo cáo quản trị', path: '/ppt/project/:id/resource/2' },
								]}>
									<Route exact path='/ppt/project/:id/resource' component={ProjectResourcePage} />
									<Route exact path='/ppt/project/:id/resource/1' component={() => <>hello</>} />
									<Route exact path='/ppt/project/:id/resource/2' component={() => <>hello</>} />
								</LayoutSecondary>
							</Route>
						</Switch>
					</LayoutProjectSecondary>
				</Route>
			</Switch>
		</>
	)
}

export default PPTRoutes
