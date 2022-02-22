import { FC, useEffect } from "react";

const ProjectRfaPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Yêu cầu phê duyệt"
	}, []);

	return (
		<div>
			<h2>Yêu cầu phê duyệt</h2>
		</div>
	);
};
export default ProjectRfaPage;