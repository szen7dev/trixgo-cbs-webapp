import React, { FC, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { toast } from "react-toastify";
import { APP_ID } from "apis/localdb";
import PaginateV2 from "shareComponents/common/PaginateV2";
import { formatNumberMoney } from "utils/converter";
import ChartGroupBy from "./components/chart";
import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useFnbDashboard } from 'services/hooks/fnb/useFnbDashboard';
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbCustomerCare, useCustomerJourneyByProperty } from "services/hooks/fnb/useFnbCustomerCare";
import { useContactByProperty } from "services/hooks/items/useContact";
import GraySquare from "assets/images/Frame 4415.svg";

export const CrmDashboardPage: FC = () => {
	type PaginateHandle = React.ElementRef<typeof PaginateV2>;
    const ref = React.useRef<PaginateHandle>(null);
    const [pageIndex, setPageIndex] = useState(0);

	useEffect(() => {
		document.title = "Seller";
	}, []);

	const history = useHistory();
	const { hasPermission, dataUserAccess, isSuccess } = useCheckPerAccessApp({ appID: APP_ID.FNB.id });

	useEffect(() => {
		if (isSuccess && !(hasPermission)) {
			toast.error("Bạn không có quyền truy cập chức năng này. Vui lòng liên hệ ban quản trị.");
			history.push("/")
		}
	}, [hasPermission]);
	
	const { isLoading, fetchNextPage, hasNextPage, totalRecord, listWithPager: listFunda, totalPage, refetch } = useFunda({ 
		params: { 
			isMember: 1,
			limit: 30,  
		}, 
		isFetchList: true, 
		isFetchInfo: false
	});

	const [valueFunda, setValueFunda]: any = useState([]);
	const [from, setFrom] 	= useState(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'));
	const [to, setTo] 		= useState(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'));
	const [type, setType] 	= useState("1");
	
	const CustomSelectBox1 = () => {
		const handleChange = (event: SelectChangeEvent) => {
			const value = event.target.value;
			if(value){
				setValueFunda([value]);
			}else{
				setValueFunda([]);
			}
		};

		return (
			<div>
				<FormControl sx={{ minWidth: 250, outline: "none" }} size="small" className="bg-white border-cbs-border border-0.5 p-1 text-[13px]">
					<Select
						value={valueFunda}
						onChange={handleChange}
						displayEmpty
						className="outline-none"
						placeholder="Tất cả cơ sở"
					>
						<MenuItem value="" className="text-black" key={0}>
							Tất cả cơ sở
						</MenuItem>
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
				setFrom(moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("1");
			}
			//Hôm qua
			if(type == "2"){
				setFrom(moment().subtract(1, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("2");
			}

			//Tuần này
			if(type == "3"){
				setFrom(moment().startOf('week').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().endOf("week").endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("3");
			}

			//Tuần trước
			if(type == "4"){
				setFrom(moment().subtract(1, 'weeks').startOf('week').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().subtract(1, 'weeks').endOf('week').endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("4");
			}

			//Tháng này
			if(type == "5"){
				setFrom(moment().startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().endOf("month").endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("5");
			}

			//Tháng trước
			if(type == "6"){
				setFrom(moment().subtract(1,'months').startOf('month').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().subtract(1,'months').endOf('month').endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("6");
			}

			//Năm nay
			if(type == "7"){
				setFrom(moment().startOf('year').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().endOf('year').endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("7");
			}

			//Năm trước
			if(type == "8"){
				setFrom(moment().subtract(1,'years').startOf('year').startOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setTo(moment().subtract(1,'years').endOf('year').endOf('day').format('YYYY-MM-DD HH:mm:ss'));
				setType("8");
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
						<MenuItem value="7" className="text-black">
							Năm nay
						</MenuItem>
						<MenuItem value="8" className="text-black">
							Năm trước
						</MenuItem>
					</Select>
				</FormControl>
			</div>
		)
	}

	const { listCustomerJourneyByProperty: listByJourney, refetchListCustomerJourneyByProperty: refetchListByJourney } = useCustomerJourneyByProperty({
        params: {
            // businessID,
            option: 5,
            // fromDate: inputFilter.fromDate,
            // toDate: inputFilter.toDate,
        },
        isFetchList: true
    })
	// console.log(listByJourney)

	const { listCustomerJourneyByProperty: listByMonth, refetchListCustomerJourneyByProperty: refetchListByMonth } = useCustomerJourneyByProperty({
        params: {
            // businessID,
            option: 2,
            optionTime: 2,
            optionGroup: 1,
            // fromDate: inputFilter.fromDate,
            // toDate: inputFilter.toDate,
        },
        isFetchList: true
    })
	// console.log(listByMonth)
	
    const { listByProperty, refetchListByProperty } = useContactByProperty({
        params: {
            option: 8,
            // fromDate: inputFilter.fromDate,
            // toDate: inputFilter.toDate,
        },
        isFetchList: true
    })
	// console.log(listByProperty)

	const { listOrderByProperty } = useFnbDashboard({ 
		params: { 
			option: 1,
			fundasID: valueFunda,
			fromDate: from,
			toDate: to,
		}, 
		isFetchListOrderByProperty: !!valueFunda, 
	});

	const { listOrderByProperty: listOrderByProperty4 } = useFnbDashboard({ 
		params: { 
			option: 4,
			fundasID: valueFunda,
			fromDate: from,
			toDate: to,
		}, 
		isFetchListOrderByProperty: !!valueFunda, 
	});
	// console.log(listOrderByProperty)

	let totalTotal = 0;
	let totalDiscount = 0;
	let totalSalesoff = 0;
	let totalAmount = 0;
	let totalVatAmount = 0;
	const amountCustomer = listOrderByProperty4?.length || 0;
	let totalQuantity = 0;
	let totalNumberOfProducts = 0;
	let revenueOff = 0;
	let revenueApp = 0;
	let revenueInternal = 0;
	let revenueFC = 0;
	
	listOrderByProperty?.map((item: any) => {
		totalTotal 		+= item.total
		totalDiscount 	+= item.discount;
		totalSalesoff 	+= item.salesoff;
		totalAmount 	+= item.amount;
		totalVatAmount 	+= item.vatAmount
		totalQuantity  +=item.quantity;
		totalNumberOfProducts  +=item.numberOfProducts;
	})

	// Phân loại doanh số
	listOrderByProperty?.map((item: any) => {
		if(Number(item._id.salesChannel) == 1){
			revenueOff += item.total;
		}else{
			revenueApp += item.total;
		}

		if(Number(item._id.internal) == 1){
			revenueInternal += item.total;
		}else{
			revenueFC += item.total;
		}
	})

	const product_customer_AVG = totalNumberOfProducts/amountCustomer || 0;
	const product_order_AVG = totalNumberOfProducts/totalQuantity || 0;
	const revenue_orver_AVG = totalTotal/totalNumberOfProducts || 0;

	const { listOrderByProperty: listOrderByProperty2 } = useFnbDashboard({ 
		params: { 
			option: 2,
			optionTime: 3,
			fundasID: valueFunda,
			fromDate: from,
			toDate: to,
		}, 
		isFetchListOrderByProperty: !!valueFunda, 
	});

	// Affiliate
	const array_month_aff: any = [1,2,3,4,5,6,7,8,9,10,11,12];
	const array_amount_aff: any = [0,0,0,0,0,0,0,0,0,0,0,0];
	listByProperty?.map((item: any) => {
		array_month_aff.map((subitem: any) => {
			if(subitem == item?._id?.month){
				array_amount_aff[subitem-1] = item?.quantity
			}
		})
	})

	// Hành trình trải nghiệm
	const array_month_journey: any = [1,2,3,4,5,6,7,8,9,10,11,12];
	const array_mount_journey: any = [0,0,0,0,0,0,0,0,0,0,0,0];
	listByMonth?.map((item: any) => {
		array_month_journey.map((subitem: any) => {
			if(subitem == item?._id?.month){
				array_mount_journey[subitem-1] = item?.quantity
			}
		})
	})

	// Doanh số
	const array_hours: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
	const array_amount: any = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	listOrderByProperty2?.map((item: any) => {
		array_hours.map((subitem: any) => {
			// Xử lý logic + thêm 7 giờ
			let hoursPlus7 = item?._id?.hour + 7;
			if(hoursPlus7 > 24){
				if(hoursPlus7 == 25){
					hoursPlus7 = 1;
				}

				if(hoursPlus7 == 26){
					hoursPlus7 = 2;
				}

				if(hoursPlus7 == 27){
					hoursPlus7 = 3;
				}

				if(hoursPlus7 == 28){
					hoursPlus7 = 4;
				}

				if(hoursPlus7 == 29){
					hoursPlus7 = 5;
				}

				if(hoursPlus7 == 30){
					hoursPlus7 = 6;
				}

				if(hoursPlus7 == 31){
					hoursPlus7 = 7;
				}
			}

			if(subitem == hoursPlus7){
				array_amount[subitem-1] = item?.total
			}
		})
	})

	let maxNumber = 1
	if(listByJourney && listByJourney[0].quantity){
		maxNumber = listByJourney[0].quantity
	}
	// console.log(listByJourney)
	// console.log({maxNumber})
	// console.log({array_hours})
	// console.log({array_amount})

	return (
		<main className="h-full overflow-auto bg-cbs-table-highlight">
			<div className="my-3">
				<div className="flex gap-3 mx-5 mb-3 items-end">
					<div>
						<CustomSelectBox1 />
					</div>
					<div>
						<CustomSelectBox2 />
					</div>
				</div>

				<div className="flex gap-3 mx-5 mb-3 bg-white border-0.5 border-cbs-border p-3">
					{ 
						
						listByJourney?.map((item: any, index: any) => {
							
							return (
								<div  key={index} className="flex gap-2 w-1/5 items-start	">
								<img src={GraySquare} alt="" />
								<div>
									<div className="text-primary text-[14px]">{item._id.journey.name}</div>
									<div className="text-[20px] font-bold" style={{ fontSize: "20px" }}>{formatNumberMoney(item.quantity)} <span className="text-[12px]">({Number(100*item.quantity/maxNumber).toFixed(2)} %)</span></div>
								</div>
								</div>
							) 
						})
					}
				</div>

				{/* <div className="flex gap-3 mx-5 mb-3 bg-white border-0.5 border-cbs-border p-3">
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Tổng doanh số</div>
							<div className="text-[20px] font-bold" style={{ fontSize: "20px" }}>{formatNumberMoney(totalTotal)} đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Chiết khấu</div>
							<div className="text-[20px] font-bold" style={{ fontSize: "20px" }}>{formatNumberMoney(totalDiscount)} đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Giảm giá</div>
							<div className="text-[20px] font-bold" style={{ fontSize: "20px" }}>{formatNumberMoney(totalSalesoff)} đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Doanh thu thực</div>
							<div className="text-[20px] font-bold" style={{ fontSize: "20px" }}>{formatNumberMoney(totalAmount)} đ</div>
						</div>
					</div>
					<div className="flex gap-2 w-1/5 items-start	">
						<img src={GraySquare} alt="" />
						<div>
							<div className="text-primary text-[14px]">Tiền thuế</div>
							<div className="text-[20px] font-bold" style={{ fontSize: "20px" }}>{formatNumberMoney(totalVatAmount)} đ</div>
						</div>
					</div>
				</div> */}

				<div className="flex gap-5 mx-5 my-5 ">
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Số khách hàng</div>
							<div className="" style={{ fontSize: "20px" }}>{amountCustomer}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(41, 164, 182)" }}>
						<div className="mx-4">
							<div className="text-[14px]" style={{ color: "rgba(41, 164, 182)" }}>Số đơn hàng</div>
							<div className="" style={{ fontSize: "20px" }}>{totalQuantity}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(202, 94, 89)" }}>
						<div className="mx-4">
							<div className="text-[14px]" style={{ color: "rgba(202, 94, 89)" }}>Số sản phẩm</div>
							<div className="" style={{ fontSize: "20px" }}>{Number(totalNumberOfProducts).toFixed(2)}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">TB doanh số/đơn</div>
							<div className="" style={{ fontSize: "20px" }}>{formatNumberMoney(Number(revenue_orver_AVG).toFixed(0))}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(0, 202, 153)" }}>
						<div className="mx-4">
							<div className="text-[14px]" style={{ color: "rgba(0, 202, 153)" }}>Doanh số Off</div>
							<div className="" style={{ fontSize: "20px" }}>{formatNumberMoney(revenueOff)}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(0, 202, 153" }}>
						<div className="mx-4">
							<div className="text-[14px]" style={{ color: "rgba(0, 202, 153)" }}>Doanh số App</div>
							<div className="" style={{ fontSize: "20px" }}>{formatNumberMoney(revenueApp)}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Doanh số hệ thống</div>
							<div className="" style={{ fontSize: "20px" }}>{formatNumberMoney(Number(revenueInternal).toFixed(0))}</div>
						</div>
					</div>
					<div className="flex flex-col justify-center w-1/8 rounded-md h-[90px] bg-white " style={{ boxShadow: "-5px 0px 0px 0px rgba(244, 148, 35, 1)" }}>
						<div className="mx-4">
							<div className="text-cbs-schedule-nextweek text-[14px]">Doanh số đối tác</div>
							<div className="" style={{ fontSize: "20px" }}>{formatNumberMoney(Number(revenueFC).toFixed(0))}</div>
						</div>
					</div>
				</div>

				<div className="mx-5">
					<div className="text-primary-gray mt-3 mb-1">Hành trình trải nghiệm</div>
					<div className="p-1 bg-white">
						<ChartGroupBy array_hours={array_month_journey} array_amount={array_mount_journey}/>
					</div>
				</div>

				<div className="mx-5">
					<div className="text-primary-gray mt-3 mb-1">Affiliate phát triển thành công</div>
					<div className="p-1 bg-white">
						<ChartGroupBy array_hours={array_month_aff} array_amount={array_amount_aff}/>
					</div>
				</div>

				<div className="mx-5">
					<div className="text-primary-gray mt-3 mb-1">Tổng hợp doanh số</div>
					<div className="p-1 bg-white">
						<ChartGroupBy array_hours={array_hours} array_amount={array_amount}/>
					</div>
				</div>

			</div>
		</main>
	)
}