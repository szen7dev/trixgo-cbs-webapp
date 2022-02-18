import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import DatahubLayout from 'views/layouts/DatahubLayout'
import ErrorPage from 'views/pages/authentication/Error'
import LayoutPrimary from 'views/pages/media/layouts/LayoutPrimary'

import DatahubHome from '../screens/DatahubHome'
import DatahubHomeDetail from '../screens/DatahubHomeDetail'
import DatahubType from '../screens/DatahubType'
import DatahubTypeDetail from '../screens/DatahubTypeDetail'

export const routes = [
	{ path: '/datahub/home', exact: true, name: 'Trang chủ', component: DatahubHome },
	{ path: '/datahub/home/:d', exact: true, name: 'Trang chủ', component: DatahubHomeDetail, isPrivate: true },
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
			{ id: '1', path: '/datahub/project', exact: true, title: 'Danh sách', state: 1, component: DatahubHome },
			{ id: '2', path: '/datahub/project/map', title: 'Bản đồ', state: 2 },
		]
	},
	{ path: '/datahub/home', name: 'Năng lực nhà thầu' },
	{ path: '/datahub/home', name: 'Biểu mẫu nghiệm thu' },
	{ path: '/datahub/home', name: 'Datahub giá' },
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
												{/* {route.type==='state' && route.pages.map((page, index) => (
													props.location.state === page.state && <page.component />
												))} */}
												{route.pages.map((page, index) => (
													page.component && <Route
														key={index}
														path={page.path}
														exact={page.exact}
														render={(props) => {
															return <page.component {...props} />
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
