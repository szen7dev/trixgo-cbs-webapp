/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useScrollSticky from "services/hooks/datahub/useScrollSticky";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import ChartReportByTime from "./components/ChartReportByTime";
import LeftMenuSelection from "./components/LeftMenuSelection";

const ProjectInspectionTab4Page: FC = () => {
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
		<div className="h-full overflow-hidden relative bg-cbs-bg-input-search p-4">
			<div className="h-full  overflow-auto" id="scroller">
				<div className="flex gap-4">
					{/* menu select */}
					<LeftMenuSelection />

					<div className="flex-1 bg-white p-4">
						<div className="pb-4">
							<div className="text-primary">Tầng 9</div>
							<div className="flex justify-between items-end w-full">
								<div className="text-[16px]"><b>16 khu vực</b></div>
								{/* ===== Progress 1 ===== */}
								<div className="text-medium w-1/2">
									<div className="flex w-full justify-between pb-3">
										<span >Tình trạng triển khai</span>
										<span className="text-green-success">78%</span>
									</div>
									<div role="progressbar" className="flex bg-cbs-gray w-full h-3 mt-1.5">
										<div className="bg-cbs-dirt border h-full relative" style={{ width: '25%' }} />
										<div className="bg-cbs-bg-light-blue-bar border h-full relative" style={{ width: '18%' }} />
										<div className="bg-green-success border h-full relative" style={{ width: '25%' }} />
										<div className="bg-pink-warning border h-full relative" style={{ width: '10%' }} />
									</div>
								</div>
							</div>
							<div className="pt-6">
								<div className="flex gap-3 flex-1 gap-7">
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-cbs-dirt rounded-full mr-3 flex justify-center items-center">
										</div>
										Khởi tạo
									</div>
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-cbs-bg-light-blue-bar rounded-full mr-3 flex justify-center items-center">
										</div>
										Đang nghiệm thu
									</div>
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-green-success rounded-full mr-3 flex justify-center items-center">
										</div>
										Đang hoàn thành
									</div>
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-pink-warning rounded-full mr-3 flex justify-center items-center">
										</div>
										Sửa lỗi
									</div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-4 gap-4">

							<div className="h-[130px] px-2 py-2.5 bg-cbs-bg-light-blue-bar   flex flex-col">
								<div className="m-auto align-middle text-white	text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-green-success   flex flex-col">
								<div className="m-auto align-middle	text-white text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-green-success   flex flex-col">
								<div className="m-auto align-middle text-white	text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-cbs-dirt   flex flex-col">
								<div className="m-auto align-middle	text-white text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-cbs-bg-light-blue-bar   flex flex-col">
								<div className="m-auto align-middle text-white	text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-green-success   flex flex-col">
								<div className="m-auto align-middle	text-white text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-green-success   flex flex-col">
								<div className="m-auto align-middle text-white	text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

							<div className="h-[130px] px-2 py-2.5 bg-cbs-dirt   flex flex-col">
								<div className="m-auto align-middle	text-white text-center	 w-[70px] text-[14px]">Khu vực hành lang</div>
								<div className="relative  w-full border-[0.5px] bg-cbs-border">
									<div
										className="bg-cbs-bg-light-blue-bar h-[6px]"
										style={{
											width: "65%",
										}}
									>
									</div>
								</div>
							</div>

						</div>
					</div>
					<div className="flex-1 bg-white p-4">
						<div className="pb-4">
							<div className="text-primary">Căn hộ C3</div>
							<div className="flex justify-between items-end w-full">
								<div className="text-[16px]"><b>16 khu vực</b></div>
								{/* ===== Progress 1 ===== */}
								<div className="text-medium w-1/2">
									<div className="flex w-full justify-between pb-3">
										<span >Tình trạng triển khai</span>
										<span className="text-green-success">78%</span>
									</div>
									<div role="progressbar" className="flex bg-cbs-gray w-full h-3 mt-1.5">
										<div className="bg-cbs-dirt border h-full relative" style={{ width: '25%' }} />
										<div className="bg-cbs-bg-light-blue-bar border h-full relative" style={{ width: '18%' }} />
										<div className="bg-green-success border h-full relative" style={{ width: '25%' }} />
										<div className="bg-pink-warning border h-full relative" style={{ width: '10%' }} />
									</div>
								</div>
							</div>
							<div className="pt-6">
								<div className="flex gap-3 flex-1 gap-7">
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-cbs-dirt rounded-full mr-3 flex justify-center items-center">
										</div>
										Khởi tạo
									</div>
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-cbs-bg-light-blue-bar rounded-full mr-3 flex justify-center items-center">
										</div>
										Đang nghiệm thu
									</div>
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-green-success rounded-full mr-3 flex justify-center items-center">
										</div>
										Đang hoàn thành
									</div>
									<div className="flex items-center	">
										<div className="w-3 h-3 bg-pink-warning rounded-full mr-3 flex justify-center items-center">
										</div>
										Sửa lỗi
									</div>
								</div>
							</div>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="bg-green-success h-[50px] flex justify-between px-2  items-center rounded">
								<div className="text-[13px] text-white  w-4/5 text-ellipsis line-clamp-2	">
									Công tác xây tường bao và tường ngăn giữa các khu vực/căn hộ
								</div>
								<div className="text-medium font-bold cbs-radial-progress w-10 h-10" style={{ '--value': '33.33', '--primary': '#4781CF', '--secondary': '#F0F0F0' } as React.CSSProperties}>
									122
								</div>
							</div>
							<div className="bg-cbs-bg-light-blue-bar h-[50px] flex justify-between px-2  items-center rounded">
								<div className="text-[13px] text-white  w-4/5 text-ellipsis line-clamp-2	">
									Công tác hoàn thiện nhà vệ sinh
								</div>
								<div className="text-medium font-bold cbs-radial-progress w-10 h-10" style={{ '--value': '33.33', '--primary': '#4781CF', '--secondary': '#F0F0F0' } as React.CSSProperties}>
									122
								</div>
							</div>
							<div className="bg-cbs-dirt h-[50px] flex justify-between px-2  items-center rounded">
								<div className="text-[13px] text-white  w-4/5 text-ellipsis	line-clamp-2 ">
									Công tác xây tường bao và tường ngăn giữa các khu vực/căn hộ
								</div>
								<div className="text-medium font-bold cbs-radial-progress w-10 h-10" style={{ '--value': '33.33', '--primary': '#4781CF', '--secondary': '#F0F0F0' } as React.CSSProperties}>
									122
								</div>
							</div>
							<div className=" bg-pink-warning h-[50px] flex justify-between px-2  items-center rounded">
								<div className="text-[13px] text-white  w-4/5 text-ellipsis line-clamp-2	">
									Công tác hoàn thiện nhà vệ sinh
								</div>
								<div className="text-medium font-bold cbs-radial-progress w-10 h-10" style={{ '--value': '33.33', '--primary': '#4781CF', '--secondary': '#F0F0F0' } as React.CSSProperties}>
									122
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProjectInspectionTab4Page;