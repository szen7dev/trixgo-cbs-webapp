import { FC, useEffect } from "react";

const ProjectRfiPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Yêu cầu thông tin"
	}, []);

	return (
		<div>
			<h2>Yêu cầu thông tin</h2>
		</div>
	);
};
export default ProjectRfiPage;