import React, {FC} from "react";
import iconTickBox from "assets/images/icons8-tick-box-48.svg";
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import {CreateNewSubTask} from "./CreateNewSubTask";
import {SubtaskItem} from "./SubtaskItem";

export const TaskDetailSubtask:FC = () => {
    const progress = 100;

    return (
        <div className={"subtask mt-5 w-2/3"}>
            <div className={"flex items-center"}>
                <div className={"flex items-center"}>
                    <img src={iconTickBox} alt={'-----'} className={"mr-4"}/>
                    <span className={"text-primary-gray text-lg font-bold"}>
                            Việc con
                        </span>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    <button className={"bg-cbs-form-input-bg py-2 px-4 rounded mr-4 text-primary-gray"}>
                        Hiện việc hoàn thành (1)
                    </button>
                    <button className={"bg-cbs-form-input-bg py-2 px-4 rounded text-primary-gray"}>
                        Hiển thị thêm (24)
                    </button>
                </div>
            </div>
            <div className={"progress-bar flex items-center mt-4"}>
                <span className={"text-primary-gray mr-2"}>100%</span>
                <div className={"bar-progress-line overflow-hidden flex-1 h-[8px] rounded-full bg-cbs-form-input-bg relative"}>
                    <div style={{width: `${progress}%`}} className={"absolute h-full top-0 left-0 transition-all " + (progress < 100 ? "bg-primary":"bg-positive")}/>
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                <SubtaskItem/>
                <SubtaskItem/>
                <SubtaskItem/>
                <SubtaskItem/>

                <CreateNewSubTask/>

                <button className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}>
                    Thêm một mục
                </button>
            </div>
        </div>
    )
}