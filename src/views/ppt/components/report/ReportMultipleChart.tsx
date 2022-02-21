import React from 'react'

import ChartDoughnutSmall from '../../chart/ChartDoughnutSmall'
import { _dataTwo } from '../../chart/ProjectDoughnutChart'
import styles from "../../style.module.css";

const ReportMultipleChart: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div className="flex w-full justify-around px-0.5">
				<div className={styles.chart}>
					<ChartDoughnutSmall _data={_dataTwo} title="225" subtitle="RFI" />
				</div>
				<div className={styles.chart}>
					<ChartDoughnutSmall _data={_dataTwo} title="68" subtitle="SUBMITALS" />
				</div>
				<div className={styles.chart}>
					<ChartDoughnutSmall _data={_dataTwo} title="43" subtitle="PUNCH" />
				</div>
			</div>
		</div>
	)
}

export default ReportMultipleChart;
