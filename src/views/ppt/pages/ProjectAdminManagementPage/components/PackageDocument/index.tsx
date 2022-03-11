import { FC, useCallback, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { useModal } from "services/hooks/useModal";
import debounce from "lodash/debounce";
import { SearchInput } from "shareComponents/common";
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import { Create, Update, DeleteGroup } from "../../modal";
import { usePcmPlanGroup } from "services/hooks/pcm/usePcmGroup";
import moment from "moment";

const PackageDocument: FC = () => {
	// Cơ chế của userParams
	const { id: projectID } = useParams<{ id: string }>();
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");

	const {   
		isLoading,
        refetch,
        data: listPcmPlanGroup,
        fetchNextPage: fetchNextPagePcmPlanGroup,
        hasNextPage: hasNextPagePcmPlanGroup,
        totalRecord,
		totalPage
        } = usePcmPlanGroup({ projectID, keyword },true, false);

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

	return (
		<main className="h-full">
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
					{/* <FinancialCashFlowFilterButton /> */}
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
												<Update item={listPcmPlanGroup.find((e: any)=> e._id == idsChecked[0])} setIdsChecked={setIdsChecked} projectID={projectID} keyword={keyword}/>
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
											<DeleteGroup idsChecked={idsChecked} setIdsChecked={setIdsChecked} projectID={projectID} keyword={keyword} />
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
									<Create projectID={projectID} keyword={keyword} />
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
						<th className="pb-1 pt-1 text-center" style={{ width: "3.5%" }}>
							<div className="border-r-2 border-gray-300 flex items-center justify-center">
								<input
									className="form-check-input mr-2"
									type="checkbox"
									checked={getStateCheckedAll()}
									onChange={() => onClickCheckAll()}
								/>
								<img src={PolygonIcon} alt="Polygon" />
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
										id="flexCheckDefault"
										style={{ marginLeft: "-23px" }}
										checked={getStateChecked(item._id)}
										onChange={() => onClickCheckButton(item._id)}
									/>
								</td>
								<td className="py-1 px-2">
									<Link to={`/pcm/project/${projectID}/admin#${item._id}`}>
										<div className="flex items-center">
											<img src={FolderIcon} alt="Folder" className="w-6 h-6 mr-2" />
											<p>{item.name}</p>
										</div>
									</Link>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item?.sign}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item?.members.length}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{moment(item.modifyAt).format("HH:mm DD/MM/YYYY")} {item?.userUpdate?.bizfullname}
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

export default PackageDocument;
