import { FC, Fragment, useContext, useState } from "react";

import { Transition } from "@headlessui/react";

import DocumentDropdown from "views/pages/document/components/DocumentDropdown";

import { IPackage, IProjects } from "typings/document";
import ButtonCreate from "views/pages/document/components/common/ButtonCreate";
import ButtonMore from "views/pages/document/components/common/ButtonMore";
import SearchInput from "components/common/SearchInput";
import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import GroupActions from "views/pages/document/components/projects/GroupActions";
import { Context as ContextModal } from "views/pages/document/contexts/contextModal";

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
	note: 'Có bản gốc đi kèm',
	address: "Cặp F1, Ngăn A5, tủ A"
}))

const DocumentProjectPage: FC = () => {
	const [pkg, setPkg] = useState<IPackage>(pkgs[0]);
	const { toggleModal } = useContext(ContextModal);

	const [isShow, setIsShow] = useState<boolean>(false);

	const toggleModalConfirm = () => {
		setIsShow(!isShow);
	}

	return (
		<>
			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 text-black py-1">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu mr-2" onChange={() => 1} />
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					<DropdownFilterButton />
					<GroupActions className="flex items-center flex-1" />

					<ButtonCreate onClick={toggleModal} />
					<ButtonMore />
				</div>
				<div className="flex-1 overflow-y-auto">
					<table className="text-black text-medium border-separate space-x-0 space-y-0" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
								<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Nội dung
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Chủ thể ban hành
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Mã hiệu
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Ngày văn bản
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Mã hiệu lưu
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Số lượng
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Ghi chú
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border" style={{ minWidth: "150px" }}>
									<span className="pl-2 border-l border-cbs-border">
										Địa chỉ lưu trữ
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="text-small">
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
										<tr key={index} className="text-left hover:bg-cbs-active-comment">
											<td className="px-4 py-2.5">
												<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
											</td>
											<td className="px-2 w-[271px] py-2.5">
												<p>{content}</p>
												<p className="mt-1.5 text-primary-gray">{created_by}</p>
											</td>
											<td className="py-2.5 px-2 w-[150px]">{publisher}</td>
											<td className="py-2.5 px-2 w-[166px]">{code}</td>
											<td className="py-2.5 px-2 w-24 text-right">{created_at}</td>
											<td className="py-2.5 px-2">{code}</td>
											<td className="py-2.5 px-2 whitespace-nowrap text-right min-w-[85px]" style={{ width: '1%' }}>{count}</td>
											<td className="py-2.5 px-2 box-border">{note}</td>
											<td className="py-2.5 px-2">{address}</td>
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
		</>
	);
};

export default DocumentProjectPage;
