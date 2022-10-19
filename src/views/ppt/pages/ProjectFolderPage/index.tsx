import React, { FC, useCallback, useState, useEffect } from "react";
import { RouteComponentProps, useHistory, useLocation, useParams, Link } from "react-router-dom";
import { APP_ID, PCM_STATUS_TASK } from 'apis/localdb';
import { useModal } from "services/hooks/useModal";

import iconFile from 'assets/images/icons8-audit-96.png';
import GroupDefaultIcon from "assets/images/icons8-star-96.png";
import '../../style.css';
import { SetGroupDefault } from "./modal";

// HOOK
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import { useTask } from "services/hooks/useTask";
import moment from "moment";
import { useAuth } from "services/hooks/auth/useAuth";
// import { useHistoryTraffics } from "services/hooks/auth/useAuth";
// import { Paginate, SearchInput } from "shareComponents/common";
// import debounce from "lodash/debounce";
import nextIcon from "assets/images/icons-arrow-next.svg";
import downloadIcon from "assets/images/icons8-download-64.svg";
import iconBack from "assets/images/icon-back-gray.svg";
// import userAvt from "assets/images/task-user.svg";
import iconFolder from "assets/images/icons8-folder-96 4.svg";
import iconAddNew from "assets/images/Frame 4048.svg";
import { ModalAddNewTask } from "shareComponents/common";

interface IData {
	id: number,
	type: string,
	content: string,
	created_by: string,
	created_at: string,
	code: string,
	count: number,
	status: number,
	path: string,
}

const IconArrowRight = () => (
	<div className="">
		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
		</svg>
	</div>
)

const FolderIcon: FC<{ type: string }> = ({ type }) => {
	switch (type) {
		case "file":
			return <></>;
		// return <img src={iconFile} alt="file" className="inline-block mr-3" />;

		default:
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-cbs-subtext mr-3" viewBox="0 0 20 20" fill="currentColor">
					<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
				</svg>
			);
	}
}

