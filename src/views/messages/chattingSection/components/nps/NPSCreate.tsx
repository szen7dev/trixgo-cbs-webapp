import React, {FC, Fragment, useContext, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {dismissSendNPSMessage} from "redux/reducer/messages/CreateNPSMessage";
import Close from "assets/icons/Close";
import {map as _map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";

type Props = {
    context: any
}
const NPSCreate:FC<Props> = ({context}) => {
    const dispatch = useDispatch();
    const {isOpenCreateNPS, conversationId} = useSelector((state: RootState) => state.createNPSMessage.data);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {socketRef} = useContext(context);
    const socket = socketRef.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const [typeNPS, setTypeNPS] = useState(1);
    const [option, setOption] = useState("");

    const tabsMap = [
        {
            id: 1,
            title: "Điểm số dịch vụ"
        },
        {
            id: 2,
            title: "Không hài lòng"
        },
        {
            id: 3,
            title: "Hài lòng"
        }
    ]

    const handleCreateNPS = () => {
        console.log("created")
    }

    return (
        <Transition appear show={isOpenCreateNPS} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissSendNPSMessage({}))}
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
                                    onClick={() => dispatch(dismissSendNPSMessage({}))}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Tin nhắn NPS
                                </div>
                                <button
                                    onClick={() => handleCreateNPS()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <div className={"border-t border-b border-gray-100 flex items-center justify-around"}>
                                {
                                    _map(tabsMap, tab => (
                                        <div
                                            onClick={() => setTypeNPS(tab.id)}
                                            key={tab.id}
                                            className={(typeNPS===tab.id?"border-b-2 border-primary font-semibold text-primary":"text-gray-400") + " cursor-pointer py-[15px]"}
                                        >
                                            {tab.title}
                                        </div>
                                    ))
                                }
                            </div>

                            <div className={"p-[22px]"}>
                                <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                                    <input
                                        onChange={event => setOption(event.target.value)} value={"abc"} type="radio" id="option-1" name={"option"} className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}/>
                                    <label htmlFor="option-1" className={"text-left ml-3 text-primary"}>Trixgo-Ứng dụng quản lý hợp đồng</label>
                                </div>
                                <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                                    <input
                                        onChange={event => setOption(event.target.value)} value={"abc"} type="radio" id="option-2" name={"option"} className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}/>
                                    <label htmlFor="option-2" className={"text-left ml-3 text-primary"}>Trixgo-Ứng dụng quản lý hợp đồng</label>
                                </div>
                                <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                                    <input
                                        onChange={event => setOption(event.target.value)} value={"abc"} type="radio" id="option-3" name={"option"} className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}/>
                                    <label htmlFor="option-3" className={"text-left ml-3 text-primary"}>Trixgo-Ứng dụng quản lý hợp đồng</label>
                                </div>
                                <div className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                                    <input
                                        onChange={event => setOption(event.target.value)} value={"abc"} type="radio" id="option-4" name={"option"} className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}/>
                                    <label htmlFor="option-4" className={"text-left ml-3 text-primary"}>Trixgo-Ứng dụng quản lý hợp đồng</label>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default NPSCreate;