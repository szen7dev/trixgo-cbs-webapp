import React, {FC, useState} from "react";
import { useParams } from 'react-router-dom';

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
import { useTask } from 'services/hooks/useTask';
import { Loader } from "shareComponents/common";

const PcmDetailTaskV2:FC = () => {
    const [collapse, setCollapse] = useState(false);
    const { id: taskId } = useParams<{ id: string }>();

    const { info: taskInfo, isLoadingInfo, refetchInfo } = useTask({
        params: {
            taskID: taskId
        },
        isFetchInfo: true
    });

    const handleCollapse = () => {
        setCollapse(!collapse);
    }

    if(isLoadingInfo) {
        return <Loader className="border-primary" />
    }

    return (
        <div className={"task-detail"}>
            <ActionTaskDetailBar collapse={collapse} handleCollapse={handleCollapse}/>
            <div className={"task-content p-4"}>
                <div className={collapse?"hidden":"block"}>
                    <TaskDetailTitle task={taskInfo} />
                    <TaskDetailFolder task={taskInfo} />
                    <TaskDetailCompleteStatus task={taskInfo} />
                    <TaskDetailMember task={taskInfo} />
                    <TaskDetailSignature task={taskInfo} />
                    <TaskDetailDescription task={taskInfo} refetchInfo={refetchInfo} />
                    <TaskDetailSubtask task={taskInfo} />
                    <TaskDetailRelatedTask task={taskInfo} />
                </div>
                <TaskDetailComment/>
            </div>
        </div>
    )
}

export default PcmDetailTaskV2