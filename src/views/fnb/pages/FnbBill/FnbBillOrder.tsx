/*=====1.LIBRARY=====*/
import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import zaloOA from "assets/images/WinggoZaloOA.png";

import API from "apis/repository";
import { convertObToUrl } from "utils"
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { FNB_CHANNEL, FNB_PAYMENT, FNB_SIZE } from "apis/localdb";

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

    const value = `https://app.winggo.vn/mobile/activity/${info?.customer._id}/w6g9o22`

    return (
        <main className="h-screen overflow-auto bg-cbs-border">
            <div className="mx-auto my-2 bg-white h-full p-2 flex flex-col justify-between">
                <div>
                    <div className="relative mb-6" style={{ height: "110px" }}>
                        <Link to ={`/fnb/home`}>
                            <div className="mt-3">
                                <div className="font-bold text-[12px]">{info?.funda?.name}</div>
                                <div className="text-[12px]">{info?.funda?.address}</div>
                                <div className="text-[12px]">{info?.funda?.phone}</div>
                            </div>
						</Link>
                        <div>
                            <img src={zaloOA} alt="ZaloOA" style={{ width: "125px", height: "125px" }} className="absolute top-0 right-0 mb-2"/>
                        </div>
                    </div>
                    <div className="text-center py-1">
                        <Link to={`/fnb/home/${info?._id}/print/2`}>
                            <div className="font-bold text-[12px]" title="Bấm vào đây để in Tem">HÓA ĐƠN THANH TOÁN <i className="text-cbs-primary">(in Tem)</i></div>
                        </Link>
                        <div className="text-[12px]">Số: <b>{info?.sign}</b> | Mã đơn app: <b>{FNB_CHANNEL[Number(info?.salesChannel)-1]?.sign}{info?.appOrderSign}</b></div>
                        <div className="text-[12px]">
                            <p><i>Nếu có điều chưa hài lòng về sản phẩm dịch vụ của Winggo, xin bạn vui lòng liên hệ tới Hotline <b>0985692022</b> hoặc fanpage https://facebook.com/TraSuaWinggo để được hỗ trợ, trước khi đánh giá số Sao (*) trên <b>Food App</b></i></p>
                        </div>
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
                                    <td className="text-left">Giảm giá (chỉ áp dụng đơn tại quán)</td>
                                    <td className="text-center px-1"></td>
                                    <td className="text-right">{formatNumberMoney(info?.salesoff)}</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Trừ tích điểm/gói trả trước (chỉ áp dụng đơn tại quán)</td>
                                    <td className="text-center px-1"></td>
                                    <td className="text-right">{formatNumberMoney(info?.credit)}</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Trừ voucher (chỉ áp dụng đơn tại quán)</td>
                                    <td className="text-center px-1"></td>
                                    <td className="text-right">{formatNumberMoney(info?.offer)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t-0.5 border-b-0.5 border-cbs-border mx-2 py-1 text-[12px]">
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="font-bold">
                                    <th className="w-1/2 text-left">Tiền hàng</th>
                                    <th className="w-[35px] text-center px-1"></th>
                                    <th className="w-[75px] text-right">{formatNumberMoney(info?.amount)}</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                    <div className="flex justify-between border-b-0.5 border-cbs-border mx-2 py-1 text-[12px]">
                        <div>Phí ship (nếu có)</div>
                        <div>{formatNumberMoney(info?.shippingFee)}</div>
                    </div>
                    <div className="flex justify-between border-b-0.5 border-cbs-border mx-2 py-1 text-[12px]">
                        <div>Hình thức thanh toán</div>
                        <div>{info?.paymentMethod >=1 && FNB_PAYMENT[Number(info?.paymentMethod)-1].text}</div>
                    </div>
                    {
                        (info?.paid && info?.paid > 0 && info?.paymentMethod == 1) ?
                        <div className="flex justify-between border-b-0.5 border-cbs-border mx-2 py-1 text-[12px] font-bold"><div>Tiền mặt khách trả:</div> <div>{formatNumberMoney(info?.paid)}</div></div>
                        : <></>
                    }
                     {
                        (info?.paid && info?.paid > 0 && info?.paymentMethod == 1) ?
                        <div className="flex justify-between border-b-0.5 border-cbs-border mx-2 py-1 text-[12px]"><div>Tiền thừa trả lại:</div> <div>{formatNumberMoney(info?.paid - info?.amount)}</div></div>
                        : <></>
                    }
                    <div className="text-center italic text-[12px] border-cbs-border mx-4 py-1 ">{info?.funda?.bankAccount}</div>
                    <hr className="border-cbs-border" />
                    <div className="text-[12px] text-center mt-3">
                        <p className=""><b>CẢM ƠN BẠN ĐÃ TIN TƯỞNG VÀ LỰA CHỌN WINGGO</b></p>
                        <p className="">Quét mã QR (trên cùng, bên tay phải), bấm quan tâm Zalo OA <b>Trà sữa Winggo</b> để nhận Vocuher ưu đãi <b>20.000đ</b></p>

                        <hr className="border-cbs-border"/>
                        <p className="text-center mt-3"><i>Nếu Quý khách yêu quý Winggo vui lòng giới thiệu Winggo tới bạn bè để nhận 02 Vocuher <b>20.000đ và 35%/</b> 01 bạn bè mới</i></p>
                        <p><i>Thông tin ưu đãi: https://winggo.vn/uu-dai</i></p>
                    </div>
                </div>
                <div className="w-full h-[100px]"></div>
            </div>
        </main>
    )
}