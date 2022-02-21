import { FC, useEffect } from "react";
import { useHistory } from "react-router-dom"

import image from 'assets/images/icons8-stacked-organizational-chart-highlighted-first-node-96 1.png';
import avatar from 'assets/images/avatar.jpg';
import Gantt from "./components/schedule/Gantt";

const ProjectSchedulePage: FC = () => {
	const history = useHistory();
	useEffect(() => {
		document.title = "CHG.THT-Quản lý tiến độ"
	}, []);

	function handleClick() {
		history.goBack();
	}

	const data = {
		// data: Array.from({ length: 30 }).map((_, i) => ({
		// 	id: i + 1, text: 'Task #' + i % 4, start_date: new Date((new Date()).setDate(i)), duration: 3, progress: 0.6,
		// })),
		data: [
			{ id: 1, text: 'Task #1', start_date: '15-04-2019', duration: 3, progress: 0.6 },
			{ id: 2, text: 'Task #2', start_date: '18-04-2019', duration: 3, progress: 0.4 }
		],
		links: [
			{ id: 1, source: 1, target: 2, type: '0' }
		]
	};
	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* Header */}
			<div className="flex justify-between sticky top-0 bg-gray-800 text-white py-1.5 z-10">
				<div className="ml-4">
					<button onClick={handleClick}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
					</button>
					<img src={image} alt="icon" className="inline-block mx-2.5" />
					<h1 className="inline-block font-bold">CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây</h1>
				</div>
				<div className="flex">
					<img src={avatar} alt="avatar" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar1" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar2" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar3" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
				</div>
			</div>
			{/* Content */}
			<main className="flex-1 overflow-auto">
				<Gantt tasks={data} />
			</main>
		</div>
	);
};
export default ProjectSchedulePage;
