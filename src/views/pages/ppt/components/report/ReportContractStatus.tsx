import React from 'react'

import cn from "classnames";

import styles from "../../style.module.css";

const ReportContractStatus: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Tình trạng hợp đồng</h3>
			<div className={cn(styles['contract-status'], styles['text-2xl'], "mt-4")}>
				<div className={styles.success}>10</div>
				<div className={styles.warn}>7</div>
				<div className={styles.purple}>3</div>
				<div className={styles.danger}>8</div>
			</div>
			<div className={cn(styles['text-tiny'], "grid grid-cols-2 gap-y-2 gap-x-1 mt-4")}>
				<div className="flex items-center" style={{ minWidth: '204px' }}>
					<div className={cn(styles.success, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>ĐÚNG TIẾN ĐỘ, ĐÚNG NGÂN SÁCH</div>
				<div className="flex items-center" style={{ minWidth: '204px' }}>
					<div className={cn(styles.purple, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>CHẬM TIẾN ĐỘ, ĐÚNG NGÂN SÁCH</div>
				<div className="flex items-center" style={{ minWidth: '204px' }}>
					<div className={cn(styles.warn, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>ĐÚNG TIẾN ĐỘ, VƯỢT NGÂN SÁCH</div>
				<div className="flex items-center" style={{ minWidth: '204px' }}>
					<div className={cn(styles.danger, styles.circle, 'w-3 h-3 rounded-lg mr-2')}></div>CHẬM TIẾN ĐỘ, VƯỢT NGÂN SÁCH</div>
			</div>
		</div>
	)
}

export default ReportContractStatus
