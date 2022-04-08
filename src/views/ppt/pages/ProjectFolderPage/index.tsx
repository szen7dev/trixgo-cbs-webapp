import { FC, useEffect, useState } from "react";
import { RouteComponentProps, useHistory, useLocation, useParams, Link } from "react-router-dom";

import { Paginate } from "shareComponents/common";
import { PCM_STATUS_TASK } from 'apis/localdb';

import iconFile from 'assets/images/icons8-audit-96.png';
import '../../style.css';
// HOOK
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import { useTask } from "services/hooks/useTask";
import moment from "moment";
 
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
			return <img src={iconFile} alt="file" className="inline-block mr-3" />;
		default:
			return (
				<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline text-cbs-subtext mr-3" viewBox="0 0 20 20" fill="currentColor">
					<path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
				</svg>
			);
	}
}

function getStatusLabel(status: number) {
	switch (status) {
		case 1:
			return 'Đang thực hiện'
		default:
			return 'Lỗi';
	}
}

const ProjectFolderPage: FC<RouteComponentProps> = ({ match }) => {
	const history 	= useHistory();
	const location 	= useLocation();
	const [data, setData] = useState<IData[]>([]);
	// ID của dự án
	const { id: projectID, groupID } = useParams<{ id: string, groupID: string }>();
	// Call hook lấy thông tin project
	const { infoDepartment } = usePcmProject({ departmentID: projectID });
	const { assigned, checkboxRef, handleCheckAll, handleChangeCheckbox } = useCheckedList(data);
	const {  
		isLoading,
        refetch,
        data: listPcmPlanGroup,
        fetchNextPage,
        hasNextPage,
        totalRecord,
        totalPage,
        // refetchInfoGroup
	} = usePcmPlanGroup({ 
		projectID, 
		parentID: groupID,
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
			path: "parent", 
			select: "parent sign",
			populate: {
				path: "parent", 
				select: "parent sign"
			}
		})
	}, false, true);

	const { listTasks } = useTask({
		params: {
			groupID
		},
		isFetch: !!groupID
	})

	useEffect(() => {
		document.title = `${infoDepartment?.data?.sign}-Thư mục dữ liệu`;
	}, [location?.pathname]);

	useEffect(() => {
		refetchInfoGroup()
	}, [groupID]);

	return (
		<>
			{/* Content */}
			<div className="flex flex-col h-full overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black text-small py-1">
					<span className="">{infoDepartment?.data?.sign}</span>
					{/* <button className="bg-cbs-active-comment text-cbs-primary h-10 w-10 text-center rounded-full">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
						</svg>
					</button> */}
					{/* <IconArrowRight /> */}
					{ infoGroup?.data?.sign && <IconArrowRight /> }
					<Link to={`/pcm/project/${projectID}/folder/${ infoGroup?.data?._id}`}  className="align-top">
						<span className="truncate max-w-[132px]">{infoGroup?.data?.sign}</span>
					</Link>

					{ infoGroup?.data?.parent?.sign && <IconArrowRight /> }
					<Link to={`/pcm/project/${projectID}/folder/${ infoGroup?.data?.parent?._id}`}  className="align-top">
						<span className="truncate max-w-[132px]">{infoGroup?.data?.parent?.sign}</span>
					</Link>

					{ infoGroup?.data?.parent?.parent?.sign && <IconArrowRight /> }
					<Link to={`/pcm/project/${projectID}/folder/${ infoGroup?.data?.parent?.parent?._id}`}  className="align-top">
						<span className="truncate max-w-[132px]">{infoGroup?.data?.parent?.parent?.sign}</span>
					</Link>
				</div>
				<div className="flex-1 overflow-y-auto">
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
								<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<input className="cbs-checkbox" type="checkbox" value="checkAll" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Nội dung
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Thời hạn
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Thực hiện
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Trạng thái
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-l border-cbs-border">
										Người được truy cập
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="">
							{
								listPcmPlanGroup.map((props: any, index: any) => {
									return (
										<tr key={props._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
											<td className="px-4 py-2 w-[1px]">
												<input className="cbs-checkbox" type="checkbox" value={props._id} checked={Boolean(assigned[props._id])} onChange={e => handleChangeCheckbox(e, props)} />
											</td>
											<td className="px-2 py-2">
												<Link to={`/pcm/project/${projectID}/folder/${props._id}`} className="align-top">
													<FolderIcon type="folder" />
													{props.name}
												</Link>
											</td>
											<td className="py-2 px-2"></td>
											<td className="py-2 px-2"></td>
											<td className="py-2 px-2 text-cbs-primary"></td>
											<td className="py-2 px-2">
												<div className="flex">
													{props.members.map((member: any, index1: any) => {
														if(index1 < 5){
															return <img src={`${process.env.REACT_APP_URL_S3_USER}/${member?.image}`} key={index1} alt="" className="w-6 h-6 rounded-full" />
														}
														if(index1 == 5){
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
									const percent =  ((props.amountFinishedChecklist / props.amountChecklist) || 0) * 100;

									return (
										<tr key={props._id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
											<td className="px-4 py-2 w-[1px]">
												<input className="cbs-checkbox" type="checkbox" />
											</td>
											<td className="px-2 py-2">
												<Link to={`/pcm/detail/${props._id}`}  className="align-top">
													<FolderIcon type="file" />
													{props.name}
												</Link>
											</td>
											<td className="py-2 px-2">{moment(props.actualFinishTime).format('L')}</td>
											<td className="py-2 px-2">
												<div>
													<img src={`${process.env.REACT_APP_URL_S3_USER}/${props.assignee?.image}`} alt="" className="w-6 h-6 rounded-full inline-block mr-3" />
													{props.assignee?.bizfullname}
												</div>
											</td>
											<td className="py-2 px-2 text-cbs-primary">{props.status && PCM_STATUS_TASK[props.status - 1].text}</td>
											<td className="py-2 px-2">
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
				</div>

				{hasNextPage && (
					<button
						className="text-primary text-[13px]"
						onClick={fetchNextPage}
					>
						{`Xem thêm (${
							Number(totalRecord) - listPcmPlanGroup.length
						})`}
					</button>
				)}
				{/* <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" /> */}
			</div>
		</>
	);
};

export default ProjectFolderPage;
