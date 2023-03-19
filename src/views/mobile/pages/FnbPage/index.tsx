import { FC, useEffect } from "react";
import { useParams } from 'react-router-dom';

/**
 * Components
 */

/**
 * Assets
 */
import logo from "assets/images/LogoFnB.jpg";
import qrcode from "assets/images/qrcode-default.png";

/**
 * Hooks
 */
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { useAuth } from "services/hooks/auth/useAuth";
import { useCustomer } from "services/hooks/items/useCustomer";

/**
 * 
 * @returns TOKEN
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvVXNlciI6eyJlbWFpbCI6ImhpZXBuaC53aW5nZ29AZ21haWwuY29tIiwicGhvbmUiOiJ1bmRlZmluZWQiLCJmdWxsbmFtZSI6Ik5ndXnhu4VuIEjhu691IEhp4buHcC1XR08gKEJPRCkiLCJiaXpmdWxsbmFtZSI6Ik5ndXnhu4VuIEjhu691IEhp4buHcC1XR08gKEJPRCkiLCJjb21wYW55Ijp7Il9pZCI6IjYwNDZiZWRlYjU1NTI1MzY4YjExYzVjMyIsIm5hbWUiOiJDw7RuZyB0eSBD4buVIHBo4bqnbiBXaW5nZ28iLCJzaWduIjoiV0dPIiwiaW1hZ2UiOiIzOGIwYWEwZC04NGU3LTQyZDEtODQyYy01NWU5NjM4MjY2OWEuanBnIn0sImRlcGFydG1lbnQiOnsiX2lkIjoiNjNhZmMyZTQ0ZmFiYTYwMDEyNTk1NTVkIiwibmFtZSI6IkJBTiBMw4NOSCDEkOG6oE8iLCJzaWduIjoiV0dPLkJPRCJ9LCJpbWFnZSI6IjBkYWU5YmRlLWJlMTMtNDU3NC05ZmQxLTQ5MzI2NDM5MzI1NC53ZWJwIiwic2lnbmF0dXJlIjoic2lnbmF0dXJlX2RlZmF1bHQucG5nIiwic3RhdHVzIjoxLCJsZXZlbCI6MCwiX2lkIjoiNjNiMzZhODk3MDM3YjQwMDEyZjZlNmYzIn0sImlhdCI6MTY3OTIzMzUzMn0.QZEBx9lK9rQ78YR-Qi2wW43LY2ZhOWnS_MIceCnUIBc
 */

const FnbPage: FC = () => {
    const { user } = useAuth();
    const { id: contactID } = useParams<{ id: string }>();
    const { info } = useCustomer({
        params: {
            contactID: contactID,
            select: "name sign phone"
        },
        isFetchList: false,
        isFetchInfo: true
    });
    console.log(info)

    const { isLoading, isFetching, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbOrder({
    params: {
        limit: 50,
        customerID: contactID
    }, 
        isFetchList: true, 
        isFetchInfo: false
    });
    console.log(listWithPager)

    return (
        <div className="p-2 relative">
            <img alt="Next" src={logo} className="w-16 mb-2" />
            <img alt="Next" src={qrcode} className="w-24 absolute top-2 right-2" />
            <p><b className="text-base">Xin chào</b></p>
            <div className="relative">
                <p>Tổng điểm tích lũy: 24.200</p>
                <p>Đã sử dụng: 20.000</p>
                <hr className="border-zinc-200 border mt-2 mb-2"/>
                <p>Còn lại: <b className="text-cbs-primary text-base">4.200 VND</b></p>
            </div>
            <hr className="border-zinc-200 border mt-2 mb-2"/>
            <p>Lịch sử mua hàng của bạn tại Trà sữa Winggo</p>
            <hr className="border-zinc-200 border mt-2 mb-2"/>
            <div>
                <p><b>Đơn hàng ngày 15/3/2023 15:30 <span className="text-cbs-primary">(4 ngày trước)</span></b></p>
                <p>Mã hiệu C852344 | gr15222</p>
                <div className="relative">
                    <p> <b>Tổng giá trị</b> </p>
                    <p className="absolute top-0 right-0"><b>100.000</b></p>
                </div>
                <div className="relative">
                    <p>Giảm giá</p>
                    <p className="absolute top-0 right-0">20.000</p>
                </div>
                <div className="relative">
                    <p>Trừ tích điểm</p>
                    <p className="absolute top-0 right-0">10.000</p>
                </div>
                <div className="relative">
                    <p><b>Còn lại thanh toán</b> </p>
                    <p className="absolute top-0 right-0"><b>70.000</b></p>
                </div>
                <div className="relative">
                    <p>Điểm tích lũy</p>
                    <p className="absolute top-0 right-0">2.100</p>
                </div>
            </div>
            <hr className="border-zinc-200 border mt-2 mb-2"/>
            <div>
                <p><b>Đơn hàng ngày 12/2/2023 09:15 <span className="text-cbs-primary">(7 ngày trước)</span></b></p>
                <p>Mã hiệu C852342 | gr15224</p>
                <div className="relative">
                    <p> <b>Tổng giá trị</b> </p>
                    <p className="absolute top-0 right-0"><b>100.000</b></p>
                </div>
                <div className="relative">
                    <p>Giảm giá</p>
                    <p className="absolute top-0 right-0">20.000</p>
                </div>
                <div className="relative">
                    <p>Trừ tích điểm</p>
                    <p className="absolute top-0 right-0">10.000</p>
                </div>
                <div className="relative">
                    <p><b>Còn lại thanh toán</b> </p>
                    <p className="absolute top-0 right-0"><b>70.000</b></p>
                </div>
                <div className="relative">
                    <p>Điểm tích lũy</p>
                    <p className="absolute top-0 right-0">2.100</p>
                </div>
            </div>
        </div>
    )
}

export default FnbPage