import React, { FC, useEffect, useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";

import projectImage from "assets/images/project.jpg";

import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "../document/components/DocumentFilterButton";
import ButtonCreate from "../document/components/common/ButtonCreate";
import ButtonMore from "../document/components/common/ButtonMore";

import 'views/pages/document/document.css'

const ProjectCategoryPage: FC = () => {
	// const [sorts, setSorting] = useState(listSort);
	const [data, setData] = useState<number[]>(Array.from({ length: 20 }));

	useEffect(() => {
		document.title = "PPT - Danh mục dự án"
	}, []);

	const fetchData = () => {
		setTimeout(() => {
			setData(data.concat(Array.from({ length: 14 })));
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
			<div className="px-4 flex items-center w-full text-primary-gray bg-white border-b border-cbs-border py-1">
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
					className="flex flex-wrap w-full px-2 pt-2 pb-20 gap-y-4 text-primary-gray"
				>
					{
						data.map((_item: number, index: number) => {
							return (
								<div key={index} className="document__card-container">
									<div className="rounded-cbs-md border-cbs-border border pt-4 px-4 pb-7">
										<div className="flex gap-x-3.5">
											<img width="90" height="90" src={projectImage} alt="project" />
											<div className="flex-1">
												<div className="flex justify-between text-xs">
													<span>15/12/20</span>
													<span>26/3/23</span>
												</div>
												<div className="w-full h-1.5 mt-1.5 border border-cbs-border box-content">
													<div className="h-full bg-cbs-subtext"  style={{ 'width': `${Math.floor(Math.random() * 100)}%` } as React.CSSProperties}></div>
												</div>
												<ul className="mt-3 text-medium">
													<li><span className="rounded-full bg-cbs-schedule-after-7days h-2 w-2 mr-2 inline-block" /> Cột mốc: <b>3/12</b></li>
													<li className="mt-2.5"><span className="rounded-full bg-cbs-schedule-after-7days h-2 w-2 mr-2 inline-block" />Giai đoạn: <span className="text-cbs-primary">Đấu thầu</span></li>
												</ul>
											</div>
										</div>
										<h3 className="line-clamp-2 text-large text-black pt-2">
											<Link className="" to="/pcm/project/:id/home">CHG.THT.Xây dựng cụm trường Tiểu học và THCS Tây Hồ Tây</Link>
										</h3>
										<p className="text-x-small mt-1.5 truncate">
											Công ty Cổ phần Đầu tư và Thương mại Thủ Đô
										</p>
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
