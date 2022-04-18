import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { formatNumberMoney } from "utils/cmcs";

import { Contract } from "typings/cmcs";

import styles from './styles.module.css'

const BugetRowGroupTemp: FC<{ row: Contract, show: boolean }> = ({ row, show }) => {
	const [state, setState] = useState<boolean>(show);

	useEffect(() => {
		setState(show);
	}, [show])

	if(!row) return <></>

	return (
		<tr className={classNames(styles.tableBudgetRow, { hidden: state })}>
			<td className='bg-gray-300 px-1.5 py-2 relative'></td>
			<td className="px-2.5 py-2 bg-cbs-table-header border-t-0.5 border-cbs-border border-r-0.5"></td>
			<td className="text-left py-2 px-3 border-t-0.5 border-cbs-border border-r-0.5">
				<NavLink className='text-cbs-highlight-color' to={`/cmcs/contract/${row._id}/home`}>{row.name}</NavLink>
				<p className='text-primary-gray text-[12px]'><i>{row.sellerInfo?.name}</i></p>
			</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.budget + row.budgetVAT)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(0)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.value + row.vatValue + row.plus + row.vatPlus)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.advancePaymentPaid)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.produce + row.vatProduce + row.plusProduce + row.vatPlusProduce)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.acceptance + row.vatAcceptance + row.plusAcceptance + row.vatPlusAcceptance)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.amountPaid)}</td>
			<td className='text-right py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5' >{formatNumberMoney(row.remainingPayment)}</td>
			<td className='text-left py-2 px-2 border-t-0.5 border-cbs-border border-r-0.5'>{row.description}</td>
		</tr>
	)
}

export default BugetRowGroupTemp