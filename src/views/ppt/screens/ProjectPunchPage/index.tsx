import { FC, useEffect } from "react";

const ProjectPunchPage: FC = () => {
	useEffect(() => {
		document.title = "CHG.THT-Yêu cầu sửa chữa"
	}, []);

	return (
		<div>
			<h2>Yêu cầu sửa chữa</h2>
		</div>
	);
};
export default ProjectPunchPage;