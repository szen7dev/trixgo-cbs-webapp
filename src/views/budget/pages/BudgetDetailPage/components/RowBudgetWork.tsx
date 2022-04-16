import { FC, useEffect, useState } from 'react';
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

export const RowBudgetWork: FC<Props> = ({ row, index, indexGroup, show, onUpdate }) => {
	const [groupsIDToggle, setGroupsIDToggle] = useState<string[]>([]);
	const [groupID, setGroupID] = useState('');

	const toggleGroups = (groupID: string) => {
		const isShow = groupsIDToggle.includes(groupID);
		let newList: any[] = [];

		if(isShow) {
			newList = groupsIDToggle.filter(_groupID => _groupID !== groupID);
		} else{
			newList = [...groupsIDToggle, groupID];
		}
		setGroupsIDToggle(newList);
		setGroupID(groupID);
	}

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
				{formatNumberMoney(row.amount)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.impleQuantity)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.impleUnitPrice)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.impleAmount)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.forecastQuantity)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.forecastUnitPrice)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
				{formatNumberMoney(row.forecastAmount)}
			</td>
			<td className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left">
				{row.note}
			</td>
		</RightClickMenuWrapper>
	)
}