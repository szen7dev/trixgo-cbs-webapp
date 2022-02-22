import { FC, useEffect } from "react";

const ProjectProductionPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Sản lượng thực hiện"
	}, []);

	return (
		<div>
			<h2>Sản lượng thực hiện</h2>
		</div>
	);
};
export default ProjectProductionPage;