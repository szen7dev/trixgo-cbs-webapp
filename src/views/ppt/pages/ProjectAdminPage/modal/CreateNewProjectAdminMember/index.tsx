import { FC, useState, useCallback } from "react";

import { useModal } from "services/hooks/useModal";
import CloseIcon from "assets/images/icon-small-bold-close.svg";
import SearchIcon from "assets/images/icons8-search.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import MemberIcon from "assets/images/member-icon.svg";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import { useGetUsersBySystem } from "services/hooks/auth/useAdmin";
import { DepartmentRepositories } from "apis/item/department";

const CreateNewProjectAdminMember: FC<any> = ({ appRoleID, companyID, refetchGetListAppRoleMenu }) => {
	const { closeModal } = useModal();
	const [keyword, setKeyword] = useState("");

	const { listMembers, nextPageGetUsersBySystem, hasnextPageGetUsersBySystem, totalRecord } = useGetUsersBySystem(companyID, keyword);

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
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
			const idsAll = listMembers.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const onAdd = async () => {
		if (!idsChecked || !idsChecked.length) return;
		const response = await DepartmentRepositories.addOrRemoveMemberToDepartment({ departmentID: appRoleID, members: idsChecked })
		if (response.error === false) {
			toast.success('Thêm thành công');
			refetchGetListAppRoleMenu();
		} else {
			toast.error('Thêm thất bại');
		}
		closeModal();
	};

	return (
		<main className="py-[18px]">
			<header className="flex item-center justify-between px-[30px]">
				<p className="text-xl">Thêm thành viên</p>
				<div
					className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center cursor-pointer"
					onClick={() => closeModal()}
				>
					<img src={CloseIcon} alt="Close" className="w-3 h-3" />
				</div>
			</header>

			<section className="mt-4">
				<div className="relative mx-7">
					<input
						type="text"
						className="h-10 w-full bg-cbs-table-header border border-primary-border outline-none px-8"
						placeholder="Nhập từ khóa tìm kiếm"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
					<img
						src={SearchIcon}
						alt="Search"
						className="w-4 h-4 absolute top-3 left-2"
					/>
				</div>

				<div className="flex items-center mt-4 px-7">
					<input
						className="cbs-checkbox mr-2"
						type="checkbox"
						value=""
						id="flexCheckDefault"
						checked={getStateCheckedAll()}
						onChange={() => onClickCheckAll()}
					/>
					<img src={PolygonIcon} alt="Polygon" />
				</div>
				<div className="flex flex-col gap-2 mt-4 h-[420px] overflow-auto px-7">
					{listMembers.map((item: any, index: number) => (
						<div key={index} className="flex items-center">
							<input
								className="form-check-input mr-9"
								type="checkbox"
								value=""
								id="flexCheckDefault"
								checked={getStateChecked(item._id)}
								onChange={() => onClickCheckButton(item._id)}
							/>

							<div className="flex items-center">
								<img
									src={item.image ? `${process.env.REACT_APP_URL_S3_USER}/${item.image}` : MemberIcon}
									alt="Member"
									className="w-10 h-10 rounded-full"
								/>
								<p className="px-4">{item.bizfullname}</p>
							</div>
						</div>
					))
					}
					{hasnextPageGetUsersBySystem && (
						<div className="w-full flex justify-center my-5">
							<button onClick={() => nextPageGetUsersBySystem()}>
								<span className="text-primary">{`Xem thêm`}</span>
							</button>
						</div>
					)}
				</div>
			</section>

			<footer className="pb-6 w-full text-right px-[30px]">
				<button className="w-[95px] h-8 bg-primary text-primary-light rounded font-bold hover:opacity-90"
					onClick={() => onAdd()}
				>
					Xác nhận
				</button>
			</footer>
		</main>
	);
};

export default CreateNewProjectAdminMember;
