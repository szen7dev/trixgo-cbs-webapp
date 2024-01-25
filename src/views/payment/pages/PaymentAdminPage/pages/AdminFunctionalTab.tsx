import { FC, useCallback, useState, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import debounce from "lodash/debounce";
import { SearchInput } from "shareComponents/common";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import DownloadIcon from "assets/images/icons8-download-64.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import { Create, Update, Delete } from "../modal";
import { useAdmin } from "services/hooks/auth/useAdmin";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { APP_ID } from "apis/localdb";
import moment from "moment";
import { toast } from "react-toastify";

const AdminFunctionalTab: FC = () => {
	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PAYMENT.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const { listAppRoles, totalRecord, nextPageListAppRoles, hasNextPageListAppRoles } = useAdmin({ appID: APP_ID.PAYMENT.id, keyword: keyword });
	const { openModal } = useModal();
	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		const check = idsChecked.includes(id);
		if (check) {
			const newList = [...idsChecked];
			newList.splice(newList.findIndex((e: any) => e == id), 1);
			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked];
			newList.push(id);
			setIdsChecked(newList);
		};
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listAppRoles.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listAppRoles.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listAppRoles.map(e => e._id);
			setIdsChecked(idsAll);
		}
	};

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	console.log(listAppRoles)

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
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() =>
										openModal(
											<div
												className={
													"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
												}
											>
												<Update item={listAppRoles.find(e => e._id == idsChecked[0])} setIdsChecked={setIdsChecked} />
											</div>
										)
									}
								>
									<img src={PencilIcon} alt="Pencil" />
								</div> : <></>
							}
							<div
								className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
								onClick={() =>
									openModal(
										<div
											className={
												"inline-block w-[521px] h-[185px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
											}
										>
											<Delete idsChecked={idsChecked} setIdsChecked={setIdsChecked} />
										</div>
									)
								}
							>
								<img src={TrashIcon} alt="Trash" />
							</div>
						</div>
					) : <></>}
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
						onClick={() =>
							openModal(
								<div
									className={
										"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
									}
								>
									<Create />
								</div>
							)
						}
					>
						Tạo mới
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
									className="form-check-input"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
							</div>
						</th>
						<th className="w-1/4 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Nội dung
							</div>
						</th>
						<th className="w-1/4 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Loại
							</div>
						</th>
						<th className="w-1/4 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Người tạo
							</div>
						</th>
						<th className="w-1/4 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">Cập nhật lần cuối</div>
						</th>
					</tr>
				</thead>

				{listAppRoles && listAppRoles.length ?
					<tbody className="bg-primary-light text-left">
						{listAppRoles.map((item, index) => (
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										id="flexCheckDefault"
										checked={getStateChecked(item._id)}
										onChange={() => onClickCheckButton(item._id)}
									/>
								</td>
								<td className="py-1 px-2">
									<Link to={`/payment/admin/${item._id}/detail`}>
										<div className="flex items-center">
											<img src={FolderIcon} alt="Folder" className="w-6 h-6 mr-2" />
											<p>{item.name}</p>
										</div>
									</Link>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.type}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.userCreate?.bizfullname}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{moment(item.modifyAt).format("HH:mm DD/MM/YYYY")} {item.userUpdate?.bizfullname}
								</td>
							</tr>
						))
						}
					</tbody> : <></>
				}

			</table>
			{hasNextPageListAppRoles && (
				<div className="w-full flex justify-center my-5">
					<button onClick={() => nextPageListAppRoles()}>
						<span className="text-primary">{`Xem thêm (${totalRecord - listAppRoles.length
							})`}</span>
					</button>
				</div>
			)}
		</main>
	);
};

export default AdminFunctionalTab;
