import React, {FC, useRef, useState} from "react";
import TriangleDown from "assets/icons/TriangleDown";
import {map as _map} from "lodash";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import BlueCheck from "assets/images/blue-check.svg";
import cn from "classnames";
import DateIcon from "assets/images/icons8-calendar-100.svg";
import DatePicker from "react-datepicker";
import moment from "moment";
import {LazyLoadImage} from "react-lazy-load-image-component";
type Props = {
    onValueChange?: (value: {
        id: number,
        text: string,
        startDate: string,
        endDate: string
    }) => void
}
const DatePickerWithRange:FC<Props> = ({onValueChange}) => {
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
            startDate: moment().subtract(1, 'days').format("DD/MM/yyyy"),
            endDate: moment().format("DD/MM/yyyy")
        },
        {
            id: 2,
            text: "Trong vòng 1 tuần",
            startDate: moment().subtract(1, 'weeks').format("DD/MM/yyyy"),
            endDate: moment().format("DD/MM/yyyy")
        },
        {
            id: 3,
            text: "Trong vòng 1 tháng",
            startDate: moment().subtract(1, 'months').format("DD/MM/yyyy"),
            endDate: moment().format("DD/MM/yyyy")
        },
    ]

    const setOptionValue = (value: {
        id: number,
        text: string,
        startDate: string,
        endDate: string
    }, hideOptions = true) => {
        setValue(value)
        hideOptions&&setShowOption(false);
        onValueChange&&onValueChange(value);
    }

    return (
        <div ref={wrapperRef} className={"relative flex-1"}>
            <button onClick={() => setShowOption(!showOption)} className={"bg-gray-100 rounded-full h-[32px] flex w-full items-center"}>
                <div className={"flex-1 text-left pl-[10px] truncate"}>
                    {
                        value.id === 0 ?
                            "Ngày gửi" :
                            value.text
                    }
                </div>
                <TriangleDown className={"mr-2"}/>
            </button>
            {
                showOption&&
                <div
                    className={"shadow-lg bg-white rounded select-options-container absolute z-100 w-full min-w-[300px] rounded-md overflow-visible right-0"}>
                    {
                        _map(dateOption, option => (
                            <div
                                onClick={() => setOptionValue(option)}
                                key={option.id}
                                className={"hover:bg-gray-100 transition duration-500 flex cursor-pointer py-3 px-4"}
                            >
                                <div className={"w-[15px] mr-3 flex items-center justify-center"}>
                                    <LazyLoadImage effect="blur" src={BlueCheck} alt={'checked'} className={cn("w-full mr-3", {
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
                    <div
                        onClick={() => setOptionValue({
                            id: 4,
                            text: "Chọn khoảng thời gian",
                            startDate: moment().format("DD/MM/yyyy"),
                            endDate: moment().format("DD/MM/yyyy"),
                        }, false)}
                        className={"w-full cursor-pointer py-3 px-4"}>
                        <div className={"flex"}>
                            <div className={"w-[15px] mr-3 flex items-center justify-center"}>
                                <LazyLoadImage effect="blur" src={BlueCheck} alt={'checked'} className={cn("w-full mr-3", {
                                    "opacity-100": value.id === 4,
                                    "opacity-0": value.id !== 4,
                                })}/>
                            </div>
                            <div className={"flex-1"}>Chọn khoảng thời gian</div>
                        </div>
                        {
                            value.id === 4 &&
                            <div className={"flex mt-3"}>
                                <DatePicker
                                    name="startDate"
                                    selected={null}
                                    onChange={(date: Date | null) =>
                                        setOptionValue({
                                            ...value,
                                            id: 4,
                                            text: "Chọn khoảng thời gian",
                                            startDate: moment(date).format("DD/MM/yyyy")
                                        }, false)
                                    }
                                    wrapperClassName={"flex-1 mr-1"}
                                    dateFormat="DD/MM/yyyy"
                                    customInput={
                                        <div
                                            className={"relative pl-2 min-h-fit border border-gray-200 rounded-md flex items-center"}>
                                            <div>Từ</div>
                                            <input
                                                value={value.startDate}
                                                type="text"
                                                name="startDate"
                                                className="p-1 pl-2 pr-2 w-full focus:outline-none focus:border-primary"
                                            />
                                            <div className={"h-full flex align-items-center pr-2"}>
                                                <LazyLoadImage effect="blur" src={DateIcon} alt={"calendar icon"}/>
                                            </div>
                                        </div>
                                    }
                                />
                                <DatePicker
                                    name="endDate"
                                    selected={null}
                                    onChange={(date: Date | null) =>
                                        setOptionValue({
                                            ...value,
                                            id: 4,
                                            text: "Chọn khoảng thời gian",
                                            endDate: moment(date).format("DD/MM/yyyy")
                                        }, false)
                                    }
                                    wrapperClassName={"flex-1 ml-1"}
                                    dateFormat="DD/MM/yyyy"
                                    customInput={
                                        <div
                                            className={"relative pl-2 min-h-fit border border-gray-200 rounded-md flex items-center"}>
                                            <div>Đến</div>
                                            <input
                                                value={value.endDate}
                                                type="text"
                                                name="startDate"
                                                className="p-1 pl-2 pr-2 w-full focus:outline-none focus:border-primary"
                                            />
                                            <div className={"h-full flex align-items-center pr-2"}>
                                                <LazyLoadImage effect="blur" src={DateIcon} alt={"calendar icon"}/>
                                            </div>
                                        </div>
                                    }
                                />
                            </div>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default DatePickerWithRange;
