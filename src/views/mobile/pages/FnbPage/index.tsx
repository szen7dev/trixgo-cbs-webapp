import { FC, useEffect } from "react";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { formatNumberMoney, convertCurrency } from "utils/converter";

/**
 * Components
 */
import { FNB_CHANNEL } from "apis/localdb";

/**
 * Assets
 */
import logo from "assets/images/LogoFnB.jpg";
import qrcode from "assets/images/qrcode-default.png";

/**
 * Hooks
 */
import { useAuth } from "services/hooks/auth/useAuth";
import { useCustomer } from "services/hooks/items/useCustomer";
import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
import { useFnbVoucher } from 'services/hooks/fnb/useFnbVoucher';

/**
 * 
 * TOKEN CỨNG
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvVXNlciI6eyJlbWFpbCI6ImhpZXBuaC53aW5nZ29AZ21haWwuY29tIiwicGhvbmUiOiJ1bmRlZmluZWQiLCJmdWxsbmFtZSI6Ik5ndXnhu4VuIEjhu691IEhp4buHcC1XR08gKEJPRCkiLCJiaXpmdWxsbmFtZSI6Ik5ndXnhu4VuIEjhu691IEhp4buHcC1XR08gKEJPRCkiLCJjb21wYW55Ijp7Il9pZCI6IjYwNDZiZWRlYjU1NTI1MzY4YjExYzVjMyIsIm5hbWUiOiJDw7RuZyB0eSBD4buVIHBo4bqnbiBXaW5nZ28iLCJzaWduIjoiV0dPIiwiaW1hZ2UiOiIzOGIwYWEwZC04NGU3LTQyZDEtODQyYy01NWU5NjM4MjY2OWEuanBnIn0sImRlcGFydG1lbnQiOnsiX2lkIjoiNjNhZmMyZTQ0ZmFiYTYwMDEyNTk1NTVkIiwibmFtZSI6IkJBTiBMw4NOSCDEkOG6oE8iLCJzaWduIjoiV0dPLkJPRCJ9LCJpbWFnZSI6IjBkYWU5YmRlLWJlMTMtNDU3NC05ZmQxLTQ5MzI2NDM5MzI1NC53ZWJwIiwic2lnbmF0dXJlIjoic2lnbmF0dXJlX2RlZmF1bHQucG5nIiwic3RhdHVzIjoxLCJsZXZlbCI6MCwiX2lkIjoiNjNiMzZhODk3MDM3YjQwMDEyZjZlNmYzIn0sImlhdCI6MTY3OTIzMzUzMn0.QZEBx9lK9rQ78YR-Qi2wW43LY2ZhOWnS_MIceCnUIBc
 */

