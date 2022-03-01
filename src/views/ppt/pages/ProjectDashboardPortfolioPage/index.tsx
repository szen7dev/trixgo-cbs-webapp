import { FC, useEffect } from "react";

import cn from "classnames";

import PortfolioAnalysisContainer from "./components/PortfolioAnalysisContainer";
import PortfolioTableContainer from "./components/PortfolioTableContainer";
import { useHistory } from "react-router-dom";
import { useCheckPerAccessApp, useCheckPerAccessOneMenu } from "services/hooks/useAuth";
import { APP_ID } from "apis/localdb";
import { toast } from "react-toastify";

const ProjectDashboardPortfolioPage: FC = () => {
	const history = useHistory();
	const { hasPermission, isSuccess: isSuccessApp } = useCheckPerAccessApp(APP_ID.PCM.id);
	const { hasPermission: hasPermissionMenu, isSuccess: isSuccessMenu, permission } = useCheckPerAccessOneMenu(APP_ID.PCM.id, APP_ID.PCM.menuApp.dashboard_portfolio.id, "1");

	// Phân quyền theo nhóm chức năng
	useEffect(() => {
		if (isSuccessApp && isSuccessMenu && (!hasPermission || !hasPermissionMenu || permission?.read < 1)) {
			toast.error("Bạn không có quyền truy cập tính năng này!");
			history.push("/");
		};
	}, [isSuccessApp, isSuccessMenu, hasPermission, hasPermissionMenu, permission]);

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
