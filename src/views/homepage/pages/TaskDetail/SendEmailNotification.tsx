import React, {FC, Fragment, useRef, useState} from "react"
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import iconChecklist from "assets/images/icons8-checklist-64.svg";
import {DropdownSearchableV2} from "shareComponents/common";
import nextIcon from "assets/images/icons-arrow-next.svg";
import userIcon from "assets/images/icon-user-avatar.svg";
import iconSendMail from "../../../../assets/images/icons8-send-email-96.svg";

export const SendEmailNotification:FC = () => {
    const [isShow, setIsShow] = useState(false);
    const focusElementRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <button onClick={() => setIsShow(!isShow)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                <img src={iconSendMail} alt={"----"} className={"w-[18px]"}/>
            </button>
            <Transition appear show={isShow} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                    onClose={() => {
                        setIsShow(false)
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
                            <div className={"max-w-[768px] min-w-[768px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"flex w-full items-center"}>
                                    <div className={"flex items-center flex-1"}>
                                        <span className={"text-xl font-bold"}>Thông báo email</span>
                                    </div>
                                    <button
                                        className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                        onClick={() => {
                                            setIsShow(false)
                                        }}
                                    >
                                        <Close/>
                                    </button>
                                </div>
                                <div className={"mt-4 pb-2"}>
                                    <input className={"w-full rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"} placeholder={"Tiêu đề email"}/>
                                    <textarea
                                        placeholder={"Nội dung email"}
                                        rows={3}
                                        className={"w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                                    >
                                    </textarea>
                                    <textarea
                                        placeholder={"Nhập email ngoài hệ thống"}
                                        rows={3}
                                        className={"w-full mt-2 rounded-md border border-primary-border px-2 py-1 pb-3 placeholder-primary-gray bg-cbs-table-header"}
                                    >
                                    </textarea>
                                </div>
                                <div className={"max-h-[500px] mt-[15px] no-webkit-scrollbar overflow-auto"}>

                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}