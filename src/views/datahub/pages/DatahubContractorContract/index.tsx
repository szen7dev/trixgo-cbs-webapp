/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import moment from 'moment';
import Skeleton from "react-loading-skeleton";

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
import ModalExtraLarge from "shareComponents/common/ModalContainer/components/ModalExtraLarge";
import { DatahubContract } from "typings/datahub/contract";
import { useContractorCompany } from "views/datahub/contexts/Company";
import useInfinitePackage from "services/hooks/datahub/package/useInfinitePackage";
import { BUILDING_GRADES, BUILDING_TYPES, PROJECT_TYPES } from "apis/localdb";

const pkgs = Array.from(Array(2).keys()).map((_, i) => ({
	id: i as string | number,
	title: "Thẻ lọc chính" as string | number,
}));

const DatahubContractorContract: FC = () => {
	const [pkg, setPkg] = useState(pkgs[0]);
	const [show, setShow] = useState(false);
	const [keyword, setKeyword] = useState('');

	const { data: company } = useContractorCompany();
	const { data, isLoading } = useInfinitePackage(
		['datahub_packages', keyword],
		{ keyword, contractorID: company?.data._id || '', populates: JSON.stringify({ path: 'field' }) },
		{ enable: Boolean(company?.data._id) }
	);

	const [selected, setSelected] = useState<DatahubContract | Record<string, any>>({});

	const { assigned, checked, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data ? data.pages.flatMap(page => page.data.listRecords) : []);

	useEffect(() => {
		document.title = "CHG.THT-Lựa chọn nhà thầu";
	}, []);

	return (
		<div className="w-full px-3.5 ">
			<div className="bg-white border-cbs-border border-[0.5px]">
				<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
					<span className="text-x-large mr-7">Hợp đồng minh chứng</span>
					<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
					<DocumentDropdown
						data={pkgs}
						value={pkg.title}
						onSelectValue={setPkg}
					/>
					{/* <DropdownFilterButton /> */}
					<GroupActions
						className="flex items-center flex-1"
						onClickPencil={() => { setShow(true); setSelected(checked[0]) }}
						disabled={{
							pencil: checked.length !== 1,
						}}
					/>

					<ButtonCreate onClick={() => { setShow(!show); setSelected({}) }} />
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
								data?.pages.map(page => page.data.listRecords.map((props) => {
									const {
										_id,
										name,
										field,
										projectType,
										buildingType,
										buildingGrade,

										basementNumber,
										basementArea,
										floorNumber,
										floorArea,

										value,
										vatValue,

										date,
										files,
									} = props
									return (
										<tr key={_id} className="text-left group hover:bg-cbs-active-comment cursor-pointer">
											<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
												<input className="cbs-checkbox" type="checkbox" value="" checked={Boolean(assigned[_id])} onChange={e => handleChangeCheckbox(e, props)} />
											</td>
											{/* ====== Hợp đồng ====== */}
											<td className="pt-2.5 pb-3 px-3 border-b border-cbs-border">{name}</td>
											{/* ====== Lĩnh vực ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">{(field && typeof field !== 'string') ? field.name : ''}</td>
											{/* ====== Quy mô, tính chất ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">
												<p>{PROJECT_TYPES.find(item => item.value === projectType)?.text}</p>
												<p>{BUILDING_TYPES.find(item => item.value === buildingType)?.text}</p>
												<p>{BUILDING_GRADES.find(item => item.value === buildingGrade)?.text}</p>
											</td>
											{/* ====== Thông số ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">
												<p>{basementNumber + ' hầm/' + basementArea + 'm2'}</p>
												<p>{floorNumber + ' tầng nổi/' + floorArea + 'm2'}</p>
											</td>
											{/* ====== Giá trị Ngày ký ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{formatNumber(value + vatValue)}</td>
											{/* ====== Ngày ký ====== */}
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border text-right">{moment(date).format('DD/MM/yyyy')}</td>
											<td className="pt-2.5 pb-3 pl-3 border-b border-cbs-border">
												{
													files?.map((file, index) => {
														return <p key={index} className="text-cbs-primary">
															{/* {note} */}
															this is files
														</p>
													})
												}
											</td>
											<td className="pt-2.5 pb-3 px-3 border-b border-cbs-border text-right">
												<button className=" w-6 h-6">
													<img src={iconPageUp} alt="" className="inline-block" />
												</button>
											</td>
										</tr>
									)
								}))
							}
							{isLoading && Array.from({ length: 4 }).map((_, i) => (
								<tr key={i}>
									{Array.from({ length: 9 }).map((item, index) => (
										<td key={index} className="px-3 pt-2.5 pb-3 border-b border-cbs-border">
											<Skeleton style={{ borderRadius: '100px' }} duration={1} />
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* <Paginate className="min-h-24 w-full border-t z-10 flex items-center justify-center py-2 bg-white" /> */}
				<ModalExtraLarge show={show}>
					<ModalCreateContract
						contractor={company?.data._id || ''}
						datahubPackageID={selected._id}

						toggle={() => setShow(!show)}
					/>
				</ModalExtraLarge>
			</div>
		</div>
	);
};

export default DatahubContractorContract