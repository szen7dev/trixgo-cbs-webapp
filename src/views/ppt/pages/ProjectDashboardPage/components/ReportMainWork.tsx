import React from 'react'

import cn from "classnames";
import styles from "../../../style.module.css";
import iconChat from 'assets/images/icon-chat-project.png';
import { PCM_MILESTONE } from "apis/localdb/index";
import { match } from 'assert';
import { Link } from 'react-router-dom';

type Props = {
	data: any
} & React.HTMLAttributes<HTMLDivElement>

const ReportMainWork: React.FC<Props> = ({ data, ...props }) => {
	const {	
		taskOverdueWork,
		taskNextWeekWork,
		taskMoreThan7Days,
		taskAll,
		taskFinish } = data;

		const PCM_MILESTONE_FORMAT = PCM_MILESTONE.map(milestone => {
			const taskOmountOverdue = taskOverdueWork?.map((item: any )=> {
				if(item._id == milestone.value){
					return item?.count || 0
				}
			})

			const taskOmountNextWeek =taskNextWeekWork?.map((item: any )=> {
				if(item._id == milestone.value){
					return item?.count || 0
				}
			})

			const taskOmountThan7Days = taskMoreThan7Days?.map((item: any )=> {
				if(item._id == milestone.value){
					return item?.count || 0
				}
			})

			const taskOmountFinish = taskFinish?.map((item: any )=> {
				if(item._id == milestone.value){
					return item?.count || 0
				}
			})

			const taskOmountAll = taskAll?.map((item: any )=> {
				if(item._id == milestone.value){
					return item?.count || 0
				}
			})

			const percentConplete = taskOmountFinish/taskOmountAll*100 || 0;
			return {
				milestone, taskOmountOverdue, taskOmountNextWeek, taskOmountThan7Days, taskOmountFinish, taskOmountAll, percentConplete
			}
		})
	return (
		<div {...props}>
			<div className="flex justify-between">
				<h3>Công tác chính</h3>
				<div>
					<span className="mr-5">
						<div className="inline-block h-2.5 w-2.5 mr-1" style={{ backgroundColor: "#F55F5F" }}></div>
						Quá hạn
					</span>
					<span className="mr-5">
						<div className="inline-block h-2.5 w-2.5 mr-1" style={{ backgroundColor: "#FF9900" }}></div>
						Tuần tới
					</span>
					<span>
						<div className="inline-block h-2.5 w-2.5 mr-1" style={{ backgroundColor: "#00CA99" }}></div>
						{">"} 7 ngày
					</span>
				</div>
			</div>
			<table className="w-full border-collapse mt-4">
				<tbody>
					{
						PCM_MILESTONE_FORMAT.map(milestone => (
							<tr key={milestone.milestone.value}>
								<td className="pt-3">
									<div style={{ maxWidth: "89px" }}>
										<Link to={`/pcm/project/60a8cb540400462461cbff9f/milestone/${milestone.milestone.value}`}>
											{milestone.milestone.text}
										</Link>
										<div className={cn(styles.progress, "w-full h-1 mt-1.5")} style={{ '--width': `${
											milestone.percentConplete
										}%` } as React.CSSProperties} />
									</div>
								</td>
								<td className="w-min whitespace-nowrap px-1.5 pt-3">
									<div className={cn(styles.circle, styles.rose, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} /> { 
										milestone.taskOmountOverdue?.[0] || 0
									}
								</td>
								<td className="w-min whitespace-nowrap px-1.5 pt-3">
									<div className={cn(styles.circle, styles.warn, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />{ 
										milestone.taskOmountNextWeek?.[0] || 0
									}
								</td>
								<td className="whitespace-nowrap px-1.5 pt-3">
									<div className={cn(styles.circle, styles.success, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />
									{ 
										milestone.taskOmountThan7Days?.[0] || 0
									}
								</td>
								<td className="pt-3"><span className={styles.success}>
									{ 
										milestone.taskOmountFinish?.[0] || 0
									}
									</span>/
									{ 
										milestone.taskOmountAll?.[0] || 0
									}
									</td>
								{/* <td className="pt-3 px-2 box-content" style={{ width: "24px", paddingBottom: "12px" }}>
									<img src={iconChat} alt="Chat icon" className="inline-block" />
								</td> */}
								{/* <td className="pr-3 pt-3">
									64
								</td> */}
							</tr>
						))
					}
					
				</tbody>
			</table>
		</div>
	)
}

export default ReportMainWork
