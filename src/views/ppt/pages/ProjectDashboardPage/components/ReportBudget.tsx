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

	const totalBudgetFormat = formatNumberMoney(projectInfo.budget + projectInfo.vatBudget);
	const totalBudget = formatNaNToZero(projectInfo.budget + projectInfo.vatBudget) || 1;

	const totalContractFormat = formatNumberMoney(projectInfo.contractValue + projectInfo.contractVatValue);
	const percentContract = Math.ceil((formatNaNToZero(projectInfo.contractValue + projectInfo.contractVatValue) / totalBudget) * 100);

	const totalAdvanceFormat = formatNumberMoney(projectInfo.contractAdvancePaymentPaid);
	const percentAdvance = Math.ceil((formatNaNToZero(projectInfo.contractAdvancePaymentPaid) / totalBudget) * 100);

	const totalQuantityFormat = formatNumberMoney(projectInfo.contractProduce + projectInfo.contractVatProduce);
	const percentQuantity = Math.ceil((formatNaNToZero(projectInfo.contractProduce + projectInfo.contractVatProduce) / totalBudget) * 100);

	const totalAcceptanceFormat = formatNumberMoney(
		projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
		projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
	);
	const percentAcceptance = Math.ceil((formatNaNToZero(
		projectInfo.contractAcceptance + projectInfo.contractVatAcceptance +
		projectInfo.contractPlusAcceptance + projectInfo.contractVatPlusAcceptance
	) / totalBudget) * 100);

	const totalPaymentFormat = formatNumberMoney(projectInfo.contractAmountPaid);
	const percentPayment = Math.ceil((formatNaNToZero(projectInfo.contractAmountPaid) / totalBudget) * 100);

	const totalDisbursementFormat = formatNumberMoney(projectInfo.contractAmountPaid + projectInfo.contractAdvancePaymentPaid);
	const percentDisbursement = Math.ceil((formatNaNToZero(projectInfo.contractAmountPaid + projectInfo.contractAdvancePaymentPaid) / totalBudget) * 100);

	return (
		<div {...props}>
			<h3>Ngân sách và quản lý chi phí (tỷ VND)</h3>
			<table>
				<tbody>
					<tr>
						<td>Ngân sách</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `100%` }}>
									<div className="w-min transform -translate-x-1/2">100%</div>
								</div>
								<div className={cn(styles.progress, styles.success, "mt-1 w-full h-2")} style={{ '--width': `100%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalBudgetFormat}</td>
					</tr>
					<tr>
						<td>Ký hợp đồng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentContract === 0 ? 2 : percentContract}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentContract}%</div>
								</div>
								<div className={cn(styles.progress, styles.gray, "mt-1 w-full h-2")} style={{ '--width': `${percentContract > 100 ? 100 : percentContract}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalContractFormat}</td>
					</tr>
					<tr>
						<td>Tạm ứng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentAdvance === 0 ? 2 : percentAdvance}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentAdvance}%</div>
								</div>
								<div className={cn(styles.progress, styles.gray, "mt-1 w-full h-2")} style={{ '--width': `${percentAdvance > 100 ? 100 : percentAdvance}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalAdvanceFormat}</td>
					</tr>
					<tr>
						<td>Sản lượng</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentQuantity === 0 ? 2 : percentQuantity}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentQuantity}%</div>
								</div>
								<div className={cn(styles.progress, styles.info, "mt-1 w-full h-2")} style={{ '--width': `${percentQuantity > 100 ? 100 : percentQuantity}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalQuantityFormat}</td>
					</tr>
					<tr>
						<td>Nghiệm thu</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentAcceptance === 0 ? 2 : percentAcceptance}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentAcceptance}%</div>
								</div>
								<div className={cn(styles.progress, styles.lime, "mt-1 w-full h-2")} style={{ '--width': `${percentAcceptance > 100 ? 100 : percentAcceptance}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalAcceptanceFormat}</td>
					</tr>
					<tr>
						<td>Thanh toán</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentPayment === 0 ? 2 : percentPayment}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentPayment}%</div>
								</div>
								<div className={cn(styles.progress, styles.warn, "mt-1 w-full h-2")} style={{ '--width': `${percentPayment > 100 ? 100 : percentPayment}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalPaymentFormat}</td>
					</tr>
					<tr>
						<td>Tổng giải ngân</td>
						<td>
							<div className={styles.black}>
								<div className="w-0 relative" style={{ left: `${percentDisbursement === 0 ? 2 : percentDisbursement}%` }}>
									<div className="w-min transform -translate-x-1/2">{percentDisbursement}%</div>
								</div>
								<div className={cn(styles.progress, styles.purple, "mt-1 w-full h-2")} style={{ '--width': `${percentDisbursement > 100 ? 100 : percentDisbursement}%`, } as React.CSSProperties} />
							</div>
						</td>
						<td>{totalDisbursementFormat}</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}

export default React.memo(ReportBudget);