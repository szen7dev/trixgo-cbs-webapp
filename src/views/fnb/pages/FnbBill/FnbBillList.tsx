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

export const FnbBillList: FC = () => {

    return (
        <main className="min-h-screen overflow-auto bg-cbs-border">
            {/* <div className="h-full mx-auto bg-cbs-gray my-3 pb-1" style={{ width: "188px" }}> */}
            <div className="h-full mx-auto bg-cbs-gray my-3 pb-1">
                {/* item */}
                <div className="bg-white p-2 mb-5 rounded-md border-0.5 border-cbs-border ">
                    <div className="border-b-0.5 border-cbs-border pb-1">
                        <div className="font-bold">Winggo Thụy Khuê</div>
                        <div className="flex justify-between ">
                            <div>Mang đi-T45612-100001640</div>
                            <div>1/2</div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div>Trà Sữa Socola kem trứng nướng - Size M</div>
                        <div className="flex justify-between">
                            <div>20:52 17/12</div>
                            <div className="font-bold">34.000đ</div>
                        </div>
                    </div>
                </div>
                {/* end item */}
                {/* item */}
                <div className="bg-white p-2 mb-5 rounded-md border-0.5 border-cbs-border ">
                    <div className="border-b-0.5 border-cbs-border pb-1">
                        <div className="font-bold">Winggo Thụy Khuê</div>
                        <div className="flex justify-between ">
                            <div>Mang đi-T45612-100001640</div>
                            <div>1/2</div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div>Trà Sữa Socola kem trứng nướng - Size M</div>
                        <div className="flex justify-between">
                            <div>20:52 17/12</div>
                            <div className="font-bold">34.000đ</div>
                        </div>
                    </div>
                </div>
                {/* end item */}
                {/* item */}
                <div className="bg-white p-2 mb-5 rounded-md border-0.5 border-cbs-border ">
                    <div className="border-b-0.5 border-cbs-border pb-1">
                        <div className="font-bold">Winggo Thụy Khuê</div>
                        <div className="flex justify-between ">
                            <div>Mang đi-T45612-100001640</div>
                            <div>1/2</div>
                        </div>
                    </div>
                    <div className="pt-2">
                        <div>Trà Sữa Socola kem trứng nướng - Size M</div>
                        <div className="flex justify-between">
                            <div>20:52 17/12</div>
                            <div className="font-bold">34.000đ</div>
                        </div>
                    </div>
                </div>
                {/* end item */}
            </div>
        </main>
    );
};
