import React from 'react';

import cn from "classnames";

import styles from "../../style.module.css";

const ReportTimeLine: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div className="w-full mr-6">
				<div className="flex justify-between">
					<div>
						Bắt đầu: <b className="text-black">8/6/20</b>
					</div>
					<div>
						Kết thúc: <b className="text-black">1/5/21</b>
					</div>
				</div>
				<div className="mt-3">
					<div className={cn(styles.progress, "w-full h-2")} style={{
						'--width': `${Math.floor(Math.random() * 100)}%`,
						color: '#0060E1'
					} as React.CSSProperties} />
				</div>
			</div>
			<div className="text-x-large text-cbs-primary font-bold">52%</div>
		</div>
	)
}

export default ReportTimeLine;