const ProjectFolderPage: FC<RouteComponentProps> = ({ match }) => {
	//_____Start history traffict
	// const payloadHistoryTraffic: any = {
	// 	appID: APP_ID.PCM.id,
	// 	menuID: APP_ID.PCM.menuPcmProject.folder.id,
	// 	type: "1"
	//   };
	// const { createHistoryTraffics } = useHistoryTraffics();
	// useEffect(() => {
	// 	createHistoryTraffics({...payloadHistoryTraffic, type: 1});
	// }, []);
	//_____End history traffict
	const history = useHistory();
	const location = useLocation();
	// const [data, setData] = useState<IData[]>([]);
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const { openModal } = useModal();
	const { id: projectID, groupID } = useParams<{ id: string, groupID: string }>();
	const { infoDepartment } = usePcmProject({ departmentID: projectID });
	// const { assigned, checkboxRef, handleCheckAll, handleChangeCheckbox } = useCheckedList(data);
	const { dataUserInfo, refetchDataUserInfo, user } = useAuth();
	const [keyword, setKeyword] = useState("");
	const [isFetchTask, setIsFetchTask] = useState(false);
	const {
		// isLoading,
		// refetch,
		data: listPcmPlanGroup,
		fetchNextPage,
		hasNextPage,
		totalRecord,
		// totalPage,
		// refetchInfoGroup
	} = usePcmPlanGroup({
		projectID,
		parentID: groupID,
		keyword,
		populates: JSON.stringify({
			path: "members",
			select: "image"
		})
	}, true);

	const {
		infoGroup,
		refetchInfoGroup
	} = usePcmPlanGroup({
		groupID,
		populates: JSON.stringify({
			path: "parent project",
			select: "parent sign name company",
			populate: {
				path: "parent company",
				select: "parent sign"
			}
		})
	}, false, true);

	let { listTasks } = useTask({
		params: {
			groupID,
			keyword
		},
		isFetch: !!groupID
	});

	if(!groupID){
		listTasks = []
	}

	useEffect(() => {
		refetchInfoGroup()
		refetchDataUserInfo()
		document.title = `${infoDepartment?.data?.sign}-Thư mục dữ liệu`;
	}, [groupID, infoDepartment]);
	return (
		<>
			{/* Content  */}
			<div className="flex flex-col h-full overflow-hidden">
				<div className={"nav-drawing flex items-center text-lg p-4 text-primary-gray"}>
					{groupID ?
						<button className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mr-3"}
							onClick={history.goBack}
						>
							<img src={iconBack} alt={"----"} className={"w-[18px]"} />
						</button> : <></>
					}
					{infoGroup?.data?.sign ?
						<Link to={`/pm/project/${projectID}/folder/${infoGroup?.data?.parent?._id ? infoGroup?.data?.parent?._id : ""}`}>
							<div className="flex gap-2">
								<img src={iconFolder} alt={"----"} className={"w-[18px]"} />
								<span className="truncate max-w-[132px]">{infoGroup?.data?.parent?.name || infoGroup?.data?.name}</span>
							</div>
						</Link> : <></>}

					{infoGroup?.data?.parent?.sign ? <>
						<img src={nextIcon} alt={"-----"} className={"mx-4 h-[12px] w-[12px]"} />
						<Link to={`/pm/project/${projectID}/folder/${infoGroup?.data?.parent?._id}`}>
							<div className="flex gap-2">
								<img src={iconFolder} alt={"----"} className={"w-[18px]"} />
								<span className="truncate max-w-[132px]">{infoGroup?.data?.name}</span>
							</div>
						</Link>
					</> : <></>}

					{infoGroup?.data?.parent?.parent?.name ? 
					<>
					<img src={nextIcon} alt={"-----"} className={"mx-4 h-[12px] w-[12px]"} />
					<Link to={`/pm/project/${projectID}/folder/${infoGroup?.data?.parent?.parent?._id}`}>
						<div className="flex gap-2">
							{/* <img src={iconFolder} alt={"----"} className={"w-[18px]"} /> */}
							<span className="truncate max-w-[132px]">{infoGroup?.data?.parent?.parent?.name}</span>
						</div>
					</Link>
					</> : <></>}
					{groupID ? 
						<button
						className={"ml-6"}
						onClick={() =>
							openModal(
								<div className="t-add-new-task-dialog text-left transition-all transform bg-primary-light shadow-xl rounded my-16 align-top inline-block">
									<ModalAddNewTask
										defaultValues={{
											group: infoGroup?.data,
											project: infoGroup?.data?.project,
											company: infoGroup?.data?.project?.company,
										}}
									/>
								</div>
							)
						}
					>
						<img src={iconAddNew} alt={"-----"} className={"h-[24px] w-[24px]"}/>
					</button> : <></>
					}
					
					{/* <button className={"ml-6"}>
						<img src={downloadIcon} alt={"-----"} className={"h-[24px] w-[24px]"}/>
					</button> */}
				</div>

				{/* <div className={"table-folder-project"}>
					<table className={"table-fixed w-full border-collapse"}>
						<thead className={"sticky top-0"}>
							<tr>
								<th className={"w-1/3 border-b-0.5 border-primary-border px-4 py-2 text-left text-primary-gray font-normal"}>
									Tên
								</th>
								<th className={"w-1/4 border-b-0.5 border-primary-border px-4 py-2 text-left text-primary-gray font-normal"}>
									Người tạo
								</th>
								<th className={"w-1/4 border-b-0.5 border-primary-border px-4 py-2 text-left text-primary-gray font-normal"}>
									Cập nhật lần cuối
								</th>
								<th className={"border-b-0.5 border-primary-border px-4 py-2 text-left text-primary-gray font-normal"}>
									Thành viên
								</th>
							</tr>
						</thead>
						<tbody>
						{
							[...Array(4)].map((e,i) => (
								<tr key={i}>
									<td className={"px-4 py-2 border-b-0.5 border-primary-border align-middle"}>
										<Link to={`/pm/project/60a8cb540400462461cbff9f/folder/624bcf04c9e6180a5570fbfa`}>
											<div className={"flex items-center"}>
												<FolderIcon type="folder" />
												<p className={"ml-4"}>Báo cáo tổng hợp giai đoạn</p>
											</div>
										</Link>
									</td>
									<td className={"px-4 py-2 border-b-0.5 border-primary-border align-middle"}>
										<div className={"flex items-center"}>
											<img src={userAvt} alt={"-----"} className={"w-[24px] h-[24px] min-w-[24px] min-h-[24] max-w-[24px] max-h-[24px] rounded-full overflow-hidden"}/>
											<p className={"ml-4"}>Nguyễn Phan Thanh Hương-CPMI</p>
										</div>
									</td>
									<td className={"px-4 py-2 border-b-0.5 border-primary-border text-primary-gray align-middle"}>
										15:30 22/12/2012 (2 day ago)
									</td>
									<td className={"px-4 py-2 border-b-0.5 border-primary-border text-primary-gray align-middle"}>
										122
									</td>
								</tr>
							))
						}
						</tbody>
					</table>
				</div> */}

				<div className="flex-1 overflow-y-auto">
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full border-collapse	" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-cbs-border">
										Nội dung
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-cbs-border">

									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "175px" }}>
									<span className="pl-2 border-cbs-border">

									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-cbs-border">

									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-cbs-border">

									</span>
								</th>
							</tr>
						</thead>

						<tbody className="">
							{
								listPcmPlanGroup.map((props: any, index: any) => {
									let isGroupDefault = false;
									if (dataUserInfo?.data?.groupDefault?.toString() == props._id?.toString()) {
										isGroupDefault = true;
									}
									return (
										<tr key={props._id} className="text-left hover:bg-cbs-active-comment cursor-pointer border-b-0.5 border-cbs-border">
											<td className="px-2 py-2 border-b-0.5 border-cbs-border">
												<Link to={`/pm/project/${projectID}/folder/${props._id}`} className="align-top">
													<FolderIcon type="folder" />
													{props.name} {isGroupDefault && <img src={GroupDefaultIcon} alt="file" className="inline-block mr-3" title="Group default" />}
												</Link>
											</td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border"></td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border"></td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border text-cbs-primary"></td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border">
												<div className="flex">
													{props.members.map((member: any, index1: any) => {
														if (index1 < 5) {
															return <img src={`${process.env.REACT_APP_URL_S3_USER}/${member?.image}`} key={index1} alt="" className="w-6 h-6 rounded-full" />
														}
														if (index1 == 5) {
															return <div key={index1} className="h-6 w-6 rounded-full -ml-1.5 bg-cbs-border text-white flex justify-center items-center" style={{ fontSize: "10px" }}>+{props.members.length - 5}</div>
														}
													})}
												</div>
											</td>
										</tr>
									)
								})
							}

							{/* Danh sách task */}
							{
								listTasks.map(props => {
									const percent = ((props.amountFinishedChecklist / props.amountChecklist) || 0) * 100;
									return (
										<tr key={props._id} className="text-left hover:bg-cbs-active-comment cursor-pointer border-b-0.5 border-cbs-border">
											<td className="px-2 py-2 border-b-0.5 border-cbs-border">
												<Link to={`/pcm/detail/${props._id}`} className="align-top">
													<FolderIcon type="file" />
													{props.name}
												</Link>
											</td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border">{moment(props.actualFinishTime).format('L')}</td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border">
												<div>
													<img src={`${process.env.REACT_APP_URL_S3_USER}/${props.assignee?.image}`} alt="" className="w-6 h-6 rounded-full inline-block mr-3" />
													{props.assignee?.bizfullname}
												</div>
											</td>
											<td className="py-2 px-2 text-cbs-primary border-b-0.5 border-cbs-border">{props.status && PCM_STATUS_TASK[props.status - 1].text}</td>
											<td className="py-2 px-2 border-b-0.5 border-cbs-border">
												<div className="pr-4">
													<p className="text-right">{props.amountChecklist}/{props.amountFinishedChecklist}</p>
													<div className="rounded border-0.5 border-cbs-border h-1 box-content mt-1">
														<div className="h-full bg-cbs-schedule-after-7days" style={{ width: `${percent}%` }}></div>
													</div>
												</div>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
					{hasNextPage && (
						<div className="w-full flex justify-center my-5">
							<button onClick={fetchNextPage}>
								<span className="text-primary">
									{`Xem thêm (${totalRecord - listPcmPlanGroup.length})`}
								</span>
							</button>
						</div>
					)}
				</div>

				{/* <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" /> */}
			</div>
		</>
	);
};

export default ProjectFolderPage;