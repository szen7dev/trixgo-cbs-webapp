import React, {FC} from "react";

import {ActionTaskDetailBar} from "./components/ActionBar";
import {TaskDetailTitle} from "./components/TaskTitle";
import {TaskDetailFolder} from "./components/TaskDetailFolder";
import {TaskDetailCompleteStatus} from "./components/TaskDetailCompleteStatus";
import {TaskDetailMember} from "./components/TaskDetailMember";
import {TaskDetailSignature} from "./components/TaskDetailSignature";
import {TaskDetailDescription} from "./components/TaskDetailDescription";
import {TaskDetailSubtask} from "./components/TaskDetailSubtask";
import {TaskDetailRelatedTask} from "./components/TaskDetailRelatedTask";

const PcmDetailTaskV2:FC = () => {
    return (
        <div className={"task-detail"}>
            <ActionTaskDetailBar/>
            <div className={"task-content p-4"}>
                <TaskDetailTitle/>
                <TaskDetailFolder/>
                <TaskDetailCompleteStatus/>
                <TaskDetailMember/>
                <TaskDetailSignature/>
                <TaskDetailDescription/>
                <TaskDetailSubtask/>
                <TaskDetailRelatedTask/>
            </div>
        </div>
    )
}

export default PcmDetailTaskV2