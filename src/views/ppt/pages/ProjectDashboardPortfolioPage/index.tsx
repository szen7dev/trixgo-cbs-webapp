import { FC, useEffect } from "react";
import cn from "classnames";
import PortfolioAnalysisContainer from "./components/PortfolioAnalysisContainer";
import PortfolioTableContainer from "./components/PortfolioTableContainer";
import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";

const ProjectDashboardPortfolioPage: FC = () => {
	// --------- Check phân quyền
	useCheckPerAccessScreen({
		appID: APP_ID.PCM.id,
		menuID: APP_ID.PCM.menuPcmApp.dashboard_portfolio.id,
		type: "1"
	});
	// ---------

	useEffect(() => {
		document.title = "Trixgo | Báo cáo đầu tư";
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