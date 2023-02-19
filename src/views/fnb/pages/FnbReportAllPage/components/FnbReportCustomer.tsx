/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import API from "apis/repository";
import { convertObToUrl } from "utils";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";

/*=====4.PAGES/COMPONENTS=====*/
import PaginateV2 from "shareComponents/common/PaginateV2";
import { ModalZoomView } from "shareComponents/common";

/*=====5.TYPINGS=====*/
import { ImageProps } from "typings/common";

/*=====6.HOOKS/APIS=====*/
import { APP_ID } from "apis/localdb";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbMistake } from 'services/hooks/fnb/useFnbMistake';
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { FNB_INTERNAL } from "apis/localdb";
import { createLinkAndClick } from "utils";

export const FnbReportCustomer: FC = () => {
	const [getOrders, setOrders] = useState([])
	// useEffect(() => {
	// 	document.title = "Trixgo | FnB";
	// }, []);
	const history = useHistory();

	useEffect(() => {
        const fetchOrders = async () => {
            const response = await API.get(
                `/api/fnb/orders/get-list-by-property?option=8`,
            );
            const { data, status } = response?.data;
			// console.log(data)

            if (status !== 200) return;

            setOrders(data)
        }

        fetchOrders();
    }, [])

	console.log(getOrders)

	const [orderProducts, setOrderProducts] = useState([]);
	useEffect(() => {
        const fetchOrderProducts = async () => {
            const response = await API.get(
                `/api/fnb/order_products?${convertObToUrl({
                orderID: "63edc0d436b5d454746ae3e5",
                populates: JSON.stringify({
                    path: 'subProducts product',
                    populate: {
                    path: 'images',
                    }
                })
                })}`,
            );
            const { data, status } = response?.data;
            // console.log(data)

            if (status !== 200) return;

            setOrderProducts(data.listRecords)
        }

        fetchOrderProducts();
    }, [])
	console.log(orderProducts)

	return (
		<main className="h-full overflow-auto">
			<header className="sticky top-0 bg-primary-light z-10 flex items-center justify-between h-[50px] px-6 border border-primary-border">
				<div className="flex items-center">
					<button onClick={history.goBack} className="mr-5">
                        <img src="/images/common/button_back.png" alt="Button Back" />
                    </button>
					<p className="text-lg mr-10">Danh sách khách hàng tiềm năng</p>
				</div>
				<button title="Tải dữ liệu Excel">
					Tải dữ liệu Excel
				</button>
			</header>

			<table className="table-fixed border-collapse w-full overflow-auto border-l border-r border-primary-border">
				<thead className="bg-cbs-table-header h-10 border-b border-primary-border">
					<tr className="text-left text-sm text-primary-gray text-[14px]">
						<th className="pb-1 pt-1 w-[50px] font-normal">
							<div className="pl-2">
								TT
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal w-1/4">
							<div className="pl-2">
								Tên khách hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Điện thoại
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Tổng giá trị thanh toán
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Tổng số đơn hàng
							</div>
						</th>
						<th className="pb-1 pt-1 font-normal">
							<div className="pl-2">
								Ghi chú
							</div>
						</th>
					</tr>
				</thead>
				{/* {
					(listWithPager[pageIndex]??[]).map((item: any, i: any) => (
						<tr key={item._id} className="text-[14px]">
							<td className={"p-2 border-0.5 border-primary-border text-cente"}>{i+1}</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.mistake?.name}
								<p className=" text-[13px] text-gray-500"><i>Người ghi nhận: {item?.userCreate?.fullname}</i></p>
								<p className=" text-[13px] text-gray-500"><i>Thời gian: {moment(item.createAt).format('DD/MM/YYYY HH:mm')}</i></p>
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.executor?.fullname}
							</td>
							<td className={"p-2 border-0.5 border-primary-border "}>
								{item?.funda?.name}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{formatNumberMoney(item?.amount||0)}
							</td>
							<td className={"p-2 border-0.5 border-primary-border"}>
								{item?.note}
							</td>
						</tr>
					))
				} */}
			</table>
		</main>
	);
};