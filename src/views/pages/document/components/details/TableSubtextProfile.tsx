import { FC, HTMLAttributes } from 'react';
import pdfIcon from 'assets/images/icons8-pdf-48 1.png';

const TableSubtextProfile: FC<HTMLAttributes<HTMLTableElement>> = ({ ...props }) => {
	return (
		<table className='w-full text-black mt-3' {...props}>
			<thead>
				<tr className='text-left'>
					<th className="font-normal text-cbs-subtext px-3 py-2.5">Nội dung</th>
					<th className="font-normal text-cbs-subtext px-3 py-2.5">Số hiệu</th>
					<th className="font-normal text-cbs-subtext px-3 py-2.5">Ngày tháng</th>
					<th className="font-normal text-cbs-subtext px-3 py-2.5">Chủ thể ban hành</th>
					<th className="font-normal text-cbs-subtext px-3 py-2.5">Ghi chú</th>
					<th className="font-normal text-cbs-subtext px-3 py-2.5">Ghi chú</th>
				</tr>
			</thead>
			<tbody>
				{Array.from({ length: 3 }).map((_, i) => <tr key={i}>
					<td className='py-3 px-3'>Bản vẽ KC08 thuộc bộ môn kết cấu</td>
					<td className='py-3 px-3'>KC08</td>
					<td className='py-3 px-3'>25/12/2021</td>
					<td className='py-3 px-3'>Công ty Cổ phần INNO</td>
					<td className='py-3 px-3'>Đã đóng dấu đỏ</td>
					<td className='py-3 px-3'>Cặp F1, Tầng 2, Giá A3, Kho công ty</td>
				</tr>)}
				<tr>
					<td colSpan={6} className='text-center py-5 text-cbs-primary'>Xem thêm (128)</td>
				</tr>
			</tbody>
		</table>
	)
}

export default TableSubtextProfile
