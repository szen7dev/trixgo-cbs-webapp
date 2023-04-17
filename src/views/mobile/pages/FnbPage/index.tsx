import { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { formatNumberMoney } from "utils/converter";

/**
 * Components
 */
import { FNB_CHANNEL } from "apis/localdb";

/**
 * Assets
 */
import logo from "assets/images/LogoFnB.jpg";
import QRCodeIcon from "assets/images/document/qr-code.png";
import voucherIcon from "assets/images/icons8-ticket-100.png";
import orderIcon from "assets/images/icons8-order-history-100.png";
import orderGift from "assets/images/icons8-gift-100.png";
import { ModalFnbQRCode } from "shareComponents/common/ModalFnbQRCode";

/**
 * Hooks
 */

// const domain = 'http://localhost:3003';
const domain = 'https://service.app.trixgo.com';

const fixedHeaders = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvVXNlciI6eyJlbWFpbCI6ImtpZW10aHV2aWVuLmZuYkBnbWFpbC5jb20iLCJmdWxsbmFtZSI6Iktp4buDbSB0aOG7rSB2acOqbi1JVEVTVCIsImJpemZ1bGxuYW1lIjoiS2nhu4NtIHRo4butIHZpw6puLUlURVNUIiwiY29tcGFueSI6eyJfaWQiOiI1ZTA0N2RjMDVlMzBkY2U3Mjg0OWE0YTQiLCJuYW1lIjoiQ8O0bmcgdHkgY-G7lSBwaOG6p24gZOG7i2NoIHbhu6Uga2nhu4NtIHRo4butIiwiaW1hZ2UiOiJmNDgwNDdhZWZmZTM3MzQ2OGQ5ZDE3YjIxZjE2MTc1Ni5wbmciLCJzaWduIjoiSVRFU1QifSwiZGVwYXJ0bWVudCI6eyJfaWQiOiI1ZTdjY2Q1MjBlM2FmZDNlYTRlNzBjMTYiLCJuYW1lIjoiSVRFU1QtUGjDsm5nIGvhur8gdG_DoW4iLCJzaWduIjpudWxsfSwiaW1hZ2UiOiJ1c2VyX2RlZmF1bHQucG5nIiwic2lnbmF0dXJlIjoic2lnbmF0dXJlX2RlZmF1bHQucG5nIiwic3RhdHVzIjoxLCJsZXZlbCI6MSwiX2lkIjoiNWY3MzYzZTJjMjI5Nzk0ZDhjMGJjNjkxIn0sImlhdCI6MTY3OTY1MTc0N30.QkLqjQDMGbPHc8LIRvk7BwVJ06Pk5t7ERrZoZgHIasw"
};

