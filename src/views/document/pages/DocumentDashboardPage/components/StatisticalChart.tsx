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

// const labels = Array.from({ length: 34 }).map((_, i) => 'MAR.HAR');
// ['MAR.HAR', 'ARM.CAL', 'CHG.THT', 'PTIT.NHB', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR', 'ARM.CAL', 'CHG.THT', 'MAR.HAR'];

// export const data2: ChartData<"bar", number[], string> = {
const getDataWithCharts = (_projects: any) => {
	return {
		labels: _projects.map((item: any) => `${item.sign}`),
		datasets: [
			{
				label: 'Số lượng tài liệu',
				data: _projects.map((item: any) => item.amount),
				backgroundColor: '#0060E1',
				barThickness: 12,
				maxBarThickness: 12,
			},
		],
	}
};

const StatisticalChart = ({ listProject = [], listAmountDocument = [], ...props }) => {
	const listProjectWithAmountMerge = listProject.map((itemProject: any) => {
		const itemExistAmountDocument: any = listAmountDocument.find((itemAmountDocument: any) => itemAmountDocument._id == itemProject._id);
		if (itemExistAmountDocument)
			return {
				...itemProject,
				...itemExistAmountDocument
			}
		return itemProject
	})
	
	return (
		<Bar
			data={getDataWithCharts(listProjectWithAmountMerge)}
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
