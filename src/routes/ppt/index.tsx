/*=====LIBRARY=====*/
import { FC, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ModalProvider } from "views/document/contexts/modal";

/*=====LAYOUTS=====*/
import { DocumentLayout, PPTLayout } from 'views/document/sharedComponents/layouts';
import DatahubLayout from 'views/datahub/sharedComponents/layouts/DatahubLayout'
import DatahubContractorLayout from 'views/datahub/sharedComponents/layouts/DatahubContractorLayout'
import LayoutPrimary from 'views/ppt/sharedComponents/layouts/LayoutPrimary'
import LayoutSecondary from 'views/ppt/sharedComponents/layouts/LayoutSecondary'

/*=====MODALS COMPONENT=====*/
import { ModalCreateDocument } from 'views/document/sharedComponents/common';

/*=====PAGES=====*/
import ErrorPage from 'views/authentication/Error'
import {
	DocumentDetailPage,
	DocumentFolderPage,
	DocumentHistoryPage,
	DocumentProjectPage,
	DocumentProfilePage,
	DocumentReportPage
} from 'views/document/pages';
import {
	ProjectAdminPage,
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
	ProjectPhotoPackagePage,
	ProjectPhotoPage,
	ProjectPortfolioPage,
	ProjectProductionPage,
	ProjectPunchPage,
	ProjectReportPage,
	ProjectResourcePage,
	ProjectRfaPage,
	ProjectRfiPage,
	ProjectSchedulePage,
	ProjectDashboardPage
} from 'views/ppt/pages'
import LayoutProjectPrimary from 'views/ppt/sharedComponents/layouts/LayoutProjectPrimary'
import LayoutProjectSecondary from 'views/ppt/sharedComponents/layouts/LayoutProjectSecondary'

type RouteItem = {
	path: string | string[],
	name: string,

	exact?: boolean,
	strict?: boolean,
	isSub?: boolean,
	navLink?: string,
	component?: FC<any>,
	layout?: FC<any>,
	isPrivate?: boolean,
	type?: string,
	navExact?: boolean,
	navStrict?: boolean,
	isActive?(match: any, location: any): boolean,
	location?: {
		key?: string, // not with HashHistory!
		search: string,
		hash: string,
		pathname: string,
		state: string,
	},
	pages?: Array<{
		id: string,
		path: string,
		component: FC<any>,

		navLink?: string,
		navExact?: boolean,
		navStrict?: boolean,
		title?: string,
		exact?: boolean,
		state?: number,
		layout?: FC<any>,
		isPrivate?: boolean,
		isActive?: (match: any, location: any) => boolean,
	}>
}
type Routes = Array<RouteItem>

export const routes: Routes = [
	{
		path: '/ppt/projects',
		exact: true,
		name: 'Trang chủ',
		component: ProjectCategoryPage
	},
	{
		path: '/ppt/market',
		exact: true,
		name: 'Dự án đang phát triển',
		component: ProjectMarketPage,
	},
	{
		path: ['/ppt/dashboard-portfolio', '/ppt/dashboard-task', '/ppt/dashboard-document'],
		navLink: '/ppt/dashboard-portfolio',
		exact: true,
		name: 'Báo cáo đầu tư',
		layout: LayoutSecondary,
		pages: [
			{ id: '1', title: 'Dashboard1', component: ProjectDashboardPortfolioPage, path: '/ppt/dashboard-portfolio', },
			{ id: '2', title: 'Dashboard2', component: ProjectDashboardTaskPage, path: '/ppt/dashboard-task', },
			{ id: '3', title: 'Dashboard3', component: () => <>hello</>, path: '/ppt/dashboard-document', },
		]
	},
	{
		path: '/ppt/dashboard-task',
		navLink: '/ppt/dashboard-task',
		exact: true,
		isSub: true,
		name: 'Báo cáo quản trị công việc',
		component: ProjectDashboardTaskPage,
	},
	{
		path: '/ppt/dashboard-document',
		exact: true,
		isSub: true,
		name: 'Báo cáo quản trị hồ sơ',
		component: ProjectPortfolioPage,
	},
]

