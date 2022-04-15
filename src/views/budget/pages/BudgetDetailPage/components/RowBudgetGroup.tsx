import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { formatNumberMoney } from "utils/converter";
import { RightClickMenuWrapper } from "shareComponents/common";
import { MenuChildRow } from './MenuChildRow';

import { BudgetGroup } from 'typings/budget/budget-group';

export const RowBudgetGroup: FC<{ row: BudgetGroup, index: number, show: boolean }> = ({ row, index, show }) => {
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

	if(!row) return <></>

	return (
		<RightClickMenuWrapper
			contextMenu={
				<MenuChildRow />
			}
			customRenderTag={"tr"}
			className={classNames("text-black text-right", { hidden: !show })}
		>
			<th className='bg-gray-300 px-1.5 relative'>
				<div
					className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', {
						hidden: !groupsIDToggle.includes(row._id)
					})}
				/>
				<button className="relative inline-block text-white rounded bg-gray-400 w-5 h-5" onClick={toggleGroups.bind(this, row._id)}>
					{!groupsIDToggle.includes(row._id) ? '+' : '-'}
				</button>
			</th>
			<th className='py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center'>{index+1}</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left">
				{row.name}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{row.unit}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(row.quantity)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(row.unitPrice)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(row.quantity * row.unitPrice)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(0)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(0)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(0)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(row.forecastQuantity)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(row.forecastAmount)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
				{formatNumberMoney(row.forecastQuantity * row.forecastAmount)}
			</th>
			<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left">
				{row.note}
			</th>
		</RightClickMenuWrapper>
	)
}