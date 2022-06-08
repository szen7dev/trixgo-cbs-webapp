import React, {FC, Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {map as _map} from "lodash"
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissMessageNPSDetail} from "redux/reducer/messages/MessageNPSVoteDetail"
import {NPSScoreVoteDetail} from "./NPSVoteDetail/NPSScoreVoteDetail";
import {NPSPleasantVoteDetail} from "./NPSVoteDetail/NPSPleasantVoteDetail";
import IconBackGray from "assets/images/icon-back-gray.svg";

export const NpsVoteDetail:FC = () => {
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {isOpenMessageNPSVoteDetail, messageId, conversationId} = useSelector((state: RootState) => state.messageNpsVoteDetail.data);
    const messagesData = useSelector((state: RootState) => state.listMessage.data.listMessage[conversationId]);
    const message= messagesData?messagesData[messageId]:null;
    const dispatch = useDispatch();
    const [seeingDetail, setSeeingDetail] = useState(false);

    return (
        <Transition appear show={isOpenMessageNPSVoteDetail} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissMessageNPSDetail())}
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
                                <button
                                    className={"w-[32px] h-[32px] rounded-md"}
                                    onClick={() => {
                                        if (seeingDetail) {
                                            setSeeingDetail(false)
                                        } else {
                                            dispatch(dismissMessageNPSDetail())
                                        }
                                    }}
                                >
                                    <div className={seeingDetail?"hidden":"show"}><Close/></div>
                                    <img className={seeingDetail?"show":"hidden"} src={IconBackGray} alt={"----"}/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Kết quả khảo sát
                                </div>
                            </div>
                            <div className={"max-h-[500px] min-h-[450px] overflow-auto pb-4 relative"}>

                                {
                                    message &&
                                    (
                                        message.nps.type === 1 ?
                                            <NPSScoreVoteDetail
                                                message={message}
                                                isOpenMessageNPSVoteDetail={isOpenMessageNPSVoteDetail}/> :
                                            <NPSPleasantVoteDetail
                                                seeingDetail={seeingDetail}
                                                setSeeingDetail={(show) => setSeeingDetail(show)}
                                                message={message}
                                                isOpenMessageNPSVoteDetail={isOpenMessageNPSVoteDetail}/>
                                    )
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}