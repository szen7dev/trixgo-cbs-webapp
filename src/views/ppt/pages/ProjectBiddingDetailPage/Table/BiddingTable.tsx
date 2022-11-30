import * as React from 'react'
import iconAdd from "../../../../../assets/images/icons8-add-96-2.svg";

export default function BiddingTable() {
    return (
        <div>
            <div className=' mb-4 text-primary-gray text-lg  ml-3'>Thông tin chung</div>
            <div>
                <table className='w-full border-collapse  border-0.5 border-cbs-border'>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Tên gói thầu
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Tư vấn Quản lý dự án và Tư vấn giám sát
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Thuộc dự án
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Xây dựng trường Tiểu học và Trung học cơ sở Tây Hồ Tây
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Số hiệu
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            GT01
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Tình trạng
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Đang triển khai
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Kế hoạch bắt đầu
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            15/2/2021
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Hình thức
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Chào giá cạnh tranh
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Kế hoạch kết thúc
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            15/9/2021
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Loại hợp đồng
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Đơn giá cố định
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Ngày kết thúc thực tế
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            18/9/2021 (57 ngày)
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Tiến độ thực hiện hợp đồng
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            100 ngày
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Ngân sách dự kiến
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            100.000.000.000
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Số nhà thầu tham gia
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            08
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Kế hoạch ký hợp đồng
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            18/9/2021
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Đơn vị trúng thầu
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Công ty Cổ phần ABC
                        </td>
                    </tr>
                    <tr>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Ghi chú
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            Đang chờ thương thảo hợp đồng
                        </td>
                        <td className='w-1/6 py-4 px-5 border-0.5 border-cbs-border text-primary-gray'>
                            Giá trúng thầu
                        </td>
                        <td className='w-2/6 py-4 px-5 border-0.5 border-cbs-border text-cbs-highlight-color'>
                            90.000.000.000
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
