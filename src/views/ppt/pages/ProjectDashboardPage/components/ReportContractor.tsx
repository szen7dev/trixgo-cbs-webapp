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
	projectID: string | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportContractor: React.FC<Props> = ({ projectID, ...props }) => {
    const [isFetchContractorSelection, setIsFetchContractorSelection] = useState(false);
	const { contractorSelection } = useBiddingPlan({ 
		params: { projectID }, 
		isFetchContractorSelection 
	});
	useEffect(() => {
		if(!projectID) return;
		setIsFetchContractorSelection(true);
	}, [projectID]);

	let dataStatus1: any = {};
	let dataStatus2: any = {};
	let dataStatus3: any = {};
	const backgroundColor: any = [];
	contractorSelection?.forEach((item: any) => {
		if(item._id.status == 1){
			dataStatus1 = item;
			backgroundColor.push("rgba(224, 59, 86, 1)");
		}
		if(item._id.status == 2){
			backgroundColor.push("rgba(44, 134, 237, 1)");
			dataStatus2 = item;
		}
		if(item._id.status == 3){
			backgroundColor.push("rgba(0, 202, 153, 1)");
			dataStatus3 = item;
		}
	});
	
	const _data: ChartData<"doughnut", number[], unknown> = {
		datasets: [
		  {
			// data: [20, 6, 22],
			data: contractorSelection?.map((item: any) => item.amount),
			backgroundColor,
			// backgroundColor: [
			//   "rgba(224, 59, 86, 1)",
			//   "rgba(44, 134, 237, 1)",
			//   "rgba(0, 202, 153, 1)",
			// //   "rgba(255, 165, 0, 1)",
			// //   "rgba(155, 89, 182, 1)",
			// //   "rgba(0, 202, 153, 1)",
			// //   "rgba(219, 231, 242, 1)",
			// ],
			borderWidth: 0,
		  },
		],
	};
	return (
		<div {...props}>
			<Link to={`/pm/project/${projectID}/bidding`}>
			<h3>Lựa chọn nhà thầu</h3>
			<div className={cn(styles.chart, "mt-4 mx-auto")}>
				<ChartDoughnutSmall _data={_data} title="GÓI THẦU" />
			</div>
			<div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="#"><span className={cn(styles.circle, styles.plum, "inline-block h-2 w-2 rounded-md mr-3")}></span>Chưa thực hiện ({dataStatus1?.amount || 0} - { Math.ceil(dataStatus1?.amountPackagePrice/1000000000 || 0)} Tỷ) </Link>
				</div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="#"><span className={cn(styles.circle, styles.info, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đang triển khai ({dataStatus2?.amount || 0} - { Math.ceil(dataStatus2?.amountPackagePrice/1000000000 || 0)} Tỷ) </Link>
				</div>
				<div className="mt-6 whitespace-nowrap">
					<Link to="#"><span className={cn(styles.circle, styles.lime, "inline-block h-2 w-2 rounded-md mr-3")}></span>Đã hoàn thành ({dataStatus3?.amount || 0} - { Math.ceil(dataStatus3?.amountPackagePrice/1000000000 || 0)} Tỷ) </Link>
				</div>
			</div>
			</Link>
		</div>
	)
}

export default ReportContractor