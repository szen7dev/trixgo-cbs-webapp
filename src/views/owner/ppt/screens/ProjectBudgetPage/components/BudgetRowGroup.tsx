import React, { FC, useEffect, useRef, useState } from 'react'
import classNames from 'classnames';

import MenuChildRow from './MenuChildRow';
import RightClickMenuWrapper from "components/common/RightClickMenuWrapper";

interface RowItem {
	_id: string | number,
	budget: number,
	predict: number,
	signed: number,
	advance: number,
	volume: number,
	finish: number,
	pay: number,
	rest: number,
	note?: string
}
interface RowData {
	_id: string | number,
	name: string,
	description: string,
	data: Array<RowItem>
}

const BugetRowGroup: FC<{ row: RowData, show: boolean }> = ({ row, show }) => {
	const [state, setState] = useState<boolean>(show);
	const wrapperRef = useRef<HTMLTableSectionElement>(null);
	
	useEffect(() => {
		setState(show);
	}, [show])
	return (
		<RightClickMenuWrapper
			contextMenu={<MenuChildRow/>}
			customRenderTag={"tbody"}
			className="text-black"
		>
			<tr className="text-right">
				<th className='bg-gray-300 px-1.5 relative'>
					<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: state })} />
					<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setState(!state)}>
						{state ? '+' : '-'}
					</button>
				</th>
				<th className='py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0 text-center'>A1</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0 text-left">GÓI THẦU XÂY DỰNG VÀ THIẾT BỊ</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.budget, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.predict, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.signed, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.advance, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.volume, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.finish, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.pay, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0">{row.data.reduce((prev, d) => prev + d.rest, 0).toLocaleString()}</th>
				<th className="py-2 px-2 bg-cbs-active-comment border-0.5 border-cbs-border border-l-0"></th>
			</tr>
			{row.data.map((_d, i) => (
				<tr key={i} className={classNames("", { hidden: state })}>
					<td className='bg-gray-300 px-1.5 py-2 relative'>
						<div className={classNames('absolute left-1/2 bg-cbs-subtext top-0 w-[1px]', (i === row.data.length - 1) ? 'h-1/2' : 'h-full')} />
						{i === row.data.length - 1 && < div className='absolute left-1/2 bg-cbs-subtext w-1/2 top-1/2 h-[1px]' />}
					</td>
					<td className="px-2.5 py-2 bg-cbs-table-header border-0.5 border-cbs-border border-l-0">{i}</td>
					<td contentEditable suppressContentEditableWarning className="text-left py-2 px-3 border-0.5 border-cbs-border border-l-0">Dự án trường Newton tại Ciputra</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.budget).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.predict).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.signed).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.advance).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.volume).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.finish).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.pay).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-right py-2 px-2 border-0.5 border-cbs-border border-l-0' >{Number(_d.rest).toLocaleString()}</td>
					<td contentEditable suppressContentEditableWarning className='text-left py-2 px-2 border-0.5 border-cbs-border border-l-0'>{_d.note}</td>
				</tr>
			))}
		</RightClickMenuWrapper>
	)
}

export default BugetRowGroup
