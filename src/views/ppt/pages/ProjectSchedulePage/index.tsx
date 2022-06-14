import { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"

import image from 'assets/images/icons8-stacked-organizational-chart-highlighted-first-node-96 1.png';
import avatar from 'assets/images/avatar.jpg';
import Gantt from "./components/Gantt";
import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import { PCM_MILESTONE } from "apis/localdb/index";
import { useTask } from "services/hooks/useTask";
import moment from "moment";
let dataGranttInint:any = [
	{ id: 1, text: "Pháp lý", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 2, text: "Thiết kế", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 3, text: "Dự toán, ngân sách", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 4, text: "Lựa chọn nhà thầu", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 5, text: "Thi công", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 6, text: "Bàn giao", start_date: null, duration: null, parent:null, progress: 0, open: true},
	{ id: 7, text: "Quyết toán", start_date: null, duration: null, parent:null, progress: 0, open: true},
]

const getTimeBetween = function (time1: any, time2: any) {
    const a = (new Date(time1)).getTime();
    const b = (new Date(time2)).getTime();
    return (a - b) / (1000);
};

const ProjectSchedulePage: FC = () => {
	const history = useHistory();
	const { id: departmentID } = useParams<{ id: string }>();
	useEffect(() => {
		document.title = "CHG.THT-Quản lý tiến độ"
	}, []);

	const [dataGrantt, setGranttInint] = useState<any>({
		data: dataGranttInint,
		links: [
			{ id: 1, source: 1, target: 2, type: '0' }
		]
	});
	
	function handleClick() {
		history.goBack();
	}
	const { infoDepartment } = usePcmProject({ departmentID });
	const {
		listTasks,
		totalRecord,
		nextPageListTask,
		refetchListTask
	  } = useTask({
		params: {
			projectID: departmentID, isPassPermision: "1", statusNe: "3", limit: 100
		},
		isFetch: true
	});

	useEffect(() => {
		listTasks?.forEach((task:any) => {
			if(task.milestone){
				const actualStartTime  = new Date(task.actualStartTime);
				const actualFinishTime =  new Date(task.actualFinishTime);
				const duration = Math. ceil((actualFinishTime.getTime() - actualStartTime.getTime()) / (24*60*60*1000));
				dataGranttInint = [ 
					...dataGranttInint, {
						id: task._id, text: task.name, start_date: actualStartTime, duration: duration || 0, parent: task.milestone, progress: 0, open: true
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
			<div className="flex justify-between sticky top-0 bg-gray-800 text-white py-1.5 z-10">
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
			</div>
			{/* Content */}
			<main className="flex-1 overflow-auto">
				<Gantt tasks={dataGrantt} />
			</main>
		</div>
	);
};
export default ProjectSchedulePage;
