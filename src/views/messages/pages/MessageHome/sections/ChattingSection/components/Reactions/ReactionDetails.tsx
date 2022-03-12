import React, {FC, Fragment, useRef} from "react";
import {ItemMessage} from "typings/apis/messages/listMessage";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {map as _map} from "lodash"
import {listEmoji} from "../MainChatContent";
import {UseReactMessage} from "services/hooks/messages/useReactionMessage";

type Props = {
    message: ItemMessage;
    isOpen: boolean;
    setCloseVote: () => void;
}
export const ReactionDetails:FC<Props> = ({message, isOpen, setCloseVote}) => {
    const focusElementRef = useRef<HTMLDivElement>(null);
    const paramsListReaction = {messageID: message._id,limit: 10, select:"_id type author message", populates: JSON.stringify({"path": "author", "select": "_id bizfullname image"})};
    const {listReactionsMessage, hasListReactionNextPage, nextPageListReaction} = UseReactMessage(paramsListReaction, isOpen);

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => setCloseVote()}
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
                        <div className={"w-[400px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                            <div className={"flex w-full items-center mb-4"}>
                                <button
                                    className={"rounded-md mr-[10px]"}
                                    onClick={() => setCloseVote()}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-primary"}>
                                    Tất cả ({listReactionsMessage.length})
                                </div>
                            </div>
                            <div className={"max-h-[500px] min-h-[240px] overflow-auto"}>
                                {
                                    _map(listReactionsMessage, reaction => (
                                        <div
                                            key={reaction._id}
                                            className={"flex items-center"}
                                        >
                                            <img src={`${process.env.REACT_APP_URL_S3_USER}/${reaction?.author?.image}`} className={"w-[40px] h-[40px] rounded-full overflow-hidden border border-white"} alt={"---"}/>
                                            <div className={"flex-1 ml-2"}>
                                                {reaction?.author?.bizfullname}
                                            </div>
                                            <img src={listEmoji[reaction?.type-1].icon} className={"w-[24px] h-[24px] rounded-full overflow-hidden border border-white"} alt={"---"}/>
                                        </div>
                                    ))
                                }
                                {
                                    hasListReactionNextPage &&
                                    <button
                                        onClick={() => nextPageListReaction()}
                                        className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                                        Xem thêm
                                    </button>
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}