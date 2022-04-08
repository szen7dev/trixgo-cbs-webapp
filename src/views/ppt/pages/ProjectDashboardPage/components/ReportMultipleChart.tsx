import React from 'react'
import { Project } from 'typings/items/project';
import { formatNumberMoney, formatNaNToZero } from 'utils/converter';

import ChartDoughnutSmall from '../../../chart/ChartDoughnutSmall'
import styles from "../../../style.module.css";

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportMultipleChart: React.FC<Props> = ({ projectInfo, ...props }) => {
	if(!projectInfo) return <></>

	const totalRFI = formatNumberMoney(projectInfo.numberOfRfis);
	const totalSubmittal = formatNumberMoney(projectInfo.numberOfSubmitals);
	const totalPunch = formatNumberMoney(projectInfo.numberOfPunchLists);

	const dataChart = (total: number | string) => {
		return {
			datasets: [
			  {
				label: "# of Votes",
				data: [total],
				backgroundColor: ["#00CA99", "#FF9900", "#F55F5F"],
				borderWidth: 0,
			  },
			],
		};
	}

	return (
		<div {...props}>
			<div className="flex w-full justify-around px-0.5">
				<div className={styles.chart}>
					<ChartDoughnutSmall _data={dataChart(totalRFI)} title="225" subtitle="RFI" />
				</div>
				<div className={styles.chart}>
					<ChartDoughnutSmall _data={dataChart(totalSubmittal)} title="68" subtitle="SUBMITALS" />
				</div>
				<div className={styles.chart}>
					<ChartDoughnutSmall _data={dataChart(totalPunch)} title="43" subtitle="PUNCH" />
				</div>
			</div>
		</div>
	)
}

export default ReportMultipleChart;