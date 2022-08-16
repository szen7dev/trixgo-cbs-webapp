import React, {FC} from "react";
import iconFolder from "assets/images/icons8-folder-48.svg";
import iconCheckmark from "assets/images/icons8-checkmark-yes-64.svg";
import iconSnooze from "assets/images/icons8-snooze-48.svg";
import TimeRange from "./TimeRange";

export const TaskDetailFolder:FC = () => {
    const folders = ["CHG.THT","Tư vấn thiết kế 112","Hồ sơ thanh toán"];

    return (
        <div className={"task-folder flex items-center text-primary-gray mt-5"}>
            <div className={"flex items-center flex-1"}>
                <span className={"mr-4"}>
                    <img src={iconFolder} alt={'-----'}/>
                </span>
                <div className={"flex"}>
                    {
                        folders.map((folder, index) => (
                            <span key={folder}>{folder} {(index < folders.length-1) ? " > " : "" } </span>
                        ))
                    }
                </div>
            </div>
            <div className={"flex items-center"}>
                <button className={"flex text-primary-gray items-center rounded bg-cbs-form-input-bg px-3 h-[30px]"}>
                    <img src={iconCheckmark} alt={"----"} className={"mr-2"}/>
                    <span>Xác nhận</span>
                </button>

                <div className={"flex items-center mx-6 text-primary-gray"}>
                    <img src={iconSnooze} alt={"----"} className={"mr-2"}/>
                    <span>1 day</span>
                </div>

                <TimeRange
                    fromDateDefault={"12/07/2022"}
                    toDateDefault={"12/08/2022"}
                    toTimeDefault={"12:00"}
                    onApplyNewTime={time => console.log(time)}
                />
            </div>
        </div>
    )
}