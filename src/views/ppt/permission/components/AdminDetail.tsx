import { FC, useState } from "react";

import { useModal } from "services/hooks/useModal";

import { SearchInput } from "shareComponents/common";
// import FinancialCashFlowFilterButton from "views/pages/financial/planning/components/FinancialCashFlow/FinancialCashFlowFilterButton";

import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import MemberIcon from "assets/images/member-icon.svg";

import CreateNewAdminMember from "../modal/CreateNewAdminMember";
import { Paginate } from "shareComponents/common";

const AdminDetail: FC = () => {
	const [itemChecked, setItemChecked] = useState(false);

	const { openModal } = useModal();

	return (
		<main className="h-full">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<p className="text-lg">Ban giám đốc</p>
					<SearchInput
						classNameWrapper="ml-4"
						classNameInput="outline-none w-[296px]"
						// eslint-disable-next-line no-console
						onChange={(event: any) => console.log(event.target.value)}
					/>
					{/* <FinancialCashFlowFilterButton /> */}
					{itemChecked && (
						<div className="flex items-center gap-2 border-l-2 border-primary-border px-4 ml-4">
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={DownloadIcon} alt="Download" />
							</div>
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={PencilIcon} alt="Pencil" />
							</div>
							<div className="w-9 h-9 flex items-center justify-center rounded-full cursor-pointer hover:bg-cbs-gray">
								<img src={TrashIcon} alt="Trash" />
							</div>
						</div>
					)}
				</div>
				<div className="flex items-center">
					<button
						className="flex items-center justify-center text-primary-light bg-cbs-green w-[85px] h-8 rounded font-bold mr-6"
						onClick={() =>
							openModal(
								<div
									className={
										"inline-block w-[600px] h-[630px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded-lg"
									}
								>
									<CreateNewAdminMember />
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
									defaultChecked
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
								Công ty
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Phòng ban
							</div>
						</th>
						<th className="w-1/6 pb-1 pt-1 font-normal">
							<div className="border-r-2 border-gray-300 font-normal pl-2">
								Chức danh
							</div>
						</th>
						<th className="w-1/12 pb-1 pt-1 font-normal">
							<div className="font-normal pl-2">Hành động</div>
						</th>
					</tr>
				</thead>

				<tbody className="bg-primary-light">
					<tr className="border-b border-primary-border h-10">
						<td className="py-1 px-2 text-center">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefault"
								style={{ marginLeft: "-23px" }}
								checked={itemChecked}
								onClick={() => setItemChecked(!itemChecked)}
							/>
						</td>
						<td className="py-1 px-2">
							<div className="flex items-center">
								<img
									src={MemberIcon}
									alt="Member"
									className="rounded-full mr-2"
								/>
								<p>Nguyễn Phan Thanh Hương-CPMI</p>
							</div>
						</td>
						<td className="py-1 px-2">
							Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
						</td>
						<td className="py-1 px-2">Ban giám đốc</td>
						<td className="py-1 px-2">Thư ký ban giám đốc</td>
						<td className="py-1 px-2 text-negative">Xoá bỏ</td>
					</tr>

					<tr className="border-b border-primary-border h-10">
						<td className="py-1 px-2 text-center">
							<input
								className="form-check-input"
								type="checkbox"
								value=""
								id="flexCheckDefault"
								style={{ marginLeft: "-23px" }}
							/>
						</td>
						<td className="py-1 px-2">
							<div className="flex items-center">
								<img
									src={MemberIcon}
									alt="Member"
									className="rounded-full mr-2"
								/>
								<p>Nguyễn Phan Thanh Hương-CPMI</p>
							</div>
						</td>
						<td className="py-1 px-2">
							Công ty Cổ phần CONINCO Quản lý dự án và đầu tư
						</td>
						<td className="py-1 px-2">Ban giám đốc</td>
						<td className="py-1 px-2">Thư ký ban giám đốc</td>
						<td className="py-1 px-2 text-negative">Xoá bỏ</td>
					</tr>
				</tbody>
			</table>

			<Paginate />
		</main>
	);
};

export default AdminDetail;
