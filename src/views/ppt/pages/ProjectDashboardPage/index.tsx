import { FC, useContext, useEffect, useState } from "react";
import SwiperCore, { Navigation } from 'swiper';
import { useParams } from 'react-router-dom';
import { useQueryAmountTaskMilestone } from "services/hooks/pcm/useStatistical";
import moment from "moment";
import cn from "classnames";
import 'chartjs-adapter-moment';
import 'moment/locale/vi';
import classnames from "classnames";
import { Link } from "react-router-dom";

/**
 * Hooks, Typings
 */
import { useProject } from 'services/hooks/items/useProject';
import { useHistoryTraffics } from "services/hooks/auth/useAuth";

import styles from "../../style.module.css";
import 'swiper/swiper.min.css';

/**
 * Components
 */
import ReportTimeLine from "./components/ReportTimeLine";
import ReportTotal from "./components/ReportTotal";
import ReportActivity from "./components/RreportActivity";
import ReportChart from "./components/ReportChart";
import ReportContractor from "./components/ReportContractor";
import ReportProfile from "./components/ReportProfile";
import ReportMainWork from "./components/ReportMainWork";
import ReportImage from "./components/ReportImage";
import ReportBudget from "./components/ReportBudget";
import ReportQuickReport from "./components/ReportQuickReport";
import ReportContractStatus from "./components/ReportContractStatus";
// import ReportMultipleChart from "./components/ReportMultipleChart";

import { ModalZoomView } from "shareComponents/common";
import { ContextModalPost } from "views/media/contexts/post";
import { APP_ID } from 'apis/localdb';
import FilterDropdown from "views/cmcs/pages/CmcDashboardPage/components/FilterDropdown";
import TotalInvestment from "./components/TotalInvestment";
import TotalSignValue from "./components/TotalSignValue";
import TotalAcceptance from "./components/TotalAcceptance";
import TotalDisbursement from "./components/TotalDisbursement";
import DebtChart from "./components/DebtChart";
import { AdvanceGuarantee } from "./components/AdvanceGuarantee";
import { ContractPerformanceGuarantee } from "./components/ContractPerformanceGuarantee";

SwiperCore.use([Navigation]);

function percentageBetweenTwoDate(start: any, end: any){
	const today:any = new Date();
	const q = Math.abs(today-start);
	const d = Math.abs(end-start);
	return Math.round((q/d)*100)
}

const yearCurrent = new Date().getFullYear();
const yearMax = yearCurrent;
const yearMin = yearCurrent-5;

