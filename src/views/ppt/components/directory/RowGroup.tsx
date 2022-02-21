import React, { ChangeEvent, FC, HTMLAttributes, useState } from 'react'
import cn from 'classnames'
import iconCollapseHide from 'assets/images/CBS-Collapse-Hide.png';
import iconCollapseShow from 'assets/images/CBS-Collapse-Show.png';

interface RowProps {
	onClickCheckbox?: (e: ChangeEvent<HTMLInputElement>, data?: {
		[key: string]: string | number;
		_id: number | string;
	} | undefined) => void;
	checkedList?: {
		[key: string]: boolean;
	},
	index?: number | string,
}

const RowGroup: FC<HTMLAttributes<HTMLTableSectionElement> & RowProps> = ({ index = '', checkedList, onClickCheckbox, ...props }) => {
	const [expanded, setExpanded] = useState<boolean>(false)
	return (
		<tbody {...props}>
			<tr className='text-left align-top'>
				<th className='px-3 border-b-0.5 border-cbs-border py-2.5'>
					<button type='button' className='w-10' onClick={() => setExpanded(!expanded)}>
						<img src={expanded ? iconCollapseHide : iconCollapseShow} alt='icon collapse' className='w-10 h-10' />
					</button>
				</th>
				<th className='px-1.5 border-b-0.5 border-cbs-border pt-5'>Công ty Cổ phần CONINCO Quản lý dự án và Đầu tư</th>
				<th className='px-1.5 border-b-0.5 border-cbs-border max-w-xs pt-5 pb-2'>Tầng 3, tòa nhà 789 số 147 đường Hoàng Quốc Việt, P.Nghĩa Đô, Q.Cầu Giấy</th>
				<th colSpan={4} className='px-1.5 border-b-0.5 border-cbs-border text-right text-cbs-primary pt-5'>Xem tất cả (25)</th>
			</tr>
			{
				Array.from({ length: 10 }).map((_, _index) => (
					<tr key={_index} className={cn({ hidden: !expanded })}>
						<td className='border-b-0.5 border-cbs-border px-4 align-middle'>
							<input type="checkbox" className='cbs-checkbox' value={_index} checked={checkedList?.[String(index).concat(String(_index))]} onChange={e => onClickCheckbox?.(e, { _id: String(index).concat(String(_index)) })} />
						</td>
						<td className='border-b-0.5 border-cbs-border py-4 px-1'>
							<div className='flex gap-x-2'>
								<img src="https://nguoinoitieng.tv/images/nnt/102/0/bf7o.jpg" alt="" className='w-10 h-10 rounded-full overflow-hidden' />
								<div>
									<h3 className='text-medium'>Nguyễn Phan Thanh Hương-CPMI</h3>
									<p className='text-small mt-1'>nirav@gmail.com</p>
								</div>
							</div>
						</td>
						<td className='border-b-0.5 border-cbs-border py-4 px-3'></td>
						<td className='border-b-0.5 border-cbs-border py-4 px-3'>Trưởng ban hành chính đối ngoại của dự án</td>
						<td className='border-b-0.5 border-cbs-border py-4 px-3'>0868898086</td>
						<td className='border-b-0.5 border-cbs-border py-4 px-3'>thaison@conincopmi.com</td>
						<td className='border-b-0.5 border-cbs-border py-4 px-3'>Tương tác với các bên trong thời gian dài</td>
					</tr>
				))
			}
		</tbody>
	)
}

export default RowGroup
