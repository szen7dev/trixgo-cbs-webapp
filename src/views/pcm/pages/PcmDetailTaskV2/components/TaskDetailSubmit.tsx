import {FC, useState, useEffect} from "react";
import iconNote from "assets/images/icons8-note-48.svg";
import { CreateSubmitDetail } from "./CreateSubmitDetail";
import { SubmittalItem } from "./SubmittalItem";
import { useBudgetSubmittal } from 'services/hooks/budget/useBudgetSubmittal';
import { Task } from "typings/task";

type Props = {
    task: Task;
    userId?: string;
}

export const TaskDetailSubmit:FC<Props> = ({ task, userId }) => {
    const [showCreateSubmittal, setShowCreateSubmittal] = useState(false);
    const {
        list: listSubmittals,
        refetch,
        fetchNextPage,
        totalRecord,
        hasNextPage
    } = useBudgetSubmittal({
        params: {
            taskID: task?._id
        },
        isFetchList: true,
    })

    useEffect(()=> {
        refetch();
    }, [task.timeImportExcel])

    return (
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
                    {hasNextPage && (
                        <button className={"bg-cbs-form-input-bg py-2 px-4 rounded text-primary-gray"} onClick={fetchNextPage}>
                            Hiển thị thêm ({totalRecord - listSubmittals.length})
                        </button>
                    )}
                </div>
            </div>
            <div className={"list-subtask mt-4"}>
                {listSubmittals && listSubmittals.map((subtask, index) => (
                    <SubmittalItem
                        key={subtask._id}
                        task={subtask}
                        userId={userId}
                        index={index}
                    />
                ))}

                {showCreateSubmittal &&
                    <CreateSubmitDetail
                        task={task}
                        userId={userId}
                        cancelCreateSubmittal={() => setShowCreateSubmittal(false)}
                        confirmCreateSubmittal={refetch}
                    />
                }

                <button
                    className={"bg-cbs-form-input-bg rounded px-4 py-2 text-primary-gray mt-4 ml-6"}
                    onClick={() => setShowCreateSubmittal(true)}
                >
                    Thêm khoản mục
                </button>
            </div>
        </div>
    )
}