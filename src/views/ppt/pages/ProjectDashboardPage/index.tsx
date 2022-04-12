import { FC, useContext, useEffect, useLayoutEffect } from "react";
import SwiperCore, { Navigation } from 'swiper';
import { useParams } from 'react-router-dom';

import cn from "classnames";
import 'chartjs-adapter-moment';
import 'moment/locale/vi';

/**
 * Hooks, Typings
 */
import { useProject } from 'services/hooks/items/useProject';
import { useContractPayment } from 'services/hooks/cmcs/useContractPayment';
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

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
import ReportMultipleChart from "./components/ReportMultipleChart";

import { ModalZoomView } from "shareComponents/common";
import { ContextModalPost } from "views/media/contexts/post";

SwiperCore.use([Navigation]);

// const obj: { readonly [key: string]: number } = { 2: 10, b: 20 }
// console.log({ obj, l: obj['2'] });

// const f = ({ a, b = 0 } = { a: "" }): Record<string, unknown> => {
// 	return { a, b }
// }

// type Props = {
// 	a?: keyof typeof obj
// }

const ProjectDashboardPortfolioPage: FC = () => {
	const { state, toggleModal } = useContext(ContextModalPost);

	// --------- Check phân quyền
	// useCheckPerAccessScreen({
	// 	appID: APP_ID.PCM.id,
	// 	menuID: APP_ID.PCM.menuPcmProject.dashboard.id,
	// 	type: "2"
	// });
	// ---------
	const { id: projectID } = useParams<{ id: string }>();
	const { info: projectInfo } = useProject({
		params: {
			departmentID: projectID
		},
		isFetchInfo: true
	})

	const { listAmountContractValueByDate } = useContractPayment({
		params: {
			projectID
		},
		isFetchListAmountContractValue: true
	})

	useEffect(() => {
		document.title = "CHG.THT-Báo cáo quản trị";
	}, []);

	// useLayoutEffect(() => {
	// 	(async () => {
	// 		await new Promise(resolve => setTimeout(() => {
	// 			resolve('done');
	// 			console.log('done async task');
	// 		}, 10000));
	// 	})();
	// 	console.log('useLayoutEffect');
	// })
	// console.log('Rendering...');

	return (
		<div className={cn(styles.content, styles.report, styles['bg-gray'], styles['text-normal'])}>
			<div className={cn(styles['content-container'], styles.scroll, "overflow-y-auto p-4 pt-0 flex-1 h-full")}>
				{/* Content */}
				<div className="flex flex-wrap -mx-2">
					<div className="w-8/12">
						<div className="flex flex-wrap w-full">
							<div className="flex flex-wrap w-full">
								{/* Timeline */}
								<ReportTimeLine className="bg-white mx-2 py-3 px-6 flex items-end mt-4 flex-auto" projectInfo={projectInfo} />

								<div className="flex flex-1">
									{/* Total Invest */}
									<ReportTotal className="bg-white mx-2 flex-1 py-2 pl-4 pr-5 mt-4" style={{ minWidth: "116px" }}  projectInfo={projectInfo}/>

									{/* Activity */}
									<ReportActivity className="bg-white mx-2 flex-1 py-2 pl-4 pr-5 mt-4" />
								</div>
							</div>

							{/* Chartjs */}
							<ReportChart className='bg-white mx-2 w-full mt-4' projectInfo={projectInfo} contractValues={listAmountContractValueByDate} />

							{/* Images */}
							<ReportImage className="w-full px-2" projectInfo={projectInfo} />

							<div className="flex flex-wrap w-full">
								{/* Budget and Cost */}
								<ReportBudget className={cn(styles['budget-wrapper'], "bg-white flex-auto mx-2 mt-4")} projectInfo={projectInfo} />
								<div className="flex flex-1">
									{/* Contractor */}
									<ReportContractor className={cn(styles['contractor-wrapper'], "bg-white mx-2 flex-1 mt-4")} projectInfo={projectInfo} />

									{/* Profile */}
									<ReportProfile className={cn(styles['profile-wrapper'], "bg-white mx-2 flex-1 mt-4 whitespace-nowrap")} projectInfo={projectInfo} />
								</div>
							</div>
						</div>
					</div>
					<div className="w-4/12">
						<div className="w-full flex flex-wrap px-2">
							{/* Main Work */}
							<ReportMainWork className={cn(styles['work-wrapper'], 'bg-white h-full pl-6 pr-5 pt-5 pb-7 w-full mt-4')} />

							{/* Multiple Chart */}
							<ReportMultipleChart className='bg-white h-full pl-5 pr-12 pb-3 w-full mt-4' projectInfo={projectInfo}/>

							{/* Quick report */}
							<ReportQuickReport className={cn(styles['quick-report'], 'bg-white h-full pt-4 px-6 pb-6 w-full mt-4')} />

							{/* Contract status */}
							<ReportContractStatus className={cn(styles['quick-report'], 'bg-white h-full pt-4 px-6 pb-6 w-full mt-4 overflow-hidden')} />
						</div>
					</div>
				</div>
			</div>
			<ModalZoomView isShow={state.isShow} toggle={toggleModal} initialData={{
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