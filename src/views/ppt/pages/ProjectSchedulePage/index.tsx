import { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"

import Gantt from "./components/Gantt";
import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import { useTask } from "services/hooks/useTask";

let dataGranttInint:any = [
	{ id: 1, text: "<b>Pháp lý</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 2, text: "<b>Thiết kế</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 3, text: "<b>Dự toán, ngân sách</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 4, text: "<b>Lựa chọn nhà thầu</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 5, text: "<b>Thi công</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 6, text: "<b>Bàn giao</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 7, text: "<b>Quyết toán</b>", start_date: null, duration: null, parent:null, progress: 0, open: true},
]

const ProjectSchedulePage: FC = () => {
	const history = useHistory();
	const { id: departmentID } = useParams<{ id: string }>();

	const [dataGrantt, setGranttInint] = useState<any>({
		data: dataGranttInint,
		links: [
			{ id: 1, source: 1, target: 2, type: '0' }
		]
	});

	const { infoDepartment } = usePcmProject({ departmentID });
	const {
		listTasks,
	  } = useTask({
		params: {
			projectID: departmentID, isPassPermision: "1", unlimit: "1"
		},
		isFetch: true
	});

	useEffect(() => {
		document.title = `${infoDepartment?.data?.sign}-Mốc tiến độ`;
	}, [infoDepartment?.data?.sign]);

	useEffect(() => {
		listTasks?.forEach((task:any) => {
			// const taskUrl = <Link to={`/pcm/detail/${task._id}`}>{task.name}</Link>

			if(task.milestone){
				const actualStartTime  = new Date(task.actualStartTime);
				const actualFinishTime =  new Date(task.actualFinishTime);
				dataGranttInint = [
					...dataGranttInint, {
						id: task._id,
						text: `<a href="/pcm/detail/${task._id}">${task.name} (${(task.percentage)} %)</a>`,
						// text: taskUrl,
						start_date: actualStartTime,
						end_date: actualFinishTime,
						parent: task.milestone,
						percentage: task.percentage,
						progress: Number(task.percentage/100).toFixed(3),
						open: true
					}
				]
			}
		});
		setGranttInint({
			data: dataGranttInint,
			links: [
				{ id: 1, source: 1, target: 2, type: '0' }
			]
		});
	}, [JSON.stringify(listTasks)]);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* Header */}
			{/* <div className="flex justify-between sticky top-0 bg-gray-800 text-white py-1.5 z-10">
				<div className="ml-4">
					<button onClick={handleClick}>
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
						</svg>
					</button>
					<img src={image} alt="icon" className="inline-block mx-2.5" />
					<h1 className="inline-block font-bold">{infoDepartment?.data?.sign}.{infoDepartment?.data?.name}</h1>
				</div>
				<div className="flex">
					<img src={avatar} alt="avatar" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar1" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar2" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
					<img src={avatar} alt="avatar3" width="28" className="mx-1 object-cover rounded-3xl border border-white" />
				</div>
			</div> */}
			{/* Content */}
			<main className="flex-1 overflow-auto">
				<Gantt tasks={dataGrantt} />
			</main>
		</div>
	);
};

export default ProjectSchedulePage;