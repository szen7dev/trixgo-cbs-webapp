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

/*=====7.OTHER=====*/
import { APP_ID } from "apis/localdb";

export const FnbBillOrder: FC = () => {

    return (
        <main className="min-h-screen overflow-auto bg-cbs-border">
            <div className="mx-auto bg-white h-full p-2 flex flex-col justify-between	" style={{ width: "301px", minHeight:"calc(100vh - 20px)", marginTop:"10px" }}>
                <div>
                    <div className="flex justify-between">
                        <img src={QrCodeIcon} alt="" style={{ width: "90px", height: "90px" }} />
                        <div className="text-center mt-3">
                            <div className="font-bold text-[14px]">Winggo Thụy Khuê</div>
                            <div className="text-[13px]">38 Thụy Khuê, Tây Hồ, Hà Nội</div>
                            <div className="text-[13px]">SĐT: 0358423688</div>
                        </div>
                    </div>
                    <div className="text-center py-1">
                        <div className="font-bold text-[14px]">HÓA ĐƠN THANH TOÁN</div>
                        <div className="text-[13px]">Số: C125433312</div>
                    </div>
                    <div className="border-t-0.5 border-b-0.5 border-cbs-border mx-2 py-1 text-[13px]">
                        <div className="flex justify-between">
                            <div className="font-bold">T12447</div>
                            <div>20:52 17/12/2022</div>
                        </div>
                        <div>
                            <span>Thu ngân: <span>Winggo Thụy Khuê</span></span>
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
                        <div>Chuyển khoản</div>
                    </div>
                    <div className="text-center italic text-[13px]  mx-4 py-1 ">STK: 10123456789 - VP Bank - Truong Viet A VP Bank - Truong Viet A</div>
                </div>
                <div className="w-full h-[30px]"></div>
            </div>
        </main>
    );
};
