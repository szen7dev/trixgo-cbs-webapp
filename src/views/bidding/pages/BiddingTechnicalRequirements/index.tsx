import React, { FC } from 'react'
import romanize from 'views/bidding/utils/romolize'
import '../../styles/style.css'

const list = [
	{ id: 0, title: 'Bảng dữ liệu gói thầu' },
	{ id: 1, title: 'Yêu cầu về tư cách hợp lệ' },
	{ id: 2, title: 'Yêu cầu về năng lực tài chính' },
	{ id: 3, title: 'Yêu cầu về năng lực kinh nghiệm/Hợp đồng tương tự' },
	{ id: 4, title: 'Yêu cầu về năng lực nhân sự' },
	{ id: 5, title: 'Yêu cầu về năng lực thiết bị' },
	{ id: 6, title: 'Yêu cầu về giải pháp tổ chức thực hiện' },
	{ id: 7, title: 'Điều khoản hợp đồng' },
	{ id: 8, title: 'Thông tin nhà thầu, Đơn dự thầu, bảo lãnh dự thầu và thông tin khác' },
]

export const BiddingTechnicalRequirements: FC = () => {
	return (
		<div className='flex h-full w-full bg-white'>
			<div className="w-[330px] border-r border-cbs-border h-full">
				{list.map(item => (
					<a key={item.id} className="block px-4 pt-3 pb-2 hover:bg-cbs-active-comment" href='/'>
						{item.title}
					</a>
				))}
			</div>
			<div className='flex-1 overflow-auto'>
				<table className='table-bidding text-small'>
					<thead>
						<tr>
							<th>TT</th>
							<th>Nội dung</th>
							<th>Mô tả</th>
							<th>Ghi chú</th>
						</tr>
					</thead>
					{
						Array.from({ length: 10 }).map((item, index) => (
							<tbody key={index}>
								<tr className='bg-cbs-summary'>
									<th>{romanize(index + 1)}</th>
									<th>PHÂN NHÓM 1</th>
									<th></th>
									<th></th>
								</tr>
								{
									Array.from({ length: 5 }).map((_, i) => (
										<tr key={index + '_' + i}>
											<td>{i + 1}</td>
											<td>Ngành nghề kinh doanh hợp pháp và phù hợp với gói thầu theo quy định hiện hành</td>
											<td>Đăng ký kinh doanh có ngành nghề Thi công xây dựng công trình xây dựng dân dụng.
												Nhà thầu scan PDF bản gốc đính kèm</td>
											<td>Nhà thầu cần cung cấp bản gốc khi tới thương thảo hợp đồng</td>
										</tr>
									))
								}
							</tbody>
						))
					}
				</table>
			</div>
		</div>
	)
}