import React, {FC, useState, useEffect} from "react";
import iconTickBox from "assets/images/icons8-tick-box-48.svg";
// import iconClock from "assets/images/icons8-clock-48.svg";
// import taskUserAvt from "assets/images/task-user.svg";
// import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import { CreateNewSubTask } from "./CreateNewSubTask";
import { SubtaskItem } from "./SubtaskItem";
import { useTask } from 'services/hooks/useTask';
import { Task } from "typings/task";

type Props = {
    task: Task;
    userId?: string;
}

export const TaskDetailSubtask:FC<Props> = ({ task, userId }) => {
    const progress = task.percentage;
    const [showCreateNewSubTask, setShowCreateNewSubTask] = useState(false);
    const {
        listTasks: listSubTasks,
        refetchListTask,
        nextPageListTask,
        totalRecord,
        totalTaskDone,
        hasNextPage
    } = useTask({
        params: {
            parentID: task?._id,
            isSortChildTask: '1',
        },
        isFetch: true,
    });

    useEffect(()=> {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    }, [])

    return (
        (task.subtype == 4 && task.assignee._id.toString() == userId?.toString()) ?  <></> : 
        <div className={"subtask mt-5 w-2/3"}>
            <div className={"flex items-center"}>
                <div className={"flex items-center"}>
                    <img src={iconTickBox} alt={'-----'} className={"mr-4"}/>
                    <span className={"text-primary-gray text-[16px] font-bold"}>
                        Việc con
                    </span>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    <button className={"bg-cbs-form-input-bg py-2 px-4 rounded mr-4 text-primary-gray"}>
                        Hiện việc hoàn thành ({totalTaskDone})
                    </button>
                    {hasNextPage && (
                        <button className={"bg-cbs-form-input-bg py-2 px-4 rounded text-primary-gray"} onClick={nextPageListTask}>
                            Hiển thị thêm ({totalRecord - listSubTasks.length})
                        </button>
                    )}
                </div>
            </div>
            <div className={"progress-bar flex items-center mt-4"}>
                <span className={"text-primary-gray mr-2"}>{progress}%</span>
                <div className={"bar-progress-line overflow-hidden flex-1 h-[8px] rounded-full bg-cbs-form-input-bg relative"}>
                    <div style={{width: `${progress}%`}} className={"absolute h-full top-0 left-0 transition-all " + (progress < 100 ? "bg-secondary":"bg-positive")}/>
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                {listSubTasks && listSubTasks.map((subtask, index) => (
                    <SubtaskItem key={subtask._id} task={subtask} index={index} />
                ))}
    
                {showCreateNewSubTask &&
                    <CreateNewSubTask
                        task={task}
                        userId={userId}
                        cancelCreateNewSubTask={() => setShowCreateNewSubTask(false)}
                        confirmCreateNewSubTask={refetchListTask}
                    />
                }

                <button
                    className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}
                    onClick={() => setShowCreateNewSubTask(true)}
                >
                    Thêm một mục
                </button>
            </div>
        </div>
    )
}