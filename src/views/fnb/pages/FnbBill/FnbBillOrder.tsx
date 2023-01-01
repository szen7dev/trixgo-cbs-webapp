/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney, convertCurrency } from "utils/converter";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import QrCodeIcon from "assets/images/icons8-qr-code-100 1.svg";

/*=====4.PAGES/COMPONENTS=====*/

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

import API from "apis/repository";
import { convertObToUrl } from "utils";

import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb";
import { FNB_CHANNEL, FNB_SERVICE, FNB_PAYMENT, FNB_ORDER_STATUS, FNB_SIZE } from "apis/localdb";

export const FnbBillOrder: FC = () => {
    const { orderID } = useParams<{ orderID: string }>()
    const [orderProducts, setOrderProducts] = useState([]);

    const { info, refetch } = useFnbOrder(
        { 
            params: { 
                orderID,
                populates: JSON.stringify({
                    path: 'funda shift customer userCreate',
                    select: "name sign address fullname phone bankAccount",
                }) 
            }, 
            isFetchList:false, 
            isFetchInfo:  true  
        }
    )
    
    useEffect(() => {
        const fetchOrderProducts = async () => {
            const response = await API.get(
                `/api/fnb/order_products?${convertObToUrl({
                orderID,
                populates: JSON.stringify({
                    path: 'subProducts product',
                    populate: {
                    path: 'images',
                    }
                })
                })}`,
            );
            const { data, status } = response?.data;

            if (status !== 200) return;

            setOrderProducts(data.listRecords)
        }

        fetchOrderProducts();
    }, [])

    console.log(orderProducts)
    // console.log(info)

    return (
        <main className="h-screen overflow-auto bg-cbs-border">
            <div className="mx-auto my-2 bg-white h-full p-2 flex flex-col justify-between">
            {/* <div className="mx-auto bg-white h-full p-2 flex flex-col justify-between"> */}
                <div>
                    <div className="flex">
                        <Link to ={`/fnb/home`}>
                            <img src={QrCodeIcon} alt="" style={{ width: "90px", height: "90px" }} />
						</Link>
                        <div className="text-center mt-3">
                            <div className="font-bold text-[14px]">{info?.funda?.name}</div>
                            <div className="text-[13px]">Địa chỉ: {info?.funda?.address}</div>
                            <div className="text-[13px]">Điện thoại: {info?.funda?.phone}</div>
                        </div>
                    </div>
                    <div className="text-center py-1">
                        <div className="font-bold text-[14px]">HÓA ĐƠN THANH TOÁN</div>
                        <div className="text-[13px]">Số: {info?.sign}</div>
                    </div>
                    <div className="border-t-0.5 border-b-0.5 border-cbs-border mx-2 py-1 text-[13px]">
                        <div className="flex justify-between">
                            <div className="font-bold">{info?.name}</div>
                            <div>{moment(info?.createAt).format('HH:mm DD/MM/YYYY')}</div>
                        </div>
                        <div>
                            <span>Thu ngân: <span>{info?.userCreate?.fullname}</span></span>
                        </div>
                    </div>
                    <div className="py-2 mx-2 text-[13px]">
                        <table className=" table-fixed	w-full">
                            <thead>
                                <tr>
                                    <th className="w-1/2 text-left">Mặt hàng</th>
                                    <th className="w-[35px] text-center px-1">SL</th>
                                    <th className="w-[75px] text-right">Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                orderProducts.map((item: any) => (
                                    // {
                                    //     let total = 0
                                    //     ...
                                    // }
                                    <>
                                        <tr key={item._id}>
                                            <td className="text-left">{item.product?.name} - Size {item?.size >=1 && FNB_SIZE[Number(item.size)-1].text}</td>
                                            <td className="text-center px-1">{item.quantity}</td>
                                            <td className="text-right">{formatNumberMoney(Number(item.quantity*item.unitPrice))}</td>
                                        </tr>
                                        {
                                            item?.subProducts?.map((subProduct: any) => (
                                                <tr key={subProduct._id}>
                                                    <td className="text-left">{subProduct.name.trim()}</td>
                                                    <td className="text-center px-1"></td>
                                                    <td className="text-right">{formatNumberMoney(subProduct.unitPrice)}</td>
                                                </tr>
                                            ))
                                        }
                                    </>
                                ))
                            }
                                <tr>
                                    <td className="text-left">Chiết khấu</td>
                                    <td className="text-center px-1"></td>
                                    <td className="text-right">{formatNumberMoney(info?.discount)}</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Giảm giá</td>
                                    <td className="text-center px-1"></td>
                                    <td className="text-right">{formatNumberMoney(info?.salesoff)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t-0.5 border-b-0.5 border-cbs-border  mx-2 py-1 text-[13px]">
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="font-bold">
                                    <th className="w-1/2 text-left">Tiền hàng</th>
                                    <th className="w-[35px] text-center px-1"></th>
                                    <th className="w-[75px] text-right">{formatNumberMoney(info?.amount)}đ</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="flex justify-between border-b-0.5 border-cbs-border  mx-2 py-1 text-[13px]">
                        <div>Hình thức thanh toán</div>
                        <div>{info?.paymentMethod >=1 && FNB_PAYMENT[Number(info?.paymentMethod)-1].text}</div>
                    </div>
                    <div className="text-center italic text-[13px]  mx-4 py-1 ">{info?.funda?.bankAccount}</div>
                </div>
                <div className="w-full h-[30px]"></div>
            </div>
        </main>
    )
}