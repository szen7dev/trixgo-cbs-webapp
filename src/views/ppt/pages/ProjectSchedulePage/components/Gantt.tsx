import { FC, useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

// https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/
const Gantt: FC<{ tasks: any }> = ({ tasks }) => {
	const ganttContainer = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ganttContainer.current) {
			gantt.plugins({
				marker: true
			});
			const dateToStr = gantt.date.date_to_str(gantt.config.task_date);
			const today = new Date();
			gantt.addMarker({
				start_date: today,
				css: "today",
				text: "Today",
				title: "Today: " + dateToStr(today)
			});
	
			gantt.config.row_height = 25; // Chiều cao hàng
			// gantt.ext.zoom.init(zoomConfig);
			// gantt.ext.zoom.setLevel("quarter"); // Set mặc định hiển thị theo Quý
			
			// // Date display config
			gantt.config.date_grid = "%d/%m/%Y";
			gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";
	
			gantt.config.order_branch = true;/*!*/
			gantt.config.order_branch_free = true;/*!*/

			gantt.init(ganttContainer.current);
			gantt.parse(tasks);
			gantt.config.columns =  [
				{ name:"text", label:"Nội dung", tree: true, width: 400 },
				{ name:"start_date", label:"Bắt đầu", align:"center" },
				{ name:"end_date", label:"Kết thúc", align:"center"         },
				{ name:"duration", label:"Số ngày", align:"center", width: 50 },
			];
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