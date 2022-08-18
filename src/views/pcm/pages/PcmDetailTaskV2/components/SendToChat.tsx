import React, {FC, Fragment, useRef, useState} from "react"
import iconChat from "assets/images/icons8-chat-48.svg";
import iconSearch from "assets/images/icons8-search.svg";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import TriangleDown from "assets/icons/TriangleDown";
import userAvt from "assets/images/task-user.svg";

export const SendToChat:FC = () => {
    const [isShow, setIsShow] = useState(false);
    const focusElementRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <button onClick={() => setIsShow(!isShow)} className={"rounded-full flex items-center justify-center w-[40px] h-[40px] max-w-[40px] max-h-[40px] min-w-[40px] min-h-[40px] hover:bg-cbs-form-input-bg mx-3"}>
                <img src={iconChat} alt={"----"} className={"w-[18px]"}/>
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
                            <div className={"max-w-[500px] min-w-[500px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                                <div className={"flex w-full items-center"}>
                                    <div className={"flex items-center flex-1"}>
                                        <span className={"text-xl font-bold"}>Gửi vào chat</span>
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
                                <div className={"relative my-4"}>
                                    <input className={"w-full rounded-md border-0.5 border-primary-border px-2 py-3 pl-10 placeholder-primary-gray bg-cbs-table-header"} placeholder={"Tìm kiếm hội thoại"}/>
                                    <span className={"absolute left-0 h-full top-0 flex items-center px-2"}>
                                        <img src={iconSearch} alt={"-----"}/>
                                    </span>
                                </div>
                                <div className={"border-0.5 border-primary-border px-4 py-2"}>
                                    Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI, Nguyễn Phan Thanh Hương-CPMI
                                </div>
                                <div className={"my-4 flex items-center"}>
                                    <input className="form-check-input line mr-2" type="checkbox" value="" id="check"/>
                                    <TriangleDown/>
                                    <span className={"ml-2"}>Chọn tất cả</span>
                                </div>
                                <div className={"max-h-[500px] min-h-[320px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                    <div className={"flex items-center"}>
                                        <input className="form-check-input mr-8" type="checkbox" value="" id="check"/>
                                        <img src={userAvt} alt={"-----"} className={"w-[40px] h-[40px] rounded-full overflow-hidden"}/>
                                        <div className={"flex-1 ml-4"}>
                                            Nguyễn Trung Hiếu-CPMI
                                        </div>
                                    </div>

                                    <div className={"flex items-center"}>
                                        <input className="form-check-input mr-8" type="checkbox" value="" id="check"/>
                                        <img src={userAvt} alt={"-----"} className={"w-[40px] h-[40px] rounded-full overflow-hidden"}/>
                                        <div className={"flex-1 ml-4"}>
                                            Nguyễn Trung Hiếu-CPMI
                                        </div>
                                    </div>
                                </div>
                                <div className={"flex items-center justify-end"}>
                                    <button className={"bg-primary rounded px-4 py-2 text-white"}>Xác nhận</button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}