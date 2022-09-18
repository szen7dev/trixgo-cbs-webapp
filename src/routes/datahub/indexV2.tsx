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
	DatahubType2,
	DatahubTypeDetail,
	DatahubInspection,
	DatahubInspectionDetail,
	DatahubPrice,
	DatahubProjectMap,
	DatahubContact
} from 'views/datahub/pages'
import DatahubLayoutV2 from 'views/datahub/sharedComponents/layoutsV2/DatahubLayout'

const navLinks = [
  { title: "Home", url: 'datahub/contractor/home/:id' },
  { title: "Dịch vụ", url: 'datahub/contractor/:id/service' },
  { title: "Tài chính", url: 'datahub/contractor/:id/financial' },
  { title: "Hợp đồng", url: 'datahub/contractor/:id/contract' },
  { title: "HSNL", url: 'datahub/contractor/:id/profile' },
];
	
const DatahubRoutesV2: FC = () => {
	return (
		<>
			<DatahubLayoutV2>
				<Switch>
					<Route exact path="/convert/datahub/home" component={DatahubHome} />
					<Route exact path="/convert/datahub/home/:id" component={DatahubHomeDetail} />
					<Route path="/convert/datahub/type">
						<LayoutSecondary pages={[
							{ id: '1', path: '/convert/datahub/type', navExact: true, title: 'Lĩnh vực' },
							{ id: '2', path: '/convert/datahub/type/2', title: 'Chủ đề cộng đồng' },
						]}>
							<Switch>
								<Route exact path='/convert/datahub/type' component={DatahubType} />
								<Route exact path='/convert/datahub/type/2' component={DatahubType2} />
								<Route path='/convert/datahub/type/:id' component={DatahubTypeDetail} />
							</Switch>
						</LayoutSecondary>
					</Route>
					<Route path="/convert/datahub/project">
						<LayoutSecondary pages={[
							{ id: '1', path: '/convert/datahub/project', navExact: true, title: 'Danh sách' },
							{ id: '2', path: '/convert/datahub/project/map', title: 'Bản đồ' },
						]}>
							<Route exact path='/convert/datahub/project' component={DatahubProject} />
							<Route exact path='/convert/datahub/project/map' component={DatahubProjectMap} />
						</LayoutSecondary>
					</Route>
					<Route exact path="/convert/datahub/contractor/home" component={DatahubContractorHome} />
					<Route exact path="/convert/datahub/contractor/home/:id">
						<DatahubContractorLayout navLinks={navLinks}>
							<DatahubContractorDetail />
						</DatahubContractorLayout>
					</Route>
					<Route path="/convert/datahub/contractor/:id">
						<DatahubContractorLayout navLinks={navLinks}>
							<Route exact path='/convert/datahub/contractor/:id' component={DatahubContractorDetail} />
							<Route exact path='/convert/datahub/contractor/:id/service' component={DatahubContractorService} />
							<Route exact path='/convert/datahub/contractor/:id/financial' component={DatahubContractorFinancial} />
							<Route exact path='/convert/datahub/contractor/:id/contract' component={DatahubContractorContract} />
							<Route exact path='/convert/datahub/contractor/:id/profile' component={DatahubContractorProfile} />
						</DatahubContractorLayout>
					</Route>
					<Route path="/convert/datahub/inspection">
						<LayoutSecondary pages={[
							{ id: '1', path: '/convert/datahub/inspection', navExact: true, title: 'Kết cấu' },
							{ id: '2', path: '/convert/datahub/inspection/1', title: 'Kiến trúc' },
							{ id: '3', path: '/convert/datahub/inspection/2', title: 'Cơ điện' },
							{ id: '4', path: '/convert/datahub/inspection/3', title: 'Hạ tầng' },
							{ id: '5', path: '/convert/datahub/inspection/4', title: 'Cảnh quan' },
						]}>
							<Switch>
								<Route exact path='/convert/datahub/inspection' component={()=><DatahubInspection type={1} />} />
								<Route exact path='/convert/datahub/inspection/1' component={()=><DatahubInspection type={2} />} />
								<Route exact path='/convert/datahub/inspection/2' component={()=><DatahubInspection type={3} />} />
								<Route exact path='/convert/datahub/inspection/3' component={()=><DatahubInspection type={4} />} />
								<Route exact path='/convert/datahub/inspection/4' component={()=><DatahubInspection type={5} />} />
								<Route exact path='/convert/datahub/inspection/:id' component={DatahubInspectionDetail} />
							</Switch>
						</LayoutSecondary>
					</Route>
					<Route exact path="/convert/datahub/price" component={DatahubPrice} />
					<Route path="/convert/datahub/contact">
						<LayoutSecondary pages={[
							{ id: '1', path: '/convert/datahub/contact', navExact: true, title: 'Danh bạ hệ thống' },
						]}>
							<Switch>
								<Route exact path='/convert/datahub/contact' component={DatahubContact} />
							</Switch>
						</LayoutSecondary>
					</Route> 
					<Route exact path="/convert/datahub/price" component={DatahubPrice} />
				</Switch>
			</DatahubLayoutV2>
		</>
	)
}

export default DatahubRoutesV2
