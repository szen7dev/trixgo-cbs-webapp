import React, {FC} from "react";
import DropdownSearchable from "../../../components/common/DropdownSearch";

const AccountingTicketsPage:FC = () => {
    return (
        <div className={"p-3"}>
            <h3 className={"font-bold text-lg pt-2 pb-2 text-gray-600"}>Phiếu chi</h3>
            <div className="flex flex-wrap w-full">
                <input className={"border border-gray-400 p-1 rounded pl-2 pr-2 w-3/12"} placeholder={"Nhập từ khóa tìm kiếm"}/>
                <DropdownSearchable
                    className={"ml-2"}
                    id="ticket-creator" placeholder="Người tạo phiếu"
                    searchUrl={"/user/get-list"}
                    searchParam={"search"}
                    initialValue={1}
                    data={[
                        {
                            id: 1,
                            text:"Trần Thanh Quang"
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
                />
                <button className="btn btn-primary ml-2">
                    Tạo mới
                </button>
                <button className="btn btn-success ml-2">
                    Lưu
                </button>
            </div>
        </div>
    )
};

export default AccountingTicketsPage;
