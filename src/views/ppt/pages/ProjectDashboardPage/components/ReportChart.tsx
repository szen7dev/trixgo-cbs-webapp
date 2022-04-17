import React from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Legend,
	TimeScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getDates } from 'utils/time';
import moment from 'moment';
import _lodash from 'lodash';

import planTable from '../../../chart/ProjectLineChart';
import { Project } from 'typings/items/project';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Legend,
	TimeScale,
	ChartDataLabels
);

type Props = {
	projectInfo: Project | undefined,
	contractValues: Array<any>
} & React.HTMLAttributes<HTMLDivElement>

const ReportChart: React.FC<Props> = ({ projectInfo, contractValues, ...props }) => {
	if(!projectInfo) return <></>

	// Step 1: Get date range (startTimeProject -> now)
	const dates = getDates(new Date(projectInfo.startTime || Date.now()), new Date());

	// Step 2: Format date range
	const datesFormat = dates.map(date => ({
		month: moment(date).get('month') + 1,
		year: moment(date).get('year'),
		yy: moment(date).format('MM/YY')
	}));

	// Step 3: Unique date label
	const labels = _lodash.unionBy(datesFormat, 'yy');

	// Step 4: Set data total files by date label
	const dataSets = labels.map(date => {
		let totalContractValues = 0;

		const infoContractValueByDate = contractValues?.find(contractValue =>
			contractValue?._id?.month == date.month &&
			contractValue?._id?.year == date.year
		);

		if(infoContractValueByDate) {
			totalContractValues = infoContractValueByDate.amount;
		}

		return totalContractValues;
	})

	return (
		<div {...props}>
			<Line
				options={{
					...planTable.options,
					scales: {
						// x: {
							// type: 'time',
							// time: {
								// displayFormats: {
								// 	quarter: 'MM/YYYY'
								// }
								// unit: "month",
								// displayFormats: {
								// 	month: 'MM',
								// 	year: "YY"
								// },
							// },
						// 	ticks: {
						// 		autoSkip: false,

						// 	},
						// },
						y: {
							ticks: {
								callback: function (value) {
									return (isNaN(Number(value)) ? value : Number(value) / 1000000000) + " tỷ";
								},
							},
							title: {
								display: true
							}
						}
					},
					plugins: {
						datalabels: {
							// formatter: function (value: { x: string; y: number }): number {
							// 	return Math.round(value.y / 1e7) / 100;
							// },
							align: "top",
							anchor: "start",
						},
						legend: {
							labels: {
								generateLabels(chart: any): any[] {
									const data = chart.data;
									if (data?.datasets?.length) {
										const {
											labels: { pointStyle },
										} = chart.legend.options;
										return data.datasets.map((data: any, i: number) => {
											const meta = chart.getDatasetMeta(i);
											const style = meta.controller.getStyle(i, true);
											return {
												text:
													data.label + " " +
													(i % 2 === 1
														? Math.floor(
															(chart.data.datasets[i].data[
																chart.data.datasets[i].data.length - 1
															]?.y || 0) / 1e8
														) / 100
														: ""),
												fillStyle: style.backgroundColor,
												strokeStyle: style.borderColor,
												lineWidth: 2,
												pointStyle: pointStyle,
												hidden: meta.hidden,
												// hidden: true,
												index: i,
												datasetIndex: i,
											};
										});
									}
									return [];
								},
							}
						},
						tooltip: {
							enabled: true,
						},
					}
				}}
				data={{
					labels: labels.map(label => label.yy),
					datasets: [
						{
							label: "Giải ngân",
							data: dataSets,
							borderWidth: 2,
							backgroundColor: "transparent",
							borderColor: "#85B2ED",
						},
					]
				}}
				height={"415px"}
			/>
		</div>
	)
}

export default ReportChart
