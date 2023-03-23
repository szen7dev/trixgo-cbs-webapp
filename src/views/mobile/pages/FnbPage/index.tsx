import { FC, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import moment from "moment";
import { formatNumberMoney, convertCurrency } from "utils/converter";

/**
 * Components
 */
import { FNB_CHANNEL } from "apis/localdb";
import { APP_KEY } from 'utils/constants';

/**
 * Assets
 */
import logo from "assets/images/LogoFnB.jpg";
import QRCodeIcon from "assets/images/document/qr-code.png";
import { ModalFnbQRCode } from "shareComponents/common/ModalFnbQRCode";

/**
 * Hooks
 */
// import { useAuth } from "services/hooks/auth/useAuth";
// import { useCustomer } from "services/hooks/items/useCustomer";
// import { useFnbOrder } from 'services/hooks/fnb/useFnbOrder';
// import { useFnbVoucher } from 'services/hooks/fnb/useFnbVoucher';

const domain = 'http://localhost:3003';
// const domain = 'https://service.app.trixgo.com';

const fixedHeaders = {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmZvVXNlciI6eyJlbWFpbCI6ImhpZXBuaC5rdHJAZ21haWwuY29tIiwiZnVsbG5hbWUiOiJLaeG7g20gdGjhu60gdmnDqm4tSVRFU1QiLCJiaXpmdWxsbmFtZSI6Iktp4buDbSB0aOG7rSB2acOqbi1JVEVTVCIsImNvbXBhbnkiOnsiX2lkIjoiNWUwNDdkYzA1ZTMwZGNlNzI4NDlhNGE0IiwibmFtZSI6IkPDtG5nIHR5IGPhu5UgcGjhuqduIGThu4tjaCB24bulIGtp4buDbSB0aOG7rSIsImltYWdlIjoiZjQ4MDQ3YWVmZmUzNzM0NjhkOWQxN2IyMWYxNjE3NTYucG5nIiwic2lnbiI6IklURVNUIn0sImRlcGFydG1lbnQiOnsiX2lkIjoiNWU3Y2NkNTIwZTNhZmQzZWE0ZTcwYzE2IiwibmFtZSI6IklURVNULVBow7JuZyBr4bq_IHRvw6FuIiwic2lnbiI6bnVsbH0sImltYWdlIjoidXNlcl9kZWZhdWx0LnBuZyIsInNpZ25hdHVyZSI6InNpZ25hdHVyZV9kZWZhdWx0LnBuZyIsInN0YXR1cyI6MSwibGV2ZWwiOjEsIl9pZCI6IjVmNzM2M2UyYzIyOTc5NGQ4YzBiYzY5MSJ9LCJpYXQiOjE2NzkzODQ3NzZ9.oRgR9yIFWYM_3TVLo_X6l-FBGuuxtFRNJUn4lZ7rFjo"
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

        fetch(`${domain}/api/fnb/orders?lastestID=&limit=50&statuss[]=5&customerID=${contactID}`, {
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

    console.log({info})

    return (
        <div className="p-2 relative transition-all duration-500 ease-out overflow-auto" style={{ height: "100vh" }}>
            <img alt="Next" src={logo} className="w-16 mb-2" />
            {/* <img alt="Next" src={qrcode} className="w-24 absolute top-2 right-2" /> */}
            <button className="flex items-center mr-0.5 min-w-max rounded-full hover:bg-cbs-gray p-2 absolute top-2 right-2" onClick={toggleModalQRCode}>
                <img className="w-[36px] h-[36px]" alt="icon" src={QRCodeIcon} />
            </button>

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
            <hr className="border-zinc-200 border mt-2 mb-2" />
            <p><b>Danh sách voucher Winggo dành cho bạn ({totalVoucher})</b></p>
            <hr className="border-zinc-200 border mt-2 mb-2" />
            {
                listVouchers.map((item: any, i: any) => (
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

            <p><b>Lịch sử mua hàng tại Trà sữa Winggo ({totalFnbOrder})</b></p>
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
                                <p>Trừ triết khấu</p>
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