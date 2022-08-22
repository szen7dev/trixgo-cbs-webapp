import React, { ChangeEvent, FC, UIEvent, useState } from "react";
// import iconClock from "assets/images/icons8-clock-48.svg";
// import taskUserAvt from "assets/images/task-user.svg";
// import iconHorizontalDots from "assets/images/three-dots-horizontal-v2.svg";
import iconMessageLink from "assets/images/icons8-message-link-48.svg";
import Close from "assets/icons/Close";
import { ReleatedTaskItem } from "./ReleatedTaskItem";
import { Task } from "typings/task";
import { useTask } from "services/hooks/useTask";
import { debounce } from 'lodash';
import { toast } from "react-toastify";

type Props = {
    task: Task;
    refetchInfo: () => void;
}

export const TaskDetailRelatedTask: FC<Props> = ({ task, refetchInfo }) => {
    const [showOption, setShowOption] = useState(false);
    const [keyword, setKeyword] = useState('');

    const { listTasks, hasNextPage, nextPageListTask, updateTaskAsync } = useTask({
        params: {
            collection: 1,
            keyword
        },
        isFetch: true
    });

    const handleAddRelatedTask = async (taskSelected: Task) => {
        try {
            await updateTaskAsync({
                taskID: task._id,
                isUpdateNews: true,
                tasksLink: [taskSelected._id]
            })
            refetchInfo();
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setShowOption(false);
        }
    }

    const handleChangeInputSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
        const keyword = e.target.value;
        setKeyword(keyword);
    })

    const handleScroll = (e: UIEvent<HTMLDivElement>) => {
        const { scrollHeight, scrollTop, clientHeight } = e.currentTarget;
        const bottom = scrollHeight - scrollTop === clientHeight;

        if (bottom && hasNextPage) {
            nextPageListTask();
        }
    }

    return (
        <div className={"subtask mt-5 w-2/3"}>
            <div className={"flex items-center"}>
                <div className={"flex items-center"}>
                    <img src={iconMessageLink} alt={'-----'} className={"mr-4"} />
                    <span className={"text-primary-gray text-lg font-bold"}>
                        Việc liên quan
                    </span>
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                {!!task.links?.length && task.links.map((task, index) => (
                    <ReleatedTaskItem key={task._id} index={index} task={task} />
                ))}

                <div className={"relative inline-block"}>
                    <button
                        onClick={() => setShowOption(!showOption)}
                        className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}>
                        Thêm việc liên quan
                    </button>
                    {
                        showOption &&
                        <div className={"absolute left-full z-20 bg-white w-[335px] shadow-lg rounded-md text-primary-gray"}>
                            <div className={"flex items-center py-2 border-b-0.5 border-primary-border p-4"}>
                                <div className={"flex-1"}>Việc liên quan</div>
                                <button onClick={() => setShowOption(false)}>
                                    <Close />
                                </button>
                            </div>
                            <div className={"mt-4 p-4"}>
                                <div className={"font-bold text-primary-gray"}>Tìm kiếm công việc</div>
                                <input
                                    className={"rounded border-0.5 border-primary-border px-4 py-2 mt-2 w-full"}
                                    onChange={handleChangeInputSearch}
                                />
                            </div>
                            <div className={"list-tasks h-[300px] overflow-auto"} onScroll={handleScroll}>
                                {!!listTasks.length && listTasks.map(task => (
                                    <button
                                        key={task._id}
                                        className={"hover:bg-cbs-form-input-bg px-4 py-2 text-left"}
                                        onClick={handleAddRelatedTask.bind(null, task)}
                                    >
                                        {task.project?.sign}.{task.name}
                                    </button>
                                ))}
                                {/* <button onClick={() => setShowOption(false)} className={"hover:bg-cbs-form-input-bg px-4 py-2 text-left"}>
                                    CHG.THT.Báo cáo đánh giá hồ sơ đề xuất gói thầu số 5, dự án Xây dựng Trường học quốc tế
                                </button> */}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}