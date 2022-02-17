import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import DatahubLayout from 'views/layouts/DatahubLayout'
import ErrorPage from 'views/pages/authentication/Error'
import LayoutPrimary from 'views/pages/media/layouts/LayoutPrimary'

import DatahubHome from '../screens/DatahubHome'

const _prefix = '/datahub'

export const routes = [
	{ path: _prefix + '/home', exact: true, name: 'Trang chủ', component: DatahubHome },
	{ path: _prefix + '/type', exact: true, name: 'Phân loại hệ thống' },
	{
		path: _prefix + '/project', name: 'Danh mục dự án',
		layout: LayoutPrimary,
		pages: [
			{ id: '1', path: _prefix + '/project', exact: true, title: 'Danh sách', state: 1, component: DatahubHome },
			{ id: '2', path: _prefix + '/project/map', title: 'Bản đồ', state: 2 },
		]
	},
	{ path: _prefix + '/home', name: 'Năng lực nhà thầu' },
	{ path: _prefix + '/home', name: 'Biểu mẫu nghiệm thu' },
	{ path: _prefix + '/home', name: 'Datahub giá' },
	{ path: _prefix + '/*', name: 'eror', component: ErrorPage, isPrivate: true },
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
