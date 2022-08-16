import React, {FC} from "react";
import iconTaskCompleted from "assets/images/icons8-task-completed-48.svg";

export const TaskDetailCompleteStatus:FC = () => {
    return (
        <div className={"task-complete flex items-center mt-5"}>
                    <span className={"mr-4"}>
                        <img src={iconTaskCompleted} alt={'-----'}/>
                    </span>
            <div className={"flex text-cbs-highlight-color"}>
                Hồ sơ thanh toán của công ty tư vấn thiết kế 112
            </div>
        </div>
    )
}