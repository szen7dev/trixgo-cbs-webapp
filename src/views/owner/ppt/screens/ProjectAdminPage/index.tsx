import { FC, useEffect } from "react";

const ProjectAdminPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Quản trị viên"
	}, []);

	return (
		<div>
			<h2>Quản trị viên</h2>
		</div>
	);
};
export default ProjectAdminPage;