const ProjectDashboardPortfolioPage: FC = () => {
	const { state, toggleModal } = useContext(ContextModalPost);
	const [yearSelected, setYearSelected] = useState<number>(2022);

	//_____Start history traffict
	const payloadHistoryTraffic: any = {
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmProject.dashboard.id,
		type: "1"
	};
	const { createHistoryTraffics } = useHistoryTraffics();
	useEffect(() => {
		createHistoryTraffics({ ...payloadHistoryTraffic, type: 1 });
	}, []);
	//_____End history traffict

	const { id: projectID } = useParams<{ id: string }>();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID
		},
		isFetchInfo: true
	})

	useEffect(() => {
		document.title = `${projectInfo?.sign} | Báo cáo quản trị`;
	}, [projectInfo.sign]);

	const {
		taskOverdueWork,
		taskNextWeekWork,
		taskMoreThan7Days,
		taskAll,
		taskFinish,
		isLoading,
	} = useQueryAmountTaskMilestone({
		projectID, isPassPermision: 1
	});

	return (
		<div className={cn(styles.content, styles.report, styles['bg-gray'], styles['text-normal'])}>
			<div className={cn(styles['content-container'], styles.scroll, " pt-0 flex-1 h-full overflow-auto")}>
				<div className="sticky top-0  z-10 bg-white">
					{/* tab */}
					{/* <div className="flex justify-between px-4 bg-white">
						<div>
							<ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
								<li className="mr-2" role="presentation">
									<button className="inline-block p-2 rounded-t-lg border-b-2 text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500" id="profile-tab" data-tabs-target="#sell" type="button" role="tab" aria-controls="profile" aria-selected="true">
										Mua vào
									</button>
								</li>
								<li className="mr-2" role="presentation">
									<button className="inline-block p-2 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400  dark:border-gray-700" id="dashboard-tab" data-tabs-target="#" type="button" role="tab" aria-controls="dashboard" aria-selected="false">
										Bán ra
									</button>
								</li>
							</ul>
						</div>
					</div> */}
					{/* end tab */}
					<div className="flex justify-between bg-white px-2 ">
						{/* filter by year */}
						<div className={"header-table flex py-4 w-full top-0 bg-white"}>
							<button
								onClick={() => setYearSelected(0)}
								className={
									classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
									"text-white bg-cbs-secondary border-none": yearSelected === 0
									})
								}
							>
								Tất cả
							</button>
							{/* <button
								onClick={() => setYearSelected(yearMax)}
								className={
									classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
									"text-white bg-cbs-secondary border-none": yearSelected === yearMax
									})
								}
							>
								{yearMax}
							</button>
							<button
								onClick={() => setYearSelected(yearMax-1)}
								className={
									classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
									"text-white bg-cbs-secondary border-none": yearSelected === yearMax-1
									})
								}
							>
								{yearMax-1}
							</button>

							<button
								onClick={() => setYearSelected(yearMax-2)}
								className={
									classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
									"text-white bg-cbs-secondary border-none": yearSelected === yearMax-2
									})
								}
							>
								{yearMax-2}
							</button>

							<button
								onClick={() => setYearSelected(yearMax-3)}
								className={
									classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
									"text-white bg-cbs-secondary border-none": yearSelected === yearMax-3
									})
								}
							>
								{yearMax-3}
							</button>

							<button
								onClick={() => setYearSelected(yearMax-4)}
								className={
									classnames("py-1 px-4 mx-2 rounded-full border border-primary-border", {
									"text-white bg-cbs-secondary border-none": yearSelected === yearMax-4
									})
								}
							>
								{yearMax-4}
							</button> */}
						</div>
						<div className="w-1/4 flex items-center">
							<div className="w-5/6 flex flex-col gap-3">
								<div className="flex justify-between text-xs">
									<div>
										<span className="text-primary-gray">Bắt đầu: </span>
										<span><b>{moment(projectInfo.startTime).format("L")}</b></span>
									</div>
									<div>
										<span className="text-primary-gray">Kết thúc: </span>
										<span><b>{moment(projectInfo.expiredTime).format("L")}</b></span>
									</div>
								</div>

								<div className="w-full border h-2">
									<div
										className="bg-primary"
										style={{ width: `${percentageBetweenTwoDate(new Date(projectInfo.startTime), new Date(projectInfo.expiredTime)) <= 100 ? percentageBetweenTwoDate(new Date(projectInfo.startTime), new Date(projectInfo.expiredTime)) : 100}%`, marginTop: -0.25, height: 7 }}
									></div>
								</div>
							</div>

							<p className="w-1/6 text-primary text-sm px-4 pt-3"><b>{percentageBetweenTwoDate(new Date(projectInfo.startTime), new Date(projectInfo.expiredTime)) <= 100 ? percentageBetweenTwoDate(new Date(projectInfo.startTime), new Date(projectInfo.expiredTime)) : 100}%</b></p>
						</div>
					</div>
					{/* end filter by year */}
				</div>
				{/* Content */}
				<div className="flex flex-col bg-gray-custom gap-4 justify-around p-4">
					<div className="flex flex-wrap h-full">
						<div className="w-8/12">
							<div className="flex flex-wrap w-full">
								<div className="w-full flex gap-4">
									<TotalInvestment infoProject = {projectInfo} year={yearSelected}/>
									<TotalSignValue projectID = {projectID} infoProject={projectInfo} year={yearSelected}/>
									<TotalAcceptance projectID = {projectID} year={yearSelected} />
									<TotalDisbursement projectID = {projectID} year={yearSelected}/>	
								</div>
								{/* Chartjs */}
								<ReportChart className='bg-white w-full mt-4' projectInfo={projectInfo} />
							</div>
						</div>
						<div className="w-4/12">
							<div className="w-full flex flex-wrap pl-4 h-full">
								{/* Main Work */}
								<ReportMainWork className={cn(styles['work-wrapper'], 'bg-white h-full pl-6 pr-5 pt-5 pb-7 w-full')} data={{
									taskOverdueWork,
									taskNextWeekWork,
									taskMoreThan7Days,
									taskAll,
									taskFinish,
									isLoading,
									projectID
								}} />

							</div>
						</div>
					</div>
					<div className="flex ">
						<div className="w-8/12">
							<div className="flex w-full gap-4">
									<div className="w-1/3 bg-primary-light px-6 py-4">
										<Link to={`/pm/project/${projectID}/dashboard/debt/outin/2`}>
											<div className="font-bold text-primary-gray text-lg">Công nợ</div>
											<div className="w-full">
												<DebtChart projectID={projectID}/>
											</div>
										</Link>
									</div>
								<div className="w-1/2  h-[222px] bg-primary-light px-6 py-4">
									<div className="font-bold text-primary-gray text-lg">Bảo lãnh tạm ứng</div>
									<div>
										<AdvanceGuarantee projectID={projectID}/>
									</div>
								</div>
								<div className="w-1/2 h-[222px] bg-primary-light px-6 py-4">
									<div className="font-bold text-primary-gray text-lg">Bảo lãnh hợp đồng</div>
									<div>
										<ContractPerformanceGuarantee projectID={projectID}/>
									</div>
								</div>
							</div>
						</div>
						<div className="w-4/12 pl-4">
							<div className="h-[222px] bg-primary-light">
									<ReportContractor className={cn(styles['contractor-wrapper'], "bg-white   flex-1")} projectID={projectID} />
							</div>
						</div>
					</div>

					<div className="flex ">
						<div className="w-8/12">
							{/* Images */}
							<ReportImage className="w-full" projectInfo={projectInfo} />
						</div>
						<div className="w-4/12 pl-4">
							{/* Contract status */}
							<ReportContractStatus className={cn(styles['quick-report'], 'bg-white  pt-4 px-6 pb-6 w-full overflow-hidden h-full')} projectID={projectID} />
						</div>
					</div>
				</div>
			</div>
			<ModalZoomView prioritySingleImageAuthor isShow={state.isShow} toggle={toggleModal} initialData={{
				createAt: state.createAt,
				images: state.images,
				index: state.index,
				mediaID: state.mediaID,
				author: state.author
			}} />
		</div >
	);
};

export default ProjectDashboardPortfolioPage;