import React from 'react'

import cn from "classnames";

import ChartDoughnutSmall from '../../chart/ChartDoughnutSmall'
import { _data } from '../../chart/ProjectDoughnutChart'

import styles from "../../style.module.css";
import iconChat from 'assets/images/icon-chat-project.png';

const ReportMainWork: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
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
					<tr>
						<td className="pt-3">
							<div style={{ maxWidth: "89px" }}>
								<p>
									Pháp lý
								</p>
								<div className={cn(styles.progress, "w-full h-1 mt-1.5")} style={{ '--width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties} />
							</div>
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.rose, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />1
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.warn, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />10
						</td>
						<td className="whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.success, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />
							0
						</td>
						<td className="pt-3"><span className={styles.success}>5</span>/5</td>
						<td className="pt-3 px-2 box-content" style={{ width: "24px", paddingBottom: "12px" }}>
							<img src={iconChat} alt="Chat icon" className="inline-block" />
						</td>
						<td className="pr-3 pt-3">
							64
						</td>
					</tr>
					<tr>
						<td className="pt-3">
							<div style={{ maxWidth: "89px" }}>
								<p>
									Thiết kế
								</p>
								<div className={cn(styles.progress, "w-full h-1 mt-1.5")} style={{ '--width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties} />
							</div>
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.rose, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />1
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.warn, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />10
						</td>
						<td className="whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.success, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />
							0
						</td>
						<td className="pt-3"><span className={styles.success}>5</span>/5</td>
						<td className="pt-3 px-2 box-content" style={{ width: "24px", paddingBottom: "12px" }}>
							<img src={iconChat} alt="Chat icon" className="inline-block" />
						</td>
						<td className="pr-3 pt-3">
							64
						</td>
					</tr>
					<tr>
						<td className="pt-3">
							<div style={{ maxWidth: "89px" }}>
								<p>
									Dự toán
								</p>
								<div className={cn(styles.progress, "w-full h-1 mt-1.5")} style={{ '--width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties} />
							</div>
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.rose, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />1
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.warn, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />10
						</td>
						<td className="whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.success, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />
							0
						</td>
						<td className="pt-3"><span className={styles.success}>5</span>/5</td>
						<td className="pt-3 px-2 box-content" style={{ width: "24px", paddingBottom: "12px" }}>
							<img src={iconChat} alt="Chat icon" className="inline-block" />
						</td>
						<td className="pr-3 pt-3">
							64
						</td>
					</tr>
					<tr>
						<td className="pt-3">
							<div style={{ maxWidth: "89px" }}>
								<p>
									Đấu thầu
								</p>
								<div className={cn(styles.progress, "w-full h-1 mt-1.5")} style={{ '--width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties} />
							</div>
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.rose, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />1
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.warn, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />10
						</td>
						<td className="whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.success, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />
							0
						</td>
						<td className="pt-3"><span className={styles.success}>5</span>/5</td>
						<td className="pt-3 px-2 box-content" style={{ width: "24px", paddingBottom: "12px" }}>
							<img src={iconChat} alt="Chat icon" className="inline-block" />
						</td>
						<td className="pr-3 pt-3">
							64
						</td>
					</tr>
					<tr>
						<td className="pt-3">
							<div style={{ maxWidth: "89px" }}>
								<p>
									Thi công
								</p>
								<div className={cn(styles.progress, "w-full h-1 mt-1.5")} style={{ '--width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties} />
							</div>
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.rose, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />1
						</td>
						<td className="w-min whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.warn, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />10
						</td>
						<td className="whitespace-nowrap px-1.5 pt-3">
							<div className={cn(styles.circle, styles.success, "h-2 w-2 rounded-md inline-block mr-1 align-middle")} />
							0
						</td>
						<td className="pt-3"><span className={styles.success}>5</span>/5</td>
						<td className="pt-3 px-2 box-content" style={{ width: "24px", paddingBottom: "12px" }}>
							<img src={iconChat} alt="Chat icon" className="inline-block" />
						</td>
						<td className="pr-3 pt-3">
							1,2k
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default ReportMainWork
