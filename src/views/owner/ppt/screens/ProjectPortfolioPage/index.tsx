import { FC, useEffect } from "react";

import cn from "classnames";

import PortfolioAnalysisContainer from "./components/PortfolioAnalysisContainer";
import PortfolioTableContainer from "./components/PortfolioTableContainer";

const ProjectPortfolioPage: FC = () => {

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
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
export default ProjectPortfolioPage;
