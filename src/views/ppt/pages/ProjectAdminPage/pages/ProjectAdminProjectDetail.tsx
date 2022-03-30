import { FC, useCallback, useEffect } from "react";

import { useModal } from "services/hooks/useModal";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { SearchInput } from "shareComponents/common";
import debounce from "lodash/debounce";
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import MemberIcon from "assets/images/member-icon.svg";

import { CreateNewProjectAdminMember, DeleteProjectMembers } from "../modal";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import { DepartmentRepositories } from "apis/item/department";
import { ResponseData } from "typings/apis/response";
import { Department } from "typings/items";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";

const ProjectAdminProjectDetail: FC = () => {
	const history = useHistory();
	const { hasPermission, dataUserAccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	// ID của dự án
	const { id } = useParams<{ id: string }>();
	// const [keyword, setKeyword] = useState("");
	const { data, refetch } = useQuery(
		['get_list_app_role_menu', id],
		() => DepartmentRepositories.getInfoDepartment({
			departmentID: id,
			// keyword,
			select: 'name sign description members admins company',
			populates: JSON.stringify({
				path: 'members',
				select: 'name image bizfullname email',
			})
		}),
		{ refetchOnMount: false, refetchOnWindowFocus: false });
	const queryClient = useQueryClient();

	const { assigned, checked, checkboxRef, handleChangeCheckbox, handleCheckAll } = useCheckedList((data?.data.members || []) as any[]);
	const { openModal } = useModal();

	const handleCheck = useCallback(async (e: React.ChangeEvent<HTMLInputElement>, id: string, type: string) => {
		const _data = queryClient.getQueryData<ResponseData<Department.Department>>(['get_list_app_role_menu', data?.data._id]);
		if (!_data || !data) return;
		const body = {
			departmentID: data.data._id,
			admins: undefined as undefined | string[],
			members: undefined as undefined | string[],
			adminsRemove: undefined as undefined | string[],
			membersRemove: undefined as undefined | string[],
		}
		switch (type) {
			case 'admin':
				if (e.target.checked) {
					_data.data.admins.push(id);
					body.admins = [id];
				}
				else {
					_data.data.admins = _data.data.admins.filter(item => item !== id);
					body.adminsRemove = [id];
				}
				break;
			case 'user':

				break;
			default:
				break;
		}
		// Thêm admin
		const response = await DepartmentRepositories.addOrRemoveMemberToDepartment(body)
		if (response.error === false) {
			// Thành công 
			toast.success('Cập nhật thành công');
			queryClient.setQueryData(['get_list_app_role_menu', data.data._id], _data);
		} else {
			// Thất bại
			toast.error('Cập nhật thất bại');
		}
	}, [data?.data._id])

	useEffect(() => {
		if (!(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg truncate max-w-xs">{data?.data.name}</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => {
								// setKeyword(event.target.value);
							},
							500
						)}
					/>
					{/* <FinancialCashFlowFilterButton /> */}
					{(checked && checked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div>
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
								onClick={() =>
									openModal(
										<div
											className={
												"inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
											}
										>
											<DeleteProjectMembers appID={data?.data._id} idsChecked={checked.map(d => d._id)} setIdsChecked={() => null} refetchGetListAppRoleMenu={refetch} />
										</div>
									)
								}>
								<img src={TrashIcon} alt="Trash" />
							</div>
						</div>
					) : <></>}
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[120px] h-8 rounded font-bold mr-6"
						onClick={() =>
							openModal(
								<div
									className={
										"inline-block w-[600px] h-[630px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded-lg"
									}
								>
									<CreateNewProjectAdminMember appRoleID={id} companyID={data?.data.company} refetchGetListAppRoleMenu={refetch} />
								</div>
							)
						}
					>
						Thêm thành viên
					</button>
					<button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button>
				</div>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							<div className="border-r-2 border-gray-300 flex items-center justify-center">
								<input
									className="cbs-checkbox mr-2"
									type="checkbox"
									value=""
									id="flexCheckDefault"
									ref={checkboxRef}
									onClick={handleCheckAll}
								/>
								<img src={PolygonIcon} alt="Polygon" />
							</div>
						</th>
						<th className="w-1/5 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tài khoản
							</div>
						</th>
						<th className="w-1/5 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Email
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Admin
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Member
							</div>
						</th>
						<th className="w-1/12 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">Hành động</div>
						</th>
					</tr>
				</thead>
				<tbody className="bg-primary-light">
					{/* Cần sửa typescript  */}
					{data?.data.members && (data.data.members as any[]).map((member, index) =>
						<tr key={member._id} className="border-b border-primary-border h-10">
							<td className="py-1 px-2 text-center">
								<input
									className="cbs-checkbox"
									type="checkbox"
									value=""
									id={member._id}
									style={{ marginLeft: "-23px" }}
									checked={Boolean(assigned[member._id])}
									onChange={e => handleChangeCheckbox(e, member)}
								/>
							</td>
							<td className="py-1 px-2">
								<div className="flex items-center">
									<img
										src={member.image ? `${process.env.REACT_APP_URL_S3_USER}/${member.image}` : MemberIcon}
										alt="Member"
										className="w-6 h-6 rounded-full"
									/>
									<p className="px-1">{member.bizfullname}</p>
								</div>
							</td>
							<td className="py-1 px-2">
								{member.email}
							</td>
							<td className="py-1 px-2">
								<input
									className="cbs-checkbox"
									type="checkbox"
									checked={data.data.admins.includes(member._id) ? true : false}
									onChange={e => handleCheck(e, member._id, 'admin')}
								/>
							</td>
							<td className="py-1 px-2">
								<input
									className="cbs-checkbox"
									type="checkbox"
								// checked={false}
								/>
							</td>
							<td className="py-1 px-2 text-negative">
								<button
									onClick={() =>
										openModal(
											<div
												className={
													"inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
												}
											>
												<DeleteProjectMembers appID={data?.data._id} idsChecked={[member._id]} setIdsChecked={() => null} refetchGetListAppRoleMenu={refetch} />
											</div>
										)
									}>
									Xoá bỏ
								</button>
							</td>
						</tr>)
					}
				</tbody>
			</table>
		</main>
	);
};

export default ProjectAdminProjectDetail;
