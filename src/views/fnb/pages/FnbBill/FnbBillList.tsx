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

export const FnbBillList: FC = () => {
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
            isFetchList: false,
            isFetchInfo: true
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

    // useEffect(() => {
    //     if (orderProducts && orderProducts.length) {
    //         window.print();
    //     }
    // }, [orderProducts]);

    console.log(orderProducts)
    // console.log(info)

    return (
        <main className="h-screen overflow-auto bg-cbs-border">
            {/* <div className="h-full mx-auto bg-cbs-gray my-3 pb-1" style={{ width: "188px" }}> */}
            <div className="h-full mx-auto bg-cbs-gray my-3 pb-1">
                {/* <div className="mx-auto my-2 bg-white h-full p-2 flex flex-col justify-between"> */}
                {
                    orderProducts.map((item: any, index: number) => {
                        // let amount = Number(item.quantity * item.unitPrice)
                        let amount = Number(item.unitPrice)

                        if (item?.subProducts) {
                            for (const subProduct of item?.subProducts) {
                                amount = Number(amount) + Number(subProduct.unitPrice)
                            }
                        }
                        const quantity = [];
                        for (let i = 1; i <= Number(item.quantity); i++) {
                            quantity.push(i);
                        }

                        return (
                            <div key={index}>
                                {quantity.map((e) => {
                                    return (
                                        <div key={`${e}.${item._id}`} className="bg-white p-2 mb-5 rounded-md border-0.5 border-cbs-border ">
                                            <div className="border-b-0.5 border-cbs-border pb-1">
                                                <div className="font-bold">
                                                    <Link to={`/fnb/home`}>
                                                        {info?.funda?.name}
                                                    </Link>
                                                </div>
                                                <div className="flex justify-between ">
                                                    {/* <div>{FNB_SERVICE[Number(info?.service)-1]?.text} | {info?.name} | {info?.sign}</div> */}
                                                    <div>{e}/{Number(item.quantity)}</div>
                                                </div>
                                            </div>

                                            <div className="pt-2">
                                                <div>{item.product?.name} - Size {item.product?.size >= 1 && FNB_SIZE[Number(item.product.size) - 1].text}</div>
                                                <div>{item?.note}</div>
                                                <div className="flex justify-between">
                                                    <div>{moment(info?.createAt).format('HH:mm DD/MM/YYYY')}</div>
                                                    <div className="font-bold">{formatNumberMoney(amount)}đ</div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}