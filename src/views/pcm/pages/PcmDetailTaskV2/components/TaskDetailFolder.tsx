import React, {FC} from "react";
import iconFolder from "assets/images/icons8-folder-48.svg";
import iconCheckmark from "assets/images/icons8-checkmark-yes-64.svg";
import iconSnooze from "assets/images/icons8-snooze-48.svg";
import TimeRange from "./TimeRange";
import moment from "moment";
import { Link } from 'react-router-dom';
import { Task } from "typings/task";

type Props = {
    task: Task;
}

export const TaskDetailFolder:FC<Props> = ({ task }) => {
    const folders = ["CHG.THT","Tư vấn thiết kế 112","Hồ sơ thanh toán"];

    const getGroupTitle = (group: any) => {
        let title = "";
        if (group?.parent) {
          const name = getGroupTitle(group?.parent);
          title = title ? `${name} > ${title}` : name;
        }

        return title ? `${title} > ${group?.name}` : group?.name;
    };

    return (
        <div className={"task-folder flex items-center text-primary-gray mt-5"}>
            <div className={"flex items-center flex-1"}>
                <span className={"mr-4"}>
                    <img src={iconFolder} alt={'-----'}/>
                </span>
                <div className={"flex"}>
                    {task?.project?.sign} {">"}{" "}
                    <Link to={`/pm/project/${task?.project?._id}/folder/${task?.group?._id}`}>
                        {getGroupTitle(task?.group)}
                    </Link>
                    {/* {
                        folders.map((folder, index) => (
                            <span key={folder}>{folder} {(index < folders.length-1) ? " > " : "" } </span>
                        ))
                    } */}
                </div>
            </div>
            <div className={"flex items-center"}>
                <button className={"flex text-primary-gray items-center rounded bg-cbs-form-input-bg px-3 h-[30px]"}>
                    <img src={iconCheckmark} alt={"----"} className={"mr-2"}/>
                    <span>Xác nhận</span>
                </button>

                <div className={"flex items-center mx-6 text-primary-gray"}>
                    <img src={iconSnooze} alt={"----"} className={"mr-2"}/>
                    <span>1 day</span>
                </div>

                <TimeRange
                    fromDateDefault={moment(task.actualStartTime).format('DD/M/YY')}
                    toDateDefault={moment(task.actualFinishTime).format('DD/M/YY')}
                    toTimeDefault={moment(task.actualFinishTime).format('HH:mm')}
                    onApplyNewTime={time => console.log(time)}
                />
            </div>
        </div>
    )
}