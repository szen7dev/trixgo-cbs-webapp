import React, {FC, useState} from "react";
import TriangleDown from "assets/icons/TriangleDown";
import {map as _map} from "lodash";
const DatePickerWithRange:FC = () => {
    const [showOption, setShowOption] = useState(false);
    const dateOption = [
        {
            id: 1,
            text: "Trong vòng 24h"
        },
        {
            id: 2,
            text: "Trong vòng 1 tuần"
        },
        {
            id: 3,
            text: "Trong vòng 1 tháng"
        },
    ]
    return (
        <div className={"relative flex-1"}>
            <button onClick={() => setShowOption(!showOption)} className={"bg-gray-100 rounded-full h-[32px] flex w-full items-center"}>
                <div className={"flex-1 text-left pl-[10px]"}>Ngày gửi</div>
                <TriangleDown className={"mr-2"}/>
            </button>
            {
                showOption&&
                <div
                    className={"shadow-lg bg-white rounded select-options-container absolute z-100 w-full min-w-[230px] rounded-md overflow-hidden right-0"}>
                    {
                        _map(dateOption, option => (
                            <div key={option.id}
                                 className={"hover:bg-gray-100 transition duration-500 flex cursor-pointer py-3 px-4"}>
                                {option.text}
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default DatePickerWithRange;
