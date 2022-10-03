import React, {ChangeEvent, FC, Fragment, useRef, useState} from "react";
import searchIcon from "assets/images/icons8-search-120.png";
import debounce from "lodash/debounce";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import userAvt from "assets/images/task-user.svg";
import {DropdownSearchable} from "../../../../common";

export const PmTabHeaderContent:FC = () => {
    const wrapperClass = useRef<HTMLDivElement>(null);
    const [tab, setTab] = useState(1);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [showResult, setShowResult] = useState(false);

    useOnClickOutside(wrapperClass, () => setShowResult(false))

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounce((e) => setSearch(e.target.value), 600)
        setShowResult(true)
    }
    return (
        <>
            <div ref={wrapperClass} className={"w-[600px] relative"}>
                <div className={"absolute left-0 flex items-center px-4 justify-center h-full"}>
                    <img src={searchIcon} alt={"search icon"}/>
                </div>
                <input
                    onChange={e => handleSearchChange(e)}
                    className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:bg-white focus:shadow-md transition-all"} placeholder={"Tìm kiếm dự án"}/>

                {
                    showResult &&
                    <div className={"absolute top-full mt-2 w-full rounded border-0.5 border-primary-border p-4 bg-white"}>
                        {/* <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                            </div>
                            <p className={"ml-4"}>Đề nghị phong tỏa tài khoản ngân hàng nhà thầu ABC (tiêu đề, mô tả task, nội dung phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                            </div>
                            <p className={"ml-4"}>Đề nghị phong tỏa tài khoản ngân hàng nhà thầu ABC (tiêu đề, mô tả task, nội dung phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={searchIcon} alt={"----"} className={"w-[18px] h-[18px]"}/>
                            </div>
                            <p className={"ml-4"}>Đề nghị phong tỏa tài khoản ngân hàng nhà thầu ABC (tiêu đề, mô tả task, nội dung phản hồi)</p>
                        </div>

                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                            </div>
                            <p className={"ml-4"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                            </div>
                            <p className={"ml-4"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
                        </div>
                        <div className={"flex items-center py-2"}>
                            <div className={"w-[36px] flex items-center justify-center"}>
                                <img src={userAvt} alt={"----"} className={"w-[36px] h-[36px] min-w-[36px] min-h-[36px] max-w-[36px] max-h-[36px] rounded-full overflow-hidden"}/>
                            </div>
                            <p className={"ml-4"}>Lê Lưu Phong-CPMI (người tạo phản hồi)</p>
                        </div> */}
                    </div>
                }
            </div>
            {/* <div className={"flex ml-3 mr-3 justify-end"}>
                <DropdownSearchable
                    disableSearch={true}
                    placeholder={"Lọc theo"}
                    className={"border-0.5 border-primary-border rounded-full px-2"}
                    showTriangle={true}
                    data={[
                        {
                            id: 1,
                            text: "Tất cả"
                        },
                        {
                            id: 2,
                            text: "Công ty tôi"
                        },
                        {
                            id: 3,
                            text: "Công ty khác"
                        }
                    ]}
                />
            </div> */}
        </>
    )
}