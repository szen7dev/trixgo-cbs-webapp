/*=====1.LIBRARY=====*/
import React, { FC, useCallback, useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import debounce from "lodash/debounce";
import moment from "moment";
import { formatNumberMoney } from "utils/converter";
import { toast } from "react-toastify";

/*=====2.CSS=====*/

/*=====3.ICONS=====*/
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import QrCodeIcon from "assets/images/icons8-qr-code-100 1.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, ModalContainer } from "shareComponents/common";
import PaginateV2 from "shareComponents/common/PaginateV2";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/
import { useModal } from "services/hooks/useModal";
import { useCheckPerAccessApp } from "services/hooks/auth/usePermissions";
import { useFnbProduct } from 'services/hooks/fnb/useFnbProduct';
import { useFnbQuota } from 'services/hooks/fnb/useFnbQuota';
import { useFunda } from 'services/hooks/items/useFunda';
import { useFnbShift } from 'services/hooks/fnb/useFnbShift';
import { useAuth } from 'services/hooks/auth/useAuth';

import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb";
import { FNB_CHANNEL, FNB_SERVICE, FNB_PAYMENT, FNB_ORDER_STATUS } from "apis/localdb";

export const FnbBillOrder: FC = () => {
    const { orderID } = useParams<{ orderID: string }>()
    // console.log({orderID})

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

    console.log(info)

    return (
        <main className="min-h-screen overflow-auto bg-cbs-border">
            <div className="mx-auto bg-white h-full p-2 flex flex-col justify-between	" style={{ width: "301px", minHeight:"calc(100vh - 20px)", marginTop:"10px" }}>
                <div>
                    <div className="flex">
                        <img src={QrCodeIcon} alt="" style={{ width: "90px", height: "90px" }} />
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
                            <div> {moment(info?.createAt).format('HH:mm DD/MM/YYYY')}</div>
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
                                <tr>
                                    <td className="text-left">Trà Sữa Socola kem trứng nướng - Size M</td>
                                    <td className="text-center px-1">2</td>
                                    <td className="text-right">56.000</td>
                                </tr>
                                <tr>
                                    <td className="text-left">Trà Sữa Socola kem trứng nướng - Size M</td>
                                    <td className="text-center px-1">2</td>
                                    <td className="text-right">56.000</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="border-t-0.5 border-b-0.5 border-cbs-border  mx-2 py-1 text-[13px]">
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="font-bold">
                                    <th className="w-1/2 text-left">Tiền hàng</th>
                                    <th className="w-[35px] text-center px-1">4</th>
                                    <th className="w-[75px] text-right">112.000</th>
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
    );
};
