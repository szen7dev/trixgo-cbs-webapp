import React, { FC, useState } from 'react'
import '../../styles/style.css'
import TableRowGroup from './components/TableRowGroup'

export const BiddingMaterialRequirements: FC = () => {
	const [show, setShow] = useState(true)
	return (
		<div className='flex h-full w-full bg-white pb-11'>
			<div className='flex-1 overflow-auto'>
				<table className='table-bidding text-small'>
					<thead>
						<tr>
							<th className="w-1">
								<button className="inline-block text-white rounded bg-gray-600 w-5 h-5" onClick={() => setShow(!show)}>{!show ? '+' : '-'}</button>
							</th>
							<th className='w-1'>TT</th>
							<th>Vật tư, thiết bị</th>
							<th>Vị trí/khu vực</th>
							<th>Yêu cầu kỹ thuật</th>
							<th>Hình ảnh</th>
							<th>Thương hiệu</th>
							<th>Xuất xứ</th>
							<th>Ghi chú</th>
						</tr>
					</thead>
					{
						Array.from({ length: 10 }).map((item, index) => (
							<TableRowGroup key={index} index={index} show={show} />
						))
					}
				</table>
			</div>
		</div>
	)
}