import React, {FC, Fragment, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {map as _map} from "lodash";

type Props = {
    isShow: boolean;
    handleClose: () => void;
    afterClose: () => void;
}
export const NotificationMutePopup:FC<Props> = ({isShow, handleClose, afterClose}) => {
    const focusElementRef = useRef<HTMLDivElement>(null);

    const dateOption = [
        {
            id: 1,
            text: "Trong 1 giờ",
            date: 1,
        },
        {
            id: 2,
            text: "Trong 4 giờ",
            date: 4,
        },
        {
            id: 3,
            text: "Cho đến 08:00AM",
            date: 8,
        },
        {
            id: 4,
            text: "Cho đến khi mở lại",
            date: null,
        },
    ]

    const handlePressConfirmMute = () => {
        console.log('asdasd')
    }

    return (
        <Transition appear show={isShow} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => {
                    handleClose()
                    afterClose()
                }}
                initialFocus={focusElementRef}
            >
                <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51">
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
                        <div className={"w-[400px] rounded-md shadow-lg bg-white z-51"}>
                            <div className={"flex w-full items-center p-[22px]"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => {
                                        handleClose()
                                        afterClose()
                                    }}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Tắt thông báo hội thoại này?
                                </div>
                            </div>
                            <div className={"text-xs text-gray-400 px-[22px] border-b border-gray-100 pb-4"}>
                                Dừng thông báo các tin nhắn mới tới bạn từ hội thoại này, ngoại trừ các tin nhắn quan trọng như @nhắc tên và nhắc hẹn/sự kiện
                            </div>
                            <div className={"mb-5 mt-3"}>
                                {
                                    _map(dateOption, opt => (
                                        <button
                                            key={opt.id}
                                            className={"flex items-center hover:bg-gray-100 px-[22px] py-3 w-full"}
                                        >
                                            {opt.text}
                                        </button>
                                    ))
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}