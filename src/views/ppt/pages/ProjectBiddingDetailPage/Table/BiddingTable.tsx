import * as React from 'react'
import iconAdd from "../../../../../assets/images/icons8-add-96-2.svg";

export default function BiddingTable() {
    return (
        <div>
            <div className=' mb-4 text-primary-gray text-lg  ml-3'>Thông tin chung</div>
            <div className="flex border-0.25 border-cbs-border">
                <div className="w-1/2">
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Tên gói thầu
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            Tư vấn Quản lý dự án và Tư vấn giám sát
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Số hiệu
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            GT01
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Kế hoạch bắt đầu
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            15/2/2021
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Kế hoạch kết thúc
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            15/9/2021
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Ngày kết thúc thực tế
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            18/9/2021 (57 ngày)
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Ngân sách dự kiến
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            100.000.000.000
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Kế hoạch ký hợp đồng
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            18/9/2021
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Ghi chú
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border">Đang chờ thương thảo hợp đồng</div>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Thuộc dự án
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            Xây dựng trường Tiểu học và Trung học cơ sở Tây Hồ Tây
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Tình trạng
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            Đang triển khai
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Hình thức
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            Chào giá cạnh tranh
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Loại hợp đồng
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            Đơn giá cố định
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Tiến độ thực hiện hợp đồng
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            100 ngày
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Số nhà thầu tham gia
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            08
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Đơn vị trúng thầu
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            Công ty Cổ phần ABC
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/3 py-4 pl-5  border-0.25 border-cbs-border text-primary-gray">
                            Giá trúng thầu
                        </div>
                        <div className="w-2/3 py-4 pl-5  border-0.25 border-cbs-border text-cbs-highlight-color">
                            90.000.000.000
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
