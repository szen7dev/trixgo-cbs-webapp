import React from 'react'

import cn from "classnames";

import styles from "../../style.module.css";

const ReportActivity: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div>Tổng hoạt động</div>
			<div className="flex justify-between items-center mt-2">
				<div className={cn(styles['text-xl'], styles.black, "font-bold mr-6")}>
					13.128
				</div>
				<li className="whitespace-nowrap" style={{ color: 'rgba(0, 96, 225, 1)' }}>
					Lần cuối cách đây 2 giờ
				</li>
			</div>
		</div>
	)
}

export default ReportActivity
