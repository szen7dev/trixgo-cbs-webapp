import { FC, useEffect } from "react";

const ProjectMomPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Họp"
	}, []);

	return (
		<div>
			<h2>Họp</h2>
		</div>
	);
};
export default ProjectMomPage;