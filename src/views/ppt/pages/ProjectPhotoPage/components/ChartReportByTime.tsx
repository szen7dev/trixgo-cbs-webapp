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
import { FilesPcmGroupByDate } from 'typings/pcm';

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
	files: FilesPcmGroupByDate[] | undefined
} & React.HTMLAttributes<HTMLElement>

const ChartReportByTime: FC<Props> = ({ project, files, ...props }) => {
	// Step 1: Get date range (startTimeProject -> now)
	const dates = getDates(new Date(project.startTime), new Date());

	// Step 2: Format date range
	const datesFormat = dates.map(date => ({ yyyy: moment(date).format('MM/YYYY'), yy: moment(date).format('MM/YY') }));

	// Step 3: Unique date label
	const labels = _lodash.unionBy(datesFormat, 'yyyy');

	// Step 4: Set data total files by date label
	const dataSets = labels.map(date => {
		let totalFiles = 0;

		const infoFileByDate = files?.find(file => file.dataFormat === date.yyyy);
		if(infoFileByDate) {
			totalFiles = infoFileByDate.count;
		}

		return totalFiles;
	})

	const data: ChartData<"bar", number[], string> = {
		labels: labels.map(label => label.yy),
		datasets: [
			{
				label: 'Tổng hình ảnh',
				data: dataSets,
				backgroundColor: '#1A97F5',
				barThickness: 10,
				maxBarThickness: 10,
			}
		]
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