const FnbPage: FC = () => {
    
    const params = useParams<any>();
    const { id: contactID } = useParams<{ id: string }>();
    const [info, setInfoCustomer] = useState<any>({});
    const [totalVoucher, setTotalVoucher] = useState(0);
    const [listVouchers, setListVouchers] = useState([]);

    const [totalFnbOrder, setTotalFnbOrder] = useState(0);
    const [listFnbOrder, setListFnbOrder] = useState([]);

    // QR code
    const [isToggleModalQRCode, setIsToggleModalQRCode] = useState(false);
    const toggleModalQRCode = () => setIsToggleModalQRCode(!isToggleModalQRCode);

    useEffect(() => {
        fetch(`${domain}/api/item/contacts?populates=%7B%22path%22:%22parent+userUpdate%22,%22select%22:%22name+bizfullname%22%7D&limit=20&contactID=${contactID}&select=name+sign+phone+purchasedValue+totalLoyaltyPoints+usedLoyaltyPoints+remainLoyaltyPoints`, {
            headers: fixedHeaders,
        })
            .then(async (response) => {
                const results = await response.json();
                if (results.data) {
                    setInfoCustomer(results.data);
                }
            });

        fetch(`${domain}/api/fnb/vouchers?customerID=${contactID}&limit=20&status=1`, {
            headers: fixedHeaders,
        })
            .then(async (response) => {
                const results = await response.json();
                if (results.data?.totalRecord) {
                    setTotalVoucher(results.data.totalRecord);
                }
                if (results.data?.listRecords && results.data.listRecords.length) {
                    setListVouchers(results.data.listRecords);
                }
            });

        fetch(`${domain}/api/fnb/orders?lastestID=&limit=50&statuss[]=5&customerID=${contactID}&populates=%7B%22path%22:%22voucher%22,%22select%22:%22_id+name+sign+salesoffAmount+salesoffRate+minOrderAmount%22%7D`, {
            headers: fixedHeaders,
        })
            .then(async (response) => {
                const results = await response.json();
                if (results.data?.totalRecord) {
                    setTotalFnbOrder(results.data.totalRecord);
                }
                if (results.data?.listRecords && results.data.listRecords.length) {
                    setListFnbOrder(results.data.listRecords);
                }
            })
    }, []);

    // Code
    const d = new Date();
    const time = d.getTime();

    return (
        <div className="p-2 relative transition-all duration-500 ease-out overflow-auto" style={{ height: "100vh" }}>
            <img alt="Next" src={logo} className="w-16 mb-2" />
            <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 absolute top-2 right-2" onClick={toggleModalQRCode}>
                <p className="mr-2">QR giới thiệu bạn</p>
                <img className="w-[36px] h-[36px]" alt="icon" src={QRCodeIcon} />
            </button>

            <p><b className="text-base">Trà sữa Winggo xin chào {info?.name}</b></p>
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
            <hr className="border-zinc-200 border mt-2 mb-2" />
            <div className="flex items-center">
                <img src={voucherIcon} alt="icon" className="w-6 h-6 rounded-full" />
                <p className="px-1"><b>Danh sách voucher của bạn ({totalVoucher})</b></p>
            </div>
            <p className="text-primary-gray"><i>Voucher và Tích điểm chỉ áp dụng với đơn hàng Mua tại quán hoặc đặt qua Hotline. Vui lòng đọc mã Voucher và số điện thoại cho nhân viên để hưởng ưu đãi. Cảm ơn đã lựa chọn Winggo</i></p>
            <hr className="border-zinc-200 border mt-2 mb-2" />
            {
                listVouchers.map((item: any, i: any) => (
                    <div key={item?._id} className="border p-2 mb-2">
                        <div>
                            <img src={orderGift} className="w-[24px] h-[24px] inline-block mr-2"/>
                            <div className="inline-block mr-3">{item.name} - <b className="text-cbs-primary text-base">{item?.sign}</b></div>
                            {/* <input type="text" placeholder={"Điện thoại nhận"} className="w-[100px] h-[24px] border-0.5 border-cbs-border bg-cbs-table-header px-1 py-1 outline-none"/> */}
                        </div>
                        <p className="mt-1 mb-1"><b>Ưu đãi {formatNumberMoney(item?.salesoffAmount)} | Giảm giá {formatNumberMoney(item?.salesoffRate)} % - Đơn hàng từ {formatNumberMoney(item?.minOrderAmount)}</b></p>
                        <p>
                            Thời hạn: {moment(item.expired).format('DD/MM/YYYY HH:mm')}
                            <span className="text-cbs-schedule-expired"> ({moment(item.expired).fromNow()})</span>
                        </p>
                        <p className="text-primary-gray"><i>{item.note}</i></p>
                    </div>
                ))
            }
            <div className="flex items-center">
                <img src={orderIcon} alt="icon" className="w-6 h-6 rounded-full" />
                <p className="px-1"><b>Lịch sử mua hàng ({totalFnbOrder})</b></p>
            </div>
            <hr className="border-zinc-200 border mt-2 mb-2" />
            {
                (listFnbOrder).map((item: any, i: any) => (
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
                        <div className="relative text-primary-gray">
                            <i>
                                <p>Trừ chiết khấu</p>
                                <p className="absolute top-0 right-0">{formatNumberMoney(item?.discount)}</p>
                            </i>
                        </div>
                        <div className="relative text-primary-gray">
                           <i>
                            <p>Trừ giảm giá</p>
                                <p className="absolute top-0 right-0">{formatNumberMoney(item?.salesoff)}</p>
                           </i>
                        </div>
                        <div className="relative text-primary-gray">
                            <i>
                                <p>Trừ tích điểm</p>
                                <p className="absolute top-0 right-0">{formatNumberMoney(item?.credit)}</p>
                            </i>
                        </div>
                        <div className="relative text-primary-gray">
                            <i>
                                <p>Trừ voucher</p>
                                <p className="absolute top-0 right-0">{formatNumberMoney(item?.offer)}</p>
                            </i>
                        </div>
                        <div className="relative text-primary-gray">
                           <i>
                            <p>Còn lại thanh toán</p>
                                <p className="absolute top-0 right-0">{formatNumberMoney(item?.amount)}</p>
                           </i>
                        </div>
                        <div className="relative">
                            <p>Điểm tích lũy</p>
                            <p className="absolute top-0 right-0 text-cbs-primary">{formatNumberMoney(item?.loyaltyPoints)}</p>
                        </div>
                        <hr className="border-zinc-200 border mt-2 mb-2" />
                    </div>
                ))
            }

            <ModalFnbQRCode
                value={{
                    ref1: contactID,
                    ref2: `${time}`
                }}
                isToggle={isToggleModalQRCode}
                toggle={toggleModalQRCode}
            />
         </div>
     )}

export default FnbPage