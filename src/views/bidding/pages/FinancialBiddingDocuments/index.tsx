import React, { FC, Fragment } from 'react'
import { ButtonMore } from 'shareComponents/common';
import ButtonBack from 'views/bidding/shareComponents/layouts/LayoutSecondary/components/ButtonBack';
import romanize from 'views/bidding/utils/romolize';

export const FinancialBiddingDocuments: FC = () => {
	const length = 10;
	return (
		<div className='h-full w-full' style={{ zIndex: 0 }}>
			<div className='flex items-center border-b-0.5 border-cbs-border py-1 px-4'>
				<ButtonBack />
				<span className='flex-1 font-bold text-medium ml-4'>HẠNG MỤC PHẦN NGẦM</span>
				<ButtonMore />
			</div>
			<div className='flex-1 overflow-auto'>
				<table className='table-financial text-small pb-4'>
					<thead className='text-right'>
						<tr className='text-left align-top'>
							<td rowSpan={2} className='sticky left-0 bg-white min-w-[40px] w-full'>
								TT
							</td>
							<td className='sticky left-10 bg-white' rowSpan={2}>
								Nội dung
							</td>
							<td rowSpan={2} className="whitespace-nowrap">
								Yêu cầu kỹ thuật
							</td>
							<td rowSpan={2}>
								Đơn vị
							</td>
							<td rowSpan={2}>
								Khối lượng
							</td>
							{
								Array.from({ length }).map((_, index) => (
									<Fragment key={index}>
										<th colSpan={2} className="financial-title">
											Chào giá của Công ty Cổ phần Xây dựng Bình Thường Hóa-1
										</th>
									</Fragment>
								))
							}
							<th colSpan={2} className="financial-title">
								Tổng hợp đơn giá bất thường
							</th>
						</tr>
						<tr className='text-left'>
							{
								Array.from({ length }).map((_, index) => (
									<Fragment key={index}>
										<td className='financial-sub-title'>Đơn giá</td>
										<td className='financial-sub-title'>Thành tiền</td>
									</Fragment>
								))
							}
							<td>
								Thấp nhất
							</td>
							<td>
								Cao nhất
							</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<th className='sticky left-0 bg-white'>{romanize(1)}</th>
							<th className='sticky left-10 bg-white'>HẠNG MỤC 1</th>
							<th></th>
							<th></th>
							<th></th>
							{
								Array.from({ length }).map((_, index) => (
									<Fragment key={index}>
										<th></th>
										<th>1.000.000.000</th>
									</Fragment>
								))
							}
							<th></th>
							<th></th>
						</tr>
						{
							Array.from({ length: 4 }).map((_, i) => (
								<tr key={i}>
									<td className='sticky left-0 bg-white'></td>
									<td className='sticky left-10 bg-white'>Công việc số 1</td>
									<td>Yêu cầu số 1</td>
									<td>m3</td>
									<td>150.000</td>
									{
										Array.from({ length }).map((_, index) => (
											<Fragment key={index}>
												<td>1.000</td>
												<td>150.000.000</td>
											</Fragment>
										))
									}
									<td className='text-cbs-primary'>1.000</td>
									<td className='text-cbs-down-text'>1.000</td>
								</tr>
							))
						}
					</tbody>
					<tfoot>
						<tr className='text-left bg-cbs-summary'>
							<th className='sticky left-0 bg-cbs-summary'></th>
							<th className='sticky left-10 bg-cbs-summary'>Tổng</th>
							<th></th>
							<th></th>
							<th></th>
							{
								Array.from({ length }).map((_, index) => (
									<Fragment key={index}>
										<th></th>
										<th className='text-right'>1.000.000.000</th>
									</Fragment>
								))
							}
							<th></th>
							<th></th>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	)
}