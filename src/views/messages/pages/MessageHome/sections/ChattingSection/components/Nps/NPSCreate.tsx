import React, {FC, Fragment, useContext, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {dismissSendNPSMessage} from "redux/reducer/messages/CreateNPSMessage";
import Close from "assets/icons/Close";
import {map as _map} from "lodash";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {useDoctype} from "../../../../../../../../services/hooks/items/useDoctype";
import {v4 as uuidv4} from "uuid";
import {appendFakeMessageToConversation} from "../../../../../../../../redux/reducer/messages/ListMessage";
import {dismissCreatePoll} from "../../../../../../../../redux/reducer/messages/CreatePoll";

type Props = {
    context: any
}
export const NPSCreate:FC<Props> = ({context}) => {
    const dispatch = useDispatch();
    const {isOpenCreateNPS, conversationId} = useSelector((state: RootState) => state.createNPSMessage.data);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {socketRef} = useContext(context);
    const socket = socketRef.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const [typeNPS, setTypeNPS] = useState(1);
    const [option, setOption] = useState<string|null>(null);
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[conversationId]);

    const {
        list: listDoctypes,
        hasNextPage: hasNextPageDoctypes,
        fetchNextPage: fetchNextPageDoctypes
    } = useDoctype({
        params: {
            type: 21,
            companyID: chat?.company
        },
        isFetchList: isOpenCreateNPS
    })

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
        const message: any = {
            tmpid: uuidv4(),
            conversationID: conversationId,
            sender: {
                _id: profileId
            },
            type: 8,
            serviceID: option,
            typeNps: typeNPS
        };
        dispatch(appendFakeMessageToConversation({
            conversationId: conversationId,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid,
                createAt: new Date(),
                consversation: conversationId,
                nps: {
                    type: typeNPS,
                    service: {
                        name: (listDoctypes??[]).find(item => item._id === option)?.name ?? ""
                    }
                },
                sender: {
                    _id: profileId,
                    bizfullname: profile.bizfullname,
                    fullname: profile.fullname,
                    image: profile.image
                }
            }
        }));
        socket.emit('CHATTING_CSS_SEND_MESSAGE', message);
        dispatch(dismissCreatePoll({}));
    }
    if (!chat) return null;

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
                                    disabled={!option}
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

                            <div className={"p-[22px] max-h-[370px] overflow-auto"}>
                                {
                                    _map(listDoctypes, docType => (
                                        <div key={docType._id} className={"w-full flex items-center border border-gray-100 rounded-md px-[14px] py-[8px] mb-[15px]"}>
                                            <input
                                                onChange={event => setOption(event.target.value)} value={docType._id} type="radio" id={'option-' + docType._id} name={'option'} className={"form-check-input mt-0 w-[24px] h-[24px] min-w-[24px] min-h-[24px]"}/>
                                            <label htmlFor={'option-' + docType._id} className={"text-left ml-3 text-primary"}>{docType.name}</label>
                                        </div>
                                    ))
                                }
                                {
                                    hasNextPageDoctypes&&
                                    <div className={"flex items-center justify-center mb-5"}>
                                        <button
                                            onClick={() => fetchNextPageDoctypes()}
                                            className={"text-primary text-center"}
                                        >
                                            Xem thêm
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}