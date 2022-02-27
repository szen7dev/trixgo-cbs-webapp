import React, { FC, useEffect } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { Link, generatePath } from "react-router-dom";

// Hooks use department
import { useListDepartment } from "services/hooks/ppt/useListDepartment";
import { DepartmentEnumType } from "typings/ppt";

import projectImage from "assets/images/project.jpg";

// ========== Global Components ==========
import { SearchInput, ButtonCreate, ButtonMore } from "shareComponents/common";

// ========== App common Components ==========
// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import { PROJECT_STAGE } from 'apis/localdb'

// Utils
import { dateLoadedPercentage, formatDate } from "utils/ppt";

import 'views/document/styles/document.css'

const ProjectCategoryPage: FC = () => {
	const { data: _data, fetchNextPage, hasNextPage } = useListDepartment({
		type: DepartmentEnumType.PROJECT,
		populates: {
			path: ['company'],
		}
	})

	useEffect(() => {
		document.title = "PPT - Danh mục dự án"
	}, []);

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-4 flex items-center w-full text-primary-gray bg-white border-b-[0.5px] border-cbs-border py-1">
				<div className="flex flex-1 items-center">
					<span className="text-x-large mr-7 text-black">
						Danh sách
					</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					{/* <DropdownFilterButton /> */}
				</div>
				<ButtonCreate />
				<ButtonMore />
			</div>

			{/* Content */}
			<div id="scrollable" className="flex-1 overflow-y-auto">
				<InfiniteScroll
					dataLength={_data?.pages.reduce((n, c) => n + c.data.listRecords.length, 0) || 0} //This is important field to render the next data
					next={fetchNextPage}
					hasMore={Boolean(hasNextPage)}
					loader={<div className="w-full pt-2 text-center">
						Loading...
					</div>}
					endMessage={
						<p style={{ textAlign: 'center' }}>
							{/* <b>Yay! You have seen it all</b> */}
						</p>
					}

					scrollableTarget="scrollable"
					className="flex flex-wrap w-full px-2 pt-2 pb-20 gap-y-4 text-primary-gray"
				>
					{
						_data?.pages.map((page, index: number) => {
							return page.data.listRecords.map((record, index: number) => {
								return (
									<div key={record._id} className="document__card-container">
										<div className="rounded-cbs-md border-cbs-border border pt-4 px-4 pb-7 h-full">
											<div className="flex gap-x-3.5">
												<img width="90" height="90" src={projectImage} alt="project" />
												<div className="flex-1">
													<div className="flex justify-between text-xs">
														<span>{formatDate(new Date(record.startTime || 0))}</span>
														<span>{formatDate(new Date(record.expiredTime || 0))}</span>
													</div>
													<div className="w-full h-1.5 mt-1.5 border border-cbs-border box-content">
														<div
															className="h-full bg-cbs-subtext"
															style={{ 'width': `${Math.floor(dateLoadedPercentage(new Date(record.startTime || 0), new Date(record.expiredTime || 0), new Date()) * 100)}%` } as React.CSSProperties}>
														</div>
													</div>
													<ul className="mt-3 text-medium">
														<li><span className="rounded-full bg-cbs-schedule-after-7days h-2 w-2 mr-2 inline-block" />Cột mốc: <b>3/12</b></li>
														<li className="mt-2.5">
															<span className="rounded-full bg-cbs-schedule-after-7days h-2 w-2 mr-2 inline-block" />Giai đoạn:{" "}
															<span className="text-cbs-primary">{PROJECT_STAGE[record.stage ? record.stage - 1 : 0].text}</span>
														</li>
													</ul>
												</div>
											</div>
											<h3 className="line-clamp-2 text-large text-black pt-2">
												<Link className="" to={generatePath("/pcm/project/:id/home", { id: record._id })}>{record.name}</Link>
											</h3>
											<p className="text-x-small mt-1.5 truncate">
												{record.company.name}
												{/* Công ty Cổ phần Đầu tư và Thương mại Thủ Đô */}
											</p>
										</div>
									</div>
								)
							})
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