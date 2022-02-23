/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FC } from 'react'

import ErrorPage from 'views/authentication/Error'
import LayoutPrimary from 'views/datahub/sharedComponents/layouts/LayoutPrimary'
import DatahubContractorLayout from 'views/datahub/sharedComponents/layouts/DatahubContractorLayout'
import DatahubContractorContract from 'views/datahub/pages/DatahubContractorContract'
import DatahubContractorDetail from 'views/datahub/pages/DatahubContractorDetail'
import DatahubContractorFinancial from 'views/datahub/pages/DatahubContractorFinancial'
import DatahubContractorHome from 'views/datahub/pages/DatahubContractorHome'
import DatahubContractorProfile from 'views/datahub/pages/DatahubContractorProfile'
import DatahubContractorService from 'views/datahub/pages/DatahubContractorService'

import DatahubHome from 'views/datahub/pages/DatahubHome'
import DatahubHomeDetail from 'views/datahub/pages/DatahubHomeDetail'
import DatahubProject from 'views/datahub/pages/DatahubProject'
import DatahubType from 'views/datahub/pages/DatahubType'
import DatahubTypeDetail from 'views/datahub/pages/DatahubTypeDetail'

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