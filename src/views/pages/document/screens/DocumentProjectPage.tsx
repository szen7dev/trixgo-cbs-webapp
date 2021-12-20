import { FC, Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";

import DocumentDropdown from "../components/DocumentDropdown";

import iconTrash from 'assets/images/icons8-remove.svg';
import iconPencil from 'assets/images/icons8-pencil.svg';
import styles from '../document.module.css';

import { IPackage, IProjects } from "typings/document";
import ButtonCreate from "../components/common/ButtonCreate";
import ButtonMore from "../components/common/ButtonMore";
import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "../components/DocumentFilterButton";
import GroupActions from "../components/projects/GroupActions";
import Paginate from "components/common/Paginate";

const tabs = [
	{ id: "list", title: "List" },
	{ id: "x", title: "Phân loại" },
	{ id: "structure", title: "Thư mục" },
	{ id: "report", title: "Báo cáo" },
	{ id: "history", title: "Lịch sử upload file" },
]

const pkgs: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Thẻ lọc chính',
}))

const data: Array<IProjects> = Array.from(Array(30).keys()).map((_, i) => ({
	id: i,
	content: "Giấy chứng nhận Đăng ký doanh nghiệp (thay đổi lần thứ 2 ngày 17/05/2021)",
	created_by: "Phùng Thị Hà-PGI-20/07/2021",
	created_at: "20/05/2021",
	publisher: "Sở Kế hoạch và Đầu tư thành phố Hà Nội",
	code: "ARM.CAL-PGI.PMI\\HDCG\\210515",
	count: 12,
	signed: false,
	require_response: true,
	note: null,
	address: "Cặp F1, Ngăn A5, tủ A"
}))

const DocumentProjectPage: FC = () => {
	/**
	 * ? Define orders:
	 * ? 1. redux definition
	 * ? 2. react definition
	 * ? 3. third party libraries definition
	 * ? 4. libs, services, data definition
	 * ? 5. helpers, util definition
	 * ? 6. local definition
	 */
	const [pkg, setPkg] = useState<IPackage>(pkgs[0])

	const [tab, setTab] = useState<string>(tabs[0].id)
	const [page] = useState<number>(1);
	const [isShow, setIsShow] = useState<boolean>(false);

	const toggleModalConfirm = () => {
		setIsShow(!isShow);
	}

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-2 flex justify-between w-full text-primary-gray bg-white border border-gray-300">
				<div className="flex flex-1 text-medium">
					{tabs.map(({ id, title }) => (
						<button
							key={id}
							className={cn("border-b-2 border-transparent mx-2 py-2.5", { 'border-primary text-black font-bold': id === tab })}
							style={{ minWidth: "64px" }}
							onClick={() => setTab(id)}
						>
							{title}
						</button>
					))}
				</div>
				<div className="py-1 flex items-center">

				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					<DropdownFilterButton />
					<GroupActions className="flex items-center flex-1" />

					<ButtonCreate />
					<ButtonMore />
				</div>
				<div className="flex-1 overflow-y-auto">
					<table className={cn(styles.table, 'text-black text-medium border-separate space-x-0 space-y-0')}>
						<thead>
							<tr className="text-primary-gray whitespace-nowrap">
								<th className="px-4">
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Nội dung
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Chủ thể ban hành
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Mã hiệu
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Ngày văn bản
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Mã hiệu lưu
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Số lượng
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Tình trạng
									</span>
								</th>
								<th>
									<span className="pl-2 border-l border-cbs-border">
										Ghi chú
									</span>
								</th>
								<th style={{ minWidth: "150px" }}>
									<span className="pl-2 border-l border-cbs-border">
										Địa chỉ lưu trữ
									</span>
								</th>
							</tr>
						</thead>
						<tbody>
							{
								data.map(({
									id,
									content,
									publisher,
									created_by,
									created_at,
									code,
									count,
									signed,
									note,
									address,
								}, index) => {
									return (
										<tr key={index} className="text-left">
											<td className="px-4">
												<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
											</td>
											<td className="pr-4">
												<p>{content}</p>
												<p className="mt-1.5 text-primary-gray">{created_by}</p>
											</td>
											<td className="pl-4 pr-3">{publisher}</td>
											<td className="pl-3 pr-0.5">{code}</td>
											<td className="px-0.5">{created_at}</td>
											<td>{code}</td>
											<td className="whitespace-nowrap pr-2" style={{ width: '1%' }}>{count}</td>
											<td className="whitespace-nowrap pl-1" style={{ width: '1%' }}>{signed ? "Đã ký" : "Chưa ký"}</td>
											<td>{note}</td>
											<td>{address}</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			{/* Footer */}
			<div className={'min-w-24 min-h-24 sticky bottom-0 w-full border-t z-10 flex items-center justify-center py-2 bg-white'}>
				<div className="bg-white px-4 flex items-center justify-center relative">
					<div className={'inline-flex'}>
						<button
							className={"relative border text-sm font-medium text-gray-700 w-px-24 h-px-24 flex items-center justify-center border-gray-300 rounded-tl-md rounded-bl-md"}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<div className={"flex items-center justify-center border-t border-b pl-4 pr-4 text-gray-700 border-gray-300"}>
							<span> 1 trong 100 </span>
						</div>
						<button
							className={"relative border text-sm font-medium text-gray-700 w-px-24 h-px-24 flex items-center justify-center border-gray-300 rounded-tr-md rounded-br-md"}
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
				</div>
				<div className={"absolute right-2 text-gray-500"}>
					1005 MẨU TIN
				</div>
			</div>

			<Transition.Root appear show={isShow} as={Fragment}>
				<div
					className="fixed inset-0 overflow-y-auto"
					style={{ zIndex: 51 }}
				>
					<div className="min-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-dark bg-opacity-75 transition-opacity" />
						</Transition.Child>

						<span
							className="inline-block h-screen align-middle"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-flex flex-col text-black w-full max-w-lg my-8 overflow-hidden text-left transition-all transform bg-white">
								<div className="p-5 mb-4 text-xl leading-6 font-bold">
									Bạn có muốn xóa không?
								</div>
								<div className="text-right pt-6 pb-5 px-8 text-base leading-5 border-t border-gray-100">
									<button className="py-1.5 px-3 border bg-white hover:bg-gray-100 shadow-xl rounded-md mr-2" onClick={toggleModalConfirm}>Hủy</button>
									<button className="py-1.5 px-3 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md" onClick={toggleModalConfirm}>Xác nhận</button>
								</div>

							</div>
						</Transition.Child>
					</div>
				</div>
			</Transition.Root>
		</div>
	);
};

export default DocumentProjectPage;
