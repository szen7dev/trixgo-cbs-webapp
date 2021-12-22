import React, {FC} from "react";
import DropdownSearchable from "../../../../components/common/DropdownSearch";
import DatePicker from "react-datepicker";

const CreateNewTicketForm:FC = () => {
    return (
        <div className={"px-6 pb-2 border-b border-gray-800"}>
            <div className={"flex py-1 border-b"}>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Loại phiếu (*)</div>
                    <DropdownSearchable
                        className={"flex-1"}
                        id="ticket-type" placeholder="Loại phiếu"
                        showTriangle={false}
                        allowClearValueSingleInput={true}
                        // searchUrl={"/user/get-list"}
                        // searchParam={"search"}
                    />
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"w-1/3 flex items-center"}>
                        <input type="radio" id="vat-type-1" name={"vat-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="vat-type-1" className={"text-left ml-3"}>VAT mua vào</label>
                    </div>
                    <div className={"w-1/3 flex items-center"}>
                        <input type="radio" id={"vat-type-2"} name={"vat-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="vat-type-2" className={"text-left ml-3"}>VAT bán ra</label>
                    </div>
                    <div className={"w-1/3 flex items-center"}>
                        <input type="radio" id={"vat-type-3"} name={"vat-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="vat-type-3" className={"text-left ml-3"}>Hủy chọn</label>
                    </div>
                </div>
                <div className={"w-1/2 flex items-center"}>
                    <div className={"w-1/4 flex items-center"}>
                        <input type="checkbox" id="ticket-type-1" name={"ticket-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="ticket-type-1" className={"text-left ml-3"}>Tạm ứng</label>
                    </div>
                    <div className={"w-1/4 flex items-center"}>
                        <input type="checkbox" id="ticket-type-2" name={"ticket-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="ticket-type-2" className={"text-left ml-3"}>Kết chuyển cuối kỳ</label>
                    </div>
                    <div className={"w-1/4 flex items-center"}>
                        <input type="checkbox" id="ticket-type-3" name={"ticket-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="ticket-type-3" className={"text-left ml-3"}>Xuất trả hàng mượn</label>
                    </div>
                    <div className={"w-1/4 flex items-center"}>
                        <input type="checkbox" id="ticket-type-4" name={"ticket-type"} className={"form-check-input mt-0"}/>
                        <label htmlFor="ticket-type-4" className={"text-left ml-3 text-red-600"}>Hủy phiếu</label>
                    </div>
                </div>
            </div>
            <div className={"flex py-1 border-b"}>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Mã khách (*)</div>
                    <DropdownSearchable
                        className={"flex-1"}
                        id="ticket-customer-code" placeholder="Mã khách"
                        showTriangle={false}
                        allowClearValueSingleInput={true}
                        // searchUrl={"/user/get-list"}
                        // searchParam={"search"}
                    />
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Hợp đồng</div>
                    <DropdownSearchable
                        className={"flex-1"}
                        id="ticket-customer-code" placeholder="Hợp đồng"
                        showTriangle={false}
                        allowClearValueSingleInput={true}
                        // searchUrl={"/user/get-list"}
                        // searchParam={"search"}
                    />
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Kỳ thanh toán</div>
                    <DropdownSearchable
                        className={"flex-1"}
                        id="ticket-customer-code" placeholder="Kỳ thanh toán"
                        showTriangle={false}
                        allowClearValueSingleInput={true}
                        // searchUrl={"/user/get-list"}
                        // searchParam={"search"}
                    />
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Phân loại khác</div>
                    <DropdownSearchable
                        className={"flex-1"}
                        id="ticket-customer-code" placeholder="Phân loại khác"
                        showTriangle={false}
                        allowClearValueSingleInput={true}
                        // searchUrl={"/user/get-list"}
                        // searchParam={"search"}
                    />
                </div>
            </div>
            <div className={"flex py-1 border-b"}>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Ngày hạch toán (*)</div>
                    <DatePicker
                        wrapperClassName={"w-auto"}
                        name="endDate"
                        selected={null}
                        showTimeSelect
                        customInput={
                            <div className={"relative w-auto ml-2 min-h-fit"}>
                                <input
                                    placeholder={"Ngày hạch toán"}
                                    type="text"
                                    name="startDate"
                                    className="focus:outline-none placeholder:text-sm"
                                />
                            </div>
                        }
                        onChange={(date: Date | null) =>
                            console.log("birthDate", date)
                        }
                        timeIntervals={1}
                    />
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Số hóa đơn</div>
                    <input type="text" className={"focus:outline-none placeholder:text-gray-500"} placeholder={"Số hóa đơn"}/>
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Ngày hóa đơn</div>
                    <DatePicker
                        wrapperClassName={"w-auto"}
                        name="endDate"
                        selected={null}
                        customInput={
                            <div className={"relative w-auto ml-2 min-h-fit"}>
                                <input
                                    placeholder={"Ngày hóa đơn"}
                                    type="text"
                                    name="startDate"
                                    className="focus:outline-none placeholder:text-sm"
                                />
                            </div>
                        }
                        onChange={(date: Date | null) =>
                            console.log("birthDate", date)
                        }
                    />
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Người nộp tiền</div>
                    <input type="text" className={"focus:outline-none"} placeholder={"Người nộp tiền"}/>
                </div>
            </div>
            <div className={"flex py-1"}>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Nội dung (*)</div>
                    <textarea rows={2} className={"focus:outline-none flex-1"} placeholder={"Nội dung"}/>
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Ghi chú</div>
                    <textarea rows={2} className={"focus:outline-none flex-1"} placeholder={"Ghi chú"}/>
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Mã hiệu</div>
                    <input type="text" className={"focus:outline-none"} placeholder={"Mã hiệu"}/>
                </div>
                <div className={"w-1/4 flex items-center"}>
                    <div className={"text-left text-gray-500 flex items-center mr-2"}>Tỷ giá USD</div>
                    <input type="text" className={"focus:outline-none"} placeholder={"Tỷ giá USD"}/>
                </div>
            </div>
        </div>
    )
}

export default CreateNewTicketForm;
