import React, {FC, useState} from "react";
import SortingIcon from "assets/images/icons8-sorting-100.svg";
import InputClearable from "./InputClearable";

const FinancialCashFlowFilterButton:FC = () => {
    const [showFilter, setShowFilter] = useState(false);
    return (
        <div className={"relative"}>
            <button className={"bg-gray-50 flex items-center justify-center ml-3 px-3 h-[30px] rounded hover:bg-blue-100"}>
                <img src={SortingIcon} alt={"icon sorting icon"}/>
                <span className={"ml-2 text-gray-500"}>Filter</span>
            </button>
            <div className={"absolute top-full left-3 bg-white py-2 px-4 shadow-md z-20 rounded-md max-w-[900px] min-w-[600px]"}>
                <InputClearable
                    placeholder={"Nội dung tìm kiếm tại đây"}
                    className={"w-full shadow-lg rounded-md h-[45px]"}
                    onChange={(val) => console.log(val)}
                />
            </div>
        </div>
    )
}

export default FinancialCashFlowFilterButton;
