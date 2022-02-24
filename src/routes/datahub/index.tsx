/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FC, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import DatahubLayout from 'views/datahub/sharedComponents/layouts/DatahubLayout'

import ErrorPage from 'views/authentication/Error'
import LayoutPrimary from 'views/datahub/sharedComponents/layouts/LayoutPrimary'
import DatahubContractorLayout from 'views/datahub/sharedComponents/layouts/DatahubContractorLayout'

import { 
	DatahubContractorContract,
	DatahubContractorDetail,
	DatahubContractorFinancial,
	DatahubContractorHome,
	DatahubContractorProfile,
	DatahubContractorService,
	DatahubHome,
	DatahubHomeDetail,
	DatahubProject,
	DatahubType,
	DatahubTypeDetail,
	DatahubInspection,
	DatahubInspectionDetail,
	DatahubPrice,
	DatahubProjectMap
 } from 'views/datahub/pages'

type Routes = Array<{
	path: string,
	component?: FC<any>,
	exact?: boolean,
	layout?: FC<any>,
	name: string,
	isPrivate?: boolean,
	type?: string,
	link?: string,
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
		navExact?: boolean,
		navStrict?: boolean,
		title?: string,
		path: string,
		component: FC<any>,
		exact?: boolean,
		state?: number,
		layout?: FC<any>,
		isPrivate?: boolean,
		isActive?: (match: any, location: any) => boolean,
	}>
}>

export const routes: Routes = [
	{
		path: '/datahub/home',
		exact: true,
		name: 'Trang chủ',
		component: DatahubHome
	},
	{
		path: '/datahub/home/:id',
		exact: true,
		name: 'Trang chủ',
		component: DatahubHomeDetail,
		isPrivate: true
	},
	{
		path: '/datahub/type',
		name: 'Phân loại hệ thống',
		layout: LayoutPrimary,
		type: 'state',
		pages: [
			{ id: '1', path: '/datahub/type', navExact: true, exact: true, title: 'Lĩnh vực', state: 1, component: DatahubType },
			{ id: '2', path: '/datahub/type/asd', navExact: true, exact: true, title: 'Chủ đề cộng đồng', state: 2, component: (): JSX.Element => <div>123</div> },
			{ id: '2', path: '/datahub/type/:id', navExact: true, title: 'Chủ đề cộng đồng', state: 3, component: DatahubTypeDetail, isPrivate: true },
		],
	},
	{
		path: '/datahub/project',
		name: 'Danh mục dự án',
		layout: LayoutPrimary,
		pages: [
			{ id: '1', path: '/datahub/project', exact: true, title: 'Danh sách', state: 1, component: DatahubProject },
			{ id: '2', path: '/datahub/project/map', title: 'Bản đồ', state: 2, component: DatahubProjectMap },
		]
	},
	{
		path: '/datahub/contractor/home',
		exact: true,
		name: 'Năng lực nhà thầu',
		component: DatahubContractorHome,
		isActive(match, location) {
			if (match) return true;
			return location.pathname.includes('/datahub/contractor/');
		}
	},
	{
		path: '/datahub/contractor/home/:id',
		exact: true,
		name: 'Năng lực nhà thầu',
		isPrivate: true,
		layout: DatahubContractorLayout,
		component: DatahubContractorDetail,
		isActive(match, location) {
			if (match) return true;
			return location.pathname.includes('/datahub/contractor/');
		}
	},
	{
		path: '/datahub/contractor/:id',
		name: 'Năng lực nhà thầu',
		isPrivate: true,
		layout: DatahubContractorLayout,
		pages: [
			{ id: '1', path: '/datahub/contractor/:id', exact: true, title: 'Lĩnh vực', component: DatahubContractorDetail },
			{ id: '2', path: '/datahub/contractor/:id/service', exact: true, title: 'Dịch vụ', component: DatahubContractorService },
			{ id: '3', path: '/datahub/contractor/:id/financial', exact: true, title: 'Tài chính', component: DatahubContractorFinancial },
			{ id: '4', path: '/datahub/contractor/:id/contract', exact: true, title: 'Dịch vụ', component: DatahubContractorContract },
			{ id: '5', path: '/datahub/contractor/:id/profile', exact: true, title: 'Dịch vụ', component: DatahubContractorProfile },
		]
	},
	{
		path: '/datahub/inspection',
		name: 'Biểu mẫu nghiệm thu',
		layout: LayoutPrimary,
		pages: [
			{ id: '1', path: '/datahub/inspection', exact: true, navExact: false, title: 'Kết cấu', component: DatahubInspection, },
			{ id: '2', path: '/datahub/inspection/132', exact: true, title: 'Kiến trúc', component: DatahubInspection },
			{ id: '3', path: '/datahub/inspection/32', exact: true, title: 'Cơ điện', component: DatahubInspection },
			{ id: '4', path: '/datahub/inspection/123', exact: true, title: 'Hạ tầng', component: DatahubInspection },
			{ id: '5', path: '/datahub/inspection/123413', exact: true, title: 'Cảnh quan', component: DatahubInspection },
			{ id: '1', path: '/datahub/inspection/:id', exact: true, component: DatahubInspectionDetail, isPrivate: true },
		]
	},
	{ path: '/datahub/price', name: 'Datahub giá' },
	{ path: '/datahub/*', name: 'eror', component: ErrorPage, isPrivate: true },
]
const DatahubRoutes: FC = () => {
	return (
		<>
			<DatahubLayout>
				<Switch>
					{routes.map((route, index) => (
						<Route
							key={index}
							path={route.path}
							exact={route.exact}
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
					))}
				</Switch>
			</DatahubLayout>
		</>
	)
}

export default DatahubRoutes
