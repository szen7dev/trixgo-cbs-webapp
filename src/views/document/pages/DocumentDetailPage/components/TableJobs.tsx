import { FC, HTMLAttributes } from 'react';
import generateImageLink from 'views/document/utils/images';

export const TableJobs: FC<HTMLAttributes<HTMLTableElement>> = ({ ...props }) => {
	return (
		<table className='w-full \mt-3' {...props}>
			<tbody>
				{Array.from({ length: 3 }).map((_, i) => <tr key={i}>
					<td className='py-3 pr-2'>
						{i + 1}
					</td>
					<td className='py-3 px-4'>
						Xây dựng mẫu BoQ cho công tác preliminaries -
						<span className='text-cbs-subtext'>
							CHG.THT
						</span>
					</td>
					<td className='py-3 px-4'>25/12/2021</td>
					<td className='py-3 px-4'>
						<div className='flex items-center'>
							<div>
								<div className='inline-block w-2 h-2 rounded-full bg-cbs-schedule-expired mr-2' />
								<img src={generateImageLink()} alt="" className='w-4 h-4 inline rounded-full' />
							</div>
							<p className='px-2'>
								Phùng Thị Hà-TRX
							</p>
						</div>
					</td>
					<td className='py-3 px-4'>
						<div>
							<p className='text-right text-cbs-subtext'>3/10 (30%)</p>
							<div className='h-1 border-cbs-border rounded-md mt-2' style={{ borderWidth: '0.5px' }}>
								<div className='h-full bg-cbs-schedule-expired' style={{ width: 30 + '%' }}>
								</div>
							</div>
						</div>
					</td>
					<td className='py-3 px-2'>
						Xây dựng mẫu BoQ cho công tác preliminaries
					</td>
				</tr>)}
			</tbody>
		</table>
	)
}