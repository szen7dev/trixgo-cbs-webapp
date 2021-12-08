import { FC, useEffect } from "react";
import SwiperCore, { Navigation } from 'swiper';

import cn from "classnames";
import 'chartjs-adapter-moment';
import 'moment/locale/vi';

import ReportTimeLine from "./components/report/ReportTimeLine";

import styles from "./style.module.css";
import 'swiper/swiper.min.css';
import ReportTotal from "./components/report/ReportTotal";
import ReportActivity from "./components/report/RreportActivity";
import ReportChart from "./components/report/ReportChart";
import ReportContractor from "./components/report/ReportContractor";
import ReportProfile from "./components/report/ReportProfile";
import ReportMainWork from "./components/report/ReportMainWork";
import ReportImage from "./components/report/ReportImage";
import ReportBudget from "./components/report/ReportBudget";
import ReportQuickReport from "./components/report/ReportQuickReport";
import ReportContractStatus from "./components/report/ReportContractStatus";
import ReportMultipleChart from "./components/report/ReportMultipleChart";

SwiperCore.use([Navigation]);

const ProjectReportPage: FC = () => {
	useEffect(() => {
		document.title = "PPT - CHI TIẾT DỰ ÁN-BÁO CÁO QUẢN TRỊ DỰ ÁN";
	}, []);

	return (
		<div className={cn(styles.content, styles.report, styles['bg-gray'], styles['text-normal'])}>
			<div className={cn(styles['content-container'], styles.scroll, "overflow-y-auto p-4 pt-0 flex-1 h-full")}>
				{/* Content */}
				<div className="flex flex-wrap -mx-2">
					<div className="w-8/12">
						<div className="flex flex-wrap w-full">
							<div className="flex flex-wrap w-full">
								{/* Timeline */}
								<ReportTimeLine className={cn(styles.cell, "mx-2 py-3 px-6 flex items-end mt-4 flex-auto")} />

								<div className="flex flex-1">
									{/* Total Invest */}
									<ReportTotal className={cn(styles.cell, "mx-2 flex-1 py-2 pl-4 pr-5 mt-4")} style={{ minWidth: "116px" }} />

									{/* Activity */}
									<ReportActivity className={cn(styles.cell, "mx-2 flex-1 py-2 pl-4 pr-5 mt-4")} />
								</div>
							</div>

							{/* Chartjs */}
							<ReportChart className={cn(styles.cell, 'mx-2 w-full mt-4')} />

							{/* Images */}
							<ReportImage className="w-full px-2" />

							<div className="flex flex-wrap w-full">
								{/* Budget and Cost */}
								<ReportBudget className={cn(styles.cell, styles['budget-wrapper'], "flex-auto mx-2 mt-4")} />
								<div className="flex flex-1">
									{/* Contractor */}
									<ReportContractor className={cn(styles.cell, styles['contractor-wrapper'], "mx-2 flex-1 mt-4")} />

									{/* Profile */}
									<ReportProfile className={cn(styles.cell, styles['profile-wrapper'], "mx-2 flex-1 mt-4 whitespace-nowrap")} />
								</div>
							</div>
						</div>
					</div>
					<div className="w-4/12">
						<div className="w-full flex flex-wrap px-2">
							{/* Main Work */}
							<ReportMainWork className={cn(styles.cell, styles['work-wrapper'], 'h-full pl-6 pr-5 pt-5 pb-7 w-full mt-4')} />

							{/* Multiple Chart */}
							<ReportMultipleChart className={cn(styles.cell, 'h-full pl-5 pr-12 pb-3 w-full mt-4')} />

							{/* Quick report */}
							<ReportQuickReport className={cn(styles.cell, styles['quick-report'], 'h-full pt-4 px-6 pb-6 w-full mt-4')} />

							{/* Contract status */}
							<ReportContractStatus className={cn(styles.cell, styles['quick-report'], 'h-full pt-4 px-6 pb-6 w-full mt-4 overflow-hidden')} />
						</div>
					</div>
				</div>
			</div>
		</div >
	);
};
export default ProjectReportPage;
