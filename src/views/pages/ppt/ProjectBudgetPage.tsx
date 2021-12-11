import { FC, useEffect, useMemo } from "react";

import cn from "classnames";

import styles from "./style.module.css";

import icon from 'assets/images/icons8-bulleted-list-96 1.png';

const pages = [
	{ id: 'budget', title: 'Ngân sách' },
	{ id: 'wattage', title: 'Kế hoạch tài chính' },
]

const ProjectBudgetPage: FC = () => {
	const data = useMemo(() => [null, null], []);

	useEffect(() => {
		document.title = "PPT - Ngân sách"
	}, []);

	return (
		<div className={cn(styles.content, styles.col)}>
			<div className={cn(styles.header, 'px-4 flex justify-between w-full items-center')}>
				<div className="flex flex-wrap h-full justify-center flex-auto">
					{pages.map(page => <div key={page.id} className={cn(styles.navigator, { [styles.active]: page.id === 'budget' })}>
						<button>
							{page.title}
						</button>
					</div>)}
				</div>
				<div className={cn(styles['header-list-sort'], 'my-1.5 flex whitespace-nowrap')}>
					<button className={cn(styles['header-item-sort'], { [styles.active]: true })}>
						<img src={icon} alt="list" className='inline-block mr-1.5' />
						List
					</button>
					<button className={cn(styles['header-item-sort'], { [styles.active]: false })}>
						<img src={icon} alt="list" className='inline-block mr-1.5' />
						Other
					</button>
					<button className={cn(styles['header-item-sort'], { [styles.active]: false })}>
						<img src={icon} alt="list" className='inline-block mr-1.5' />
						Other
					</button>
				</div>
			</div>
			<div className="flex-1 overflow-y-auto px-2">
				<table className={cn(styles.table, styles.black, styles['text-normal'], 'mt-2')}>
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
											<th className="text-right" style={{ width: '1%' }}>15.000.000.000</th>
											<th className="text-right" style={{ width: '1%' }}>15.000.000.000</th>
											<th className="text-right" style={{ width: '1%' }}>15.000.000.000</th>
											<th colSpan={6} className="text-left"></th>
										</tr>)
										: (<tr key={index}>
											<td className="px-4">{index}</td>
											<td className="text-left">Thi công san lấp mặt bằng</td>
											<td className="text-right" style={{ width: '1%' }}>5.000.000.000</td>
											<td className="text-right" style={{ width: '1%' }}>5.000.000.000</td>
											<td className="text-right" style={{ width: '1%' }}>5.000.000.000</td>
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
export default ProjectBudgetPage;
