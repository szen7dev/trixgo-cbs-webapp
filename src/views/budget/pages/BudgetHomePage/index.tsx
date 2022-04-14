import { ChangeEvent, FC, useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useModal } from "services/hooks/useModal";
import { SearchInput } from "shareComponents/common";
import { convertCurrency } from 'utils/converter';

// import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
// import FolderIcon from "assets/images/icons8-folder.svg";
// import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import { CreateOrUpdateBudget } from "./components";
import { ModalConfirm } from 'shareComponents/common';
import { useBudget } from "services/hooks/budget/useBudget";
import { Budget } from "typings/budget/budget";

type ItemProps = {
	_id: string;
	name: string;
	note: string
}

export const BudgetHomePage: FC = () => {
	const [itemsChecked, setItemsChecked] = useState<ItemProps[]>([]);
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
		const isChecked = itemsChecked.find(_item => _item._id === id);
		return isChecked ? true : false;
	}, [itemsChecked]);

	const handleChangeCheckbox = (item: ItemProps) => {
		const isChecked = itemsChecked.find(_item => _item._id === item._id);

		if(isChecked) {
			const newList = itemsChecked.filter(_item => _item._id !== item._id);
			setItemsChecked(newList);
		} else {
			const newList = [...itemsChecked, item];
			setItemsChecked(newList);
		};
	};

	// Handle for checkbox all
	const getStateCheckboxAll = useCallback(() => {
		return itemsChecked.length === listBudgets.length;
	}, [itemsChecked, listBudgets]);

	const handleChangeCheckboxAll = (event: ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;

		if(isChecked) {
			const items = listBudgets.map(item => ({
				_id: item._id,
				name: item.name,
				note: item.note
			}));
			setItemsChecked(items);
		} else{
			setItemsChecked([]);
		}
	}

	const handleDelete = async () => {
		try {
			const ids = itemsChecked.map(item => item._id);
			const { error, data } = await deleteManyAsync({
				budgetsID: ids
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

	const handleConfirmCreateOrUpdate = () => {
		setItemsChecked([]);
		refetch();
	}

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg ml-2">Danh mục ngân sách</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						onChange={debounce(
							(event: any) => setKeyword(event.target.value),
							500
						)}
					/>
					{(itemsChecked && itemsChecked.length) ? (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							{itemsChecked.length == 1 ?
								<div
									className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray"
									onClick={() =>
										openModal(
											<div
												className={
													"inline-block w-[521px] h-[280px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl"
												}
											>
												<CreateOrUpdateBudget
													initValues={itemsChecked[0]}
													onConfirm={handleConfirmCreateOrUpdate}
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
										"inline-block w-[521px] h-[270px] my-8 overflow-y-auto text-left align-middle transition-all transform bg-primary-light shadow-xl"
									}
								>
									<CreateOrUpdateBudget onConfirm={handleConfirmCreateOrUpdate} />
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
						<th className="pl-2 pb-1 pt-1 text-center" style={{ width: "4%" }}>
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
							<div className="border-r-2 border-gray-300 font-normal pl-3">
								Ngân sách
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị ngân sách
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Giá trị đã thực hiện
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">
								Giá trị dự kiến khi hoàn tất
							</div>
						</th>
						<th className="w-1/3 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead>

				{listBudgets && listBudgets.length ?
					<tbody className="bg-primary-light text-left">
						{listBudgets.map((item: Budget) => (
							<tr key={item._id} className="border-b border-primary-border h-10">
								<td className="py-1 px-2 text-center">
									<input
										className="form-check-input"
										type="checkbox"
										checked={getStateChecked(item._id)}
										onChange={() => handleChangeCheckbox(item)}
									/>
								</td>
								<td className="py-1 px-3">
									<Link to={`/budget/home/${item._id}`}>
										{item.name}
									</Link>
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{convertCurrency(item.amount?.toString())}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{convertCurrency(item.impleAmount?.toString())}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{convertCurrency(item.forecastAmount?.toString())}
								</td>
								<td className="py-1 px-2 text-primary-gray">
									{item.note}
								</td>
							</tr>
						))
						}
					</tbody> : <></>
				}
			</table>

			{hasNextPage && (
				<div className="w-full flex justify-center my-5">
					<button onClick={fetchNextPage}>
						<span className="text-primary">
							{`Xem thêm (${totalRecord - listBudgets.length})`}
						</span>
					</button>
				</div>
			)}
		</main>
	);
};