const FnbPage: FC = () => {
    const { user } = useAuth();
    const { id: contactID } = useParams<{ id: string }>();
    const { info } = useCustomer({
        params: {
            contactID: contactID,
            select: "name sign phone purchasedValue totalLoyaltyPoints usedLoyaltyPoints remainLoyaltyPoints"
        },
        isFetchList: false,
        isFetchInfo: true
    });
    // console.log(info)

    const { isLoading, isFetching, fetchNextPage, hasNextPage, totalRecord, listWithPager, totalPage, refetch } = useFnbOrder({
        params: {
            limit: 50,
            statuss: [5],
            customerID: contactID,
            populates: JSON.stringify({
				path: "voucher",
                select: "_id name sign salesoffAmount salesoffRate minOrderAmount"
			})
        }, 
            isFetchList: true, 
            isFetchInfo: false
        }
    )
    // console.log(listWithPager[0])
    // console.log(listWithPager[0].length)

    const { totalRecord: totalVoucher, listWithPager: listVouchers } = useFnbVoucher({
        params: {
            limit: 20,
            customerID: contactID
        }, 
            isFetchList: true, 
            isFetchInfo: false
        }
    )
    // console.log(listVouchers)

    return (
        <div className="p-2 relative transition-all duration-500 ease-out overflow-auto" style={{height:"100vh"}}>
            <img alt="Next" src={logo} className="w-16 mb-2" />
            <img alt="Next" src={qrcode} className="w-24 absolute top-2 right-2" />
            <p><b className="text-base">Xin chào {info?.name}</b></p>
            <div className="relative">
                <p>Tổng thanh toán</p>
                <p className="absolute top-0 right-0"><b>{formatNumberMoney(Number(info?.purchasedValue))}</b></p>
            </div>
            <div className="relative">
                <p>Tổng điểm tích lũy</p>
                <p className="absolute top-0 right-0">{formatNumberMoney(Number(info?.totalLoyaltyPoints))}</p>
            </div>
            <div className="relative">
                <p>Đã sử dụng</p>
                <p className="absolute top-0 right-0">{formatNumberMoney(Number(info?.usedLoyaltyPoints))}</p>
            </div>
            <div className="relative">
                <p>Còn lại</p>
                <p className="absolute top-0 right-0 text-cbs-primary"><b>{formatNumberMoney(Number(info?.remainLoyaltyPoints))}</b></p>
            </div>
            <hr className="border-zinc-200 border mt-2 mb-2"/>
            <p><b>Danh sách voucher Winggo dành cho bạn ({totalVoucher})</b></p>
            <hr className="border-zinc-200 border mt-2 mb-2"/>
            {
                (listVouchers[0] ?? []).map((item: any, i: any) => (
                    <div key={item?._id} className="border p-2 mb-2">
                        <p>{item.name} - <b className="text-cbs-primary text-base">{item?.sign}</b></p>
                        <p><b>Ưu đãi {formatNumberMoney(item?.salesoffAmount)} | Giảm giá {formatNumberMoney(item?.salesoffRate)} % - Đơn hàng từ {formatNumberMoney(item?.minOrderAmount)}</b></p>
                        <p>
                            Thời hạn: {moment(item.expired).format('DD/MM/YYYY HH:mm')} 
                            <span className="text-cbs-schedule-expired"> ({moment(item.expired).fromNow()})</span>
                        </p>
                        <p className="text-primary-gray"><i>{item.note}</i></p>
                    </div>
                ))
            }

            <p><b>Lịch sử mua hàng tại Trà sữa Winggo ({totalRecord})</b></p>
            <hr className="border-zinc-200 border mt-2 mb-2"/>
            {
                (listWithPager[0] ?? []).map((item: any, i: any) => (
                    <div key={item?._id}>
                        <p>
                            Đơn hàng ngày {moment(item.createAt).format('HH:mm DD/MM/YYYY')} 
                            <span className="text-primary-gray"> ({moment(item.createAt).fromNow()})</span>
                        </p>
                        <p>Voucher: 
                             <b className="text-cbs-primary pr-1 pl-1">{item?.voucher?.sign}</b>
                             <span className="text-primary-gray">- Ưu đãi {formatNumberMoney(item?.voucher?.salesoffAmount)} | Giảm giá {formatNumberMoney(item?.voucher?.salesoffRate)} % - Đơn hàng từ {formatNumberMoney(item?.voucher?.minOrderAmount)}</span>
                        </p>
                        <p>Mã hiệu: {item?.sign} | {FNB_CHANNEL[Number(item?.salesChannel)-1]?.sign}{item?.appOrderSign}</p>
                        <div className="relative">
                            <p>Tổng giá trị</p>
                            <p className="absolute top-0 right-0">{formatNumberMoney(item?.total)}</p>
                        </div>
                        <div className="relative">
                            <p>Giảm giá</p>
                            <p className="absolute top-0 right-0">{formatNumberMoney(item?.salesoff)}</p>
                        </div>
                        <div className="relative">
                            <p>Trừ tích điểm</p>
                            <p className="absolute top-0 right-0">{formatNumberMoney(item?.credit)}</p>
                        </div>
                        <div className="relative">
                            <p>Voucher</p>
                            <p className="absolute top-0 right-0">{formatNumberMoney(item?.offer)}</p>
                        </div>
                        <div className="relative">
                            <p>Còn lại thanh toán</p>
                            <p className="absolute top-0 right-0">{formatNumberMoney(item?.amount)}</p>
                        </div>
                        <div className="relative">
                            <p>Điểm tích lũy</p>
                            <p className="absolute top-0 right-0 text-cbs-primary">{formatNumberMoney(item?.loyaltyPoints)}</p>
                        </div>
                        <hr className="border-zinc-200 border mt-2 mb-2"/>
                    </div>
                ))
            }
        </div>
    )
}

export default FnbPage