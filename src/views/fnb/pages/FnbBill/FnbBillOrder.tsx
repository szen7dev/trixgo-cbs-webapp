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
                limit: 200,
                orderID,
                populates: JSON.stringify({
                    path: 'funda shift customer userCreate',
                    select: "name sign address fullname phone bankAccount bankQrcode",
                    populate: {
                        path: 'bankQrcode',
                        select: "_id path"
                    }
                }) 
            }, 
            isFetchList:false, 
            isFetchInfo:  true  
        }
    )
    // console.log(info?.funda)
    
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

    useEffect(() => {
        if (orderProducts && orderProducts.length) {
            setTimeout(function(){
                window.print();
            },1500);
            // window.print();
        }
    }, [orderProducts]);

    // console.log(orderProducts)
    // console.log(info)

    return (
        <main className="h-screen overflow-auto bg-cbs-border">
            <div className="mx-auto my-2 bg-white h-full p-2 flex flex-col justify-between">
            {/* <div className="mx-auto bg-white h-full p-2 flex flex-col justify-between"> */}
                <div>
                    <div className="flex">
                        <Link to ={`/fnb/home`}>
                            <img src={`${process.env.REACT_APP_URL_S3}${info?.funda?.bankQrcode?.path}`} alt="" style={{ width: "90px", height: "90px" }} />
						</Link>
                        <div className="text-center mt-3">
                            <div className="font-bold text-[12px]">{info?.funda?.name}</div>
                            <div className="text-[12px]">{info?.funda?.address}</div>
                            <div className="text-[12px]">{info?.funda?.phone}</div>
                        </div>
                    </div>
                    <div className="text-center py-1">
                        <Link to={`/fnb/home/${info?._id}/print/2`}>
                            <div className="font-bold text-[12px]" title="Bấm vào đây để in Tem">HÓA ĐƠN THANH TOÁN <i className="text-cbs-primary">(in Tem)</i></div>
                        </Link>
                        <div className="text-[12px]">Số: {info?.sign} | Mã đơn app: <b>{FNB_CHANNEL[Number(info.salesChannel)-1].sign}{info.appOrderSign}</b></div>
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
                    <div className="py-2 mx-2 text-[10px]">
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
                                orderProducts.map((item: any) => {
                                    const amount = Number(item.quantity*item.unitPrice)

                                    // if(item?.subProducts){
                                    //     for(const subProduct of item?.subProducts){
                                    //         amount = Number(amount) + Number(item.quantity)*Number(subProduct.unitPrice)
                                    //     }
                                    // }
                                    
                                    let toppingPrice = 0
                                    let str = ""

                                    if (item?.subProducts) {
                                        for (const subProduct of item?.subProducts) {
                                            // str = str + subProduct.name + ", ";

                                            if(item.size == 1 && info.salesChannel == 1){
                                                toppingPrice = Number(toppingPrice) + Number(subProduct.unitPrice)
                                                str = str + subProduct.name + "-" + formatNumberMoney(subProduct.unitPrice) + ", "
                                            }

                                            if(item.size == 1 && info.salesChannel != 1){
                                                toppingPrice = Number(toppingPrice) + Number(subProduct.unitPrice2)
                                                str = str + subProduct.name + "-" + formatNumberMoney(subProduct.unitPrice2) + ", "
                                            }

                                            if(item.size == 2 && info.salesChannel == 1){
                                                toppingPrice = Number(toppingPrice) + Number(subProduct.unitPrice3)
                                                str = str + subProduct.name + "-" + formatNumberMoney(subProduct.unitPrice3) + ", "
                                            }

                                            if(item.size == 2 && info.salesChannel != 1){
                                                toppingPrice = Number(toppingPrice) + Number(subProduct.unitPrice4)
                                                str = str + subProduct.name + "-" + formatNumberMoney(subProduct.unitPrice4) + ", "
                                            }
                                        }
                                    }

                                    return (
                                        <tr key={item._id}>
                                            <td className="text-left">
                                                <p><b>{item.product?.name} - {formatNumberMoney(Number(amount) - Number(toppingPrice))} - Size {item?.size >=1 && FNB_SIZE[Number(item.size)-1].text}</b></p>
                                                {
                                                    str != "" ? <p><i>{str}</i></p> : <></>
                                                }
                                            </td>
                                            <td className="text-center px-1">{item.quantity}</td>
                                            <td className="text-right">{formatNumberMoney(amount)}</td>
                                        </tr>
                                    )
                                })
                            }
                                <tr>
                                    <td className="text-left">Tổng</td>
                                    <td className="text-center px-1"></td>
                                    <td className="text-right font-bold">{formatNumberMoney(info?.total)}</td>
                                </tr>
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
                    <div className="border-t-0.5 border-b-0.5 border-cbs-border  mx-2 py-1 text-[12px]">
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
                    <div className="flex justify-between border-b-0.5 border-cbs-border  mx-2 py-1 text-[12px]">
                        <div>Hình thức thanh toán</div>
                        <div>{info?.paymentMethod >=1 && FNB_PAYMENT[Number(info?.paymentMethod)-1].text}</div>
                    </div>
                    <div className="text-center italic text-[12px]  mx-4 py-1 ">{info?.funda?.bankAccount}</div>
                </div>
                <div className="w-full h-[30px]"></div>
            </div>
        </main>
    )
}