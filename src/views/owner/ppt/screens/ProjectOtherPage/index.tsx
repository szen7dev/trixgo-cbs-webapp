import { FC, useEffect } from "react";

const ProjectOtherPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Khác"
	}, []);

	return (
		<div >
			<h2>Khác</h2>
		</div>
	);
};
export default ProjectOtherPage;