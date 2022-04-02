import React, { FC } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	BarController,
	Legend,
	ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { getDates } from 'utils/time';
import moment from 'moment';
import _lodash from 'lodash';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	BarController
	// Legend
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	tooltip: {
		enabled: false,
	},
	plugins: {
		legend: {
			// position: 'top' as const,
			display: false
		},
		title: {
			display: false,
			// text: 'Chart.js Bar Chart',
		},
	},
	layout: {
		padding: {
			top: 24,
			right: 10
		}
	},
	scales: {
		x: {
			grid: { display: false }
		},
		y: {
			grid: { display: false },
			ticks: {
				stepSize: 500,
			}
		}
	}
};

// const labels = Array.from({ length: 35 }).map((_, i) => 'T' + (i + 1));

// export const data: ChartData<"bar", number[], string> = {
// 	labels,
// 	datasets: [
// 		{
// 			label: 'Dataset 1',
// 			data: labels.map(() => Math.round(Math.random() * 1000)),
// 			backgroundColor: '#1A97F5',
// 			barThickness: 12,
// 			maxBarThickness: 12,
// 		},
// 	],
// };

type Props = {
	project: any,
	files: any
} & React.HTMLAttributes<HTMLElement>

const ChartReportByTime: FC<Props> = ({ project, files, ...props }) => {
	const dates = getDates(new Date(project.startTime), new Date());
	const datesFormat = dates.map(date => moment(date).format('MM/YY'));
	const labels = _lodash.uniq(datesFormat);

	const data: ChartData<"bar", number[], string> = {
		labels,
		datasets: [
			{
				label: 'Dataset 1',
				data: labels.map(() => Math.round(Math.random() * 1000)),
				backgroundColor: '#1A97F5',
				barThickness: 5,
				maxBarThickness: 5,
			},
		],
	};

	return (
		<Bar
			data={data}
			options={{
				...options, plugins: {
					...options.plugins,
					datalabels: {
						align: "top",
						anchor: "end",
						clamp: true
					},
				}
			}}
			{...props}
		/>
	)
}

export default ChartReportByTime
