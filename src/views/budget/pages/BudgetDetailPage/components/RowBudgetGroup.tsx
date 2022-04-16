import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { formatNumberMoney } from "utils/converter";
import { RightClickMenuWrapper } from "shareComponents/common";
import { MenuChildRow } from './MenuChildRow';
import { RowBudgetWork } from './RowBudgetWork';

import { BudgetGroup } from 'typings/budget/budget-group';
import { BudgetWork } from 'typings/budget/budget-work';
import { BudgetWorkRepository } from "apis/budget";

type Props = {
	row: BudgetGroup;
	index: number;
	show: boolean;
	onAdd: () => void;
	onUpdate: () => void;
	onUpdateWork: (budgetWork: BudgetWork) => void;
}

export const RowBudgetGroup: FC<Props> = ({ row, index, show, onAdd, onUpdate, onUpdateWork }) => {
	const [groupsIDToggle, setGroupsIDToggle] = useState<string[]>([]);
	const [groupID, setGroupID] = useState('');

	const [listBudgetWork, setListBudgetWork] = useState<Record<string, {
		listRecords: BudgetWork[],
		limit: number,
		nextCursor: string | null,
		totalRecord: number,
	}>>();

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

	const fetchDataBudgetWork = async () => {
		const { error, data } = await BudgetWorkRepository.fetchList({
			groupID,
			itemID: row.item,
			budgetID: row.budget
		})
		if(error) return;

		setListBudgetWork(previous => ({
			...previous,
			[groupID]: data
		}))
	}

	useEffect(() => {
		if(!groupID) return;
		if(listBudgetWork && listBudgetWork[groupID]) return;

		fetchDataBudgetWork();
	}, [groupID])

	if(!row) return <></>;

	return (
		<>
			<RightClickMenuWrapper
				contextMenu={
					<MenuChildRow onAdd={onAdd} onUpdate={onUpdate} />
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
					<button className="relative inline-block text-white rounded bg-gray-500 w-5 h-5" onClick={toggleGroups.bind(this, row._id)}>
						{!groupsIDToggle.includes(row._id) ? '+' : '-'}
					</button>
				</th>
				<th className='py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left'>{index+1}</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left">
					{row.name}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-center">
					{row.unit}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.quantity)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.unitPrice)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.amount)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.impleQuantity)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.impleUnitPrice)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.impleAmount)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.forecastQuantity)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.forecastUnitPrice)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-right">
					{formatNumberMoney(row.forecastAmount)}
				</th>
				<th className="py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 text-left">
					{row.note}
				</th>
			</RightClickMenuWrapper>

			{(listBudgetWork && listBudgetWork[row._id]) ?
				listBudgetWork[row._id].listRecords?.map((budgetWork, indexWork) => (
					<RowBudgetWork
						index={indexWork}
						indexGroup={index}
						row={budgetWork}
						key={budgetWork._id}
						show={groupsIDToggle.includes(row._id)}
						onUpdate={onUpdateWork.bind(this, budgetWork)}
					/>
				))
			: <></>}
		</>
	)
}