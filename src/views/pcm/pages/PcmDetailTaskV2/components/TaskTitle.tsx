import React, { FC, useState } from "react";
import iconStar from "assets/images/icon-star.svg";
import InlineBadgeSelect from "./InlineBadgeSelect";
import { Task } from "typings/task";
import { PCM_STATUS_TASK, PCM_PRIORITY_TASK } from 'apis/localdb';
import { useTask } from 'services/hooks/useTask';
import { toast } from "react-toastify";

type Props = {
    task: Task;
}

export const TaskDetailTitle: FC<Props> = ({ task }) => {
    const [currentStatus, setCurrentStatus] = useState(task.status);
    const [currentPriority, setCurrentPriority] = useState(task.priority);

    const { updateTaskAsync } = useTask({});

    const handleChangeStatus = async (value: any) => {
        try {
            const { error, message } = await updateTaskAsync({
                taskID: task._id,
                status: value.id
            });

            if (error) {
                return toast.warning(message);
            }

            setCurrentStatus(value.id);
            toast.success('Cập nhật trạng thái thành công', { autoClose: 1500 })
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const handleChangePriority = async (value: any) => {
        try {
            const { error, message } = await updateTaskAsync({
                taskID: task._id,
                priority: value.id
            });

            if (error) {
                return toast.warning(message);
            }

            setCurrentPriority(value.id);
            toast.success('Cập nhật độ ưu tiên thành công', { autoClose: 1500 })
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    return (
        <div className={"task-detail-title"}>
            <span className={"text-xl "}>
                {task.name}
            </span>
            <span className={"inline-block ml-2"}>
                <button>
                    <img src={iconStar} alt={"bookmark"} className={"w-[18px] h-[18px]"} />
                </button>
            </span>
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-xs rounded-full text-white px-2 py-1 mx-1 ${PCM_STATUS_TASK[currentStatus - 1]?.class}`}
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
                onValueChange={handleChangeStatus}
            />
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-xs rounded-full text-white px-2 py-1 mx-1 ${PCM_PRIORITY_TASK[currentPriority - 1]?.class}`}
                defaultValue={currentPriority}
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
                onValueChange={handleChangePriority}
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