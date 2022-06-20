import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { formatNumberMoney } from "utils/cmcs";

import { Contract } from "typings/cmcs";

import styles from './styles.module.css'

const BugetRowGroupTemp: FC<{ row: Contract, index: number, show: boolean }> = ({ row, index, show }) => {
	const [state, setState] = useState<boolean>(show);

	useEffect(() => {
		setState(show);
	}, [show])

	if(!row) return <></>

	return (
		<tr className={classNames(styles.tableBudgetRow, { hidden: state })}>
			{/* <td className='bg-gray-300 px-1.5 py-2 relative'></td> */}
			<td className="px-2.5 py-2 bg-cbs-table-header border-t-0.5 border-cbs-border border-r-0.5">{index + 1}</td>
			<td className="text-left py-2 px-3 border-t-0.5 border-cbs-border border-r-0.5">
				<NavLink className='text-cbs-highlight-color' to={`/cmcs/contract/${row._id}/home`}>{row.name}</NavLink>
				<p className='text-primary-gray text-[12px]'><i>{row.sellerInfo?.name}</i></p>
			</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.budget || 0 + row.budgetVAT || 0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.value || 0 + row.vatValue || 0 + row.plus || 0 + row.vatPlus || 0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.advancePaymentPaid || 0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.produce || 0 + row.vatProduce || 0 + row.plusProduce || 0 + row.vatPlusProduce || 0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.acceptance || 0 + row.vatAcceptance || 0 + row.plusAcceptance || 0 + row.vatPlusAcceptance || 0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.amountPaid || 0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{formatNumberMoney(row.remainingPayment || 0)}</td>
			<td className='text-left py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5 md:text-xs'>{row.description}</td>
		</tr>
	)
}

export default BugetRowGroupTemp