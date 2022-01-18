import { FC, useEffect, useRef } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';

// https://dhtmlx.com/blog/create-react-gantt-chart-component-dhtmlxgantt/

const Gantt: FC<{ tasks: any }> = ({ tasks }) => {
	const ganttContainer = useRef<HTMLDivElement>(null)
	useEffect(() => {
		if (ganttContainer.current) {
			gantt.init(ganttContainer.current);
			gantt.parse(tasks);
		}
	}, [])
	return (
		<div
			ref={ganttContainer}
			className='w-full h-full'
		/>
	)
}

export default Gantt;