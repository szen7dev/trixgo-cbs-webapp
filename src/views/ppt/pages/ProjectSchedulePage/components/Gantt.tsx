import { FC, useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

// https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/
const Gantt: FC<{ tasks: any }> = ({ tasks }) => {
	const ganttContainer = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (ganttContainer.current) {
			const zoomConfig = {
				levels: [
					{
						name:"day",
						scale_height: 27,
						min_column_width:80,
						scales:[
							{unit: "day", step: 1, format: "%d %M"}
						]
					},
					{
						name:"week",
						scale_height: 50,
						min_column_width:50,
						scales:[
							{unit: "week", step: 1, format: function (date: any) {
								const dateToStr = gantt.date.date_to_str("%d %M");
								const endDate = gantt.date.add(date, -6, "day");
								const weekNum = gantt.date.date_to_str("%W")(date);
								return "#" + weekNum + ", " + dateToStr(date) + " - " + dateToStr(endDate);
							}},
							{unit: "day", step: 1, format: "%j %D"}
						]
					},
					{
						name:"month",
						scale_height: 50,
						min_column_width:120,
						scales:[
							{unit: "month", format: "%F, %Y"},
							{unit: "week", format: "Week #%W"}
						]
					},
					{
						name:"quarter",
						height: 50,
						min_column_width:90,
						scales:[
							{unit: "month", step: 1, format: "%M"},
							{
								unit: "quarter", step: 1, format: function (date: any) {
									const dateToStr = gantt.date.date_to_str("%M");
									const endDate = gantt.date.add(gantt.date.add(date, 3, "month"), -1, "day");
									return dateToStr(date) + " - " + dateToStr(endDate);
								}
							}
						]
					},
					{
						name:"year",
						scale_height: 50,
						min_column_width: 30,
						scales:[
							{unit: "year", step: 1, format: "%Y"}
						]
					}
				],
				useKey: "ctrlKey",
				trigger: "wheel",
				element: function(){
					// return gantt.$root.querySelector(".gantt_task");
				}
			};

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
			gantt.ext.zoom.init(zoomConfig);
			gantt.ext.zoom.setLevel("quarter"); // Set mặc định hiển thị theo Quý

			// // Date display config
			gantt.config.date_grid = "%d/%m/%Y";
			gantt.config.xml_date = "%Y-%m-%d %H:%i:%s";

			gantt.config.order_branch = true;/*!*/
			gantt.config.order_branch_free = true;/*!*/

			gantt.init(ganttContainer.current);
			gantt.parse(tasks);
			gantt.config.columns =  [
				{ name:"text", label:"Nội dung", tree: true, min_width: 450 },
				{ name:"start_date", label:"Bắt đầu", align:"center", width: 100 },
				{ name:"end_date", label:"Kết thúc", align:"center", width: 100  },
				{ name:"duration", label:"Số ngày", align:"center", width:50 },
			];
			// Cho phép kép sang phải để xem
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