/*=====1.LIBRARY=====*/
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from 'react-router-dom';

/*=====2.CSS=====*/
import cn from "classnames";
import styles from "../../styles/style.module.css";

/*=====3.ICONS=====*/
import TriangleDown from "assets/icons/TriangleDown";
import icon from "assets/images/icons8-bid-100.svg"
import ThreeDotsVertical from "assets/images/icon-3dots-vertical.svg";
import DownloadIcon from "assets/images/icons8-download-96.svg";
import ShareIcon from "assets/images/icons8-share-rounded-96.svg";
import CopyIcon from "assets/images/icons8-copy-96.svg";
import SendEmailIcon from "assets/images/icons8-send-email-96.svg";
import PencilIcon from "assets/images/icons8-pencil-96.svg";
import TrashIcon from "assets/images/icons8-remove-96.svg";
import PrintIcon from "assets/images/icons8-print-96.svg";
import SortingIcon from "assets/images/icons8-sorting-100.svg";

/*=====4.PAGES/COMPONENTS=====*/
import { SearchInput, Paginate } from "shareComponents/common";
import useCheckedList from "services/hooks/ppt/useCheckedList";
import BiddingReportChart from "./chartjs/chartBar";
import { BiddingReportFilterNav } from "./filterNav";
import ChartPie from "./chartjs/chartPie";
import { useAuth } from "services/hooks/auth/useAuth";

/*=====5.TYPINGS=====*/

/*=====6.HOOKS/APIS=====*/

/*=====7.OTHER=====*/

export const BiddingReportPage: FC = () => {
    const [yearSelected, setYearSelected] = useState(2022);
    const { user } = useAuth();
    return (
        <BiddingReportFilterNav>
            <div className=" p-4">
                <div className="flex gap-4">
                    <div className="w-3/5 border">
                        <BiddingReportChart />
                    </div>
                    <div className="w-2/5 border">
                        <ChartPie />
                    </div>
                </div>
                <div className="mt-4">
                    <table className="text-black text-medium border-collapse space-x-0 space-y-0 w-full" style={{ borderSpacing: 0 }}>
                        <thead className="">
                            <tr className="text-primary-gray whitespace-nowrap align-middle text-left">
                                <th className="px-3 py-2.5 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border w-1">
                                    TT
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Nhà thầu
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Tổng hợp đồng
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Đang triển khai
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Đã hoàn thành
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Thành tích
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Doanh thu
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Chủ đầu tư
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Đã là đối tác
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Người giới thiệu
                                </th>
                                <th className="py-2.5 px-3 font-normal bg-cbs-table-header sticky top-0 border-0.5 border-cbs-border">
                                    Xem chi tiết
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            <tr key="{userPcm._id}" className="text-left hover:bg-cbs-table-header">
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center">
                                    1
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    DFF.Công ty Cổ phần Tập đoàn Đua Fat
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    650.000.000.000 {'(15)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    400.000.000.000 {'(12)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border"
                                // style={{ minWidth: "155px", fontSize: '10px' }}
                                >
                                    250.000.000.000 {'(3)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    02
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    800.000.000.000
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    Công ty cổ phần...
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    Bắt đầu 2020
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    Phan Văn Thư-ADD
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    <a href="#" className="text-primary cursor-pointer">Chi tiết</a>
                                </td>
                            </tr>
                            <tr key="{userPcm._id}" className="text-left hover:bg-cbs-table-header">
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center">
                                    2
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    DFF.Công ty Cổ phần Tập đoàn Đua Fat
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    650.000.000.000 {'(15)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    400.000.000.000 {'(12)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border"
                                // style={{ minWidth: "155px", fontSize: '10px' }}
                                >
                                    250.000.000.000 {'(3)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    02
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    800.000.000.000
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    Công ty cổ phần...
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    <a href="#" className="text-primary cursor-pointer">Chi tiết</a>
                                </td>
                            </tr>
                            <tr key="{userPcm._id}" className="text-left hover:bg-cbs-table-header">
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border text-center">
                                    3
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    DFF.Công ty Cổ phần Tập đoàn Đua Fat
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    650.000.000.000 {'(15)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    400.000.000.000 {'(12)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border"
                                // style={{ minWidth: "155px", fontSize: '10px' }}
                                >
                                    250.000.000.000 {'(3)'}
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    02
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    800.000.000.000
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    Công ty cổ phần...
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    
                                </td>
                                <td className="pt-2.5 pb-3 px-2 border-0.5 border-cbs-border">
                                    <a href="#" className="text-primary cursor-pointer">Chi tiết</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </BiddingReportFilterNav>
    )
}
