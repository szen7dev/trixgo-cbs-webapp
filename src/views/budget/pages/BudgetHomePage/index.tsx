import { ChangeEvent, FC, useCallback, useState } from "react";
import debounce from "lodash/debounce";
import moment from "moment";
import { Link, useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { useModal } from "services/hooks/useModal";
import { SearchInput } from "shareComponents/common";

// import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import { Create, Update } from "./components";
import { ModalConfirm } from 'shareComponents/common';
import { useBudget } from "services/hooks/budget/useBudget";

export const BudgetHomePage: FC = () => {
	const history = useHistory();
	const { id: projectID } = useParams<{ id: string, itemID: string }>();

	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");

	const {
		deleteManyAsync,
		list: listBudgets,
		fetchNextPage,
		hasNextPage,
		totalRecord,
		refetch
	} = useBudget({
		params: {
			isMember: 1,
			keyword
		},
		isFetchList: true
	})

	const { openModal, closeModal } = useModal();

	// Handle for checkbox each table row
	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const handleChangeCheckbox = (id: string) => {
		const isChecked = idsChecked.includes(id);

		if(isChecked) {
			const newList = idsChecked.filter(item => item !== id);
			setIdsChecked(newList);
		} else {
			const newList = [...idsChecked, id];
			setIdsChecked(newList);
		};
	};

	// Handle for checkbox all
	const getStateCheckboxAll = useCallback(() => {
		return idsChecked.length === listBudgets.length;
	}, [idsChecked, listBudgets]);

	const handleChangeCheckboxAll = (event: ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		if(isChecked) {
			const ids = listBudgets.map(item => item._id);
			setIdsChecked(ids);
		} else{
			setIdsChecked([]);
		}
	}

	const onClickBudget = (_id: string, name: string) => {
		history.push(`/pcm/project/${projectID}/admin/groups/${_id}`);
	}

	const handleDelete = async () => {
		try {
			const { error, data } = await deleteManyAsync({
				budgetsID: idsChecked
			});

			if(error) {
			  return toast.warn(data?.message);
			}

			if(data.length) {
				return data.map((item: any) => toast.warn(item.message));
			}

			refetch();
			closeModal();
			toast.success('Xóa thành công');
		} catch (error) {
			if(error instanceof Error)
				toast.error(error.message);
			if(typeof error === 'string')
				toast.error(error);
		}
	}

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					{/* {!pathname.endsWith('groups') && (
						<button onClick={history.goBack}>
							<img src="/images/common/button_back.png" alt="Button Back" />
						</button>
					)} */}
					<p className="text-lg ml-2">Danh sách</p>
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
							{idsChecked.length == 1 ?
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() => toast.info('Tính năng đang phát triển')
										// openModal(
										// 	<div
										// 		className={
										// 			"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
										// 		}
										// 	>
										// 		<Update
										// 			item={listBudgets.find((e: any)=> e._id == idsChecked[0])}
										// 			onConfirm={refetch}
										// 		/>
										// 	</div>
										// )
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
											<ModalConfirm
												onConfirm={handleDelete}
												onCancel={closeModal}
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
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold"
						onClick={() =>
							openModal(
								<div
									className={
										"inline-block w-[521px] max-h-[650px] my-8 overflow-y-auto text-left align-middle transition-all transform bg-primary-light shadow-xl"
									}
								>
									<Create onConfirm={refetch} />
								</div>
							)
						}
					>
						Tạo mới
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
									onChange={handleChangeCheckboxAll}
									checked={getStateCheckboxAll()}
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

				{listBudgets && listBudgets.length ?
					<tbody className="bg-primary-light text-left">
						{listBudgets.map((item: any, index: number) => (
							<tr key={index} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										checked={getStateChecked(item._id)}
										onChange={() => handleChangeCheckbox(item._id)}
									/>
								</td>
								<td className="py-1 px-2">
									<button onClick={() => onClickBudget(item._id, item.name)}>
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
									<Link to={`/pcm/project/${projectID}/admin/groups/${item._id}/members`}>
										{item?.members.length}
									</Link>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{moment(item.modifyAt).format("HH:mm DD/MM/YYYY")} {item?.userUpdate?.bizfullname}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									<Link to={`/pcm/project/${projectID}/admin/groups/${item._id}/members`} className="underline text-sky-600">
										Xem thành viên
									</Link>
								</td>
							</tr>
						))
						}
					</tbody> : <></>
				}
			</table>

			{hasNextPage && (
				<div className="w-full flex justify-center my-5">
					<button onClick={() => fetchNextPage()}>
						<span className="text-primary">
							{`Xem thêm (${totalRecord - listBudgets.length})`}
						</span>
					</button>
				</div>
			)}
		</main>
	);
};