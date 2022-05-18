import React, { useEffect, useState } from 'react'
import cn from "classnames";
import { ChartData } from 'chart.js';

import ChartDoughnutSmall from '../../../chart/ChartDoughnutSmall';
import { Link } from 'react-router-dom';
import { Project } from 'typings/items/project';
import styles from "../../../style.module.css";
import { useBiddingPlan } from "services/hooks/bidding/useBiddingPlan";
import { forEach } from 'lodash';
import { convertCurrency } from "utils/converter";

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportContractor: React.FC<Props> = ({ projectInfo, ...props }) => {
    const [isFetchContractorSelection, setIsFetchContractorSelection] = useState(false);
	const { contractorSelection } = useBiddingPlan({ 
		params: { projectID: projectInfo?._id}, 
		isFetchContractorSelection 
	});

	useEffect(() => {
		if(!projectInfo) return;
		setIsFetchContractorSelection(true);
	}, [projectInfo]);
	
	const _data: ChartData<"doughnut", number[], unknown> = {
		datasets: [
		  {
			// data: [20, 6, 22],
			data: contractorSelection?.map((item: any) => item.amount),
			backgroundColor: [
			  "rgba(224, 59, 86, 1)",
			  "rgba(44, 134, 237, 1)",
			  "rgba(0, 202, 153, 1)",
			//   "rgba(255, 165, 0, 1)",
			//   "rgba(155, 89, 182, 1)",
			//   "rgba(0, 202, 153, 1)",
			//   "rgba(219, 231, 242, 1)",
			],
			borderWidth: 0,
		  },
		],
	};
	// if(!projectInfo) return <></>;
	return (
		<div {...props}>
			<h3>Lựa chọn nhà thầu</h3>
			<div className={cn(styles.chart, "mt-4 mx-auto")}>
				<ChartDoughnutSmall _data={_data} title="GÓI THẦU" />
			</div>
			<div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="#"><span className={cn(styles.circle, styles.plum, "inline-block h-2 w-2 rounded-md mr-3")}></span>Chưa thực hiện ({contractorSelection?.[0]?.amount || 0} - {convertCurrency(contractorSelection?.[0]?.amountPackagePrice || 0)})</Link>
				</div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="#"><span className={cn(styles.circle, styles.info, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đang triển khai ({contractorSelection?.[1]?.amount || 0} - {convertCurrency(contractorSelection?.[1]?.amountPackagePrice || 0)})</Link>
				</div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="#"><span className={cn(styles.circle, styles.lime, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đã hoàn thành ({contractorSelection?.[2]?.amount || 0} - {convertCurrency(contractorSelection?.[2]?.amountPackagePrice || 0)})</Link>
				</div>
			</div>
		</div>
	)
}

export default ReportContractor