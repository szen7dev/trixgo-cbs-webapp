import React, { FC, useEffect, useState } from "react";

import cn from "classnames";
import InfiniteScroll from "react-infinite-scroll-component";

import projectImage from "assets/images/project.jpg";
import styles from "./style.module.css";

import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "../document/components/DocumentFilterButton";
import ButtonCreate from "../document/components/common/ButtonCreate";
import ButtonMore from "../document/components/common/ButtonMore";

const ProjectCategoryPage: FC = () => {
	// const [sorts, setSorting] = useState(listSort);
	const [data, setData] = useState<number[]>(Array.from({ length: 20 }));

	useEffect(() => {
		document.title = "PPT - Danh mục dự án"
	}, []);
	
	const fetchData = () => {
		setTimeout(() => {
			setData(data.concat(Array.from({ length: 20 })));
		}, 1500);
	}
	// const handleSort = (item: { id: string, type: string }, index: number) => {
	// 	const currentSort = [...sorts];
	// 	currentSort[index].type = currentSort[index].type === 'asc' ? 'desc' : 'asc';
	// 	setSorting(currentSort)
	// };

	// const nextPage = () => {
	// 	console.log('1')
	// }
	// const prevPage = () => {
	// 	console.log('1')
	// }

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-4 flex items-center w-full text-primary-gray bg-white border border-gray-300 py-1">
				<div className="flex flex-1 items-center">
					<span className="text-x-large mr-7 text-black">
						Danh sách
					</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<DropdownFilterButton />
				</div>
				<ButtonCreate />
				<ButtonMore />
			</div>

			{/* Content */}
			<div id="scrollable" className="flex-1 overflow-y-auto">
				<InfiniteScroll
					dataLength={data.length} //This is important field to render the next data
					next={fetchData}
					hasMore={true}
					loader={<div className="w-full pt-2 text-center">
						Loading...
					</div>}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							<b>Yay! You have seen it all</b>
						</p>
					}

					scrollableTarget="scrollable"
					className="flex flex-wrap w-full px-2 pt-2 pb-20 gap-y-2.5 text-primary-gray"
				>
				{
					data.map((_item: number, index: number) => {
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
				</InfiniteScroll>
			</div>
			{/* <Paginate nextPageAction={() => nextPage()} prevPageAction={() => prevPage()}/> */}
		</div>
	);
};

/**
 * ? Export rules:
 * ? export default must be capital syntax
 * ? export const must be camel case syntax
 */
export default ProjectCategoryPage;
