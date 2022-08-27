import React, {ChangeEvent, FC, useRef, useState} from "react";
import {useOnClickOutside} from "../../../../../../services/hooks/useOnclickOutside";
import debounce from "lodash/debounce";
import searchIcon from "../../../../../../assets/images/icons8-search-120.png";
import userAvt from "../../../../../../assets/images/task-user.svg";

const DocumentHeaderContent:FC =  () => {
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
                    className={"pl-12 w-full h-[45px] bg-cbs-bg-input-search rounded-md p-4 text-primary-gray placeholder:text-primary-gray placeholder:text-xl focus:outline-none focus:bg-white focus:shadow-md transition-all"} placeholder={"Tìm kiếm hồ sơ"}/>

                {
                    showResult &&
                    <div className={"absolute top-full mt-2 w-full rounded border-0.5 border-primary-border p-4 bg-white"}>
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
                        </div>
                    </div>
                }
            </div>
        </>
    )
}

export default DocumentHeaderContent;