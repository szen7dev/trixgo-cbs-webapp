import React, {FC} from "react";
import iconStar from "assets/images/icon-star.svg";
import InlineBadgeSelect from "./InlineBadgeSelect";
import { Task } from "typings/task";
import { APP_ID, PCM_STATUS_TASK, PCM_PRIORITY_TASK } from 'apis/localdb';

type Props = {
    task: Task;
}

export const TaskDetailTitle:FC<Props> = ({ task }) => {
    return (
        <div className={"task-detail-title"}>
            <span className={"text-xl "}>
                {task.name}
            </span>
            <span className={"inline-block ml-2"}>
                <button>
                    <img src={iconStar} alt={"bookmark"} className={"w-[18px] h-[18px]"}/>
                </button>
            </span>
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-xs rounded-full text-white px-2 py-1 mx-1 ${PCM_STATUS_TASK[task.status - 1]?.class}`}
                defaultValue={task.status}
                options={[
                    {
                        id: 1,
                        text: "Khởi tạo"
                    },
                    {
                        id: 2,
                        text: "Đang triển khai"
                    },
                    {
                        id: 3,
                        text: "Hoàn thành"
                    },
                ]}
                placeholder={"Trạng thái"}
                onValueChange={value => console.log(value)}
            />
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-xs rounded-full text-white px-2 py-1 mx-1 ${PCM_PRIORITY_TASK[task.priority - 1]?.class}`}
                defaultValue={task.priority}
                options={[
                    {
                        id: 1,
                        text: "Thấp"
                    },
                    {
                        id: 2,
                        text: "Bình thường"
                    },
                    {
                        id: 3,
                        text: "Cao"
                    },
                ]}
                placeholder={"Ưu tiên"}
                onValueChange={value => console.log(value)}
            />
            {/* <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={"text-xs bg-cbs-form-input-bg rounded-full text-primary-gray px-2 py-1 mx-1"}
                defaultValue={task.risk}
                options={[
                    {
                        id: 1,
                        text: "Thấp"
                    },
                    {
                        id: 2,
                        text: "Bình thường"
                    },
                    {
                        id: 3,
                        text: "Cao"
                    },
                ]}
                placeholder={"Rủi ro"}
                onValueChange={value => console.log(value)}
            /> */}
        </div>
    )
}