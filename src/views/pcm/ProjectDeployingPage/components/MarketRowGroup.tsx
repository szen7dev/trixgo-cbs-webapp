import { FC, useEffect, useState } from 'react'
import classNames from 'classnames';

interface RowItem {
	_id: string | number
}
interface RowData {
	_id: string | number,
	name: string,
	description: string,
	data: Array<RowItem>
}

const MarketRowGroup: FC<{ row: RowData, show: boolean }> = ({ row, show }) => {
	const [state, setState] = useState<boolean>(show)
	useEffect(() => {
		setState(show);
	}, [show])
	return (
		<tbody className="text-black">
			<tr className="row__parent">
				<th>
					<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setState(!state)}>
						{state ? '+' : '-'}
					</button>
				</th>
				<th>A1</th>
				<th colSpan={9} className="text-left">DỰ ÁN VỀ DÂN DỤNG</th>
			</tr>
			{row.data.map((_d, i) => (
				<tr key={i} className={classNames("row__child", { hidden: state })}>
					<td></td>
					<td className="px-4">{i}</td>
					<td contentEditable className="text-left">Dự án trường Newton tại Ciputra</td>
					<td contentEditable >5.000.000.000.000</td>
					<td contentEditable className="text-left">A Dương đã báo Hiếu NBK kiểm tra, hỏi lại CĐT</td>
					<td>28/09/2021</td>
					<td contentEditable >Mr. Long CDC</td>
					<td contentEditable className="text-center">Cao</td>
					<td contentEditable className="text-left">Đã thuyết trình với Ms. Oanh. Chờ trao đổi với Ban lãnh đạo CĐT. Dịch vụ cung cấp (BIM, Tư vấn giá, nền tảng công nghệ, thầu)</td>
					<td className="align-middle min-w-[89px] w-1 bg-cbs-schedule-expired">12</td>
				</tr>
			))}
		</tbody>
	)
}

export default MarketRowGroup
