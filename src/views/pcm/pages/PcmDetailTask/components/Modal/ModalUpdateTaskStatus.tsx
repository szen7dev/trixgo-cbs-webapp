import React, { FC, Fragment, useCallback, useState } from "react";
import { toast } from "react-toastify";

/**
 * Components
 */
import { Dialog, Transition } from "@headlessui/react";
import Close from "assets/icons/Close";

/**
 * Services, Hooks
 */
import { PCM_STATUS_TASK } from 'apis/localdb';
import { useTask } from 'services/hooks/useTask';

type Props = {
    isShow: boolean;
    taskID: string;
    status?: number;
    onClose: () => void;
    onConfirm?: (status: number) => void;
}

const ModalUpdateTaskStatus:FC<Props> = ({ taskID, status, isShow, onClose, onConfirm }) => {
    const { updateTaskAsync } = useTask({});
    const [statusUpdate, setStatusUpdate] = useState(status || 1);

    const handleOnChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setStatusUpdate(+event.target.value)
    }, [])

    const handleUpdateTaskStatus = useCallback(async () => {
        try {
            const { error, message } = await updateTaskAsync({ taskID, status: statusUpdate });

            if(error) {
                return toast.warning(message);
            }

            toast.success('Cập nhật trạng thái thành công', { autoClose: 1500 })
        } catch (error) {
            if (typeof error === "string") {
                toast.error(error);
            } else if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            onClose();
            onConfirm && onConfirm(statusUpdate);
        }
    }, [statusUpdate])

    return (
        <Transition appear show={isShow} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={onClose}
            >
                <div className="min-h-screen flex items-center justify-center z-51">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
                    &#8203;
                  </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div className={"w-[400px] p-[22px] rounded-md shadow-lg bg-white z-51"}>
                            <div className={"flex w-full items-center mb-5"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={onClose}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Cập nhật trạng thái công việc
                                </div>
                            </div>
                            <div className={"min-h-[240px] max-h-[500px]"}>
                                {PCM_STATUS_TASK.map(objStatus =>
                                    <div key={objStatus.value} className="flex items-center mb-3">
                                        <input
                                            className="form-check-input transition duration-200 rounded-full cursor-pointer min-w-[20px] min-h-[20px] w-[20px] h-[20px] bg-transparent border-gray-100 checked:bg-primary disabled:bg-gray-300 disabled:border-gray-100"
                                            name="rdTaskStatus"
                                            onChange={handleOnChange}
                                            id={`status-${objStatus.value}`}
                                            defaultChecked={status === objStatus.value}
                                            value={objStatus.value}
                                            type="radio"
                                        />
                                        <label htmlFor={`status-${objStatus.value}`} className={"flex-1 ml-4"}>
                                            {objStatus.text}
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <button className="h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300" onClick={handleUpdateTaskStatus}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default ModalUpdateTaskStatus;