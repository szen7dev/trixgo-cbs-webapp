import React, {FC, Fragment, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {map as _map} from "lodash"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissUsersSeenDetail} from "redux/reducer/messages/UsersSeenDetail"

export const UsersSeenDetail:FC = () => {
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {isOpenUsersSeenDetail, usersSeen} = useSelector((state: RootState) => state.usersSeenDetail.data);
    const dispatch = useDispatch();
    return (
        <Transition appear show={isOpenUsersSeenDetail} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissUsersSeenDetail())}
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
                        <div className={"w-[400px] rounded-md shadow-lg bg-white z-51 overflow-hidden"}>
                            <div className={"flex w-full items-center p-[22px]"}>
                                <div className={"flex-1 text-left text-lg"}>
                                    Thành viên đã đọc tin nhắn
                                </div>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md"}
                                    onClick={() => dispatch(dismissUsersSeenDetail())}
                                >
                                    <Close/>
                                </button>
                            </div>
                            <div className={"max-h-500px overflow-auto pb-4"}>
                                {
                                    _map(usersSeen, user => (
                                        <div
                                            key={user._id}
                                            className={"flex items-center py-[10px] hover:bg-gray-100 px-[22px]"}
                                        >
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${user.image}`} className={"w-[44px] h-[44px] rounded-full overflow-hidden border border-white"} alt={"---"}/>
                                            <div className={"flex-1 ml-2"}>
                                                {user.bizfullname||user.fullname}
                                            </div>
                                        </div>
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