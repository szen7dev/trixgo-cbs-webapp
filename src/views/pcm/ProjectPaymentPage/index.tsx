import { FC, useEffect, useState } from "react";

// Hook
import useCheckedList from 'services/hooks/ppt/useCheckedList';

import SearchInput from "components/common/SearchInput";

// import DropdownFilterButton from "views/pages/document/components/DocumentFilterButton";
import GroupActions from "../../sharedComponents/common/GroupActions";
import ModalInformation from "./components/ModalInformation";

import CaretDownIcon from "assets/images/icon-caret-down.png";
import ButtonMore from "../../sharedComponents/common/ButtonMore";

const ProjectPaymentPage: FC = () => {
	const [visibleDrawer, setVisibleDrawer] = useState<boolean>(false);
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([])
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data)

	useEffect(() => {
		document.title = "CHG.THT-Hồ sơ thanh toán"
		setData(() => Array.from({ length: 30 }).map((_, index) => ({
			id: index,
			project: index % 2 ? "Thi công rà phá bom mìn, vật nổ" : 'Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà',
			joined: 8,
			worked: 15,
			created_at: "15:30 22/12/2021",
			updated_at: "15:30 22/12/2021",
			status: index,
		})));
	}, []);

	const toggleVisible = () => setVisibleDrawer(!visibleDrawer);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			<div className="flex flex-wrap items-center w-full px-4 gap-x-2 bg-white text-black border-b border-cbs-gray py-1">
				<span className="text-x-large mr-7">Hồ sơ dự thầu</span>
				<SearchInput classNameWrapper="rounded-sm flex bg-cbs-left-menu" onChange={() => 1} />
				{/* <DropdownFilterButton /> */}
				<GroupActions className="flex items-center flex-1" />

				<div className="text-x-large flex items-center gap-x-4">
					<span>
						<i className="inline-block align-middle mr-1 w-2 h-2 rounded-lg bg-cbs-schedule-expired"></i>
						125
					</span>
					<span>
						<i className="inline-block align-middle mr-1 w-2 h-2 rounded-lg bg-cbs-schedule-nextweek"></i>
						226
					</span>
					<span>
						<i className="inline-block align-middle mr-1 w-2 h-2 rounded-lg bg-cbs-schedule-after-7days"></i>
						182
					</span>
					<span>
						<i className="inline-block align-middle mr-1 w-2 h-2 rounded-lg bg-cbs-primary"></i>
						277
					</span>
					<ButtonMore />
				</div>
			</div>
			<div className="flex-1 overflow-y-auto">
				<table className="text-black text-medium border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
					<thead className="">
						<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
							<th className="px-4 py-2.5 font-normal bg-cbs-active-comment sticky top-0 border border-r-0 border-cbs-border w-1">
								<input className="cbs-checkbox" type="checkbox" value="checkAll" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
								<button className="inline-block align-middle" type="button">
									<img
										className="w-8 opacity-50"
										src={CaretDownIcon}
										alt="Dropdown"
									/>
								</button>
							</th>
							<th className="py-2.5 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
								<span className="border-l border-cbs-border pl-2">
									Gói thầu
								</span>
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
								Đơn vị thực hiện
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
								<div className="flex justify-between">
									<span>
										Đang triển khai
									</span>
									<div className="flex space-x-5 px-2">
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-expired" />
											<span className="ml-1 text-primary-gray font-normal">
												Quá hạn
											</span>
										</div>
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-nextweek" />
											<span className="ml-1 text-primary-gray font-normal">
												Tuần tới
											</span>
										</div>
										<div className="flex items-center">
											<div className="w-3 h-3 bg-cbs-schedule-after-7days" />
											<span className="ml-1 text-primary-gray font-normal">
												{" "}
												{">7 ngày"}
											</span>
										</div>
									</div>
								</div>
							</th>
							<th className="py-2.5 px-3 font-normal bg-cbs-active-comment sticky top-0 border border-l-0 border-cbs-border">
								Hoàn thành
							</th>
						</tr>
					</thead>
					<tbody className="text-small">
						{
							data.map(({
								id,
							}) => {
								return (
									<tr key={id} className="text-left hover:bg-cbs-active-comment cursor-pointer">
										<td className="pt-2.5 pb-3 px-2 border-b border-cbs-border text-center" onClick={e => e.stopPropagation()}>
											<input className="cbs-checkbox" type="checkbox" value={id} checked={Boolean(assigned[id])} onChange={e => handleChangeCheckbox(e, { id })} />
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border text-right">Cục rà phá bom mìn-Vabomin</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border text-right cursor-auto" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											<div className="flex w-full h-3 mt-2">
												<button
													className="flex items-center justify-center bg-red-500"
													style={{ width: `${30}%` }}
													onClick={toggleVisible}
												>
													<span className="text-white">
														8
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-yellow-500"
													style={{ width: `${50}%` }}
													onClick={toggleVisible}
												>
													<span className="text-white">
														12
													</span>
												</button>
												<button
													className="flex items-center justify-center bg-green-500"
													style={{ width: `${20}%` }}
													onClick={toggleVisible}
												>
													<span className="text-white">
														30
													</span>
												</button>
											</div>
										</td>
										<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border text-right text-white cursor-auto" style={{ fontSize: '10px' }} onClick={e => e.stopPropagation()}>
											<div className="h-3 w-full bg-cbs-primary text-center min-w-[164px] mt-2" >15</div>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<ModalInformation open={visibleDrawer} onClose={toggleVisible} />
			</div>
		</div >
	);
};

export default ProjectPaymentPage;