import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { formatNumberMoney } from "utils/cmcs";

import MenuChildRow from './MenuChildRow';
import { RightClickMenuWrapper } from "shareComponents/common";
import { Contract } from "typings/cmcs";

const BugetRowGroup: FC<{ row: Contract, show: boolean }> = ({ row, show }) => {
	const [state, setState] = useState<boolean>(show);

	useEffect(() => {
		setState(show);
	}, [show])

	return (
		<RightClickMenuWrapper
			contextMenu={<MenuChildRow />}
			customRenderTag={"tbody"}
			className="text-black"
		>
			{/* <tr className="text-right">
				<th className='bg-gray-300 px-1.5 relative'>
					<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: state })} />
					<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setState(!state)}>
						{state ? '+' : '-'}
					</button>
				</th>
				<th className='py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0 text-center'>A1</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0 text-left"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
			</tr> */}
			<tr  className={classNames("", { hidden: state })}>
				<td className='bg-gray-300 px-1.5 py-2 relative'></td>
				<td className="px-2.5 py-2 bg-cbs-table-header border-0.5 border-cbs-border border-l-0"></td>
				<td className="text-left py-2 px-3 border-0.5 border-cbs-border border-l-0">
					<NavLink className='text-cbs-highlight-color' to={`/cmcs/contract/${row._id}/home`}>{row.name}</NavLink>
					<p className='text-primary-gray text-[12px]'><i>{row.sellerInfo.name}</i></p>
				</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.budget || 0 + row.vatBudget || 0)}</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.value || 0 + row.vatValue || 0 + row.plus || 0 + row.vatPlus || 0)}</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.advancePaymentPaid || 0)}</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.produce || 0 + row.vatProduce || 0 + row.plusProduce || 0 + row.vatPlusProduce || 0)}</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.acceptance || 0 + row.vatAcceptance || 0 + row.plusAcceptance || 0 + row.vatPlusAcceptance || 0)}</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.amountPaid || 0)}</td>
				<td className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{formatNumberMoney(row.remainingPayment || 0)}</td>
				<td className='text-left py-2 px-2 border-0.5 border-cbs-border border-l-0'>{row.description}</td>
			</tr>
		</RightClickMenuWrapper>
	)
}

export default BugetRowGroup