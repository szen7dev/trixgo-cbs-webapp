import React, {FC, useRef, useState} from "react"
import iconClock from "assets/images/icons8-clock-48.svg";
import taskUserAvt from "assets/images/task-user.svg";
import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import Close from "assets/icons/Close";
import {useOnClickOutside} from "services/hooks/useOnclickOutside";
import { Task } from "typings/task";
import { useTask } from 'services/hooks/useTask';
import moment from "moment";
import { Link } from "react-router-dom";
import { PCM_STATUS_TASK } from 'apis/localdb';
import { toast } from "react-toastify";

type Props = {
    task: Task;
    userId: string | undefined;
    index: number;
}

export const SubtaskItem:FC<Props> = ({ task, userId, index }) => {
    const wrapperClass = useRef<HTMLDivElement>(null)
    const [showOption, setShowOption] = useState(false);
    const [isChecked, setisChecked] = useState(task.status === 3);

    const { updateTaskAsync } = useTask({});

    useOnClickOutside(wrapperClass, () => setShowOption(false));

    const handleUpdateStatusTask = async () => {
        if(task.status === 3) return;

        if(userId !== task.assignee?._id) {
            return toast.warn('Bạn không có quyền check hoàn thành');
        }

        try {
            setisChecked(true);
            await updateTaskAsync({
                taskID: task._id,
                status: 3
            });
        } catch(error: any) {
            toast.error(error?.message);
        }
    }

    return (
        <div className="flex items-start justify-between mt-4 min-w-fit">
            <input
                className="form-check-input"
                type="checkbox"
                defaultChecked={isChecked}
                disabled={isChecked}
                // onChange={handleUpdateStatusTask}
            />
            <div className="mx-2 px-2 w-full">
                <p className="text-[14px]">
                    <Link to={"/pcm/detail/" + task._id}>
                        {index + 1}. {task.name}
                    </Link>
                </p>
                <p className="text-[12px] text-cbs-highlight-color">
                    {task.assignee?.bizfullname}
                </p>
            </div>
            <div className={"flex items-center"}>
                <div className={`flex items-center justify-center px-4 py-1 rounded text-white ${PCM_STATUS_TASK[task.status - 1]?.class} mr-2`}>
                    <img src={iconClock} alt={"----"} className={"mr-2"}/>
                    <span className="text-[13px]">{moment(task.expiredTime).format('DD/M/YYYY')}</span>
                </div>
                <img
                    alt={task.assignee?.bizfullname}
                    src={task.assignee?.image ? `${process.env.REACT_APP_URL_S3_USER}/${task.assignee?.image}` : taskUserAvt}
                    className={"rounded-full overflow-hidden h-[30px] w-[30px] min-h-[30px] min-w-[30px] max-h-[30px] max-w-[30px] mr-2"}
                />

                <div ref={wrapperClass} className={"relative inline-block"}>
                    <button onClick={() => setShowOption(!showOption)} className={"rounded w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] bg-cbs-form-input-bg flex items-center justify-center"}>
                        <img src={iconHorizontalDots} alt={"----"} className={"w-[10px]"}/>
                    </button>
                    {
                        showOption &&
                        <div className={"absolute left-0 z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                            <div className={"flex h-[30px] items-center mx-4 py-2 border-b-0.5 border-primary-border"}>
                                <div className={"flex-1"}>Chức năng khác</div>
                                <button onClick={() => setShowOption(false)}>
                                    <Close/>
                                </button>
                            </div>

                            {/* <div className={"mb-4"}>
                                <button
                                    className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                >
                                    Cập nhật thời hạn
                                </button>
                                <button
                                    className={"px-4 py-2 w-full text-left hover:bg-cbs-table-header"}
                                >
                                    Cập nhật trạng thái
                                </button>
                            </div> */}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}