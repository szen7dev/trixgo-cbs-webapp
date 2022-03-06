/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";

import useCheckedList from "services/hooks/ppt/useCheckedList";

import { SearchInput } from "shareComponents/common";
import ModalCreateContract from "./components/ModalCreateContract";

// import DropdownFilterButton from "views/document/components/DocumentFilterButton";
import { GroupActions } from "shareComponents/common";
import { ButtonCreate } from "shareComponents/common";
import { ButtonMore } from "shareComponents/common";
import { DocumentDropdown } from "views/document/sharedComponents/common";
import iconPageUp from 'assets/images/icons8-upload-document-100 1.png';
import { formatNumber } from "utils/ppt";

const _data = {
	name: 'Tư vấn quản lý dự án và Tư vấn giám sát',
	type: 'Thi công kết cấu',
	scale: 'Loại A. Dân dụng. Cấp I',
	parameter: "3 hầm/15.000m2. 30 tầng nổi/60.000 m2",
	value: 10000000000,
	note: "1005.HDKT.QLDA.pdf",
	created_at: "15:30 22/12/2021",
	updated_at: "15:30 22/12/2021",
}

type DataModuleState = typeof _data & { _id: string | number }

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubContractorContract: FC = () => {
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);

	const [data, setData] = useState<DataModuleState[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu";
		setData(Array.from({ length: 30 }).map((_, index) => ({ ..._data, _id: index })));
	}, []);

	return (
		<div className="w-full px-3.5 ">
			<div className="bg-white border-cbs-border border-[0.5px]">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Danh sách</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					{/* <DropdownFilterButton /> */}
					<GroupActions className="flex items-center flex-1" />

					<ButtonCreate onClick={() => setShow(!show)} />
					<ButtonMore />
				</div>
				<div className="overflow-auto relative">
					<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
						<thead className="">
							<tr className="text-primary-gray align-middle text-left">
								<th className="px-4 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border w-1">
									<input className="cbs-checkbox" type="checkbox" value="" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Hợp đồng
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Lĩnh vực
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Quy mô, tính chất
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Thông số
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Giá trị ký
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Ngày ký
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
										Tài liệu xác nhận
									</span>
								</th>
								<th className="py-2.5 font-normal bg-cbs-table-header sticky top-0 border-t border-b border-cbs-border">
									<span className="pl-2 border-l border-cbs-border">
									</span>
								</th>
							</tr>
						</thead>
						<tbody className="text-small">
							{
								data.map((props) => {
									const {
										_id,
										name,
										parameter,
										scale,
										type,
										value,
										note,
									} = props
									return (
										<tr key={_id} className="text-left group hover:bg-cbs-active-comment cursor-pointer">
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
												<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
											</td>
											{/* ====== Hợp đồng ====== */}
											<td className="pt-2.5 pb-3 px-3 border-b border-cbs-border">{name}</td>
											{/* ====== Lĩnh vực ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">{type}</td>
											{/* ====== Quy mô, tính chất ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">{scale}</td>
											{/* ====== Thông số ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">{parameter}</td>
											{/* ====== Giá trị Ngày ký ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(value)}</td>
											{/* ====== Ngày ký ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(value)}</td>
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">
												<a href="./#" className="text-cbs-primary">
													{note}
												</a>
											</td>
											<td className="pt-2.5 pb-3 px-3 border-b border-cbs-border text-right">
												<button className=" w-6 h-6">
													<img src={iconPageUp} alt="" className="inline-block" />
												</button>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>
				</div>
				{/* <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" /> */}
				<ModalCreateContract type='create' show={show} toggle={() => setShow(!show)} buttonOnly />
			</div>
		</div>
	);
};

export default DatahubContractorContract