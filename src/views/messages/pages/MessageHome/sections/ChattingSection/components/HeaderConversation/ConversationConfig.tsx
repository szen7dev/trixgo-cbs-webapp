import React, {FC, Fragment, useCallback, useContext, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissConfigConversation} from "redux/reducer/messages/ConversationConfigModal";
import {UseMessageHelper} from "services/hooks/messages/useMessageHelper";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {MessageContext, populates} from "../../../../../../shareComponents/layouts/MessagesLayoutV2";

export const ConversationConfig:FC = () => {
    const dispatch = useDispatch();
    const {isOpenConversationConfig, conversationId} = useSelector((state: RootState) => state.configConversation.data);
    const chat = useSelector((state: RootState) => state.listConversation.data.listConversation[conversationId]);
    const currentUser = localStorage.getItem("currentUser")??"P{";
    const profileId = JSON.parse(currentUser)?._id;
    const {socketRef} = useContext(MessageContext);
    const socket = socketRef.current;

    const {isAuthor} = UseMessageHelper();

    const focusElementRef = useRef<HTMLDivElement>(null);
    const {updateConfigConversation} = UseListConversation();

    const checkTrue = (value: number) => {
        if (value === 1) {
            return true
        }
        else return false;
    }

    const checkedValue = useCallback(() => {
        if (!chat||!chat.config) return {
            1: true,
            2: true,
            3: true,
            4: true,
            5: true,
            6: true,
            7: true,
        };
        return {
            1:checkTrue(chat.config.configHighlight),
            2:checkTrue(chat.config.configSeeOldMessage),
            3:checkTrue(chat.config.configEditInfo),
            4:checkTrue(chat.config.configCreateNote),
            5:checkTrue(chat.config.configCreatePoll),
            6:checkTrue(chat.config.configPinMessage),
            7:checkTrue(chat.config.configSendMessage),
        }
    }, [chat]);
    const [checkBox, setCheckbox] = useState(checkedValue());

    useEffect(() => {
        setCheckbox(checkedValue())
    }, [conversationId, chat])

    const formatTrueValue = (value: boolean) => {
        if (value) {
            return 1
        } else {
            return 2;
        }
    }

    const updateConfigAction = (typeConfig: number, value: boolean) => {
        setCheckbox(oldValue => {
            return {
                ...oldValue,
                [typeConfig]: value
            }
        })
        updateConfigConversation({
            conversationID: conversationId,
            typeConfig,
            valueConfig: formatTrueValue(value)
        }).then(({data, error}) => {
            socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
                conversationID: conversationId,
                populates
            });
        })
    }

    if (!chat) return null;
    return (
        <Transition appear show={isOpenConversationConfig} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto delete-confirm"
                onClose={() => dispatch(dismissConfigConversation())}
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
                                    onClick={() => dispatch(dismissConfigConversation())}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Cài đặt cuộc hội thoại
                                </div>
                            </div>
                            <div className={"px-[22px] pb-3"}>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Làm nổi bật tin của Admin</div>
                                    <input
                                        onChange={event => updateConfigAction(1, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[1]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Members được xem tin nhắn cũ</div>
                                    <input
                                        onChange={event => updateConfigAction(2, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[2]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Members được sửa thông tin nhóm</div>
                                    <input
                                        onChange={event => updateConfigAction(3, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[3]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Members được tạo ghi chú, nhắc hẹn</div>
                                    <input
                                        onChange={event => updateConfigAction(4, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[4]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Members được tạo bình chọn</div>
                                    <input
                                        onChange={event => updateConfigAction(5, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[5]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Members được ghim tin nhắn</div>
                                    <input
                                        onChange={event => updateConfigAction(6, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[6]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                                <div className={"flex justify-between items-center py-3 bg-white"}>
                                    <div className={"flex-1 text-left ml-4"}>Members được gửi tin nhắn</div>
                                    <input
                                        onChange={event => updateConfigAction(7, event.target.checked)}
                                        disabled={!isAuthor(chat, profileId)}
                                        checked={checkBox[7]}
                                        // defaultChecked={checkedValue()}
                                        className="form-switch form-check-input" type="checkbox" id="flexSwitchCheckChecked"/>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}