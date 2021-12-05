import { FC, useEffect, useState } from "react";

import cn from "classnames";

import projectImage from "assets/images/project.jpg";
import iconSort from "assets/images/icon-sort-gray.png";
import iconSorted from "assets/images/icon-sort-blue.png";
import styles from "./style.module.css";

const listSort = [
	{ id: 'job', title: 'Công việc', type: 'asc' },
	{ id: 'profile', title: 'Hồ sơ văn bản', type: 'asc' },
	{ id: 'expire', title: 'Ngày hết hạn', type: 'asc' },
	{ id: 'status', title: 'Trạng thái', type: 'asc' },
]

const data: Array<null> = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null];

const ProjectCategoryPage: FC = () => {
	const [sorts, setSorting] = useState(listSort);

	useEffect(() => {
		document.title = "PPT - Danh mục dự án"
	}, []);

	const handleSort = (item: { id: string, type: string }, index: number) => {
		const currentSort = [...sorts];
		currentSort[index].type = currentSort[index].type === 'asc' ? 'desc' : 'asc';
		setSorting(currentSort)
	};

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
								<h3 className={styles['line-clamp-2']}>
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
			<div className={styles.pagination}>
				<div className="bg-white px-4 flex items-center justify-between sm:px-6">
					<div className={cn(styles['pagination-container'], "mx-auto hidden sm:flex-1 sm:flex sm:items-start sm:justify-between mt-5")}>
						<button
							className="relative inline-flex items-center py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ marginLeft: "15px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							<span style={{ marginRight: "30px", marginLeft: "9px" }}>LÙI</span>
						</button>
						<nav className="relative z-0 inline-flex " aria-label="Pagination">
							{/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
							<div className={cn(styles['button-contain'], styles.active)}>
								<button
									aria-current="page"
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold"
								>
									1
								</button>
							</div>
							<div className={styles['button-contain']}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold"
								>
									2
								</button>
							</div>
							<div className={styles['button-contain']}>
								<button
									className="hidden md:inline-flex relative items-center px-4 py-2 text-sm mx-1 font-bold"
								>
									3
								</button>
							</div>
							<span className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold">
								...
							</span>
							<div className={styles['button-contain']}>
								<button
									className="hidden md:inline-flex relative items-center px-4 py-2 text-sm mx-1 font-bold"
								>
									8
								</button>
							</div>
							<div className={styles['button-contain']}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold"
								>
									9
								</button>
							</div>
							<div className={styles['button-contain']}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold"
								>
									10
								</button>
							</div>
						</nav>
						<button
							className="ml-3 relative inline-flex items-center py-2 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50"
						>
							<span style={{ marginLeft: "30px", marginRight: "9px" }}>TIẾP</span>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ marginRight: "15px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default ProjectCategoryPage;
