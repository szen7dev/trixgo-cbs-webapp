import React, {FC, useRef, useState} from "react";
import TriangleDown from "assets/icons/TriangleDown";
import {map as _map} from "lodash";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import BlueCheck from "assets/images/blue-check.svg";
import cn from "classnames";
import DateIcon from "assets/images/icons8-calendar-100.svg";
import DatePicker from "react-datepicker";
import moment from "moment";

const DatePickerWithRange:FC = () => {
    const [showOption, setShowOption] = useState(false);
    const [value, setValue] = useState({
        id: 0,
        text: "",
        startDate: "",
        endDate: ""
    })
    const wrapperRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(wrapperRef, () => setShowOption(false));

    const dateOption = [
        {
            id: 1,
            text: "Trong vòng 24h",
            startDate: moment().format("dd/MM/yyyy"),
            endDate: moment().subtract(1, 'days').format("dd/MM/yyyy")
        },
        {
            id: 2,
            text: "Trong vòng 1 tuần",
            startDate: moment().format("dd/MM/yyyy"),
            endDate: moment().subtract(1, 'weeks').format("dd/MM/yyyy")
        },
        {
            id: 3,
            text: "Trong vòng 1 tháng",
            startDate: moment().format("dd/MM/yyyy"),
            endDate: moment().subtract(1, 'months').format("dd/MM/yyyy")
        },
    ]
    return (
        <div ref={wrapperRef} className={"relative flex-1"}>
            <button onClick={() => setShowOption(!showOption)} className={"bg-gray-100 rounded-full h-[32px] flex w-full items-center"}>
                <div className={"flex-1 text-left pl-[10px]"}>Ngày gửi</div>
                <TriangleDown className={"mr-2"}/>
            </button>
            {
                showOption&&
                <div
                    className={"shadow-lg bg-white rounded select-options-container absolute z-100 w-full min-w-[300px] rounded-md overflow-visible right-0"}>
                    {
                        _map(dateOption, option => (
                            <div
                                onClick={() => setValue(option)}
                                key={option.id}
                                className={"hover:bg-gray-100 transition duration-500 flex cursor-pointer py-3 px-4"}
                            >
                                <div className={"w-[15px] mr-3 flex items-center justify-center"}>
                                    <img src={BlueCheck} alt={'checked'} className={cn("w-full mr-3", {
                                        "opacity-100": value.id === option.id,
                                        "opacity-0": value.id !== option.id,
                                    })}/>
                                </div>
                                <div className={"flex-1"}>
                                    {option.text}
                                </div>
                            </div>
                        ))
                    }
                    <div className={"w-full cursor-pointer py-3 px-4"}>
                        <div className={"flex"}>
                            <div className={"w-[15px] mr-3 flex items-center justify-center"}>
                                <img src={BlueCheck} alt={'checked'} className={cn("w-full mr-3", {
                                    "opacity-100": true,
                                    "opacity-0": false,
                                })}/>
                            </div>
                            <div className={"flex-1"}>Chọn khoảng thời gian</div>
                        </div>
                        <div className={"flex mt-3"}>
                            <DatePicker
                                name="startDate"
                                selected={null}
                                onChange={(date: Date | null) =>
                                    console.log("startDate", date)
                                }
                                wrapperClassName={"flex-1 mr-1"}
                                dateFormat="dd/MM/yyyy"
                                customInput={
                                    <div className={"relative pl-2 min-h-fit border border-gray-200 rounded-md flex items-center"}>
                                        <div>Từ</div>
                                        <input
                                            type="text"
                                            name="startDate"
                                            className="p-1 pl-2 pr-2 w-full focus:outline-none focus:border-primary"
                                        />
                                        <div className={"h-full flex align-items-center pr-2"}>
                                            <img src={DateIcon} alt={"calendar icon"} />
                                        </div>
                                    </div>
                                }
                            />
                            <DatePicker
                                name="endDate"
                                selected={null}
                                onChange={(date: Date | null) =>
                                    console.log("endDate", date)
                                }
                                wrapperClassName={"flex-1 ml-1"}
                                dateFormat="dd/MM/yyyy"
                                customInput={
                                    <div className={"relative pl-2 min-h-fit border border-gray-200 rounded-md flex items-center"}>
                                        <div>Đến</div>
                                        <input
                                            type="text"
                                            name="startDate"
                                            className="p-1 pl-2 pr-2 w-full focus:outline-none focus:border-primary"
                                        />
                                        <div className={"h-full flex align-items-center pr-2"}>
                                            <img src={DateIcon} alt={"calendar icon"} />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default DatePickerWithRange;
