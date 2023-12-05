import { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import debounce from "lodash/debounce";
import { SearchInput, ModalContainer } from "shareComponents/common";

// import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
// import FolderIcon from "assets/images/icons8-folder.svg";
import DownloadIcon from "assets/images/icons8-download-64.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";

import moment from "moment";
import { toast } from "react-toastify";
import { APP_ID, DEPARTMENT_STATUS } from "apis/localdb";
import { CreateProject } from "../modal";

import { usePcmProject } from "services/hooks/pcm/usePcmProject";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

const ProjectAdminProjectTab: FC = () => {
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const {
		listPcmProject,
		totalRecord,
		nextPagePcmProject,
		hasNextPagePcmProject,
		refetchPcmProject
	} = usePcmProject({ keyword: keyword });

	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listPcmProject.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listPcmProject.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listPcmProject.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const [modalCreateProject, setModalCreateProject] = useState<boolean>(false);
	const toggleModalCreateProject = () => setModalCreateProject(!modalCreateProject);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateProject = () => refetchPcmProject();

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Danh sách</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>

					{(idsChecked && idsChecked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div>
							{idsChecked.length == 1 ?
								<>
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() => {
										const item = listPcmProject.find((e: any) => e._id == idsChecked[0]);
										setInitialValues({
											...item,
											startTime: item.startTime ? moment(item.startTime).format('MM/DD/YYYY') : '',
											expiredTime: item.expiredTime ? moment(item.expiredTime).format('MM/DD/YYYY') : '',
										});
										toggleModalCreateProject();
									}}
								>
									<img src={PencilIcon} alt="Pencil" />
								</div>
							</> : <></>
							}
						</div>
					) : <></>}
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
						onClick={() => {
							setInitialValues(null);
							toggleModalCreateProject();
						}}
					>
						Tạo mới
					</button>
				</div>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							<div className="border-r-2 border-gray-300 flex items-center justify-center">
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
							</div>
						</th>
						<th className="pb-1 pt-1 w-[250px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tên
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Phân loại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-[150px]">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Mã hiệu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Ngày bắt đầu
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Ngày kết thúc
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tổng số mốc
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Số mốc hoàn thành
							</div>
						</th>

						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giai đoạn
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Thành viên
							</div>
						</th>

					</tr>
				</thead>

				{listPcmProject && listPcmProject.length ?
					<tbody className="bg-primary-light text-left">
						{listPcmProject.map((item: any, index: string) => (
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										checked={getStateChecked(item._id)}
										onChange={() => onClickCheckButton(item._id)}
									/>
								</td>
								<td className="py-1 px-2">
									<Link to={`/pcm/admin/${item._id}/project`}>
										<div className="">
											<p>{item.name}</p>
										</div>
									</Link>
									<p className="text-primary-gray"><i>{item._id}</i></p>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.type}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.sign}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.startTime ? moment(item.startTime).format('DD/MM/YYYY') : ''}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.expiredTime ? moment(item.expiredTime).format('DD/MM/YYYY') : ''}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.milestones}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.completedMilestones}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{(item.status && item.status >= 1) ? DEPARTMENT_STATUS[Number(item.status) - 1].text : ""}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.members ? item.members.length : ""}
								</td>
							</tr>
						))
						}
					</tbody> : <></>
				}

			</table>
			{hasNextPagePcmProject && (
				<div className="w-full flex justify-center my-5">
					<button onClick={() => nextPagePcmProject()}>
						<span className="text-primary">{`Xem thêm (${totalRecord - listPcmProject.length
							})`}</span>
					</button>
				</div>
			)}

			<ModalContainer isModalOpen={modalCreateProject} toggle={toggleModalCreateProject}>
				<div className="inline-flex flex-col text-black w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light rounded-xl">
					<CreateProject
						modalType={initialValues ? "update" : "create"}
						show={modalCreateProject}
						toggle={toggleModalCreateProject}
						initialValues={initialValues ? initialValues : undefined}
						onConfirm={onConfirmCreateProject}
					/>
				</div>
			</ModalContainer>

		</main>
	);
};

export default ProjectAdminProjectTab;