import React from 'react'

import cn from "classnames";

import styles from "../../style.module.css";

const ReportBudget: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<h3>Ngân sách và quản lý chi phí (tỷ VND)</h3>
			<table>
				<tbody>
					<tr>
						<td>Ngân sách</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.success, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>1.000</td>
					</tr>
					<tr>
						<td>Ký hợp đồng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.gray, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>700</td>
					</tr>
					<tr>
						<td>Tạm ứng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.gray, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>250</td>
					</tr>
					<tr>
						<td>Sản lượng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.info, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>350</td>
					</tr>
					<tr>
						<td>Nghiệm thu</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.lime, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>300</td>
					</tr>
					<tr>
						<td>Thanh toán</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.warn, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>150</td>
					</tr>
					<tr>
						<td>Tổng giải ngân</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${30}%` }}>
									<div className="w-min transform -translate-x-1/2">{30}%</div>
								</div>
								<div className={cn(styles.progress, styles.purple, "mt-1 w-full h-2")} style={{ '--width': `${30}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>400</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default ReportBudget
