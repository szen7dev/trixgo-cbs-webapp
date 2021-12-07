import { FC, useEffect, useMemo, useState } from "react";

import cn from "classnames";

import iconSort from "assets/images/icon-sort-gray.png";
import iconSorted from "assets/images/icon-sort-blue.png";
import styles from "./style.module.css";

const listSort = [
	{ id: 'subtotal', title: 'Tổng mức', type: 'asc' },
	{ id: 'wattage', title: 'Khả năng thành công', type: 'asc' },
	{ id: 'date', title: 'Ngày liên hệ', type: 'asc' },
]

const ProjectDeployingPage: FC = () => {
	const [sorts, setSorting] = useState(listSort);
	const data = useMemo(() => [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null], []);

	useEffect(() => {
		document.title = "PPT - Dự án đang phát triển"
	}, []);

	const handleSort = (item: { id: string, type: string }, index: number) => {
		const currentSort = [...sorts];
		currentSort[index].type = currentSort[index].type === 'asc' ? 'desc' : 'asc';
		setSorting(currentSort)
	};

	return (
		<div className={cn(styles.content, "flex flex-col overflow-hidden h-full")}>
			<div className={cn(styles.header, 'px-4 flex justify-between w-full items-center')}>
				<div className="flex flex-wrap items-center">
					<div className={styles['item-sort']}>
						<span>
							Danh mục dự án
						</span>
					</div>
					{sorts.map((item, index) => (
						<div key={item.id} className={cn(styles['item-sort'], { [styles.active]: item.type === 'desc' })}>
							<button className="font-bold" onClick={() => handleSort(item, index)}>
								{
									item.type === 'asc'
										? <img src={iconSort} alt="asc" className="inline mr-2" />
										: <img src={iconSorted} alt="desc" className="inline mr-2" />
								}
								{item.title}
							</button>
						</div>
					))}
				</div>
				<div className={cn(styles['input-container'], 'my-2.5 rounded-full flex')}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input className="bg-transparent focus:outline-none flex-1" placeholder="Tìm kiếm" />
				</div>
			</div>
			<div className={cn(styles.scroll, "flex-1 overflow-y-auto px-2")}>
				<table className={cn(styles['table-project'], styles.table, styles['text-normal'], 'mt-2')}>
					<thead className={styles.black}>
						<tr>
							<th>TT</th>
							<th style={{ minWidth: "240px" }}>Nội dung</th>
							<th>Tổng mức đầu tư</th>
							<th style={{ minWidth: "264px" }}>Tình trạng hiện tại</th>
							<th style={{ minWidth: "100px" }}>Ngày liên hệ gần nhất</th>
							<th style={{ minWidth: "74px" }}>Đầu mối kết nối</th>
							<th style={{ minWidth: "92px" }}>Khả năng thành công</th>
							<th style={{ minWidth: "400px" }}>Ghi chú tiến trình</th>
							<th>Số ngày cách đây</th>
						</tr>
					</thead>
					<tbody className={styles.black}>
						{
							data.map((_item, index) => {
								return (
									index % 5 === 0
										? (<tr key={index}>
											<th>A1</th>
											<th colSpan={9} className="text-left">DỰ ÁN VỀ DÂN DỤNG</th>
										</tr>)
										: (<tr key={index}>
											<td className="px-4">{index}</td>
											<td className="text-left">Dự án trường Newton tại Ciputra</td>
											<td>5.000.000.000.000</td>
											<td className="text-left">A Dương đã báo Hiếu NBK kiểm tra, hỏi lại CĐT</td>
											<td>28/09/2021</td>
											<td>Mr. Long CDC</td>
											<td className="text-center">Cao</td>
											<td className="text-left">Đã thuyết trình với Ms. Oanh. Chờ trao đổi với Ban lãnh đạo CĐT. Dịch vụ cung cấp (BIM, Tư vấn giá, nền tảng công nghệ, thầu)</td>
											<td className="align-middle">12</td>
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
export default ProjectDeployingPage;
