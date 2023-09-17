import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import LayoutSecondary from 'views/datahub/sharedComponents/layoutsV2/LayoutSecondary'
import DatahubContractorLayout from 'views/datahub/sharedComponents/layoutsV2/DatahubContractorLayout'

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
	DatahubType3,
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
					<Route exact path="/datahub/home" component={DatahubHome} />
					<Route exact path="/datahub/home/:id" component={DatahubHomeDetail} />
					<Route path="/datahub/type">
						<LayoutSecondary pages={[
							{ id: '1', path: '/datahub/type', navExact: true, title: 'Lĩnh vực' },
							{ id: '2', path: '/datahub/type/2', title: 'Chủ đề cộng đồng' },
							{ id: '3', path: '/datahub/type/3', title: 'Vật tư thiết bị' },
						]}>
							<Switch>
								<Route exact path='/datahub/type' component={DatahubType} />
								<Route exact path='/datahub/type/2' component={DatahubType2} />
								<Route exact path='/datahub/type/3' component={DatahubType3} />
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
						<DatahubContractorLayout navLinks={navLinks}>
							<DatahubContractorDetail />
						</DatahubContractorLayout>
					</Route>
					<Route path="/datahub/contractor/:id">
						<DatahubContractorLayout navLinks={navLinks}>
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
								<Route exact path='/datahub/inspection' component={()=><DatahubInspection type={1} />} />
								<Route exact path='/datahub/inspection/1' component={()=><DatahubInspection type={2} />} />
								<Route exact path='/datahub/inspection/2' component={()=><DatahubInspection type={3} />} />
								<Route exact path='/datahub/inspection/3' component={()=><DatahubInspection type={4} />} />
								<Route exact path='/datahub/inspection/4' component={()=><DatahubInspection type={5} />} />
								<Route exact path='/datahub/inspection/:id' component={DatahubInspectionDetail} />
							</Switch>
						</LayoutSecondary>
					</Route>
					<Route exact path="/datahub/price" component={DatahubPrice} />
					<Route path="/datahub/contact">
						<LayoutSecondary pages={[
							{ id: '1', path: '/datahub/contact', navExact: true, title: 'Danh bạ hệ thống' },
						]}>
							<Switch>
								<Route exact path='/datahub/contact' component={DatahubContact} />
							</Switch>
						</LayoutSecondary>
					</Route> 
					<Route exact path="/datahub/price" component={DatahubPrice} />
				</Switch>
			</DatahubLayoutV2>
		</>
	)
}

export default DatahubRoutesV2
