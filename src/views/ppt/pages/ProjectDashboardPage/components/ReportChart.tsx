import React, { useState, useEffect, memo } from 'react'
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

/**
 * Hooks
 */
import { useCashFlowPlanCustom } from 'services/hooks/financial/useCashFlow';

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
} & React.HTMLAttributes<HTMLDivElement>

const ReportChart: React.FC<Props> = ({ projectInfo, ...props }) => {
	const [dataSets, setDataSets] = useState<{
		labels: Array<{ month: number, year: number, yy: string }>,
		dataSpendingPlan: string[],
		dataAccumulatedSpendingPlan: string[],
		dataSpendingPlanReal: string[],
		dataAccumulatedSpendingPlanReal: string[],
	}>({
		labels: [],
		dataSpendingPlan: [],
		dataAccumulatedSpendingPlan: [],
		dataSpendingPlanReal: [],
		dataAccumulatedSpendingPlanReal: [],
	});

	const { listAmountByProperty, isLoadingAmountByProperty } = useCashFlowPlanCustom({
		params: {
			amountByProperty: {
				projectID: projectInfo?._id,
				option: 4,
				type: 5,
				property: 3,
				outin: 2
			}
		},
		isFetchAmountByProperty: true
	})

	const {
		listAmountByProperty: listAmountByPropertyReal,
		isLoadingAmountByProperty: isLoadingAmountByPropertyReal
	} = useCashFlowPlanCustom({
		params: {
			amountByProperty: {
				projectID: projectInfo?._id,
				option: 4,
				type: 5,
				property: 3,
				outin: 2,
				real: 1
			}
		},
		isFetchAmountByProperty: true
	})

	useEffect(() => {
		// Step 1: Get date range (startTimeProject -> now)
		const dates = getDates(new Date(projectInfo?.startTime || Date.now()), new Date());

		// Step 2: Format date range
		const datesFormat = dates.map(date => ({
			month: moment(date).get('month') + 1,
			year: moment(date).get('year'),
			yy: moment(date).format('MM/YY')
		}));

		// Step 3: Unique date label
		const labels = _lodash.unionBy(datesFormat, 'yy');

		// Function Custom
		const getAllBefore = (arr: any[], current: string) => {
			const i = arr.findIndex(item => item.yy === current);
			return i > -1 ? arr.slice(0, i) : [];
		}

		// Step 4: Set data total files by date label

		// Data Plan
		const dataSpendingPlan = labels.map(date => {
			let total = 0;

			const infoCashFlow = listAmountByProperty?.find(cashFlow =>
				cashFlow?._id?.month == date.month &&
				cashFlow?._id?.year == date.year
			);

			if(infoCashFlow) {
				total = infoCashFlow.value;
			}

			return (total / 1_000_000_000).toFixed(2);
		})

		const dataAccumulatedSpendingPlan = labels.map((date, index) => {
			let totalCurrentDate = 0;
			let total = 0;

			const infoCashFlow = listAmountByProperty?.find(cashFlow =>
				cashFlow?._id?.month == date.month &&
				cashFlow?._id?.year == date.year
			);

			if(infoCashFlow) {
				totalCurrentDate = infoCashFlow.value;
			}

			if(index !== 0) {
				const datePreviousCurrent = getAllBefore(labels, date.yy);

				total = datePreviousCurrent.reduce((prev, curr) => {
					let totalPrev = 0;

					const infoCashFlow = listAmountByProperty?.find(cashFlow =>
						cashFlow?._id?.month == curr.month &&
						cashFlow?._id?.year == curr.year
					);

					if(infoCashFlow) {
						totalPrev = infoCashFlow.value;
					}

					return prev += totalPrev;
				}, 0)

				total += totalCurrentDate;
			} else{
				total = totalCurrentDate;
			}

			return (total / 1_000_000_000).toFixed(2)
		})

		// Data Real
		const dataSpendingPlanReal = labels.map(date => {
			let total = 0;

			const infoCashFlow = listAmountByPropertyReal?.find(cashFlow =>
				cashFlow?._id?.month == date.month &&
				cashFlow?._id?.year == date.year
			);

			if(infoCashFlow) {
				total = infoCashFlow.realValue;
			}

			return (total / 1_000_000_000).toFixed(2);
		})

		const dataAccumulatedSpendingPlanReal = labels.map((date, index) => {
			let totalCurrentDate = 0;
			let total = 0;

			const infoCashFlow = listAmountByPropertyReal?.find(cashFlow =>
				cashFlow?._id?.month == date.month &&
				cashFlow?._id?.year == date.year
			);

			if(infoCashFlow) {
				totalCurrentDate = infoCashFlow.realValue;
			}

			if(index !== 0) {
				const datePreviousCurrent = getAllBefore(labels, date.yy);

				total = datePreviousCurrent.reduce((prev, curr) => {
					let totalPrev = 0;

					const infoCashFlow = listAmountByPropertyReal?.find(cashFlow =>
						cashFlow?._id?.month == curr.month &&
						cashFlow?._id?.year == curr.year
					);

					if(infoCashFlow) {
						totalPrev = infoCashFlow.realValue;
					}

					return prev += totalPrev;
				}, 0)

				total += totalCurrentDate;
			} else{
				total = totalCurrentDate;
			}

			return (total / 1_000_000_000).toFixed(2)
		})

		setDataSets({
			labels,
			dataSpendingPlan,
			dataAccumulatedSpendingPlan,
			dataSpendingPlanReal,
			dataAccumulatedSpendingPlanReal,
		})
	}, [JSON.stringify(projectInfo), JSON.stringify(listAmountByProperty), JSON.stringify(listAmountByPropertyReal)])

	if(!projectInfo || isLoadingAmountByProperty || isLoadingAmountByPropertyReal) return <></>

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
									return `${value} tỷ`;
									// return convertCurrency(+value * 1_000_000_000) + ' tỷ';
									// return (isNaN(+value) ? value : +value / 1_000_000_000) + " tỷ";
								},
							},
							title: {
								display: true
							},
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
												text: data.label,
													// data.label + " " +
													// (i % 2 === 1
													// 	? Math.floor(
													// 		(chart.data.datasets[i].data[
													// 			chart.data.datasets[i].data.length - 1
													// 		]?.y || 0) / 1e8
													// 	) / 100
													// 	: ""),
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
							callbacks: {
								label: function(context) {
									let label = context.dataset.label || '';
									let tooltipValue = context.parsed.y.toString();

									if(tooltipValue) {
										tooltipValue = tooltipValue.replaceAll('.', ',')
										label += `: ${tooltipValue}`;
									}

									return label;
								}
							}
						},
					}
				}}
				data={{
					labels: dataSets.labels.map(label => label.yy),
					datasets: [
						{
							label: "Kế hoạch chi",
							data: dataSets.dataSpendingPlan,
							borderWidth: 3,
							backgroundColor: "transparent",
							borderColor: "#45aaf2",
						},
						{
							label: "Lũy kế chi kế hoạch chi",
							data: dataSets.dataAccumulatedSpendingPlan,
							borderWidth: 3,
							backgroundColor: "transparent",
							borderColor: "#3867d6",
						},
						{
							label: "Thực tế chi",
							data: dataSets.dataSpendingPlanReal,
							borderWidth: 3,
							backgroundColor: "transparent",
							borderColor: "#ff793f",
						},
						{
							label: "Lũy kế chi thực tế chi",
							data: dataSets.dataAccumulatedSpendingPlanReal,
							borderWidth: 3,
							backgroundColor: "transparent",
							borderColor: "#b33939",
						},
					]
				}}
				height={"415px"}
			/>
		</div>
	)
}

export default memo(ReportChart)
