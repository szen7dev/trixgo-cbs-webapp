import React from 'react'
import cn from "classnames";
import { ChartData } from 'chart.js';

import ChartDoughnutSmall from '../../../chart/ChartDoughnutSmall';
import { Link } from 'react-router-dom';
import { Project } from 'typings/items/project';
import styles from "../../../style.module.css";

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportContractor: React.FC<Props> = ({ projectInfo, ...props }) => {
	if(!projectInfo) return <></>;

	const _data: ChartData<"doughnut", number[], unknown> = {
		labels: [
		  "Chưa bắt đầu",
		  "Lập kế hoạch",
		  "Thiết kế",
		  "Đấu thầu",
		  "Xây dựng",
		  "Khác",
		],
		datasets: [
		  {
			data: [0, 0, 0, 0, 0, 0],
			backgroundColor: [
			  "rgba(44, 134, 237, 1)",
			  "rgba(255, 165, 0, 1)",
			  "rgba(155, 89, 182, 1)",
			  "rgba(224, 59, 86, 1)",
			  "rgba(0, 202, 153, 1)",
			  "rgba(219, 231, 242, 1)",
			],
			borderWidth: 0,
		  },
		],
	};

	return (
		<div {...props}>
			<h3>Lựa chọn nhà thầu</h3>
			<div className={cn(styles.chart, "mt-4 mx-auto")}>
				<ChartDoughnutSmall _data={_data} title="GÓI THẦU" />
			</div>
			<div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="/"><span className={cn(styles.circle, styles.plum, "inline-block h-2 w-2 rounded-md mr-3")}></span>Chưa thực hiện (14-155 tỷ)</Link>
				</div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="/"><span className={cn(styles.circle, styles.info, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đang triển khai (8-288 tỷ)</Link>
				</div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="/"><span className={cn(styles.circle, styles.lime, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đã hoàn thành (4-600 tỷ)</Link>
				</div>
			</div>
		</div>
	)
}

export default ReportContractor