import React, {ReactNode, useState, useRef, useEffect, forwardRef, useImperativeHandle} from "react";
import BlueCheck from "assets/images/blue-check.svg";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";

type Props = {
    placeholder: string,
    options: {
        text: string,
        fromDate: string,
        toDate: string,
    }[],
    onValueChange: (value: { fromDate: string, toDate: string }) => void
    className?: string,
    iconBack?: ReactNode,
    iconFront?: ReactNode,
}

type TimeRangeHandle = {
    resetTimeRange: () => void
}

const TimeRangeDropdown = forwardRef<TimeRangeHandle, Props>(
    ({placeholder, options, onValueChange, className, iconFront, iconBack, ...props}, timeRanageRef) => {
    const [showOption, setShowOption] = useState(false);
    const [useCustomDate, setUseCustomDate] = useState(false);
    const [fromToDate, setFromTodate] = useState({
        fromDate: "",
        toDate: ""
    })

    useImperativeHandle(timeRanageRef, () => ({
        resetTimeRange() {
            setFromTodate({
                fromDate: "",
                toDate: ""
            })
        }
    }));

    useEffect(() => {
        if (useCustomDate) {
            setFromTodate({
                fromDate: moment().format("YYYY-MM-DD"),
                toDate: moment().format("YYYY-MM-DD")
            })
        }
    }, [useCustomDate])

    const wrapperRef = useRef<HTMLDivElement>(null);
    useOnClickOutside(wrapperRef, () => setShowOption(false));

    const handleSelectOption = ({fromDate, toDate}: {
        text: string,
        fromDate: string,
        toDate: string,
    }) => {
        setFromTodate({fromDate, toDate});
        setShowOption(false);
        setUseCustomDate(false);
        onValueChange({fromDate, toDate})
    }

    const handleSetFromToDate = (key: string, date: string) => {
        setFromTodate({
            ...fromToDate,
            [key] : date
        })
    }

    const applyCustomFromToDate = () => {
        setShowOption(false);
        onValueChange(fromToDate);
    }

    return (
        <div ref={wrapperRef} className={"relative"}>
            <button onClick={() => setShowOption(!showOption)} className={`flex justify-center items-center ${className}`}>
                {iconFront}
                <span className={"ml-2 mr-4"}>{placeholder}</span>
                {iconBack}
            </button>
            {
                showOption &&
                <div className={"border-0.5 border-primary-border bg-white rounded select-options-container absolute z-100 w-[281px] min-w-[281px] rounded-md overflow-visible left-0"}>
                    {
                        options.map(option => (
                            <div
                                onClick={() => handleSelectOption(option)}
                                key={option.text} className={" select-option hover:bg-gray-100 transition duration-150 flex cursor-pointer py-3 px-4 "}>
                                {
                                    (option.fromDate === fromToDate.fromDate && option.toDate === fromToDate.toDate) ?
                                        <img src={BlueCheck} alt={"checked"} className={"w-[15px] mr-3"} /> :
                                        <div className={"w-[15px] mr-3"} />
                                }
                                <div className={"flex align-items-center text-left"}>
                                    {option.text}
                                </div>
                            </div>
                        ))
                    }
                    <div
                        onClick={() => {
                            setUseCustomDate(true);
                        }}
                        className={"border-t-0.5 border-primary-border select-option hover:bg-gray-100 transition duration-150 flex cursor-pointer py-3 px-4 "}>
                        <div className={"w-[15px] mr-3"} />
                        <div className={"flex align-items-center text-left"}>
                            Tuỳ chỉnh
                        </div>
                    </div>
                    {
                        useCustomDate &&
                        <div className={"py-2"}>
                            <div className={"flex items-center justify-center px-2"}>
                                <div className={"flex-1"}>
                                    <span className={"text-xs text-primary ml-3 translate-y-3 inline-block bg-white"}>Từ ngày</span>
                                    <DayPickerInput
                                        value={moment(fromToDate.toDate).format("DD/MM/YYYY")}
                                        classNames={{
                                            container: "border-0.5 border-primary-border rounded-l py-2",
                                            overlay: "w-full",
                                            overlayWrapper: "absolute bg-white w-full"
                                        }}
                                        onDayChange={(day) => handleSetFromToDate("fromDate", moment(day).format("YYYY-MM-DD"))}
                                        inputProps={{
                                            className: "w-full h-6 outline-none pl-3",
                                            placeholder: "Từ ngày",
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div className={"flex-1"}>
                                    <span className={"text-xs text-primary ml-3 translate-y-3 inline-block bg-white"}>Tới ngày</span>
                                    <DayPickerInput
                                        value={moment(fromToDate.toDate).format("DD/MM/YYYY")}
                                        classNames={{
                                            container: "border-0.5 border-l-0 border-primary-border rounded-r py-2",
                                            overlay: "w-full",
                                            overlayWrapper: "absolute bg-white w-full"
                                        }}
                                        onDayChange={(day) => handleSetFromToDate("toDate", moment(day).format("YYYY-MM-DD"))}
                                        inputProps={{
                                            className: "w-full h-6 outline-none pl-3",
                                            placeholder: "Tới ngày",
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                            </div>
                            <div className={"flex items-center justify-end mt-2 px-2"}>
                                <button
                                    onClick={() => applyCustomFromToDate()}
                                    className={"bg-primary rounded px-4 py-2 text-white"}>Áp dụng</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
})
TimeRangeDropdown.displayName = "TimeRangeDropdown";
export default TimeRangeDropdown;