import React from 'react';
import cn from "classnames";

import styles from "../../../style.module.css";
import { formatNumberMoney, formatNaNToZero } from 'utils/converter';
import { Project } from 'typings/items/project';

type Props = {
	projectInfo: Project | undefined
} & React.HTMLAttributes<HTMLDivElement>

const ReportBudget: React.FC<Props> = ({ projectInfo, ...props }) => {
	if(!projectInfo) return <></>

	const totalBudget = formatNumberMoney(projectInfo.budget + projectInfo.vatBudget);
	const percentBudget = formatNaNToZero(projectInfo.budget + projectInfo.vatBudget) / 100;

	const totalContract = formatNumberMoney(projectInfo.contractValue + projectInfo.contractVatValue);
	const percentContract = formatNaNToZero(projectInfo.contractValue + projectInfo.contractVatValue) / 100;

	const totalAdvance = formatNumberMoney(projectInfo.contractAdvancePaymentPaid);
	const percentAdvance = formatNaNToZero(projectInfo.contractAdvancePaymentPaid) / 100;

	const totalQuantity = formatNumberMoney(projectInfo.contractProduce + projectInfo.contractVatProduce);
	const percentQuantity = formatNaNToZero(projectInfo.contractProduce + projectInfo.contractVatProduce) / 100;

	const totalAcceptance = formatNumberMoney(
		projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
		projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
	);
	const percentAcceptance = formatNaNToZero(
		projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
		projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
	) / 100;

	const totalPayment = formatNumberMoney(projectInfo.contractAmountPaid);
	const percentPayment = formatNaNToZero(projectInfo.contractAmountPaid) / 100;

	const totalDisbursement = formatNumberMoney(projectInfo.contractAmountPaid + projectInfo.contractAdvancePaymentPaid);
	const percentDisbursement = formatNaNToZero(projectInfo.contractAmountPaid + projectInfo.contractAdvancePaymentPaid) / 100;

	return (
		<div {...props}>
			<h3>Ngân sách và quản lý chi phí (tỷ VND)</h3>
			<table>
				<tbody>
					<tr>
						<td>Ngân sách</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentBudget === 0 ? 2 : percentBudget}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentBudget}%</div>
								</div>
								<div className={cn(styles.progress, styles.success, "mt-1 w-full h-2")} style={{ '--width': `${percentBudget}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalBudget}</td>
					</tr>
					<tr>
						<td>Ký hợp đồng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentContract === 0 ? 2 : percentContract}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentContract}%</div>
								</div>
								<div className={cn(styles.progress, styles.gray, "mt-1 w-full h-2")} style={{ '--width': `${percentContract}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalContract}</td>
					</tr>
					<tr>
						<td>Tạm ứng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentAdvance === 0 ? 2 : percentAdvance}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentAdvance}%</div>
								</div>
								<div className={cn(styles.progress, styles.gray, "mt-1 w-full h-2")} style={{ '--width': `${percentAdvance}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalAdvance}</td>
					</tr>
					<tr>
						<td>Sản lượng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentQuantity === 0 ? 2 : percentQuantity}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentQuantity}%</div>
								</div>
								<div className={cn(styles.progress, styles.info, "mt-1 w-full h-2")} style={{ '--width': `${percentQuantity}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalQuantity}</td>
					</tr>
					<tr>
						<td>Nghiệm thu</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentAcceptance === 0 ? 2 : percentAcceptance}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentAcceptance}%</div>
								</div>
								<div className={cn(styles.progress, styles.lime, "mt-1 w-full h-2")} style={{ '--width': `${percentAcceptance}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalAcceptance}</td>
					</tr>
					<tr>
						<td>Thanh toán</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentPayment === 0 ? 2 : percentPayment}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentPayment}%</div>
								</div>
								<div className={cn(styles.progress, styles.warn, "mt-1 w-full h-2")} style={{ '--width': `${percentPayment}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalPayment}</td>
					</tr>
					<tr>
						<td>Tổng giải ngân</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentDisbursement === 0 ? 2 : percentDisbursement}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentDisbursement}%</div>
								</div>
								<div className={cn(styles.progress, styles.purple, "mt-1 w-full h-2")} style={{ '--width': `${percentDisbursement}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalDisbursement}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default ReportBudget