import React, { FC, useState, useMemo, useCallback, useEffect } from "react";
import iconFolder from "assets/images/icons8-folder-48.svg";
import iconCheckmark from "assets/images/icons8-checkmark-yes-64.svg";
import iconSnooze from "assets/images/icons8-snooze-48.svg";
import TimeRange from "./TimeRange";
import moment from "moment";
import { Link } from 'react-router-dom';
import { Task } from "typings/task";
import { captureException } from "@sentry/react";
import { toast } from "react-toastify";

import { useModal } from "services/hooks/useModal";
import { useTask } from "services/hooks/useTask";
import { useSocket } from "services/hooks/useSocket";
import type { User } from "typings/user";
import { ModalConfirm } from "shareComponents/common";

type Props = {
    task: Task;
    user?: User | null;
    onConfirmSign?: () => void;
    onOpenBidding?: () => void;
    hasPermissionAddSignature?: boolean;
    hasPermissionOpenBidding?: boolean;
}

export const TaskDetailFolder: FC<Props> = ({
    task,
    user,
    hasPermissionAddSignature = true,
    hasPermissionOpenBidding = true,
    onConfirmSign,
    onOpenBidding,
}) => {
    const isOpened = useMemo(() => {
        return task.openedUsers?.find(u => u._id === user?._id);
    }, [task._id, task.openedUsers])

    const usersTaskOpened = useMemo(() => {
        return task.openedUsers?.map(item => item._id);
    }, [task._id, task.openedUsers])

    const { updateTaskAsync } = useTask({});
    const [isCurrentUserOpened, setCurrentUserOpened] = useState(isOpened !== undefined);
    const [usersOpened, setUsersOpened] = useState(usersTaskOpened);
    const { current: socket }: any = useSocket();
    const { openModal, closeModal } = useModal();

    const isSigned = useMemo(() => {
        return task.signatures?.find(({ author }) => author._id === user?._id)
    }, [task.signatures, user?._id])

    useEffect(() => {
        const onEventOpenBidding = (result: any) => {
            const { error, message, data } = result;

            if (error) {
                return toast.warn(message);
            }

            const relatedUsers = task.related?.map(item => item._id);

            if (relatedUsers?.includes(data?.userID) && task._id === data?.taskID) {
                setUsersOpened(prev => ([...prev, data?.userID]));
            }
        }

        socket?.on("SUBJECT_PCM_SSC_OPEN_BIDDING", onEventOpenBidding);

        return () => {
            socket?.off("SUBJECT_PCM_SSC_OPEN_BIDDING", onEventOpenBidding);
        }
    }, [socket])

    const getGroupTitle = (group: any) => {
        let title = "";
        if (group?.parent) {
            const name = getGroupTitle(group?.parent);
            title = title ? `${name} > ${title}` : name;
        }

        return title ? `${title} > ${group?.name}` : group?.name;
    };

    const toggleModalOpenBidding = () => {
        openModal(
          <div
            className={
              "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
            }
          >
            <ModalConfirm
              title="Bạn có muốn mở thầu không?"
              description="Mở thầu để xem hồ sơ dự thầu của nhà thầu"
              onConfirm={handleOpenBidding}
              defaultText={false}
              onCancel={closeModal}
            />
          </div>
        );
    };

    const toggleModalOpenSign = () => {
        openModal(
          <div
            className={
              "inline-block w-[521px] h-[240px] my-8 overflow-hidden text-left align-middle transition-all transform bg-primary-light shadow-xl rounded"
            }
          >
            <ModalConfirm
              title="Bạn có muốn xác nhận không?"
              description="Thông tin xác nhận của bạn sẽ được hiển thị trong chi tiết công việc"
              onConfirm={handleConfirmSignature}
              defaultText={false}
              onCancel={closeModal}
            />
          </div>
        );
    };

    const handleConfirmSignature = useCallback(async () => {
        if (!hasPermissionAddSignature) return closeModal();

        try {
            const { error, data } = await updateTaskAsync({
                taskID: task._id,
                isAddSignature: true
            })
            closeModal();
            if (error) {
                return toast.warning(data.message);
            }

            socket?.emit('SUBJECT_PCM_CSS_ADD_SIGNATURE', {
                taskID: task._id,
                bizfullname: user?.bizfullname
            });

            toast.success('Ký xác nhận thành công');
            onConfirmSign?.();
        } catch (error) {
            closeModal();
            captureException(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        }
    }, [hasPermissionAddSignature, task._id])

    const handleOpenBidding = useCallback(async () => {
        if (!hasPermissionOpenBidding || isCurrentUserOpened) return;

        try {
            const { error, data } = await updateTaskAsync({
                taskID: task._id,
                isOpenBidding: true
            })

            if (error) {
                return toast.warning(data.message);
            }

            socket?.emit('SUBJECT_PCM_CSS_OPEN_BIDDING', {
                taskID: task._id,
                bizfullname: user?.bizfullname
            });

            onOpenBidding?.();
            setCurrentUserOpened(true);
        } catch (error) {
            captureException(error);
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            closeModal()
        }
    }, [hasPermissionOpenBidding, task._id])

    return (
        <div className={"task-folder flex items-center text-primary-gray mt-5"}>
            <div className={"flex items-center flex-1"}>
                <span className={"mr-4"}>
                    <img src={iconFolder} alt={'-----'} />
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
                {(task.subtype === 4) && hasPermissionOpenBidding && (
                    <button
                        className={"flex text-primary-gray items-center rounded bg-cbs-form-input-bg px-3 h-[30px] mr-2"}
                        onClick={toggleModalOpenBidding}
                        disabled={isCurrentUserOpened}
                    >
                        <img src={iconCheckmark} alt={"----"} className={"mr-2"} />
                        <span>{isCurrentUserOpened ? 'Đã mở thầu' : 'Mở thầu'}</span>
                    </button>
                )}
                {!isSigned && hasPermissionAddSignature && (
                    <button className={"flex text-primary-gray items-center rounded bg-cbs-form-input-bg px-3 h-[30px] ml-2 mr-2"} onClick={toggleModalOpenSign}>
                        <img src={iconCheckmark} alt={"----"} className={"mr-2"} />
                        <span>Xác nhận</span>
                    </button>
                )}

                {/* <div className={"flex items-center mx-6 text-primary-gray"}>
                    <img src={iconSnooze} alt={"----"} className={"mr-2"} />
                    <span>1 day</span>
                </div> */}

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