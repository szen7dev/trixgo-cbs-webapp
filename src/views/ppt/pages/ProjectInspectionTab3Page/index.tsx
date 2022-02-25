/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollSticky from "services/hooks/datahub/useScrollSticky";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import ChartReportByTime from "./components/ChartReportByTime";

const ProjectInspectionTab2Page: FC = () => {
	const [data, setData] = useState<{ id: number, [key: string]: any }[]>([]);
	const { assigned, handleChangeCheckbox, handleCheckAll, checkboxRef } = useCheckedList(data);
	const { innerRef, sticky } = useScrollSticky('#scroller')

	useEffect(() => {
		document.title = "CHG.THT-Nghiệm thu chất lượng"
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

	return (
		<div className="h-full overflow-hidden relative">
			<div className="h-full  overflow-auto" id="scroller">
				<div className="pl-6 pr-2.5 border-0.5 border-cbs-border">
					<div className="flex justify-between flex-wrap items-center">
						<h3 className="text-x-large mt-2.5 font-bold text-cbs-subtext">Báo cáo theo thời gian</h3>
					</div>
					<div className="h-[180px]">
						<ChartReportByTime />
					</div>
				</div>
				<div className="flex">
					<div className="flex-1">
						<div className="py-4">
							{/* ===== Progress 1 ===== */}
							<div className="text-medium">
								<div className="flex w-full justify-between">
									<span >Đang triển khai</span>
									<span>2000</span>
								</div>
								<div role="progressbar" className="bg-cbs-gray w-full h-3 mt-1.5">
									<div className="bg-[#8EB4E3] h-full relative" style={{ width: '70%' }}>
										<span className="absolute -top-4 text-x-small" style={{ left: "50%" }}>70%</span>
										<span className="absolute -top-5 right-0 translate-x-1/2">1.400</span>
									</div>
								</div>
							</div>
							{/* ===== Progress 2 ===== */}
							<div className="text-x-small mt-4">
								<div className="flex w-full">
									<div className="text-center" style={{ width: '40%' }}>40%</div>
									<div className="text-center" style={{ width: '18%' }}>18%</div>
									<div className="text-center" style={{ width: '12%' }}>12%</div>
								</div>
								<div role="progressbar" className="flex bg-cbs-gray w-full h-3 mt-1.5">
									<div className="bg-cbs-primary h-full relative" style={{ width: '40%' }} />
									<div className="bg-cbs-schedule-expired h-full relative" style={{ width: '18%' }} />
									<div className="bg-[#8EB4E3] h-full relative" style={{ width: '12%' }} />
								</div>
							</div>
						</div>
						<table className="text-black text-small border-separate space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
							<thead className="">
								<tr className="text-primary-gray whitespace-nowrap align-middle text-left">
									<th className="pl-4 py-2.5 font-normal bg-cbs-active-comment sticky top-0 border border-r-0 border-cbs-border w-1">
										<input className="cbs-checkbox mr-1.5" type="checkbox" value="checkAll" id="flexCheckDefault" ref={checkboxRef} onClick={handleCheckAll} />
										<button className="inline-block text-cbs-subtext" type="button">
											<svg xmlns="http://www.w3.org/2000/svg" className='w-4 h-4' viewBox="0 0 320 512" fill="currentColor">
												<path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z" />
											</svg>
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
												<td className="pt-2.5 pb-3 pl-4 border-b border-cbs-border text-left" onClick={e => e.stopPropagation()}>
													<input className="cbs-checkbox" type="checkbox" value={id} checked={Boolean(assigned[id])} onChange={e => handleChangeCheckbox(e, { id })} />
												</td>
												<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">Thi công ép cọc thí nghiệm, thí nghiệm cọc thí nghiệm và thi công ép cọc đại trà</td>
												<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border">Cục rà phá bom mìn-Vabomin</td>
												<td className="pt-2.5 pb-3 px-2 border-b border-r border-cbs-border" style={{ minWidth: "155px", fontSize: '10px' }} onClick={e => e.stopPropagation()}>
													<div className="flex w-full h-3 mt-2 text-white">
														<span
															className="flex items-center justify-center bg-red-500"
															style={{ width: `${30}%` }}
														>
															<span>
																8
															</span>
														</span>
														<span
															className="flex items-center justify-center bg-yellow-500"
															style={{ width: `${50}%` }}
														>
															<span>
																12
															</span>
														</span>
														<span
															className="flex items-center justify-center bg-green-500"
															style={{ width: `${20}%` }}
														>
															<span>
																30
															</span>
														</span>
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
					</div>
					<div className="min-w-[456px] w-min">
						<div id="test" ref={innerRef}></div>
						<div ref={sticky} className="sticky py-4 w-full border-l-0.5 border-cbs-border">
							<p className="px-6 pb-2.5 text-cbs-subtext font-bold text-x-large">Người kiểm tra</p>
							<Link to="/" className="px-6 py-2 hover:bg-cbs-form flex">
								<div className="w-10 h-10 object-cover rounded-full overflow-hidden mr-2.5">
									<img src="https://dntdurzwr12tp.cloudfront.net/files/db/users/3222c61c-d206-44c2-aa5d-bd315407344f.jpg" alt="" />
								</div>
								<div className="mr-auto">
									<p>Nguyễn Trung Hiếu-CPMI</p>
									<p className="mt-1.5 text-cbs-subtext">Trưởng đoàn TVGS</p>
								</div>
								<div className="text-medium font-bold cbs-radial-progress w-10 h-10" style={{ '--value': '33.33', '--primary': '#0060E1', '--secondary': '#8EB4E3' } as React.CSSProperties}>
									122
								</div>
							</Link>
							<Link to="/" className="px-6 py-2 hover:bg-cbs-form flex">
								<div className="w-10 h-10 object-cover rounded-full overflow-hidden mr-2.5">
									<img src="https://dntdurzwr12tp.cloudfront.net/files/db/users/3222c61c-d206-44c2-aa5d-bd315407344f.jpg" alt="" />
								</div>
								<div className="mr-auto">
									<p>Nguyễn Trung Hiếu-CPMI</p>
									<p className="mt-1.5 text-cbs-subtext">Trưởng đoàn TVGS</p>
								</div>
								<div className="text-medium font-bold cbs-radial-progress w-10 h-10" style={{ '--value': '33.33', '--primary': '#36AB80', '--secondary': '#FF9900' } as React.CSSProperties}>
									688
								</div>
							</Link>
							<div className="px-6 pt-2.5 text-cbs-primary">
								<button>
									Xem tất cả
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectInspectionTab2Page;