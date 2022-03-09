import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import CloseIcon from "assets/images/icon-small-bold-close.svg";
import SearchIcon from "assets/images/icons8-search.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import MemberIcon from "assets/images/member-icon.svg";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";
import useCheckedList from "services/hooks/ppt/useCheckedList";

import { useInfiniteQuery } from "react-query";
import { DepartmentRepositories } from "apis/item/department";
import { LinkUser } from "typings/auth";

// const CreateMemberGroup: FC<any> = ({ appRoleID, companyID, refetchGetListAppRoleMenu }) => {
const CreateMemberGroup: FC<any> = ({ projectID }) => {
	const { closeModal } = useModal();
	const [keyword, setKeyword] = useState("");

	// const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
	// 	['users_in_company_contract', keyword],
	// 	({ pageParam }) =>
	// 		// DepartmentRepositories.getListUserInCompanyContract({
	// 		// 	companyID,
	// 		// 	keyword,
	// 		// 	isLinkUser: 1,
	// 		// 	lastestID: pageParam,
	// 		// 	select: 'name',
	// 		// 	populates: JSON.stringify({ "path": " linkUser", "select": "fullname image" })
	// 		// }),
	// 	// {
	// 	// 	refetchOnMount: false,
	// 	// 	refetchOnWindowFocus: false,
	// 	// 	enabled: Boolean(companyID),
	// 	// 	keepPreviousData: true,
	// 	// 	getNextPageParam(data) {
	// 	// 		if (!data.data.nextCursor) return undefined;
	// 	// 		return data.data.nextCursor;
	// 	// 	},
	// 	// }
	// );

//   const records = data?.pages.flatMap(page => page.data.listRecords).filter(Boolean);
//  const { assigned, checkboxRef, checked, handleChangeCheckbox, handleCheckAll } = useCheckedList(records || []);
//   console.log({ records })

	// const handleAddUser = async () => {	
	// 	if (!checked.length) return;
	// 	const listUserID = checked.map(item => (item.linkUser as LinkUser)._id);
	// 	const response = await DepartmentRepositories.addOrRemoveMemberToDepartment({ departmentID: appRoleID, members: listUserID })
	// 	if (response.error === false) {
	// 		toast.success('Thêm thành công');
	// 		refetchGetListAppRoleMenu();
	// 	} else {
	// 		toast.error('Thêm thất bại');
	// 	}
	// 	closeModal();
	// }

	return (
		<main className="py-[18px]">
			<header className="flex item-center justify-between px-[30px]">
				<p className="text-xl">Thêm thành viên</p>
				<div
					className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center cursor-pointer"
					onClick={closeModal}
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
						// ref={checkboxRef}
						// onClick={handleCheckAll}
					/>
					<img src={PolygonIcon} alt="Polygon" />
				</div>
				<div className="flex flex-col gap-2 mt-4 h-[420px] overflow-auto px-7">
						<div key="1" className="flex items-center">
							<input
								className="cbs-checkbox mr-9"
								type="checkbox"
								value=""
								id="1"
								// checked={Boolean(assigned[item._id])}
								// onChange={(e) => handleChangeCheckbox(e, item)}
							/>

							<div className="flex items-center">
								<img
									src={MemberIcon}
									alt="Member"
									className="w-10 h-10 rounded-full"
								/>
								<p className="px-4">Phan Van De</p>
							</div>
						</div>
				</div> 

				{/* <div className="flex flex-col gap-2 mt-4 h-[420px] overflow-auto px-7">
					{data?.pages?.map((page) => (
						page?.data?.listRecords?.map((item, index) => (
							<div key={index} className="flex items-center">
								<input
									className="cbs-checkbox mr-9"
									type="checkbox"
									value=""
									id={item._id}
									checked={Boolean(assigned[item._id])}
									onChange={(e) => handleChangeCheckbox(e, item)}
								/>

								<div className="flex items-center">
									<img
										src={typeof item.linkUser !== 'string' ? `${process.env.REACT_APP_URL_S3_USER}/${item.linkUser.image}` : MemberIcon}
										alt="Member"
										className="w-10 h-10 rounded-full"
									/>
									<p className="px-4">{item.name}</p>
								</div>
							</div>
						))))
					}
					{hasNextPage && (
						<div className="w-full flex justify-center my-5">
							<button onClick={() => fetchNextPage()}>
								<span className="text-primary">{`Xem thêm`}</span>
							</button>
						</div>
					)}
				</div> */}
			</section>

			<footer className="pb-6 w-full text-right px-[30px]">
				<button className="w-[95px] h-8 bg-primary text-primary-light rounded font-bold hover:opacity-90"
					// onClick={handleAddUser}
				>
					Xác nhận
				</button>
			</footer>
		</main>
	);
};

export default CreateMemberGroup;
