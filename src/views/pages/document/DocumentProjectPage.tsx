import { FC, Fragment, useState } from "react";

import { Menu, Transition } from "@headlessui/react";
import cn from "classnames";

import DocumentDropdown from "./components/DocumentDropdown";

import iconTrash from 'assets/images/icons8-remove.svg';
import iconPencil from 'assets/images/icons8-pencil.svg';
import styles from './document.module.css';

import { IPackage, IProjects } from "typings/document";

const tabs = [
	{ id: "list", title: "Danh sách" },
	{ id: "structure", title: "Cấu trúc thư mục" },
	{ id: "report", title: "Báo cáo" },
]

const pkgs: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Gói thầu',
}))
const subjects: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Chủ thể ban hành',
}))
const classifies: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Phân loại',
}))
const textProperties: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Tính chất văn bản',
}))
const storageAddresses: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Địa chỉ lưu trữ',
}))
const dateReceipts: Array<IPackage> = Array.from(Array(2).keys()).map((_, i) => ({
	id: i,
	title: 'Ngày nhận hồ sơ',
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
	const [subject, setSubject] = useState<IPackage>(subjects[0])
	const [textProperty, setTextProperty] = useState<IPackage>(textProperties[0])
	const [classify, setClassify] = useState<IPackage>(classifies[0])
	const [storageAddress, setStorageAddress] = useState<IPackage>(storageAddresses[0])
	const [dateReceipt, setDateReceipt] = useState<IPackage>(dateReceipts[0])

	const [tab, setTab] = useState<string>(tabs[0].id)
	const [page] = useState<number>(1);
	const [isShow, setIsShow] = useState<boolean>(false);

	const toggleModalConfirm = () => {
		setIsShow(!isShow);
	}

	return (
		<div className="flex flex-col text-sm text-black overflow-hidden h-full">
			{/* Header */}
			<div className="px-4 flex justify-between w-full text-primary-gray bg-white border border-gray-300">
				<div className="flex flex-1 justify-center text-[14px]">
					{tabs.map(({ id, title }) => (
						<button
							key={id}
							className={cn("border-b-2 border-transparent mx-2 leading-4 py-1", { 'border-primary text-black font-bold': id === tab })}
							style={{ minWidth: "148px" }}
							onClick={() => setTab(id)}
						>
							{title}
						</button>
					))}
				</div>
				<div className="py-1 flex items-center">
					<button className="py-2 px-5 bg-primary hover:bg-opacity-90 text-white rounded-md mr-5">Tạo mới</button>
					<div className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center ">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
						</svg>
					</div>
				</div>
			</div>

			{/* Content */}
			<div className="flex flex-1 flex-col overflow-hidden">
				<div className="flex flex-wrap justify-start items-start content-start w-full px-4 pt-2 gap-x-2 text-black">
					<div className="relative inline-block">
						<input type="text" placeholder="Nhập từ khóa tìm kiếm" className="inline-block px-4 py-1 border rounded-md focus:outline-none" style={{ minWidth: "300px" }} />
					</div>
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					<DocumentDropdown
						data={subjects}
						value={subject.title}
						onSelectValue={setSubject}
					/>
					<DocumentDropdown
						data={textProperties}
						value={textProperty.title}
						onSelectValue={setTextProperty}
					/>
					<DocumentDropdown
						data={classifies}
						value={classify.title}
						onSelectValue={setClassify}
					/>
					<DocumentDropdown
						data={storageAddresses}
						value={storageAddress.title}
						onSelectValue={setStorageAddress}
					/>
					<DocumentDropdown
						data={dateReceipts}
						value={dateReceipt.title}
						onSelectValue={setDateReceipt}
					/>
					<button className="py-1 px-5 border border-primary bg-primary hover:bg-opacity-90 text-white rounded-md">Tra cứu</button>
					<button className={cn(styles.button__green, "py-1 px-5 border hover:bg-opacity-70 text-white rounded-md")}>Lưu</button>
				</div>
				<div className="flex-1 overflow-y-auto mt-2">
					<table className={cn(styles.table, styles.black, styles['text-normal'], 'border-separate space-x-0 space-y-0')}>
						<thead>
							<tr className="text-primary-gray">
								<th>TT</th>
								<th className="pr-4">
									<div className="flex">
										<span className="pt-1 mr-6">
											Nội dung
										</span>
										<button className="w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center ">
											<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
											</svg>
										</button>
									</div>
								</th>
								<th className="pl-4 pr-3">Chủ thể ban hành</th>
								<th className="pl-3 pr-0.5">Mã hiệu</th>
								<th className="px-0.5">Ngày văn bản</th>
								<th>Mã hiệu lưu</th>
								<th className="whitespace-nowrap pr-2">Số lượng</th>
								<th className="whitespace-nowrap pl-1 pr-2">Tình trạng</th>
								<th className="w-min pl-1.5">Yêu cầu phản hồi</th>
								<th>Ghi chú</th>
								<th>Địa chỉ lưu trữ</th>
								<th></th>
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
									require_response,
									note,
									address,
								}, index) => {
									return (
										<tr key={index} className="text-left">
											<td className="px-4"></td>
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
											<td className="pl-1.5">{require_response ? "Có" : "Không"}</td>
											<td>{note}</td>
											<td>{address}</td>
											<td>
												<Menu as="div" className="relative inline-block">
													<Menu.Button className="">
														<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
														</svg>
													</Menu.Button>
													<Transition
														as={Fragment}
														enter="transition ease-out duration-100"
														enterFrom="transform opacity-0 scale-95"
														enterTo="transform opacity-100 scale-100"
														leave="transition ease-in duration-75"
														leaveFrom="transform opacity-100 scale-100"
														leaveTo="transform opacity-0 scale-95"
													>
														<div className="z-10 absolute right-0 mt-2 text-right origin-top-right border border-gray-300 bg-white divide-y divide-gray-100 rounded-md whitespace-nowrap" style={{ width: "264px" }}>
															<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left">
																<img src={iconPencil} alt="Icon Edit" className="inline-block mr-6" />
																Cập nhật
															</button>
															<button className="block px-8 py-2 hover:bg-gray-200 w-full text-left" onClick={toggleModalConfirm} >
																<img src={iconTrash} alt="Icon trash" className="inline-block mr-6" />
																Xóa
															</button>
														</div>
													</Transition>
												</Menu>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
			</div>

			{/* Footer */}
			<div className="w-full sticky bottom-0 bg-white">
				<div className="bg-white px-4 flex items-center justify-between sm:px-6">
					<div className="mx-auto hidden sm:flex-1 sm:flex sm:items-start sm:justify-between mt-1.5 text-primary-gray" style={{ maxWidth: "1250px" }}>
						<button
							className="relative inline-flex items-center py-2 text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
						>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ marginLeft: "15px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
							<span style={{ marginRight: "30px", marginLeft: "9px" }}>LÙI</span>
						</button>
						<nav className="relative z-0 inline-flex " aria-label="Pagination">
							{/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
							<div className={cn("pb-2.5 border-b-2 border-transparent", { "border-primary text-primary": page === 1 })}>
								<button
									aria-current="page"
									className={cn("relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md", { "bg-gray-100": page === 1 })}
								>
									1
								</button>
							</div>
							<div className={"pb-2.5 border-b-2 border-transparent"}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									2
								</button>
							</div>
							<div className={"pb-2.5 border-b-2 border-transparent"}>
								<button
									className="hidden md:inline-flex relative items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									3
								</button>
							</div>
							<span className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold">
								...
							</span>
							<div className={"pb-2.5 border-b-2 border-transparent"}>
								<button
									className="hidden md:inline-flex relative items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									8
								</button>
							</div>
							<div className={"pb-2.5 border-b-2 border-transparent"}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									9
								</button>
							</div>
							<div className={"pb-2.5 border-b-2 border-transparent"}>
								<button
									className="relative inline-flex items-center px-4 py-2 text-sm mx-1 font-bold bg-gray-100 rounded-md"
								>
									10
								</button>
							</div>
						</nav>
						<button
							className="ml-3 relative inline-flex items-center py-2 text-sm rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
						>
							<span style={{ marginLeft: "30px", marginRight: "9px" }}>TIẾP</span>
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ marginRight: "15px" }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
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
