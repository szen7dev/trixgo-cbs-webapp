import { FC, useEffect, useState } from "react";
import { APP_ID } from "apis/localdb";
import { useGetListAppRoleMenuFromAdmin, useAdmin } from "services/hooks/auth/useAdmin";
import { useAdminDetail } from "services/hooks/auth/useAdmin";
import { useGetListAppMenu, useGetListAppRoleMenu, useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useLocation, useHistory } from "react-router-dom";
import { DropdownSearchable } from "shareComponents/common";
import { toast } from "react-toastify";

const AdminAuthorTab: FC = () => {
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.ITEM.id });
	const location = useLocation<string | null>();
	const [funcID, setFuncID] = useState<string>(location.state || "");
	const { nameAppRoleDetail, companyAppRoleDetail, typeAppRoleDetail } = useAdminDetail({ appID: funcID, keyword: "" });
	const { listAppMenu } = useGetListAppMenu({ appID: APP_ID.ITEM.id, parentID: typeAppRoleDetail == "1" ? APP_ID.ITEM.menuItemApp.id : APP_ID.ITEM.menuItemApp.id });
	const { listAppRoles } = useAdmin({ appID: APP_ID.ITEM.id, keyword: "" });
	const { refetchGetListAppRoleMenu } = useGetListAppRoleMenu({ appID: APP_ID.ITEM.id, type: typeAppRoleDetail });

	const { listAppRoleMenuFromAdmin, updatePermissionsAppRoleMenusMutateAsync, refetchGetListAppRoleMenuFromAdmin } = useGetListAppRoleMenuFromAdmin({ appID: APP_ID.ITEM.id, companyID: companyAppRoleDetail, roleID: funcID });

	const data = listAppRoles.map(e => ({
		_id: e._id,
		content: e.name
	}));

	const getStateCheckedPermissions = (type: 'read' | 'create' | 'update' | 'delete', id: string) => {
		const findItem = listAppRoleMenuFromAdmin.find((e: any) => e.menu == id);
		if (findItem) {
			switch (type) {
				case 'read':
					if (findItem.read == 1) return true;
					break;
				case 'create':
					if (findItem.create == 1) return true;
					break;
				case 'update':
					if (findItem.update == 1) return true;
					break;
				case 'delete':
					if (findItem.delete == 1) return true;
					break;
			}
		};
		return false;
	};

	const onUpdatePermissions = async (type: 'read' | 'create' | 'update' | 'delete', _id: string) => {
		// Khởi tạo dữ liệu default 
		let query = {
			read: type == 'read' ? 1 : 0,
			create: type == 'create' ? 1 : 0,
			update: type == 'update' ? 1 : 0,
			deleteIn: type == 'delete' ? 1 : 0,
		};

		// Tìm data item đã được lưu trên database
		const findItem = listAppRoleMenuFromAdmin.find((e: any) => e.menu == _id);
		if (findItem) {
			query = {
				read: type == 'read' ? findItem.read > 0 ? 0 : 1 : findItem.read || 0,
				create: type == 'create' ? findItem.create > 0 ? 0 : 1 : findItem.create || 0,
				update: type == 'update' ? findItem.update > 0 ? 0 : 1 : findItem.update || 0,
				deleteIn: type == 'delete' ? findItem.deleteIn > 0 ? 0 : 1 : findItem.deleteIn || 0,
			}
		}

		await updatePermissionsAppRoleMenusMutateAsync({
			...query,
			role: funcID,
			menu: _id,
		});

		refetchGetListAppRoleMenu();
		refetchGetListAppRoleMenuFromAdmin();
	}

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	return (
		<main className="h-full overflow-auto">
			<header className="h-[50px] border border-primary-border flex items-center justify-between pl-6 pr-5">
				<p className="text-lg">{funcID ? nameAppRoleDetail : "Chọn nhóm chức năng"}</p>

				<DropdownSearchable
					className="w-[322px] pl-5 bg-cbs-table-header"
					classNameInput="h-[28px] bg-cbs-table-header"
					isMultiple={false}
					allowClearValueSingleInput={false}
					showTriangle={true}
					placeholder={nameAppRoleDetail || "Lựa chọn"}
					maxWidthInput="max-w-none"
					renderSelectedItem={(item: any) => <span>{item.text}</span>}
					classNameItem="p-0"
					data={data}
					formatItem={{
						id: "_id",
						text: "content",
					}}
					inlineSearch={false}
					disableSearch={true}
					searchInputClassName="h-[40px] w-[322px] px-[46px]"
					onchangeValue={(item) =>
						setFuncID(item._id)
					}
				/>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="w-2/6 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Chức năng
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Xem
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Thêm
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Sửa
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">Xóa</div>
						</th>
					</tr>
				</thead>

				{funcID ?
					<tbody className="bg-primary-light text-left">
						{listAppMenu.map((item, index) => (
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="p-2">{item?.name}</td>
								<td className="p-2">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										checked={getStateCheckedPermissions('read', item?._id)}
										onChange={() => onUpdatePermissions('read', item?._id)}
									/>
								</td>
								<td className="p-2">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										checked={getStateCheckedPermissions('create', item?._id)}
										onChange={() => onUpdatePermissions('create', item?._id)}
									/>
								</td>
								<td className="p-2">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										checked={getStateCheckedPermissions('update', item?._id)}
										onChange={() => onUpdatePermissions('update', item?._id)}
									/>
								</td>
								<td className="p-2">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										checked={getStateCheckedPermissions('delete', item?._id)}
										onChange={() => onUpdatePermissions('delete', item?._id)}
									/>
								</td>
							</tr>
						))}
					</tbody> : <></>
				}
			</table>
		</main>
	);
};

export default AdminAuthorTab;