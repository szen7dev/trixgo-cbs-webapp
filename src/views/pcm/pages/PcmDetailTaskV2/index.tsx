import React, {FC, useState} from "react";

import {ActionTaskDetailBar} from "./components/ActionBar";
import {TaskDetailTitle} from "./components/TaskTitle";
import {TaskDetailFolder} from "./components/TaskDetailFolder";
import {TaskDetailCompleteStatus} from "./components/TaskDetailCompleteStatus";
import {TaskDetailMember} from "./components/TaskDetailMember";
import {TaskDetailSignature} from "./components/TaskDetailSignature";
import {TaskDetailDescription} from "./components/TaskDetailDescription";
import {TaskDetailSubtask} from "./components/TaskDetailSubtask";
import {TaskDetailRelatedTask} from "./components/TaskDetailRelatedTask";
import {TaskDetailComment} from "./components/TaskDetailComment";

const PcmDetailTaskV2:FC = () => {
    const [collapse, setCollapse] = useState(false);

    const handleCollapse = () => {
        setCollapse(!collapse);
    }
    return (
        <div className={"task-detail"}>
            <ActionTaskDetailBar collapse={collapse} handleCollapse={handleCollapse}/>
            <div className={"task-content p-4"}>
                <div className={collapse?"hidden":"block"}>
                    <TaskDetailTitle/>
                    <TaskDetailFolder/>
                    <TaskDetailCompleteStatus/>
                    <TaskDetailMember/>
                    <TaskDetailSignature/>
                    <TaskDetailDescription/>
                    <TaskDetailSubtask/>
                    <TaskDetailRelatedTask/>
                </div>
                <TaskDetailComment/>
            </div>
        </div>
    )
}

export default PcmDetailTaskV2