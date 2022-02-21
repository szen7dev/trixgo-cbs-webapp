import React from 'react'

import cn from "classnames";

import styles from "../../style.module.css";

const ReportTotal: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div>Tổng mức</div>
			<div className="flex justify-between items-center mt-2">
				<div className={cn(styles['text-xl'], styles.black, "font-bold")}>
					13.128
				</div>
			</div>
		</div>
	)
}

export default ReportTotal
