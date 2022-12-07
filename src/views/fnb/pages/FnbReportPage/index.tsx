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
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import ChartRevenueByHour from "./components/chart";
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";

const TYPE_PRODUCT = [
	{ value: 1, text: "Thông thường" },
	{ value: 2, text: "Topping" },
]
export const FnbReportPage: FC = () => {
	useEffect(() => {
		document.title = "Trixgo | FnB";
	}, []);

	const history = useHistory();
	const { productID } = useParams<{ productID: string }>();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.PCM.id });
	const [idsChecked, setIdsChecked] = useState<Array<string>>([]);
	const [keyword, setKeyword] = useState("");
	const { info: infoProduct } = useFnbProduct({ params: { productID }, isFetchList: false, isFetchInfo: true });
	console.log({ infoProduct });
	const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbQuota({
		params: {
			keyword: keyword,
			productID,
			populates: JSON.stringify({
				path: 'goods', select: "name unit"
			})
		}, isFetchList: true, isFetchInfo: false
	});
	console.log({ listWithPager });
	const getStateChecked = useCallback((id: string) => {
		return idsChecked.includes(id) ? true : false;
	}, [idsChecked]);

	const onClickCheckButton = (id: string) => {
		setIdsChecked([id]);
	};

	const getStateCheckedAll = useCallback(() => {
		return idsChecked.length == listWithPager.length;
	}, [idsChecked]);

	const onClickCheckAll = () => {
		if (idsChecked.length == listWithPager.length) {
			setIdsChecked([]);
		} else {
			const idsAll = listWithPager.map((e: any) => e._id);
			setIdsChecked(idsAll);
		}
	};

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

	const [modalCreateProject, setModalCreateProject] = useState<boolean>(false);
	const toggleModalCreateProject = () => setModalCreateProject(!modalCreateProject);

	const [initialValues, setInitialValues] = useState(null);
	const onConfirmCreateProject = () => refetch();

	useEffect(() => {
		if (isSuccess && !(hasPermission && dataUserAccess?.level == 0)) {
			toast.error("Không có quyền truy cập. Bạn không phải là quản trị viên!");
			history.push("/")
		}
	}, [hasPermission, dataUserAccess]);

	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
	const ref = React.useRef<PaginateHandle>(null);
	const [pageIndex, setPageIndex] = useState(0);

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
						<CustomSelectBox />
					</div>
					<div>
						<div className="text-cbs-subtext mb-1">Thời gian</div>
						<CustomSelectBox />
					</div>
					<div>
						<div className="text-cbs-subtext mb-1">So sánh</div>
						<CustomSelectBox />
					</div>
					<Button variant="contained" disableElevation className="h-[40px] border-0.5 border-cbs-border" sx={{ textTransform: "none", padding: "0 1.25rem" }}>
						Xem báo cáo
					</Button>
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
