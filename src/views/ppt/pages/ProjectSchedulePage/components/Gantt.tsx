import { FC, useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

// https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/
const Gantt: FC<{ tasks: any }> = ({ tasks }) => {
	const ganttContainer = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ganttContainer.current) {
			gantt.init(ganttContainer.current);
			gantt.parse(tasks);
			gantt.config.columns =  [
				{ name:"text", label:"Nội dung", tree: true, width: 400 },
				{ name:"start_date", label:"Bắt đầu", align:"center" },
				{ name:"end_date", label:"Kết thúc", align:"center" },
				{ name:"duration", label:"Số ngày", align:"center", width: 50 },
			];
			// gantt.config.date_format = 'yyyy-MM-dd';
			gantt.plugins({
				drag_timeline: true
			});
			gantt.config.drag_timeline = {
				ignore:".gantt_task_line, .gantt_task_link",
				useKey: false
		  	};
		}
	}, [JSON.stringify(tasks)])

	return (
		<div
			ref={ganttContainer}
			className='w-full h-full'
			style={ { width: '100%', height: '100%' } }
		/>
	)
}

export default Gantt;