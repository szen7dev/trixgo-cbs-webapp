import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useModal } from "services/hooks/useModal";
import debounce from "lodash/debounce";
import { SearchInput, ModalContainer } from "shareComponents/common";
import Vertical3Dots from "assets/images/icon-3dots-vertical-gray.svg";
import FolderIcon from "assets/images/icons8-folder.svg";
import PolygonIcon from "assets/images/icon-polygon.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import GraySquare from "assets/images/Frame 4415.svg";

import moment from "moment";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import PaginateV2 from "shareComponents/common/PaginateV2";
import { formatNumberMoney } from "utils/converter";
import CameraIcon from "assets/images/camera-icon.svg";
import ChartRevenueByHour from "./components/chart";
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFnbDashboard } from 'services/hooks/fnb/useFnbDashboard';
import { useFunda } from 'services/hooks/items/useFunda';

export const FnbReportPage: FC = () => {
	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);

	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });

	const CustomSelectBox = () => {
		const [customItem, setCustomItem] = React.useState('');

		const handleChange = (event: SelectChangeEvent) => {
			setCustomItem(event.target.value);
		};
		return (
			<div>
				<FormControl sx={{ minWidth: 250, outline: "none" }} size="small" className="bg-white border-cbs-border border-0.5 p-1 text-[13px]">
					<Select
						value={customItem}
						onChange={handleChange}
						displayEmpty
						className="outline-none"
					>
						<MenuItem value="" className="text-black">
							Winggo Thái Thịnh
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			</div>
		)
	}

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	const [keywordFunda, setKeywordFunda] = useState("");
	const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager: listFunda, totalPage, refetch } = useFunda({ 
		params: { 
			keyword: keywordFunda,  
			limit: 30,  
		}, 
		isFetchList: true, 
		isFetchInfo: false
	});
	const fundaIDActive = Object.entries(listFunda?.[0]|| [])?.[0]?.[1]?._id;
	const [valueFunda, setValueFunda] = React.useState(fundaIDActive);
	useEffect(() => {
		if(fundaIDActive){
			setValueFunda(fundaIDActive)
		}
	}, [fundaIDActive]);

	const [from, setFrom] = React.useState(moment().format("YYYY-MM-DD"));
	const [to, setTo] = React.useState(moment().format("YYYY-MM-DD"));
	const [type, setType] = React.useState("1");
	
	const CustomSelectBox1 = () => {
		const handleChange = (event: SelectChangeEvent) => {
			setValueFunda(event.target.value);
		};
		return (
			<div>
				<FormControl sx={{ minWidth: 250, outline: "none" }} size="small" className="bg-white border-cbs-border border-0.5 p-1 text-[13px]">
					<Select
						value={Object.entries(listFunda?.[0]|| [])?.[0]?.[1]?._id}
						onChange={handleChange}
						displayEmpty
						className="outline-none"
					>
						{(listFunda[pageIndex]??[]).map((item: any)=> {
							return (
								<MenuItem value={item._id} className="text-black" key={item._id}>
									{item.name}
								</MenuItem>
							)
						})}
					</Select>
				</FormControl>
			</div>
		)
	}

	const CustomSelectBox2 = () => {
		const handleChange = (event: SelectChangeEvent) => {
			const type = event.target.value;
			//Hôm nay
			if(type == "1"){
				setFrom(moment().format("YYYY-MM-DD"));
				setTo(moment().format("YYYY-MM-DD"));
				setType("1");
			}
			//Hôm qua
			if(type == "2"){
				setFrom(moment().subtract(1, 'day').format("YYYY-MM-DD"));
				setTo(moment().subtract(1, 'day').format("YYYY-MM-DD"));
				setType("2");
			}

			//Tuần này
			if(type == "3"){
				setFrom(moment().startOf('week').format("YYYY-MM-DD"));
				setTo(moment().endOf("week").format("YYYY-MM-DD"));
				setType("3");
			}

			//Tuần trước
			if(type == "4"){
				setFrom(moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD'));
				setTo(moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD'));
				setType("4");
			}

			//Tháng này
			if(type == "5"){
				setFrom(moment().startOf('month').format("YYYY-MM-DD"));
				setTo(moment().endOf("month").format("YYYY-MM-DD"));
				setType("5");
			}

			//Tháng trước
			if(type == "6"){
				setFrom(moment().subtract(1,'months').startOf('month').format('YYYY-MM-DD'));
				setTo(moment().subtract(1,'months').endOf('month').format('YYYY-MM-DD'));
				setType("6");
			}
		};

		return (
			<div>
				<FormControl sx={{ minWidth: 250, outline: "none" }} size="small" className="bg-white border-cbs-border border-0.5 p-1 text-[13px]">
					<Select
						value={type}
						onChange={handleChange}
						displayEmpty
						className="outline-none"
					>
						<MenuItem value="1" className="text-black">
							Hôm nay
						</MenuItem>
						<MenuItem value="2" className="text-black">
							Hôm qua
						</MenuItem>
						<MenuItem value="3" className="text-black">
							Tuần này
						</MenuItem>
						<MenuItem value="4" className="text-black">
							Tuần trước
						</MenuItem>
						<MenuItem value="5" className="text-black">
							Tháng này
						</MenuItem>
						<MenuItem value="6" className="text-black">
							Tháng trước
						</MenuItem>
					</Select>
				</FormControl>
			</div>
		)
	}

	const { listOrderByProperty } = useFnbDashboard({ 
		params: { 
			option: 1,
			fundasID: [valueFunda],
			fromDate: from,
			toDate: to,
		}, 
		isFetchListOrderByProperty: !!valueFunda, 
	});

	return (
		<main className="h-full overflow-auto bg-cbs-table-highlight">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6">
				<div className="flex items-center">
					{/* <button onClick={history.goBack}>
						<img src="/images/common/button_back.png" alt="Button Back" />
					</button> */}
					<span className="font-bold text-[18px]">Tất cả cơ sở</span>
				</div>
				{/* <div className="flex items-center">
					<button className="w-10 h-10 rounded-full bg-cbs-gray flex items-center justify-center hover:bg-accent-light">
						<img src={Vertical3Dots} alt="3Dots" />
					</button>
				</div> */}
			</header>
			<div className="my-3">
				<div className="flex gap-3 mx-5 mb-3 items-end">
					<div>
						<div className="text-cbs-subtext mb-1">Cơ sở</div>
						<CustomSelectBox1 />
					</div>
					<div>
						<div className="text-cbs-subtext mb-1">Thời gian</div>
						<CustomSelectBox2 />
					</div>
					{/* <div>
						<div className="text-cbs-subtext mb-1">So sánh</div>
						<CustomSelectBox />
					</div> */}
					{/* <Button variant="contained" disableElevation className="h-[40px] border-0.5 border-cbs-border" sx={{ textTransform: "none", padding: "0 1.25rem" }}>
						Xem báo cáo
					</Button> */}
				</div>

				<div className="flex gap-3 mx-5 mb-3 bg-white border-0.5 border-cbs-border p-3">
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Tổng doanh số</div>
							<div className="text-[20px]" style={{ fontSize: "20px" }}>10.000.000 đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Triết khấu</div>
							<div className="text-[20px]" style={{ fontSize: "20px" }}>1.000.000 đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Giảm giá</div>
							<div className="text-[20px]" style={{ fontSize: "20px" }}>2.000.000 đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Doanh thu thực</div>
							<div className="text-[20px]" style={{ fontSize: "20px" }}>7.000.000 đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Tiền thuế</div>
							<div className="text-[20px]" style={{ fontSize: "20px" }}>700.000 đ</div>
						</div>
					</div>
				</div>

				<div className="flex gap-5 mx-5 my-5 ">
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Số khách hàng</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>10</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Số đơn hàng</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>20</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Số sản phẩm</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>50</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">TB sản phẩm/khách</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>5</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">TB sản phẩm/đơn</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>2,50</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">TB doanh thu/đơn</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>200.000</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Doanh số Off</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>1.500.000</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Doanh số App</div>
							<div className="font-bold" style={{ fontSize: "20px" }}>10.500.000</div>
						</div>
					</div>
				</div>

				<div className="mx-5">
					<div className="text-primary-gray mb-3">Doanh thu tổng hợp</div>
					<div className="p-3 bg-white">
						<ChartRevenueByHour />
					</div>
				</div>
			</div>
		</main>
	);
};
