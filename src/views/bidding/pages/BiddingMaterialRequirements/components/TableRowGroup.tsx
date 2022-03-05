import classNames from 'classnames';
import React, { FC, useEffect, useState } from 'react'
import romanize from 'views/bidding/utils/romolize'

type Props = {
	index: number,
	show?: boolean,
}

const TableRowGroup: FC<Props> = ({ show, index }) => {
	const [state, setState] = useState(Boolean(show));

	useEffect(() => {
		setState(Boolean(show));
	}, [show]);

	return (
		<tbody>
			<tr className='bg-cbs-summary'>
				<th className='bg-gray-300 px-1.5 relative'>
					<div className={classNames('absolute left-1/2 bg-cbs-subtext top-1/2 w-[1px] h-1/2', { hidden: !state })} />
					<button className="relative inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setState(!state)}>
						{!state ? '+' : '-'}
					</button>
				</th>
				<th>{romanize(index + 1)}</th>
				<th>PHÂN NHÓM 1</th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			{state &&
				Array.from({ length: 5 }).map((_, i) => (
					<tr key={i}>
						<td className='bg-gray-300 px-1.5 py-2 relative'>
							<div className={classNames('absolute left-1/2 bg-cbs-subtext top-0 w-[1px]', (i === 4) ? 'h-1/2' : 'h-full')} />
							{i === 4 && < div className='absolute left-1/2 bg-cbs-subtext w-1/2 top-1/2 h-[1px]' />}
						</td>
						<td>{i + 1}</td>
						<td>Ceramic 70&apos;s bowls medium set of 4</td>
						<td>Small Heroes Kidsconceptstore</td>
						<td>Dày 12mm, độ cứng 125K, màu sáng bóng. Mã màu tương đương</td>
						<td>
							<img className='w-32' src="/static/media/sustainable.png" alt="" />
						</td>
						<td>K558-CM</td>
						<td>Châu âu</td>
						<td>Công nghệ nano</td>
					</tr>
				))
			}
		</tbody>
	)
}

export default TableRowGroup