/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import DatahubLayout from 'views/datahub/sharedComponents/layouts/DatahubLayout'

import ErrorPage from 'views/authentication/Error'
import LayoutSecondary from 'views/datahub/sharedComponents/layouts/LayoutSecondary'
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

const DatahubRoutes: FC = () => {
	return (
		<>
			<DatahubLayout>
				<Switch>
					<Route exact path="/datahub/home" component={DatahubHome} />
					<Route exact path="/datahub/home/:id" component={DatahubHomeDetail} />
					<Route path="/datahub/type">
						<LayoutSecondary pages={[
							{ id: '1', path: '/datahub/type', navExact: true, title: 'Lĩnh vực' },
							{ id: '2', path: '/datahub/type/asd', title: 'Chủ đề cộng đồng' },
						]}>
							<Switch>
								<Route exact path='/datahub/type' component={DatahubType} />
								<Route exact path='/datahub/type/asd' component={() => <div>123</div>} />
								<Route path='/datahub/type/:id' component={DatahubTypeDetail} />
							</Switch>
						</LayoutSecondary>
					</Route>
					<Route path="/datahub/project">
						<LayoutSecondary pages={[
							{ id: '1', path: '/datahub/project', navExact: true, title: 'Danh sách' },
							{ id: '2', path: '/datahub/project/map', title: 'Bản đồ' },
						]}>
							<Route exact path='/datahub/project' component={DatahubProject} />
							<Route exact path='/datahub/project/map' component={DatahubProjectMap} />
						</LayoutSecondary>
					</Route>
					<Route exact path="/datahub/contractor/home" component={DatahubContractorHome} />
					<Route exact path="/datahub/contractor/home/:id">
						<DatahubContractorLayout>
							<DatahubContractorDetail />
						</DatahubContractorLayout>
					</Route>
					<Route path="/datahub/contractor/:id">
						<DatahubContractorLayout>
							<Route exact path='/datahub/contractor/:id' component={DatahubContractorDetail} />
							<Route exact path='/datahub/contractor/:id/service' component={DatahubContractorService} />
							<Route exact path='/datahub/contractor/:id/financial' component={DatahubContractorFinancial} />
							<Route exact path='/datahub/contractor/:id/contract' component={DatahubContractorContract} />
							<Route exact path='/datahub/contractor/:id/profile' component={DatahubContractorProfile} />
						</DatahubContractorLayout>
					</Route>
					<Route path="/datahub/inspection">
						<LayoutSecondary pages={[
							{ id: '1', path: '/datahub/inspection', navExact: true, title: 'Kết cấu' },
							{ id: '2', path: '/datahub/inspection/1', title: 'Kiến trúc' },
							{ id: '3', path: '/datahub/inspection/2', title: 'Cơ điện' },
							{ id: '4', path: '/datahub/inspection/3', title: 'Hạ tầng' },
							{ id: '5', path: '/datahub/inspection/4', title: 'Cảnh quan' },
						]}>
							<Switch>
								<Route exact path='/datahub/inspection' component={DatahubInspection} />
								<Route exact path='/datahub/inspection/1' component={DatahubInspection} />
								<Route exact path='/datahub/inspection/2' component={DatahubInspection} />
								<Route exact path='/datahub/inspection/3' component={DatahubInspection} />
								<Route exact path='/datahub/inspection/4' component={DatahubInspection} />
								<Route exact path='/datahub/inspection/:id' component={DatahubInspectionDetail} />
							</Switch>
						</LayoutSecondary>
					</Route>
					<Route exact path="/datahub/price" component={DatahubPrice} />
				</Switch>
			</DatahubLayout>
		</>
	)
}

export default DatahubRoutes
