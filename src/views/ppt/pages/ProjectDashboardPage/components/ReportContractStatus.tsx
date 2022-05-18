import React, { useState, useEffect } from 'react'
import cn from "classnames";

import styles from "../../../style.module.css";
import { Link } from 'react-router-dom';
import { useContract } from "services/hooks/items/useContract";
import { isBuffer } from 'lodash';
type Props = {
	projectID: string | undefined;
} & React.HTMLAttributes<HTMLDivElement>

const ReportContractStatus: React.FC<Props> = ({ projectID, ...props }) => {
    const [isFetchStatisticalStatusByOntimeOnbudget, SetIsFetchStatisticalStatusByOntimeOnbudget] = useState(false);

	// Danh sách hợp đồng
	const {
		statisticalStatusByOntimeOnbudget,
	} = useContract({
		params: { projectID },
		isFetchStatisticalStatusByOntimeOnbudget
	})
	
	useEffect(() => {
		if(!projectID) return;
		SetIsFetchStatisticalStatusByOntimeOnbudget(true);
	}, [projectID]);

	let ontime1_onbudget1 = 0
	let ontime1_onbudget2 = 0
	let ontime2_onbudget1 = 0
	let ontime2_onbudget2 = 0

	if(!statisticalStatusByOntimeOnbudget || !statisticalStatusByOntimeOnbudget.length){
		ontime1_onbudget1 = 0
		ontime1_onbudget2 = 0
		ontime2_onbudget1 = 0
		ontime2_onbudget2 = 0
		// return <></>
	}
	
	statisticalStatusByOntimeOnbudget?.forEach((item: any) => {
		if(item._id.ontime == 1 && item._id.onbudget == 1 )
			ontime1_onbudget1 = item.amount
		if(item._id.ontime == 1 && item._id.onbudget == 2 )
			ontime1_onbudget2 = item.amount
		if(item._id.ontime == 2 && item._id.onbudget == 1 )
			ontime2_onbudget1 = item.amount
		if(item._id.ontime == 2 && item._id.onbudget == 2 )
			ontime2_onbudget2 = item.amount
	});
	
	return (
		<div {...props}>
			<h3>Tình trạng hợp đồng</h3>
			<div className={cn(styles['contract-status'], styles['text-2xl'], "mt-4")}>
				<Link to="/">
					<div className={styles.success}>{ontime1_onbudget1}</div>
				</Link>
				<Link to="/">
					<div className={styles.warn}>{ontime1_onbudget2}</div>
				</Link>
				<Link to="/">
					<div className={styles.purple}>{ontime2_onbudget1}</div>
				</Link>
				<Link to="/">
					<div className={styles.danger}>{ontime2_onbudget2}</div>
				</Link>
			</div>
			<div className={cn(styles['text-tiny'], "grid grid-cols-2 gap-y-2 gap-x-1 mt-4")}>
				<div style={{ minWidth: '204px' }}>
					<Link to="/" className="flex items-center whitespace-nowrap" >
						<div className={cn(styles.success, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>Đúng tiến độ, đúng ngân sách
					</Link>
				</div>
				<div style={{ minWidth: '204px' }}>
					<Link to="/" className="flex items-center whitespace-nowrap" >
						<div className={cn(styles.purple, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>Chậm tiến độ, đúng ngân sách
					</Link>
				</div>
				<div style={{ minWidth: '204px' }}>
					<Link to="/" className="flex items-center whitespace-nowrap" >
						<div className={cn(styles.warn, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>Đúng tiến độ, vượt ngân sách
					</Link>
				</div>
				<div style={{ minWidth: '204px' }}>
					<Link to="/" className="flex items-center whitespace-nowrap" >
						<div className={cn(styles.danger, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>Chậm tiến độ, vượt ngân sách
					</Link>
				</div>
			</div>
		</div>
	)
}

export default ReportContractStatus
