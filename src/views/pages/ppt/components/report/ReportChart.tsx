/* eslint-disable @typescript-eslint/no-explicit-any */
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

import planTable from '../../chart/ProjectLineChart';

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

const ReportChart: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<Line
				options={{
					...planTable.options,
					scales: {
						x: {
							type: 'time',
							time: {
								unit: "month",
								displayFormats: {
									month: 'M/YYYY'
								},
							},
							ticks: {
								autoSkip: false,

							}
						},
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
							formatter: function (value: { x: string; y: number }): number {
								return Math.round(value.y / 1e7) / 100;
							},
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
							enabled: false,
						},
					}
				}}
				data={planTable.data}
				height={"415px"}
			/>
		</div>
	)
}

export default ReportChart
