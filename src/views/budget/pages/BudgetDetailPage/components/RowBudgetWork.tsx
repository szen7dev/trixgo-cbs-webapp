import { FC, memo } from 'react';
import classNames from 'classnames';
import { formatNumberMoney } from "utils/converter";
import { RightClickMenuWrapper } from "shareComponents/common";
import { MenuChildRow } from './MenuChildRow';

import { BudgetWork } from 'typings/budget/budget-work';

type Props = {
	row: BudgetWork;
	index: number;
	indexGroup: number;
	show: boolean;
	onUpdate: () => void;
}

export const RowBudgetWork: FC<Props> = memo(({ row, index, indexGroup, show, onUpdate }) => {
	if(!row) return <></>;

	return (
		<RightClickMenuWrapper
			contextMenu={
				<MenuChildRow onUpdate={onUpdate} isShowAdd={false} />
			}
			customRenderTag={"tr"}
			className={classNames("text-black text-right", { hidden: !show })}
		>
			<td className='bg-gray-300 px-1.5 relative'></td>
			<td className='py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left'>{indexGroup+1}.{index+1}</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left text-blue-800">
				{/* <i>{row?.sign}-{row.name}</i> */}
				<i>{row.name}</i>
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{row.unit}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.quantity)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.unitPrice)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.amount.toFixed(0))}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.impleQuantity)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.impleUnitPrice)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.impleAmount.toFixed(0))}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.quantity - row.impleQuantity)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{Number(row.quantity - row.impleQuantity) != 0 ? formatNumberMoney((row.amount - row.impleAmount/(row.quantity - row.impleQuantity))) : 0}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(Number(row.amount - row.impleAmount).toFixed(0))}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left">
				{row.note}
			</td>
		</RightClickMenuWrapper>
	)
})

RowBudgetWork.displayName = 'RowBudgetWork';