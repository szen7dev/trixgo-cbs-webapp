import React from 'react'

import cn from "classnames";

import styles from "../../../style.module.css";
import { Link } from 'react-router-dom';

const ReportContractStatus: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Tình trạng hợp đồng</h3>
			<div className={cn(styles['contract-status'], styles['text-2xl'], "mt-4")}>
				<Link to="/">
					<div className={styles.success}>10</div>
				</Link>
				<Link to="/">
					<div className={styles.warn}>7</div>
				</Link>
				<Link to="/">
					<div className={styles.purple}>2</div>
				</Link>
				<Link to="/">
					<div className={styles.danger}>1</div>
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
