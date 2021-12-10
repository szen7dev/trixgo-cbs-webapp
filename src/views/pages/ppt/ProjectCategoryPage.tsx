import React, { FC, useEffect, useState } from "react";

import cn from "classnames";

import projectImage from "assets/images/project.jpg";
import iconSort from "assets/images/icon-sort-gray.png";
import iconSorted from "assets/images/icon-sort-blue.png";
import styles from "./style.module.css";
import Paginate from "../../../components/common/Paginate";

const listSort = [
	{ id: 'job', title: 'Công việc', type: 'asc' },
	{ id: 'profile', title: 'Hồ sơ văn bản', type: 'asc' },
	{ id: 'expire', title: 'Ngày hết hạn', type: 'asc' },
	{ id: 'status', title: 'Trạng thái', type: 'asc' },
]

const _data: Array<null> = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

const ProjectCategoryPage: FC = () => {
	const [sorts, setSorting] = useState(listSort);
	const [data, setData] = useState(_data);

	useEffect(() => {
		document.title = "PPT - Danh mục dự án"
	}, []);

	const handleSort = (item: { id: string, type: string }, index: number) => {
		const currentSort = [...sorts];
		currentSort[index].type = currentSort[index].type === 'asc' ? 'desc' : 'asc';
		setSorting(currentSort)
	};

	const nextPage = () => {
		console.log('1')
	}
	const prevPage = () => {
		console.log('1')
	}

	return (
		<div className={styles.content}>
			<div className={cn(styles.header, 'px-4 flex justify-between w-full items-center sticky top-0')}>
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
				<div className={cn(styles['input-container'], 'rounded-full flex my-2.5')}>
					<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
					<input className="bg-transparent focus:outline-none flex-1" placeholder="Tìm kiếm" />
				</div>
			</div>

			<div className={cn(styles.scroll, 'flex flex-wrap w-full pl-2 pr-2 pb-20 flex-1 overflow-y-auto')}>
				{
					data.map((_item: null, index: number) => {
						return (
							<div key={index} className={cn(styles.item)}>
								<div className={styles.image}>
									<img width="130" height="130" src={projectImage} alt="project" />
									<div>
										<div className={cn(styles.progress, "w-full h-1.5")} style={{ '--width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties} />
										<div className={cn(styles.date, "flex justify-between mt-3")} style={{ color: 'black' }}>
											<span>15/12/20</span>
											<span>26/3/23</span>
										</div>
										<ul className="mt-4">
											<li><span /> Cột mốc: <b>3/12</b></li>
											<li className="mt-5"><span /> ĐẤU THẦU</li>
										</ul>
									</div>
								</div>
								<h3>
									CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây
								</h3>
								<p className="truncate">
									Công ty Cổ phần Đầu tư và Thương mại Thủ Đô
								</p>
								<div className={cn(styles.tag, "grid gap-6 justify-center text-center mt-6 whitespace-nowrap")}>
									<div>
										<h4>
											90/148
										</h4>
										<p>Việc hoàn thành</p>
									</div>
									<div>
										<h4>
											288
										</h4>
										<p>Hồ sơ văn bản</p>
									</div>
								</div>
							</div>
						)
					})
				}
			</div>
			<Paginate nextPageAction={() => nextPage()} prevPageAction={() => prevPage()}/>
		</div>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default ProjectCategoryPage;
