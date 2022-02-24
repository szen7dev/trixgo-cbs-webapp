import React, {FC, FormEvent, Fragment, useContext, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissCreatePoll} from "redux/reducer/messages/CreatePoll";
import {map as _map} from "lodash"
import {v4 as uuidv4} from "uuid";
import {appendFakeMessageToConversation} from "redux/reducer/messages/ListMessage";

type Props = {
    context: any
}
export const PollCreate:FC<Props> = ({context}) => {
    const dispatch = useDispatch();
    const {isOpenCreatePoll, conversationId} = useSelector((state: RootState) => state.createPoll.data);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const {socketRef} = useContext(context);
    const socket = socketRef.current;
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const [name, setName] = useState("");
    const [options, setOptions] = useState<{ title: string }[]>([
        { title: "" },
        { title: "" }
    ])

    const addMoreOption = () => {
        const newOptions = [...options];
        newOptions.push({
            title: ""
        })
        setOptions(newOptions)
    }

    const removeOption = (index: number) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
    }

    const setValueForOption = (index: number, event: FormEvent<HTMLDivElement>) => {
        const input = event.target as HTMLElement;
        const newOptions = [...options];
        newOptions[index].title = input.innerText;
        setOptions(newOptions);
    }

    const handleCreatePoll = () => {
        const message: any = {
            tmpid: uuidv4(),
            conversationID: conversationId,
            sender: {
                _id: profileId
            },
            type: 5,
            name: name,
            options: options
        };
        dispatch(appendFakeMessageToConversation({
            conversationId: conversationId,
            messageId: message.tmpid,
            messageData: {
                ...message,
                _id: message.tmpid,
                createAt: new Date(),
                consversation: conversationId,
                poll: {
                    name: name,
                    options: options.map((option: { title: string }) => {
                        return {
                            ...option,
                            usersVote: [],
                            _id: uuidv4()
                        }
                    })
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

    return (
        <Transition appear show={isOpenCreatePoll} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissCreatePoll({}))}
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
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => dispatch(dismissCreatePoll({}))}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Tin nhắn bình chọn
                                </div>
                                <button
                                    onClick={() => handleCreatePoll()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <textarea
                                onChange={event => setName(event.target.value)}
                                placeholder={"Đặt câu hỏi bình chọn"} className={"border-b border-gray-300 focus:border-primary py-[17px] text-lg focus:outline-none w-full"} rows={1}>
                            </textarea>
                            {
                                _map(options, (option,index) => (
                                    <div key={index} className={"flex items-center relative"}>
                                        <div
                                            onInput={event => setValueForOption(index, event)}
                                            placeholder={`Nhập tên phương án ${index+1}`} className={"flex-1 py-[17px] border-b border-gray-300 focus:border-primary focus:outline-none pr-[20px] h-[52px]"} contentEditable={true}/>
                                        {
                                            index > 1&&
                                            <button
                                                onClick={() => removeOption(index)}
                                                className={"absolute h-full flex items-center right-0"}
                                            >
                                                <Close/>
                                            </button>
                                        }
                                    </div>
                                ))
                            }
                            <button
                                onClick={() => addMoreOption()}
                                className={"text-primary mt-[17px]"}>
                                Thêm phương án
                            </button>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
