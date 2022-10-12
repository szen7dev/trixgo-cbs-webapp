import React, {FC, useCallback, useEffect, useState} from "react";
import TriangleDown from "assets/icons/TriangleDown";
import Close from "../../../../../assets/icons/Close";
import moment from "moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import {DropdownSearchable} from "../../../../../shareComponents/common";
import { Task } from "typings/task";

type Props = {
    isOfficalTask: boolean,
    fromDateDefault: string,
    toDateDefault: string,
    toTimeDefault: string,
    onApplyNewTime: (timer: {
        fromDate: Date, toDate: Date, toTime: string, remind: string|number|undefined, isOfficalTask: boolean
    }) => void,
    remindDefault?: string|number,
    userId?: string,
    task: Task;
}

const remindOptions = [
    {
        id: 0,
        text: "Không"
    },
    {
        id: 0.4,
        text: "Trước 15 phút"
    },
    {
        id: 1,
        text: "Trước 1 giờ"
    },
    {
        id: 2,
        text: "Trước 2 giờ"
    },
    {
        id: 24,
        text: "Trước 1 ngày"
    },
    {
        id: 48,
        text: "Trước 2 ngày"
    },
]

const TimeRange:FC<Props> = ({
    task,
    userId,
    isOfficalTask,
    fromDateDefault,
    toDateDefault,
    toTimeDefault,
    remindDefault,
    onApplyNewTime
}) => {
    const [fromDate, setFromDate] = useState(fromDateDefault);
    const [toDate, setToDate]     = useState(toDateDefault);
    const [toTime, setToTime]     = useState(toTimeDefault);

    const [fromDateTemp, setFromDateTemp] = useState(fromDateDefault);
    const [toDateTemp, setToDateTemp] = useState(toDateDefault);
    const [toTimeTemp, setToTimeTemp] = useState(toTimeDefault);

    const [hasPermissionUpdateExpire, setHasPermissionUpdateExpire] = useState(false);

    useEffect(() => {
        if(!task) return;

        const admins = task.project?.admins;

        if(admins?.includes?.(userId) || !isOfficalTask) {
            setHasPermissionUpdateExpire(true);
        }
    }, [task?.project?.admins, userId, isOfficalTask])

    const remindDefaultItem = useCallback(() => {
        return remindOptions.find(option => option.id === remindDefault);
    }, [remindDefault])

    const [remind, setRemind] = useState<string|number|undefined>(remindDefaultItem()?.id);
    const [showOption, setShowOption] = useState(false);

    const applyNewTime = () => {
        console.log({ toTimeTemp, fromDateTemp, toDateTemp })
        setToTime(toTimeTemp);
        setToDate(toDateTemp);
        setFromDate(fromDateTemp);
        onApplyNewTime({ fromDate: new Date(fromDateTemp), toTime: toTime, toDate: new Date(toDateTemp), remind, isOfficalTask });
        setShowOption(false);
    }

    return (
        <div className={"relative"}>
            <button onClick={() => setShowOption(!showOption)} className={"flex items-center bg-cbs-form-input-bg rounded px-2 h-[30px]"}>
                {fromDate} - {toDate} {toTime} 
                {/* <span className={"text-white rounded text-xs bg-negative px-2 mx-2"}>Quá hạn</span>  */}
                <TriangleDown/>
            </button>
            {
                showOption &&
                <div className={"absolute z-20 bg-white w-[335px] shadow-lg rounded-md p-4 right-0"}>
                    <div className={"flex items-center py-2 border-b-0.5 border-primary-border"}>
                        <div className={"flex-1 text-primary-gray "}>Thời gian</div>
                        <button onClick={() => setShowOption(false)}>
                            <Close/>
                        </button>
                    </div>
                    <div className={"options"}>

                        {hasPermissionUpdateExpire && (
                            <>
                                <div className={"mt-4"}>
                                    <div className={"font-bold text-primary-gray mb-2"}>Bắt đầu</div>
                                    <DayPickerInput
                                        value={fromDateTemp}
                                        classNames={{
                                            container: "border-0.5 border-primary-border rounded w-fit",
                                            overlay: "w-full rounded",
                                            overlayWrapper: "absolute bg-white w-full right-0 z-200"
                                        }}
                                        onDayChange={(day) => setFromDateTemp(moment(day).format("MM/DD/YYYY"))}
                                        inputProps={{
                                            className: "h-[36px] outline-none pl-3",
                                            placeholder: "Bắt đầu",
                                            readOnly: true,
                                        }}
                                    />
                                </div>
                                <div className={"mt-4"}>
                                    <div className={"font-bold text-primary-gray mb-2"}>Kết thúc</div>
                                    <div className={"flex items-center"}>
                                        <DayPickerInput
                                            value={toDateTemp}
                                            classNames={{
                                                container: "border-0.5 border-primary-border rounded w-fit",
                                                overlay: "w-full rounded",
                                                overlayWrapper: "absolute bg-white w-full right-0 z-200"
                                            }}
                                            onDayChange={(day) => setToDateTemp(moment(day).format("MM/DD/YYYY"))}
                                            inputProps={{
                                                className: "h-[36px] outline-none pl-3",
                                                placeholder: "Kết thúc",
                                                readOnly: true,
                                            }}
                                        />
                                        <input
                                            value={toTimeTemp}
                                            className={"h-[36px] px-2 overflow-hidden ml-2 border-0.5 border-primary-border rounded w-fit focus:outline-none focus:ring-none"}
                                            type="time"
                                            onChange={(e) => setToTimeTemp(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className={"mt-4"}>
                            <div className={"font-bold text-primary-gray mb-2"}>Nhắc nhở thời hạn</div>
                            <DropdownSearchable
                                initialValue={remindDefaultItem()}
                                onchangeValue={item => setRemind(item.id)}
                                showTriangle={true}
                                inlineSearch={false}
                                disableSearch={true}
                                className={"w-full border-0.5 border-primary-border rounded"}
                                placeholder={"Nhắc nhở thời hạn"}
                                data={remindOptions}
                            />
                        </div>

                        <button onClick={() => applyNewTime()} className={"bg-primary rounded text-white w-full h-[36px] mt-4"}>
                            Lưu
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default TimeRange;