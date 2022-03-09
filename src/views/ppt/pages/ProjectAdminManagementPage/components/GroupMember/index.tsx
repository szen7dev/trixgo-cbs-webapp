import { FC, useState, useCallback } from "react";

import { useModal } from "services/hooks/useModal";
import { useParams, useHistory } from "react-router-dom";
import { SearchInput } from "shareComponents/common";
import debounce from "lodash/debounce";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import MemberIcon from "assets/images/member-icon.svg";
import { useGetListAppRoleMenu } from "services/hooks/useAuth";
import { CreateNewAdminMember, DeleteMembers } from "../../modal";
import { usePcmAdminDetail } from "services/hooks/pcm/usePcmAdminDetail";
import { APP_ID } from "apis/localdb";

const GroupMember: FC = () => {
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	const [idsChecked, setIdsChecked] = useState<string[]>([]);
	const [keyword, setKeyword] = useState("");
	const { openModal } = useModal();

	const listMembers = [
		{
			_id: "1",
			bizfullname: 'Vũ Huỳnh Minh-TRX',
			email: 'vuhuynhminh9221@gmail.com',
			level: 0,
			image: ''
		}
	]

	const { listMembers: list, companyAppRoleDetail } = usePcmAdminDetail({ 
		appID: id, keyword: keyword 
	});

	const { refetchGetListAppRoleMenu } = useGetListAppRoleMenu({ 
		appID: APP_ID.PCM.id, type: "1" 
	});

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
		return idsChecked.length == listMembers.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listMembers.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listMembers.map(e => e._id);
			setIdsChecked(idsAll);
		}
	};

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack}>
						<img src="/images/common/button_back.png" alt="Button Back" />
					</button>
					<p className="text-lg ml-4">Nhóm dữ liệu 1</p>
					{/* <SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value), 500
						)}
					/> */}
					{(idsChecked && idsChecked.length) ? (
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
											<DeleteMembers appID={id} idsChecked={idsChecked} setIdsChecked={setIdsChecked} refetchGetListAppRoleMenu={refetchGetListAppRoleMenu}/>
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
									<CreateNewAdminMember appRoleID={id} companyID={companyAppRoleDetail} refetchGetListAppRoleMenu={refetchGetListAppRoleMenu}/>
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
									className="form-check-input mr-2"
									type="checkbox"
									value=""
									id="flexCheckDefault"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
								<img src={PolygonIcon} alt="Polygon" />
							</div>
						</th>
						<th className="w-1/5 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Tên
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
				{listMembers && listMembers.length ?
					<tbody className="bg-primary-light">
						{listMembers.map((item, index) =>
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										style={{ marginLeft: "-23px" }}
										checked={getStateChecked(item._id)}
										onChange={() => onClickCheckButton(item._id)}
									/>
								</td>
								<td className="py-1 px-2">
									<div className="flex items-center">
										<img
											src={item.image ? `${process.env.REACT_APP_URL_S3_USER}/${item.image}` : MemberIcon}
											alt="Member"
											className="w-6 h-6 rounded-full"
										/>
										<p className="px-1">{item.bizfullname}</p>
									</div>
								</td>
								<td className="py-1 px-2">
									{item.email}
								</td>
								<td className="p-2">
									<input 
										type="radio" 
										name={`userAppLevel_${item._id}`} 
										value={0}
										defaultChecked={item.level === 0}
									/>
								</td>
								<td className="p-2">
									<input 
										type="radio" 
										name={`userAppLevel_${item._id}`} 
										value={1}
										defaultChecked={item.level === 1}
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
													<DeleteMembers appID={id} idsChecked={[item._id]} setIdsChecked={setIdsChecked} refetchGetListAppRoleMenu={refetchGetListAppRoleMenu} />
												</div>
											)
										}>
										Xoá bỏ
									</button>
								</td>
							</tr>)
						}
					</tbody> : <></>
				}
			</table>
		</main>
	);
};

export default GroupMember;
