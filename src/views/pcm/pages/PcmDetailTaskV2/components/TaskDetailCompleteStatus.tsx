import React, { FC } from "react";
import iconTaskCompleted from "assets/images/icons8-task-completed-48.svg";
import { Task } from "typings/task";
import { Link } from "react-router-dom";

type Props = {
    task: Task;
}

export const TaskDetailCompleteStatus: FC<Props> = ({ task }) => {
    if(!task.parent) return <></>
    return (
        <div className={"task-complete flex items-center mt-5"}>
            <span className={"mr-4"}>
                <img src={iconTaskCompleted} alt={'-----'} />
            </span>
            <div className={"flex text-cbs-highlight-color"}>
                <Link to={`/pcm/detail/${task.parent?._id}`}>
                    {task.parent?.name}
                </Link>
            </div>
        </div>
    )
}