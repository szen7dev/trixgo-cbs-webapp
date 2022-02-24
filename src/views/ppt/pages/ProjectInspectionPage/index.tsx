import { FC, useEffect } from "react";

const ProjectInspectionPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Nghiệm thu chất lượng"
	}, []);

	return (
		<div>
			<h2>Nghiệm thu chất lượng</h2>
		</div>
	);
};
export default ProjectInspectionPage;