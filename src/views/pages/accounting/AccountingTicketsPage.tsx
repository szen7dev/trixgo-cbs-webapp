import React, {FC} from "react";
import DropdownSearchable from "../../../components/common/DropdownSearch";
import { ReactComponent as ThreeDotsVertical } from '.././../../icons/ThreeDotsVertical.svg';
import { ReactComponent as ThreeDotsHorizontal } from '.././../../icons/ThreeDotsHorizontal.svg';
import { ReactComponent as Printer } from '.././../../icons/Printer.svg';
import { ReactComponent as Trash } from '.././../../icons/Trash.svg';
import { ReactComponent as Pen } from '.././../../icons/Pen.svg';
import { ReactComponent as Copy } from '.././../../icons/Copy.svg';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AccountingTicketsPage:FC = () => {
    return (
        <div className={""}>
            <div className={"p-3"}>
                <h3 className={"font-bold text-lg pb-2 text-gray-600"}>Phiếu chi</h3>
                <div className="flex flex-wrap w-full">
                    <input className={"border border-gray-400 p-1 rounded pl-2 pr-2 w-3/12"} placeholder={"Nhập từ khóa tìm kiếm"}/>
                    {/* <DropdownSearchable
                        className={"ml-2"}
                        id="ticket-creator" placeholder="Người tạo phiếu"
                        searchUrl={"/user/get-list"}
                        searchParam={"search"}
                        initialValue={1}
                        data={[
                            {
                                id: 1,
                                text:"Trần Thanh Quang",
                                imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                            },
                            {
                                id: 2,
                                text:"Trần Thanh Quang 2"
                            },
                            {
                                id: 3,
                                text:"Trần Thanh Quang 3"
                            },
                            {
                                id: 4,
                                text:"Trần Thanh Quang 4"
                            },
                            {
                                id: 5,
                                text:"Trần Thanh Quang 5"
                            },
                            {
                                id: 6,
                                text:"Trần Thanh Quang 6"
                            },
                            {
                                id: 7,
                                text:"Trần Thanh Quang 7"
                            },
                            {
                                id: 8,
                                text:"Trần Thanh Quang 8"
                            },
                            {
                                id: 9,
                                text:"Trần Thanh Quang 9"
                            },
                            {
                                id: 10,
                                text:"Trần Thanh Quang 10"
                            },
                            {
                                id: 11,
                                text:"Trần Thanh Quang 11"
                            },
                            {
                                id: 12,
                                text:"Trần Thanh Quang 12"
                            }
                        ]}
                    />
                    <DropdownSearchable
                        className={"ml-2"}
                        id="ticket-creator" placeholder="Mã khách"
                        searchUrl={"/user/get-list"}
                        searchParam={"search"}
                    />
                    <DropdownSearchable
                        className={"ml-2"}
                        id="ticket-creator" placeholder="Hợp đồng"
                        searchUrl={"/user/get-list"}
                        searchParam={"search"}
                    /> */}
                    <DatePicker
                        wrapperClassName={"w-auto ml-2"}
                        name="startDate"
                        selected={null}
                        dateFormat="dd/MM/yyyy"
                        customInput={
                            <div className={"relative w-auto ml-2 min-h-fit"}>
                                <input
                                    placeholder={"Từ ngày"}
                                    type="text"
                                    name="startDate"
                                    className="border border-gray-400 p-1 rounded pl-2 pr-2"
                                />
                                <div className={"absolute inset-y-0 right-0 h-full flex align-items-center pr-2"}>
                                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 7L0.00480938 0.25L12.9952 0.25L6.5 7Z" fill="#C4C4C4"/>
                                    </svg>
                                </div>
                            </div>
                        }
                        onChange={(date: Date | null) =>
                            console.log("birthDate", date)
                        }
                    />
                    <DatePicker
                        wrapperClassName={"w-auto ml-2"}
                        name="endDate"
                        selected={null}
                        dateFormat="dd/MM/yyyy"
                        customInput={
                            <div className={"relative w-auto ml-2 min-h-fit"}>
                                <input
                                    placeholder={"Đến ngày"}
                                    type="text"
                                    name="startDate"
                                    className="border border-gray-400 p-1 rounded pl-2 pr-2"
                                />
                                <div className={"absolute inset-y-0 right-0 h-full flex align-items-center pr-2"}>
                                    <svg width="13" height="7" viewBox="0 0 13 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6.5 7L0.00480938 0.25L12.9952 0.25L6.5 7Z" fill="#C4C4C4"/>
                                    </svg>
                                </div>
                            </div>
                        }
                        onChange={(date: Date | null) =>
                            console.log("birthDate", date)
                        }
                    />
                    <button className="btn btn-primary ml-2">
                        Tạo mới
                    </button>
                    <button className="btn btn-success ml-2">
                        Lưu
                    </button>
                </div>
            </div>
            <table className="table-auto border-collapse w-full overflow-auto">
                <thead>
                <tr className={"text-gray-400 border-t border-b text-left"}>
                    <th className="w-1/12 pb-1 pt-1 text-center">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </th>
                    <th className="w-2/12 pb-1 pt-1">
                        <div className={"flex align-items-center"}>
                            <div className={""}>Nội dung</div>
                            <button className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 ml-5">
                                <ThreeDotsVertical/>
                            </button>
                        </div>
                    </th>
                    <th className="w-1/12 pb-1 pt-1">Ngày chứng từ</th>
                    <th className="w-1/12 pb-1 pt-1">Loại phiếu</th>
                    <th className="w-1/12 pb-1 pt-1">Số hiệu</th>
                    <th className="w-1/12 pb-1 pt-1">Mã khách</th>
                    <th className="w-1/12 pb-1 pt-1">Hợp đồng</th>
                    <th className="w-1/12 pb-1 pt-1">Giá trị/Thành tiền</th>
                    <th className="w-2/12 pb-1 pt-1">Ghi chú</th>
                    <th className="w-1/12 pb-1 pt-1"></th>
                </tr>
                </thead>
                <tbody>
                <tr className={"border-b"}>
                    <td className={"w-1/12 pt-2 pb-2 text-center"}>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </td>
                    <td className={"pt-2 pb-2"}>
                        <p className={"mb-1"}>Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG</p>
                        <p className={"text-gray-400"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                    </td>
                    <td className={"pt-2 pb-2"}>05/11/2021</td>
                    <td className={"pt-2 pb-2"}>Phiếu chi</td>
                    <td className={"pt-2 pb-2"}>PGI.PKT13</td>
                    <td className={"pt-2 pb-2"}>Công ty xăng dầu số 2 Vạn Phúc</td>
                    <td className={"pt-2 pb-2"}>Cung cấp xăng dầu định kỳ</td>
                    <td className={"pt-2 pb-2"}>34.125.000</td>
                    <td className={"pt-2 pb-2"}>Đã cung cấp chứng từ gốc trả về cho công ty</td>
                    <td className={"pt-2 pb-2 text-center relative"}>
                        <button>
                            <ThreeDotsHorizontal/>
                        </button>
                        <div className={"absolute acc-action-row border rounded-md overflow-hidden bg-white"}>
                            <button className={"flex w-full p-3"}>
                                <div className={"w-2/12 ml-3"}>
                                    <Printer/>
                                </div>
                                <div className={"w-10/12 text-left"}>In ấn</div>
                            </button>
                            <button className={"flex w-full p-3"}>
                                <div className={"w-2/12 ml-3"}>
                                    <Copy/>
                                </div>
                                <div className={"w-10/12 text-left"}>Copy</div>
                            </button>
                            <button className={"flex w-full p-3"}>
                                <div className={"w-2/12 ml-3"}>
                                    <Pen/>
                                </div>
                                <div className={"w-10/12 text-left"}>Cập nhật</div>
                            </button>
                            <button className={"flex w-full p-3"}>
                                <div className={"w-2/12 ml-3"}>
                                    <Trash/>
                                </div>
                                <div className={"w-10/12 text-left"}>Xóa</div>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr className={"border-b"}>
                    <td className={"w-1/12 pt-2 pb-2 text-center"}>
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                    </td>
                    <td className={"pt-2 pb-2"}>
                        <p className={"mb-1"}>Chi phí xăng xe phục vụ việc đi lại của nhóm dự án CHG</p>
                        <p className={"text-gray-400"}>Phùng Thị Hà-PG 20/07/2021 15:26</p>
                    </td>
                    <td className={"pt-2 pb-2"}>05/11/2021</td>
                    <td className={"pt-2 pb-2"}>Phiếu chi</td>
                    <td className={"pt-2 pb-2"}>PGI.PKT13</td>
                    <td className={"pt-2 pb-2"}>Công ty xăng dầu số 2 Vạn Phúc</td>
                    <td className={"pt-2 pb-2"}>Cung cấp xăng dầu định kỳ</td>
                    <td className={"pt-2 pb-2"}>34.125.000</td>
                    <td className={"pt-2 pb-2"}>Đã cung cấp chứng từ gốc trả về cho công ty</td>
                    <td className={"pt-2 pb-2 text-center"}>
                        <button>
                            <ThreeDotsHorizontal/>
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};

export default AccountingTicketsPage;
