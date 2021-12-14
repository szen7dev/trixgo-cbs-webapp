import React, {FC} from "react";
import DropdownSearchable from "../../../../components/common/DropdownSearch";
import ClipboardCheckIcon from "../../../../assets/icons/ClipboardCheck";
import Copy from "../../../../assets/images/icons8-copy-96.png";
import CloseRed from "../../../../assets/icons/CloseRed";

const CreateNewTicketTableAccount:FC = () => {
    return (
        <div className={"px-6 mt-3"}>
            <div className={"relative table border-collapse w-full text-center"}>
                <div className={"sticky header flex table-row"}>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        TK nợ (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        TK có (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Mã khách nợ (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Mã khách có (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Sản phẩm/Hàng hóa
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Kho bãi
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Tồn kho
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Số lượng (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Đơn giá (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Thành tiền (*)
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Hợp đồng
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Khoản mục phí
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        Ghi chú
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        #
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                </div>
                <div className={"sticky total flex table-row"}>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>

                    </div>
                </div>
                <div className={"flex table-row"}>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="TK nợ"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="TK có"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="Mã khách nợ"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="Mã khách có"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="Sản phẩm/Hàng hóa"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="Kho bãi"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        123
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <input type="number" className={"focus:outline-none border-b border-gray-300"} placeholder={"Số lượng"}/>
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <input type="number" className={"focus:outline-none border-b border-gray-300"} placeholder={"Đơn giá"}/>
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <input type="number" className={"focus:outline-none border-b border-gray-300"} placeholder={"Thành tiền"}/>
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="Hợp đồng"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <DropdownSearchable
                            classNameInput={"border-b border-gray-300 rounded-none"}
                            className={"flex-1"}
                            id="ticket-type" placeholder="Khoản mục phí"
                            showTriangle={false}
                            allowClearValueSingleInput={true}
                            // searchUrl={"/user/get-list"}
                            // searchParam={"search"}
                        />
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <textarea rows={1} className={"focus:outline-none border-b border-gray-300"} placeholder={"Ghi chú"}/>
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle"}>
                        <input type="number" className={"focus:outline-none w-4 border-b border-gray-300"} placeholder={"#"}/>
                    </div>
                    <div className={"px-2 py-4 table-cell box-border border border-gray-300 align-middle flex items-center"}>
                        <div className={""}>
                            <img alt={"Icon"} src={Copy}/>
                        </div>
                        <CloseRed/>
                    </div>
                </div>
            </div>
            <div className={"flex mt-3"}>
                <button className={"btn btn-success"}>
                    + Thêm bút toán
                </button>
            </div>
        </div>
    )
}

export default CreateNewTicketTableAccount;
