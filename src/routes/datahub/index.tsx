/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FC, Fragment } from 'react'
import { Route, Switch } from 'react-router-dom'

import DatahubLayout from 'views/datahub/sharedComponents/layouts/DatahubLayout'
import { routes } from 'views/datahub/routes'

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
