import { FC, useEffect } from "react";

const ProjectReportPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Báo cáo"
	}, []);

	return (
		<div>
			<h2>Báo cáo</h2>
		</div>
	);
};
export default ProjectReportPage;