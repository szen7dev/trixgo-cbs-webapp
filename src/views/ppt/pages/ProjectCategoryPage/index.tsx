import React, { FC, useEffect, useState } from "react";
import debounce from 'lodash/debounce';

import InfiniteScroll from "react-infinite-scroll-component";
import { Link, useParams, generatePath } from "react-router-dom";

import { useQueryListDepartmentsIsMember } from "services/hooks/items/useDepartment";

import projectImage from "assets/images/project.jpg";

// ========== Global Components ==========
// import { SearchInput, ButtonCreate, ButtonMore } from "shareComponents/common";

// ========== App common Components ==========
import { APP_ID, PROJECT_STAGE } from 'apis/localdb'

// Utils
import { dateLoadedPercentage, formatDate } from "utils/ppt";
import 'views/document/styles/document.css'
// import { useCheckPerAccessScreen } from "services/hooks/auth/usePermissions";
// import { useHistoryTraffics } from "services/hooks/auth/useAuth";

const { REACT_APP_URL_S3, REACT_APP_URL_S3_PROJECT } = process.env;

const ProjectCategoryPage: FC = () => {
	// Khai báo active Tab
	const { tab } = useParams<{ tab: string}>()
	const getTypeValue = (tab?: any) => {
        switch(tab) {
            case '2':
                return 1;

          default:
            return 2;
        }
    }

	const getBudgetValue = (tab?: any) => {
        switch(tab) {
            case '2':
                return 0;

          default:
            return 1;
        }
    }

	const type = getTypeValue(tab)
	const isBudget = getBudgetValue(tab)
	const [keyword, setKeyword] = useState('');
	
	// const { createPermission, updatePermission, deletePermission } = useCheckPerAccessScreen({
	// 	appID: APP_ID.PCM.id,
	// 	menuID: APP_ID.PCM.menuPcmApp.projects.id,
	// 	type: "1"
	// });

	const { data: listDepartments, fetchNextPage, hasNextPage, totalRecord } = useQueryListDepartmentsIsMember({
		limit: 20,
		type,
		isBudget,
		keyword,
		isFetch: true
	});

	useEffect(() => {
		document.title = "Trixgo | Danh sách dự án";
	}, []);

	const onChangeSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
	}, 600)

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			<div className="px-4 flex items-center w-full text-primary-gray bg-white py-2">
				<div className={"inline-flex items-center border-collapse border-0.5 border-primary-border"}>
					<Link to={"/pm/projects"}>
						<button className={"px-4 py-2 border-r-0.5 border-primary-border " + (!tab ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
							Dự án
						</button>
					</Link>
					<Link to={"/pm/projects/2"}>
						<button className={"px-4 py-2 border-r-0.5 border-primary-border " + (tab == "2" ? "bg-cbs-soft-blue text-primary":"bg-white text-primary-gray")}>
							Phòng ban
						</button>
            		</Link>
				</div>
			</div>

			<div id="scrollable" className="flex-1 overflow-y-auto">
				<InfiniteScroll
					dataLength={listDepartments.length} //This is important field to render the next data
					next={fetchNextPage}
					hasMore={Boolean(hasNextPage)}
					loader={hasNextPage ? <div className="w-full pt-2 text-center">
						Loading...
					</div> : <></>}
					scrollableTarget="scrollable"
					className="flex flex-wrap w-full px-2 pt-2 pb-20 gap-y-4 text-primary-gray"
				>
					{
						listDepartments.map((record) => {
							const percent = Math.floor(dateLoadedPercentage(new Date(record.startTime || 0), new Date(record.expiredTime || 0), new Date()) * 100);
							const imgUrl = record.image
								? (record.image.startsWith('files/db')
									? `${REACT_APP_URL_S3}/${record.image}`
									: `${REACT_APP_URL_S3_PROJECT}/${record.image}`)
								: projectImage;

							return (
								<div key={record._id} className="document__card-container">
									<div className="rounded-cbs-md border-cbs-border border-0.5 shadow-lg pt-4 px-4 pb-7 h-full">
										<div className="flex gap-x-3.5">
											<img width="90" height="90" src={imgUrl} alt="project" />
											<div className="flex-1">
												<div className="flex justify-between text-xs">
													<span>{formatDate(new Date(record.startTime || 0))}</span>
													<span>{formatDate(new Date(record.expiredTime || 0))}</span>
												</div>
												<div className="w-full h-1.5 mt-1.5 border border-cbs-border box-content">
													<div
														className="h-full bg-cbs-subtext"
														style={{ 'width': `${percent > 100 ? 100 : percent}%` } as React.CSSProperties}>
													</div>
												</div>
												<ul className="mt-3 text-medium">
													<li>
														<span className="rounded-full bg-cbs-schedule-after-7days h-2 w-2 mr-2 inline-block" />
														Cột mốc: <b>{record.completedMilestones || 0}/{record.milestones || 0}</b>
													</li>
													<li className="mt-2.5">
														<span className="rounded-full bg-cbs-schedule-after-7days h-2 w-2 mr-2 inline-block" />Giai đoạn:{" "}
														<span className="text-cbs-primary text-[12px]">{PROJECT_STAGE[record.stage ? record.stage - 1 : 0].text}</span>
													</li>
												</ul>
											</div>
										</div>
										<h3 className="line-clamp-2 text-large text-black pt-2">
											<Link className="" to={generatePath("/pm/project/:id/home", { id: record._id })}>{record.company.sign}.{record.name}</Link>
										</h3>
										<p className="text-x-small mt-1.5 truncate">
											{record.company.name}
										</p>
									</div>
								</div>
							)
						})
					}
				</InfiniteScroll>
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