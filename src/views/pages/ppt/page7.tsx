import { FC, useEffect, useMemo, useState } from "react";

import cn from "classnames";

import styles from "./style.module.css";

const _pages = [
	{ id: 'budget', title: 'Ngân sách' },
	{ id: 'wattage', title: 'Kế hoạch tài chính' },
]

const ExamplePage: FC = () => {
	const [pages, setPages] = useState(_pages);
	const data = useMemo(() => [null, null], []);

	useEffect(() => {
		document.title = "PPT - Ngân sách"
	}, []);

	return (
		<div className={cn(styles.content,styles.col)}>
		{/* <div className="flex flex-col w-full overflow-y-auto" style={{ height: 'calc(100vh - 64px)' }}> */}
			<div className={cn(styles.header, 'px-4 flex justify-between w-full items-center')}>
				<div className="flex flex-wrap h-full justify-center flex-1">
					{pages.map(page => <div key={page.id} className={cn(styles.navigator, { [styles.active]: page.id === 'budget' })}>
						<button>
							{page.title}
						</button>
					</div>)}
				</div>
				<div className={cn(styles['input-container'], 'my-2.5 rounded-full flex')}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-4 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input className="bg-transparent focus:outline-none py-3 px-2.5 flex-1" placeholder="Tìm kiếm" />
				</div>
			</div>
			<div className="flex-1 overflow-y-auto px-2">
				<table className={cn(styles.table, 'mt-2')}>
					<thead>
						<tr>
							<th>TT</th>
							<th style={{ minWidth: '240px' }}>Nội dung (không gồm VAT)</th>
							<th style={{ minWidth: '122px' }}>Ngân sách</th>
							<th style={{ minWidth: '122px' }}>Dự báo (phát sinh)</th>
							<th style={{ minWidth: '122px' }}>Ký hợp đồng</th>
							<th style={{ minWidth: '122px' }}>Tạm ứng</th>
							<th style={{ minWidth: '125px' }}>Sản lượng</th>
							<th style={{ minWidth: '132px' }}>Nghiệm thu hoàn thành</th>
							<th style={{ minWidth: '123px' }}>Thanh toán</th>
							<th style={{ minWidth: '124px' }}>Còn lại</th>
							<th style={{ minWidth: '246px' }}>Ghi chú</th>
						</tr>
					</thead>
					<tbody>
						{
							data.map((_item, index) => {
								return (
									index % 5 === 0
										? (<tr key={index}>
											<th>A1</th>
											<th className="text-left">GÓI THẦU XÂY DỰNG VÀ THIẾT BỊ</th>
											<th className="text-right" style={{width:'1%'}}>15.000.000.000</th>
											<th className="text-right" style={{width:'1%'}}>15.000.000.000</th>
											<th className="text-right" style={{width:'1%'}}>15.000.000.000</th>
											<th colSpan={6} className="text-left"></th>
										</tr>)
										: (<tr key={index}>
											<td className="px-4">{index}</td>
											<td className="text-left">Thi công san lấp mặt bằng</td>
											<td className="text-right" style={{width:'1%'}}>5.000.000.000</td>
											<td className="text-right" style={{width:'1%'}}>5.000.000.000</td>
											<td className="text-right" style={{width:'1%'}}>5.000.000.000</td>
											<td></td>
											<td className="text-center"></td>
											<td className="text-left"></td>
											<td className="text-left"></td>
											<td className="text-left"></td>
											<td className="text-justify"></td>
										</tr>)
								)
							})
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default ExamplePage;
