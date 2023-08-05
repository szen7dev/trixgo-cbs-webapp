import {FC, useState, useEffect} from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import { CreateSubmitDetail } from "./CreateSubmitDetail";
import { SubtaskItem } from "./SubtaskItem";
import { useTask } from 'services/hooks/useTask';
import { Task } from "typings/task";

type Props = {
    task: Task;
    userId?: string;
}

export const TaskDetailSubmit:FC<Props> = ({ task, userId }) => {
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
        refetchListTask();
    }, [task.timeImportExcel])

    return (
        (task.subtype == 4 && task.assignee._id.toString() == userId?.toString()) ?  <></> :
        <div className={"subtask mt-5 w-2/3"}>
            <div className={"flex items-center"}>
            <span className={"mr-4"}>
                <img src={iconNote} alt={'-----'} />
            </span>
                <div className={"flex items-center"}>
                    <span className={"text-primary-gray text-[16px] font-bold"}>
                        Chi tiết trình duyệt
                    </span>
                </div>
                <div className={"flex-1 flex items-center justify-end"}>
                    {/* <button className={"bg-cbs-form-input-bg py-2 px-4 rounded mr-4 text-primary-gray"}>
                        Việc hoàn thành ({totalTaskDone})
                    </button> */}
                    {hasNextPage && (
                        <button className={"bg-cbs-form-input-bg py-2 px-4 rounded text-primary-gray"} onClick={nextPageListTask}>
                            Hiển thị thêm ({totalRecord - listSubTasks.length})
                        </button>
                    )}
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                {/* {listSubTasks && listSubTasks.map((subtask, index) => (
                    <SubtaskItem
                        key={subtask._id}
                        task={subtask}
                        userId={userId}
                        index={index}
                    />
                ))} */}

                {showCreateNewSubTask &&
                    <CreateSubmitDetail
                        task={task}
                        userId={userId}
                        cancelCreateSubmittal={() => setShowCreateNewSubTask(false)}
                        confirmCreateSubmittal={refetchListTask}
                    />
                }

                <button
                    className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}
                    onClick={() => setShowCreateNewSubTask(true)}
                >
                    Thêm khoản mục
                </button>
            </div>
        </div>
    )
}