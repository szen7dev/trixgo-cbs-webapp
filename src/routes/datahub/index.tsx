/*=====LIBRARY=====*/
import { FC } from "react";
import { Route, Switch } from "react-router-dom";

/*=====LAYOUTS=====*/
import DatahubLayout from '../layouts/DatahubLayout';
import LayoutPrimary from 'views/media/layouts/LayoutPrimary';
import DatahubContractorLayout from '../layouts/DatahubContractorLayout';

/*=====PAGES=====*/
import DatahubContractorContract from '../screens/DatahubContractorContract';
import DatahubContractorDetail from '../screens/DatahubContractorDetail';
import DatahubContractorFinancial from '../screens/DatahubContractorFinancial';
import DatahubContractorHome from '../screens/DatahubContractorHome';
import DatahubContractorProfile from '../screens/DatahubContractorProfile';
import DatahubContractorService from '../screens/DatahubContractorService';
import DatahubHome from '../screens/DatahubHome';
import DatahubHomeDetail from '../screens/DatahubHomeDetail';
import DatahubProject from '../screens/DatahubProject';
import DatahubType from '../screens/DatahubType';
import DatahubTypeDetail from '../screens/DatahubTypeDetail';
import ErrorPage from 'views/authentication/Error';

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
		title?: string,
		path: string,
		component: FC<any>,
		exact?: boolean,
		state?: number,
		layout?: FC<any>,
		isPrivate?: boolean,
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
			{ id: '2', path: '/datahub/project/map', title: 'Bản đồ', state: 2, component: (): JSX.Element => <div>123</div> },
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
			{ id: '2', path: '/datahub/contractor/:id', exact: true, title: 'Lĩnh vực', component: DatahubContractorDetail },
			{ id: '3', path: '/datahub/contractor/:id/service', exact: true, title: 'Dịch vụ', component: DatahubContractorService },
			{ id: '3', path: '/datahub/contractor/:id/financial', exact: true, title: 'Tài chính', component: DatahubContractorFinancial },
			{ id: '3', path: '/datahub/contractor/:id/contract', exact: true, title: 'Dịch vụ', component: DatahubContractorContract },
			{ id: '3', path: '/datahub/contractor/:id/profile', exact: true, title: 'Dịch vụ', component: DatahubContractorProfile },
		]
	},
	{ path: '/datahub/home', name: 'Biểu mẫu nghiệm thu' },
	{ path: '/datahub/home', name: 'Datahub giá' },
	{ path: '/datahub/*', name: 'eror', component: ErrorPage, isPrivate: true },
]

const DatahubRouter: FC = () => {
    return (
        <>
            <Route path="/datahub">
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
            </Route>
        </>
    )
};

export default DatahubRouter;