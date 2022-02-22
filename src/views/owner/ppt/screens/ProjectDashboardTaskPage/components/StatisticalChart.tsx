import React, { FC } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	BarController,
	ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

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

const labels = Array.from({ length: 34 }).map((_, i) => 'MAR.HAR');
// ['MAR.HAR', 'ARM.CAL', 'CHG.THT', 'PTIT.NHB', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR'];

export const data: ChartData<"bar", number[], string> = {
	labels,
	datasets: [
		{
			label: 'Dataset 1',
			data: labels.map(() => Math.round(Math.random() * 1000)),
			backgroundColor: '#0060E1',
			barThickness: 12,
			maxBarThickness: 12,
		},
	],
};

const StatisticalChart: FC<React.HTMLAttributes<HTMLElement>> = ({ ...props }) => {
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

export default StatisticalChart