export const routes2: Routes = [
	{
		path: '/ppt/project/:id/home',
		navLink: '/home',
		exact: true,
		name: 'Trang chủ',
		component: ProjectHomePage
	},
	{
		path: '/ppt/project/:id/dashboard',
		navLink: '/dashboard',
		exact: true,
		name: 'Báo cáo quản trị',
		component: ProjectDashboardPage
	},
	{
		path: '/ppt/project/:id/folder',
		navLink: '/folder',
		exact: true,
		name: 'Thư mục dữ liệu',
		component: ProjectFolderPage
	},
	{
		path: '/ppt/project/:id/schedule',
		navLink: '/schedule',
		exact: true,
		name: 'Tiến độ',
		component: ProjectSchedulePage
	},
	{
		path: '/ppt/project/:id/budget',
		navLink: '/budget',
		name: 'Ngân sách và kế hoạch',
		layout: LayoutSecondary,
		pages: [
			{ id: '1', title: 'Ngân sách', exact: true, component: ProjectBudgetPage, path: '/ppt/project/:id/budget', navLink: '' },
			{ id: '2', title: 'Kế hoạch', exact: true, component: () => <>hello</>, path: '/ppt/project/:id/budget/2', navLink: '/2' },
		]
	},
	{
		path: '/ppt/project/:id/bidding',
		navLink: '/bidding',
		name: 'Lựa chọn nhà thầu',
		layout: LayoutSecondary,
		pages: [
			{ id: '1', title: 'Hồ sơ dự thầu', exact: true, component: ProjectBiddingPage, path: '/ppt/project/:id/bidding', navLink: '' },
			{ id: '2', title: 'Hồ sơ mời thầu', exact: true, component: () => <>hello2</>, path: '/ppt/project/:id/bidding/2', navLink: '/2' },
			{ id: '3', title: 'Tư vấn thầu', exact: true, component: () => <>hello3</>, path: '/ppt/project/:id/bidding/3', navLink: '/3' },
		]
	},
	{
		path: '/ppt/project/:id/payment',
		navLink: '/payment',
		exact: true,
		name: 'Báo cáo',
		component: ProjectPaymentPage
	},
	{
		path: [
			'/ppt/project/:id/document',
			'/ppt/project/:id/document/1',
			'/ppt/project/:id/document/2',
			'/ppt/project/:id/document/3',
			'/ppt/project/:id/document/4'
		],
		exact: true,
		navLink: '/document',
		name: 'Hồ sơ văn bản',
		layout: ({ children, ...props }) => <LayoutSecondary {...props} >
			<ModalProvider>
				{children}
				<ModalCreateDocument />
			</ModalProvider>
		</LayoutSecondary>,
		pages: [
			{ id: '1', title: 'Hồ sơ dự thầu', exact: true, component: DocumentProjectPage, path: '/ppt/project/:id/document', navLink: '' },
			{ id: '2', title: 'Phân loại', exact: true, component: DocumentProfilePage, path: '/ppt/project/:id/document/1', navLink: '/1' },
			{ id: '3', title: 'Thư mục', exact: true, component: DocumentFolderPage, path: '/ppt/project/:id/document/2', navLink: '/2' },
			{ id: '4', title: 'Báo cáo', exact: true, component: DocumentReportPage, path: '/ppt/project/:id/document/3', navLink: '/3' },
			{ id: '5', title: 'Lịch sử upload file', exact: true, component: DocumentHistoryPage, path: '/ppt/project/:id/document/4', navLink: '/4' },
			// { id: '6', exact: true, isPrivate: true, component: DocumentDetailPage, path: '/ppt/project/:id/document/:docID' },
		]
	},
	{
		path: '/ppt/project/:id/document/:docID',
		exact: true,
		isPrivate: true,
		name: 'Document detail',
		component: DocumentDetailPage
	},
	{
		path: '/ppt/project/:id/photo',
		navLink: '/photo',
		exact: true,
		name: 'Hình ảnh',
		component: ProjectPhotoPage
	},
	{
		path: '/ppt/project/:id/photo/package/:packageId',
		isPrivate: true,
		exact: true,
		name: 'Hình ảnh',
		component: ProjectPhotoPackagePage
	},
	{
		path: '/ppt/project/:id/drawing',
		navLink: '/drawing',
		name: 'Hồ sơ văn bản',
		layout: LayoutSecondary,
		pages: [
			{ id: '1', title: 'Bản vẽ', exact: true, component: ProjectDrawingPage, path: '/ppt/project/:id/drawing', navLink: '' },
			{ id: '2', title: 'Chỉ dẫn kỹ thuật', exact: true, component: () => <>hello2</>, path: '/ppt/project/:id/drawing/1', navLink: '/1' },
			{ id: '3', title: 'Quản lý phiên bản', exact: true, component: ProjectDrawing2Page, path: '/ppt/project/:id/drawing/2', navLink: '/2' },
		]
	},
	{
		path: '/ppt/project/:id/resource',
		navLink: '/resource',
		name: 'Quản lý vật tư',
		layout: LayoutSecondary,
		pages: [
			{ id: '1', title: 'Danh sách', exact: true, component: () => <>hello2</>, path: '/ppt/project/:id/resource/1', navLink: '/1' },
			{ id: '2', title: 'Gói thầu', exact: true, component: ProjectResourcePage, path: '/ppt/project/:id/resource', navLink: '' },
			{ id: '3', title: 'Báo cáo quản trị', exact: true, component: () => <>hello2</>, path: '/ppt/project/:id/resource/2', navLink: '/2' },
		]
	},
	{ path: '/ppt/*', name: 'error', component: ErrorPage, isPrivate: true },
]

