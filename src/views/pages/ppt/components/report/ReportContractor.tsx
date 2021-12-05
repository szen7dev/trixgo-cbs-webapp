import React from 'react'

import cn from "classnames";

import ChartDoughnutSmall from '../../chart/ChartDoughnutSmall'
import { _data } from '../../chart/ProjectDoughnutChart'
import styles from "../../style.module.css";

const ReportContractor: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Lựa chọn nhà thầu</h3>
			<div className={cn(styles.chart, "mt-4 mx-auto")}>
				<ChartDoughnutSmall _data={_data} />
			</div>
			<div>
				<div className="mt-6"><p><span className={cn(styles.circle, styles.plum, "inline-block h-2 w-2 rounded-md mr-3")}></span>Chưa thực hiện (14-155 tỷ)</p></div>
				<div className="mt-6"><p><span className={cn(styles.circle, styles.info, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đang triển khai (8-288 tỷ)</p></div>
				<div className="mt-6"><p><span className={cn(styles.circle, styles.lime, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đã hoàn thành (4-600 tỷ)</p></div>
			</div>
		</div>
	)
}

export default ReportContractor
