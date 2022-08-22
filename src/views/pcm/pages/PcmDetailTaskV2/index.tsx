import React, {FC, useEffect, useState} from "react";
import { useHistory, useParams } from 'react-router-dom';

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
import CommentProvider from 'views/pcm/contexts/comment/comment.provider';
import { toast } from "react-toastify";

const PcmDetailTaskV2:FC = () => {
    const [collapse, setCollapse] = useState(false);
    const { id: taskId } = useParams<{ id: string }>();

    const history = useHistory();

    const { info: taskInfo, isLoadingInfo, refetchInfo, updateStatusMultipleAsync } = useTask({
        params: {
            taskID: taskId
        },
        isFetchInfo: true
    });

    useEffect(() => {
        (async () => {
            await updateStatusMultipleAsync({
                taskIDs: [taskId],
                option: 1
            });
        })()
    }, [])

    useEffect(() => {
        if (taskInfo?.message === "permission_denied") {
            toast.warn('Bạn không có quyền truy cập công việc này');
            return history.push(`/pcm/home`);
        }
    }, [taskInfo?.message]);

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
                    <TaskDetailRelatedTask task={taskInfo} refetchInfo={refetchInfo} />
                </div>
                <CommentProvider>
                    <TaskDetailComment task={taskInfo} refetchInfo={refetchInfo} />
                </CommentProvider>
            </div>
        </div>
    )
}

export default PcmDetailTaskV2