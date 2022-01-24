import { FC, Fragment, HTMLAttributes, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";

import iconHat from 'assets/images/icons8-safety-hat-96.png';
import iconFilter from 'assets/images/icons8-filter-96.png';
import classNames from "classnames";

const getBlockColor = (type: number): string => {
	switch (type % 5) {
		case 1:
			return "bg-cbs-green";
		case 2:
			return "bg-cbs-schedule-nextweek";
		case 3:
			return "bg-cbs-schedule-expired";
		default:
			return "bg-cbs-green";
	}
}

const InfoBlock: FC<HTMLAttributes<HTMLDivElement>> = ({ ...props }) => {
	return (
		<div {...props}>
			<div className="flex justify-between">
				<div className="flex items-center">
					<img src={iconHat} alt="icon hat" className="mr-4" />
					<p className="font-bold">
						Vật tư
					</p>
				</div>
				<Menu as="div" className="relative inline-block z-10 text-medium">
					<Menu.Button className="flex items-center border rounded-md focus:outline-none w-6 h-6 p-0.5">
						<img src={iconFilter} alt="" className="inline-block" />
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
						<Menu.Items as="div" className="absolute pt-4 w-80 right-0 mt-2 origin-top-right border-0.5 border-cbs-border shadow-md bg-white divide-y divide-gray-100 rounded-md">
							<Menu.Item disabled as="div" className="px-4 pb-3 border-b border-cbs-border">
								<input type="text" placeholder="Nhập nội dung" className="focus:outline-none" />
							</Menu.Item>
							<Menu.Item as="div" className="max-h-80 overflow-y-auto" >
								{Array.from({ length: 11 }).map((_, index) => (
									<button key={index} type="button" className="hover:bg-gray-100 px-6 py-4 w-full text-left">
										Kết quả trả về {index}
									</button>
								))}
							</Menu.Item>
						</Menu.Items>
					</Transition>
				</Menu>
			</div>
			<div className="grid grid-cols-2 gap-2 mt-4">
				{Array.from({ length: Math.ceil(Math.random() * 13) }).map((_, index) => {
					const value = Math.round(Math.random() * 101);
					return (
						<Fragment key={index}>
							<div>
								Máy phát điện dự phòng trung thế K522 cho khu vực chính
							</div>
							<div className="bg-gray-100 h-[30px]">
								<div className="flex items-center justify-center h-full bg-cbs-secondary text-white bg-opacity-60" style={{ width: value + '%' }}>
									{value}%
								</div>
							</div>
						</Fragment>
					)
				})}
				<button type="button" className="col-span-2 text-center text-cbs-primary text-x-large pt-4 pb-4">
					Xem thêm (128)
				</button>
			</div>
		</div>
	)
}

const ProjectResourcePage: FC = () => {
	const [type, setType] = useState<string>('all');
	useEffect(() => {
		document.title = "CHG.THT-Quản lý vật tư"
	}, []);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => { setType(e.target.value) };
	const month = 60;

	return (
		<div className="flex-1 text-sm text-black overflow-x-hidden">
			<div className="overflow-x-auto bg-white border-0.5 border-cbs-border pt-4 pr-6 custom-scroll">
				<table className="text-center text-cbs-subtext ml-3 text-x-small min-w-full">
					<tbody>
						<tr className="text-cbs-highlight-color">
							<th className="sticky left-0 bg-white text-left whitespace-nowrap align-middle text-cbs-subtext pl-2">Chỉ số tháng</th>
							{Array.from({ length: month }).map((_, index) => (
								<th key={index} className="px-2.5">T{index}</th>
							))}
							<th className="w-full"></th>
						</tr>
						<tr>
							<td className="sticky left-0 bg-white text-left whitespace-nowrap align-middle pl-2">Kế hoạch</td>
							{Array.from({ length: month }).map((_, index) => (
								<td key={index} className="px-2.5 pt-3">{index}</td>
							))}
							<td></td>
						</tr>
						<tr>
							<td className="sticky left-0 bg-white text-left whitespace-nowrap align-middle pl-2">Thực tế</td>
							{Array.from({ length: month }).map((_, index) => (
								<td key={index} className="px-2.5 pb-5 pt-5">{index}</td>
							))}
							<td></td>
						</tr>
						<tr>
							<td className="sticky left-0 bg-white text-left whitespace-nowrap pt-2 pl-2">Mục tiêu %</td>
							{Array.from({ length: month }).map((_, index) => (
								<td key={index} className="border-t-0.5 border-cbs-border px-2.5 pt-2">{(Math.round(Math.random() * 10) + 100)}%</td>
							))}
							<td className="border-t-0.5 border-cbs-border"></td>
						</tr>
						<tr>
							<td className="sticky left-0 bg-white text-left pb-2 pl-2 text-cbs-primary"><i>Đơn vị: tỷ VND</i></td>
							{Array.from({ length: month }).map((_, index) => (
								<td key={index} className="px-2.5 pt-2 pb-2">
									<div className={classNames("rounded-full w-6 h-6 shadow-cbs-md inline-block", getBlockColor(index))}>

									</div>
								</td>
							))}
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="flex flex-col bg-white text-cbs-subtext px-3.5">
				<div className="flex justify-between flex-wrap items-center">
					<h3 className="text-x-large mt-2.5 pl-2.5">Đánh giá vật tư, nhân công máy giữa kế hoạch và thực tế</h3>
					<div className="flex items-center mt-2.5">
						<ul className="flex text-x-small" onChange={handleChange.bind(this)}>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="all" defaultChecked={type === 'all'} className="mr-2.5" />
									Tất cả
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="all" defaultChecked={type === 'day'} className="mr-2.5" />
									Ngày nay
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="week" defaultChecked={type === 'week'} className="mr-2.5" />
									Tuần này
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="month" defaultChecked={type === 'month'} className="mr-2.5" />
									Tháng này
								</label>
							</li>
							<li className="pr-3 pl-1">
								<label>
									<input type="radio" name="type" id="" value="quater" defaultChecked={type === 'quater'} className="mr-2.5" />
									Quý này
								</label>
							</li>
						</ul>
						<button className="rounded-md border border-cbs-border p-2">Chọn thời gian</button>
					</div>
				</div>
				<div className="grid xl:grid-cols-2 2xl:grid-cols-3 flex-1 w-full gap-6 mt-4">
					<InfoBlock className="border border-cbs-border text-small text-black py-2.5 px-4" />
					<InfoBlock className="border border-cbs-border text-small text-black py-2.5 px-4" />
					<InfoBlock className="border border-cbs-border text-small text-black py-2.5 px-4" />
				</div>
			</div>
		</div>
	);
};
export default ProjectResourcePage;