function GeneratePath(route: RouteItem, index: number): JSX.Element {
	if (route.isSub) return <Fragment key={index}></Fragment>;
	return (
		<Route
			key={index}
			path={route.path}
			exact={route.exact}
			strict={route.strict}
			render={(props) => {
				if (route.layout && route.component) return (
					<route.layout>
						<route.component />
					</route.layout>
				)
				if (route.layout && route.pages) {
					return (
						<route.layout pages={route.pages}>
							<Switch>
								{route.pages.map((page, index) => (
									page.component && <Route
										key={index}
										path={page.path}
										exact={page.exact}
										render={(_props) => {
											if (page.layout) return <page.layout match={props.match}>
												<page.component />
											</page.layout>
											return <page.component />
										}}
									/>
								))}
							</Switch>
						</route.layout>
					)
				} else if (route.pages)
					return (
						<Switch>
							{route.pages.map((page, index) => (
								page.component && <Route
									key={index}
									path={page.path}
									exact={page.exact}
									render={(_props) => {
										if (page.layout) return <page.layout match={props.match}>
											<page.component />
										</page.layout>
										return <page.component />
									}}
								/>
							))}
						</Switch>
					)
				if (route.component) return <route.component {...props} />
				return null
			}}
		/>
	)
}
const PPTRoutes: FC = () => {
	return (
		<>
			<Switch>
				<Route exact path={routes.reduce((prev, route) => {
					typeof route.path === 'string'
						? prev.push(route.path)
						: prev.push(...route.path);
					return prev;
				}, [] as string[])}>
					<LayoutProjectPrimary>
						<Switch>
							{routes.map(GeneratePath)}
						</Switch>
					</LayoutProjectPrimary>
				</Route>
				<Route path="/ppt/project/:id">
					<LayoutProjectSecondary>
						<Switch>
							{routes2.map(GeneratePath)}
						</Switch>
					</LayoutProjectSecondary>
				</Route>
			</Switch>
		</>
	)
}

export default PPTRoutes
