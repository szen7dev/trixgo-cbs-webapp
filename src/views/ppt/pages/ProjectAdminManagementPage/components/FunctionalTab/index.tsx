import { FC, useCallback, useState } from "react";

import { Link, useParams, useHistory, useLocation } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import debounce from "lodash/debounce";
import { SearchInput } from "shareComponents/common";
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
// import iconArrowRight from "assets/images/icon-arrow-right.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import { Create, UpdateGroup, DeleteGroup } from "../../modal";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import moment from "moment";

// const IconArrowRight = () => (
// 	<div className="">
// 		<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// 			<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// 		</svg>
// 	</div>
// )

const FunctionalTab: FC = () => {
	const { id: projectID, itemID: groupID } = useParams<{ id: string, itemID: string }>();
	const { pathname } = useLocation();
	const history = useHistory();
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const [breadcrumb, setBreadcrumb] = useState<{ _id: string, name: string }[]>([]);

	const {
        data: listPcmPlanGroup,
        fetchNextPage: fetchNextPagePcmPlanGroup,
        hasNextPage: hasNextPagePcmPlanGroup,
        totalRecord,
		refetch: refetchPcmPlanGroup
    } = usePcmPlanGroup({
		parentID: groupID,
		projectID,
		isShowAll: "1",
		keyword,
		populates: JSON.stringify({
			path: 'contract',
			select: '_id name sign'
		})
	}, true, false);

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
		return idsChecked.length == listPcmPlanGroup.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listPcmPlanGroup.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listPcmPlanGroup.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

	const onClickGroup = (_id: string, name: string) => {
		setBreadcrumb(previous => ([
			...previous,
			{ _id, name }
		]))
		history.push(`/pm/project/${projectID}/admin/groups/${_id}`);
	}

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					{!pathname.endsWith('groups') && (
						<button onClick={history.goBack}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</button>
					)}
					<p className="text-lg ml-2">Danh sách</p>
					{/* {breadcrumb.length ? breadcrumb.map(group => (
						<>
							{group?.name}
							{(breadcrumb.length > 1 && groupID !== group._id) && <IconArrowRight />}
						</>
					)) : 'Danh sách'} */}
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
							{/* <div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div> */}
							{idsChecked.length == 1 ?
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() =>
										openModal(
											<div
												className={
													"inline-block w-[521px] h-[360px] my-8 text-left align-middle transition-all transform bg-primary-light shadow-xl"
												}
											>
												<UpdateGroup
													item={listPcmPlanGroup.find((e: any)=> e._id == idsChecked[0])}
													projectID={projectID}
													onConfirm={refetchPcmPlanGroup}
												/>
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
											<DeleteGroup
												idsChecked={idsChecked}
												onConfirm={refetchPcmPlanGroup}
											/>
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
									<Create
										projectID={projectID}
										parentID={groupID}
										onConfirm={refetchPcmPlanGroup}
									/>
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

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r px-2 border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray">
						<th className="pl-2 pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							{/* border-r-2 border-gray-300 */}
							<div className="flex items-center justify-center">
								<input
									className="form-check-input"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Nội dung
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Mã hiệu
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Thành viên
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">Cập nhật lần cuối</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">#</div>
						</th>
					</tr>
				</thead>

				{listPcmPlanGroup && listPcmPlanGroup.length ?
					<tbody className="bg-primary-light text-left">
						{listPcmPlanGroup.map((item: any, index: number) => (
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
									<button onClick={() => onClickGroup(item._id, item.name)}>
										<div className="flex text-left">
											<img src={FolderIcon} alt="Folder" className="w-6 h-6 mr-2" />
											<p>{item.name}</p>
										</div>
									</button>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item?.sign}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									<Link to={`/pm/project/${projectID}/admin/groups/${item._id}/members`}>
										{item?.members.length}
									</Link>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{moment(item.modifyAt).format("HH:mm DD/MM/YYYY")} {item?.userUpdate?.bizfullname}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									<Link to={`/pm/project/${projectID}/admin/groups/${item._id}/members`} className="underline text-sky-600">
										Xem thành viên
									</Link>
								</td>
							</tr>
						))
						}
					</tbody> : <></>
				}
			</table>

			{hasNextPagePcmPlanGroup && (
				<div className="w-full flex justify-center my-5">
					<button onClick={() => fetchNextPagePcmPlanGroup()}>
						<span className="text-primary">
							{`Xem thêm (${totalRecord - listPcmPlanGroup.length})`}
						</span>
					</button>
				</div>
			)}
		</main>
	);
};

export default FunctionalTab;
