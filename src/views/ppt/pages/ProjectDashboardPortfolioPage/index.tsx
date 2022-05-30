import { FC, useEffect } from "react";

import cn from "classnames";
import PortfolioAnalysisContainer from "./components/PortfolioAnalysisContainer";
import PortfolioTableContainer from "./components/PortfolioTableContainer";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import { useHistoryTraffics } from "services/hooks/auth/useAuth";

const ProjectDashboardPortfolioPage: FC = () => {
	//_____Start history traffict
	const payloadHistoryTraffic: any = {
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_portfolio.id,
		type: "1"
	  };
	const { createHistoryTraffics } = useHistoryTraffics();
	useEffect(() => {
		createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	}, []);
	//_____End history traffict

	// --------- Check phân quyền
	useCheckPerAccessScreen({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_portfolio.id,
		type: "1"
	});
	// ---------

	useEffect(() => {
		document.title = "PPT - Báo cáo đầu tư";
	}, []);

	return (
		<div className={cn("bg-cbs-gray overflow-y-auto")}>
			<div className="custom-scroll overflow-y-auto p-4 pt-0 flex-1">
				{/* Content */}
				<PortfolioAnalysisContainer />
				{/* Table */}
				<PortfolioTableContainer />
			</div>
		</div >
	);
};
export default ProjectDashboardPortfolioPage;
