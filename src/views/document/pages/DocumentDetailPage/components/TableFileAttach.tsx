import { FC, HTMLAttributes } from 'react';
import pdfIcon from 'assets/images/icons8-pdf-48 1.png';

export const TableFileAttach: FC<HTMLAttributes<HTMLTableElement>> = ({ ...props }) => {
	return (
		<table className='w-full mt-3' {...props}>
			<tbody>
				{Array.from({ length: 3 }).map((_, i) => <tr key={i}>
					<td className='py-2'>
						<div className='flex items-center'>
							<img src={pdfIcon} alt="" className='h-6 w-6 px-1 box-content' />
							<span>
								CBS.A25.ChiTietChaoGia-CHG.pdf
							</span>
						</div>
					</td>
					<td className='py-2 align-middle'>Trần Thị Ngân-CPMI</td>
					<td className='py-2 align-middle'>07/12/2021 15:38</td>
					<td className='py-2 align-middle'>356 KB</td>
				</tr>)}
			</tbody>
		</table>
	)
}