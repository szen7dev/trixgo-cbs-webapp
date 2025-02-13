import React, { FC, useEffect, useState } from "react";
// import iconStar from "assets/images/icon-star.svg";
import InlineBadgeSelect from "./InlineBadgeSelect";
import { Task } from "typings/task";
import { PCM_STATUS_TASK, PCM_PRIORITY_TASK, PCM_PROPOSAL_TASK, PCM_APPROVAL_TYPE } from 'apis/localdb';
import { useTask } from 'services/hooks/useTask';
import { toast } from "react-toastify";

const optionsSubtype = PCM_PROPOSAL_TASK.map(subtype => ({
    id: subtype.value,
    text: subtype.text,
    color: '#DDDDDD'
}))

const optionsApprovalType = PCM_APPROVAL_TYPE.map((item: any) => ({
    id: item.value,
    text: item.text,
    color: '#DDDDDD'
}))

type Props = {
    task: Task;
    userId: string;
    refetchInfo: () => void;
}

export const TaskDetailTitle: FC<Props> = ({ task, userId, refetchInfo }) => {
    const [currentStatus, setCurrentStatus] = useState(task.status);
    const [currentPriority, setCurrentPriority] = useState(task.priority);
    const [isMarkInterest, setIsMarkInterest] = useState(task?.flags?.includes(userId))

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

    const handleChangeSubtype = async (value: any) => {
        try {
            const { error, message } = await updateTaskAsync({
                taskID: task._id,
                subType: value.id
            });

            if (error) {
                return toast.warning(message);
            }

            refetchInfo?.();
            toast.success('Cập nhật tính chất thành công', { autoClose: 1500 })
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }
 
    const handleChangeApprovalSubtype = async (value: any) => {
        try {
            const { error, message } = await updateTaskAsync({
                taskID: task._id,
                approvalType: value.id
            });

            if (error) {
                return toast.warning(message);
            }

            refetchInfo?.();
            toast.success('Cập nhật phân loại thành công', { autoClose: 1500 })
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }

    const handleMarkInterest = async () => {
        try {
          const { error, data } = await updateTaskAsync({
            taskID: task._id,
            ...isMarkInterest ? { flagsRemoves: [userId] } : { flags: [userId] }
          })

          if(error) return toast.warn(data?.message);

          setIsMarkInterest(!isMarkInterest);
        } catch (error) {
          if(error instanceof Error)
            toast.error(error.message);
          if(typeof error === 'string')
            toast.error(error);
        }
    }

    let options = [
        {
            id: 1,
            text: "Khởi tạo",
            color: "#ffb3b3"
        },
        {
            id: 2,
            text: "Đang triển khai",
            color: "#00aaff"
        },
        {
            id: 4,
            text: "Treo lại",
            color: "#8f1aac"
        },
        {
            id: 5,
            text: "Chờ người khác giải quyết",
            color: "#4d4dff"
        },
        {
            id: 6,
            text: "Tiếp tục theo dõi",
            color: "#5bc0de"
        },
        {
            id: 7,
            text: "Chưa đủ điều kiện duyệt",
            color: "#f6bb29"
        },
        {
            id: 8,
            text: "Chất lượng kiểm tra không đạt 222",
            color: "#ffb3b3"
        },
    ]

    // Hiển thị thanh trạng thái cho Phép ai được Bấm Hoàn Thành
    if
        (([0,1,4,6,7,7,9,10,11].includes(task?.subtype) && task?.author?._id === userId) ||
        ([2,3,5].includes(task?.subtype) && task?.assignee?._id === userId)) {
        options = [
            {
                id: 1,
                text: "Khởi tạo",
                color: "#ffb3b3"
            },
            {
                id: 2,
                text: "Đang triển khai",
                color: "#00aaff"
            },
            {
                id: 3,
                text: "Hoàn thành",
                color: "#5fba7d"
            },
            {
                id: 4,
                text: "Treo lại",
                color: "#8f1aac"
            },
            {
                id: 5,
                text: "Chờ người khác giải quyết",
                color: "#4d4dff"
            },
            {
                id: 6,
                text: "Tiếp tục theo dõi",
                color: "#5bc0de"
            },
            {
                id: 7,
                text: "Chưa đủ điều kiện duyệt",
                color: "#f6bb29"
            },
            {
                id: 8,
                text: "Chất lượng kiểm tra không đạt",
                color: "#ffb3b3"
            },
        ];
    }

    return (
        <div className={"task-detail-title"}>
            <span className={"text-xl"}>
                {task.name} 
            </span>
            <span className={"inline-block ml-2 mx-2"}>
                <button onClick={handleMarkInterest}>
                    <img
                        className="inline h-[22px] w-[22px]"
                        src={`/images/common/${isMarkInterest ? 'icons8-star-96.png' : 'icon-star-filled.png'}`}
                        alt="Star"
                    />
                </button>
            </span>
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-[10px] text-white rounded px-1 py-0.5 mx-1 ${PCM_STATUS_TASK[currentStatus - 1]?.class}`}
                defaultValue={task.status}
                options={options}
                placeholder={"Trạng thái: "}
                onValueChange={handleChangeStatus}
            />
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-[10px] text-white rounded px-1 py-0.5 mx-1 ${PCM_PRIORITY_TASK[currentPriority - 1]?.class}`}
                defaultValue={currentPriority}
                options={[
                    {
                        id: 1,
                        text: "Thấp",
                        color: "#DDDDDD"
                    },
                    {
                        id: 2,
                        text: "Bình thường",
                        color: "#5bc0de"
                    },
                    {
                        id: 3,
                        text: "Cao",
                        color: "#ff0000"
                    },
                ]}
                placeholder={"Ưu tiên: "}
                onValueChange={handleChangePriority}
            />
            <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-[10px] text-secondary-gray rounded px-1 py-0.5 mx-1`}
                defaultValue={task.subtype }
                options={optionsSubtype}
                placeholder={""}
                onValueChange={handleChangeSubtype}
            />
           <InlineBadgeSelect
                wrapperClassName={"-translate-y-1"}
                className={`text-[10px] text-secondary-gray rounded px-1 py-0.5 mx-1`}
                defaultValue={task?.approvalType}
                options={optionsApprovalType}
                placeholder={""}
                onValueChange={handleChangeApprovalSubtype}
            />
        </div>
    )
}