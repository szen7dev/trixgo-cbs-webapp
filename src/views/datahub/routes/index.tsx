import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import DatahubLayout from 'views/layouts/DatahubLayout'
import ErrorPage from 'views/pages/authentication/Error'
import LayoutPrimary from 'views/pages/media/layouts/LayoutPrimary'
import DatahubContractorDetail from '../screens/DatahubContractorDetail'
import DatahubContractorHome from '../screens/DatahubContractorHome'

import DatahubHome from '../screens/DatahubHome'
import DatahubHomeDetail from '../screens/DatahubHomeDetail'
import DatahubProject from '../screens/DatahubProject'
import DatahubType from '../screens/DatahubType'
import DatahubTypeDetail from '../screens/DatahubTypeDetail'

export const routes = [
	{ path: '/datahub/messageHome', exact: true, name: 'Trang chủ', component: DatahubHome },
	{ path: '/datahub/messageHome/:d', exact: true, name: 'Trang chủ', component: DatahubHomeDetail, isPrivate: true },
	{
		path: '/datahub/type', name: 'Phân loại hệ thống', layout: LayoutPrimary, type: 'state',
		pages: [
			{ id: '1', path: '/datahub/type', navExact: true, exact: true, title: 'Lĩnh vực', state: 1, component: DatahubType },
			{ id: '2', path: '/datahub/type/asd', navExact: true, exact: true, title: 'Chủ đề cộng đồng', state: 2, component: (): JSX.Element => <div>123</div> },
			{ id: '2', path: '/datahub/type/:id', navExact: true, title: 'Chủ đề cộng đồng', state: 3, component: DatahubTypeDetail, isPrivate: true },
		],
	},
	{
		path: '/datahub/project', name: 'Danh mục dự án',
		layout: LayoutPrimary,
		pages: [
			{ id: '1', path: '/datahub/project', exact: true, title: 'Danh sách', state: 1, component: DatahubProject },
			{ id: '2', path: '/datahub/project/map', title: 'Bản đồ', state: 2 },
		]
	},
	{ path: '/datahub/contractor/messageHome', exact: true, name: 'Năng lực nhà thầu', component: DatahubContractorHome },
	{ path: '/datahub/contractor/messageHome/:id', name: 'Năng lực nhà thầu', component: DatahubContractorDetail, isPrivate: true },
	{ path: '/datahub/messageHome', name: 'Biểu mẫu nghiệm thu' },
	{ path: '/datahub/messageHome', name: 'Datahub giá' },
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
								if (route.layout) {
									return (
										<route.layout pages={route.pages} >
											<Switch>
												{route.pages.map((page, index) => (
													page.component && <Route
														key={index}
														path={page.path}
														exact={page.exact}
														render={(props) => {
															return <page.component />
														}}
													/>
												))}
											</Switch>
										</route.layout>
									)
								}
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
