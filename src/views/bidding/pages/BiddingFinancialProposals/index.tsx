import React, { FC } from 'react'
import { Link, useHistory, useParams, generatePath } from 'react-router-dom';
import '../../styles/style.css'

export const BiddingFinancialProposals: FC = () => {
	const history = useHistory();
	const params = useParams<{ id: string }>();

	const length = 10;
	return (
		<div className='flex h-full w-full pb-11 ' style={{ zIndex: 0 }}>
			<div className='flex-1 overflow-auto'>
				<table className='table-bidding-horizontal text-small'>
					<tbody className='text-right'>
						<tr className='text-s-large'>
							<th className="align-top text-x-large"  >
								CHG.THT.Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công
							</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i} className="bg-[#F2C0CC]" style={{ zIndex: -1 }}>
									<Link to='/'>
										<div className='relative text-left'>
											<img className='w-14 h-14 object-cover' src="/static/media/sustainable.png" alt="" />
											<p className='mt-3 text-cbs-subtext'>
												Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
											</p>
											<span className='absolute top-0 right-0 w-9 h-9 bg-white rounded-full flex items-center justify-center'>
												{i + 1}
											</span>
										</div>
									</Link>
								</td>
							))}
						</tr>
						<tr className='text-s-large'>
							<th></th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									191.183.792.548
								</td>
							))}
						</tr>
						<tr className='text-small'>
							<th></th>
							{Array.from({ length }).map((_, i) => (
								<td key={i} className="text-cbs-up-text">
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large' onClick={() => history.push(generatePath('/bidding/:id/3/item/:itemId', { id: params.id, itemId: 1 }))}>
							<th className="text-small">HẠNG MỤC PHẦN NGẦM</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large'>
							<th className="text-small">HẠNG MỤC PHẦN THÂN</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large'>
							<th className="text-small">HẠNG MỤC XÂY TRÁT</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large'>
							<th className="text-small">HẠNG MỤC CHỐNG MỐI</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large'>
							<th className="text-small">HẠNG MỤC HỆ THỐNG NỐI ĐẤT, CHỐNG SÉT VÀ ỐNG ĐẶT CHỜ PHẦN NGẦM</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large'>
							<th className="text-small">HẠNG MỤC BIỆN PHÁP THI CÔNG PHẦN NGẦM</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
						<tr className='text-s-large font-bold'>
							<th className='text-small'>TỔNG</th>
							{Array.from({ length }).map((_, i) => (
								<td key={i}>
									-12.500.000.000
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	)
}