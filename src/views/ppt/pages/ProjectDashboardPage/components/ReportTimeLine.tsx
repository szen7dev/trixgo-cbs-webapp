import React from 'react';
import moment from 'moment';
import cn from "classnames";

import styles from "../../../style.module.css";
import { Project } from 'typings/items/project';
import { getRangeDate } from 'utils/time';

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportTimeLine: React.FC<Props> = ({ projectInfo, ...props }) => {
	if(!projectInfo) return <></>

	const rangeDateFromStartToEnd = getRangeDate(projectInfo.startTime, projectInfo.expiredTime, 'days')
	const rangeDateFromStartToNow = getRangeDate(projectInfo.startTime, Date.now(), 'days')
	const percentComplete = Math.ceil((rangeDateFromStartToNow / rangeDateFromStartToEnd) * 100);
	const isProcessing = rangeDateFromStartToNow < 1;

	return (
		<div {...props}>
			<div className="w-full mr-6">
				<div className="flex justify-between">
					<div>
						Bắt đầu: <b className="text-black">{moment(projectInfo.startTime).format('D/M/YY')}</b>
					</div>
					<div>
						Kết thúc: 
						<b className="text-black">
							{!projectInfo.expiredTime ? ' Chưa xác định' : ` ${moment(projectInfo.expiredTime || Date.now()).format('D/M/YY')}`}
						</b>
					</div>
				</div>
				<div className="mt-3">
					<div className={cn(styles.progress, "w-full h-2")} style={{
						'--width': `${isProcessing ? 0 : (percentComplete > 100 ? 100 : percentComplete)}%`,
						color: '#0060E1'
					} as React.CSSProperties} />
				</div>
			</div>
			<div className="text-x-large text-cbs-primary font-bold">{isProcessing ? 0 : percentComplete}%</div>
		</div>
	)
}

export default ReportTimeLine;