import React, {FC} from "react";
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import { Task } from "typings/task";
import moment from "moment";
import { Link } from "react-router-dom";

type Props = {
    task: Task;
    index: number;
}

export const ReleatedTaskItem:FC<Props> = ({ task, index }) => {
    return (
        <div className={"flex items-start justify-between mt-4"}>
            {/* <input checked className="form-check-input" type="checkbox" value="" id="check"/> */}
            <div className={"mx-2"}>
                <p className="text-[14px]">
                    <Link to={"/pcm/detail/" + task._id}>
                        {task.project?.sign}.{task.name}
                    </Link>
                </p>
                <p className={"text-[12px] text-cbs-highlight-color"}>{task.assignee?.bizfullname}</p>
            </div>
            <div className={"flex items-center"}>
                <div className={"flex items-center justify-center px-4 py-1 rounded bg-cbs-form-input-bg mr-2"}>
                    {/* <img src={iconClock} alt={"----"} className={"mr-2"}/> */}
                    <span className="text-primary-gray">{moment(task.actualFinishTime).format('DD/M/YYYY')}</span>
                </div>
                <img
                    alt={"----"}
                    src={task.assignee?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task.assignee?.image}` : taskUserAvt}
                    className={"rounded-full overflow-hidden h-[30px] w-[30px] min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] mr-2"}
                />
                {/* <button className={"rounded w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                    <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                </button> */}
            </div>
        </div>
    )
}