import React, {FC, Fragment, useCallback, useContext, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissShare} from "redux/reducer/messages/ShareMessage";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {map as _map} from "lodash";
import SearchChatItem from "../../list/components/SearchUserConversation/searchChatItem";
import {ItemListConversation} from "typings/apis/messages/listConversation";
import SelectedShareConversationItem from "./SelectedShareConversationItem";
import CheckIcon from 'assets/images/blue-check.svg';
import {MessageContext} from "../../home/index_v2";
import {UseConversation} from "services/hooks/messages/useConversation";

const ShareMessage:FC = () => {
    const dispatch = useDispatch();
    const {isOpenShare, shareMessage} = useSelector((state: RootState) => state.shareMessage.data);
    const focusElementRef = useRef<HTMLDivElement>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const paramsListConversation = {limit: 10, keyword: searchTerm};
    const {listConversations, nextPageListConversations, hasListConversationNextPage} = UseListConversation(paramsListConversation);
    const {shareMessageToConversation} = UseConversation();

    const [selectedConversations, setSelectedConversations] = useState<{[key: string]: ItemListConversation}>({});

    const {socketRef, currentChat} = useContext(MessageContext);
    const socket = socketRef.current;

    const handleAddConversation = (conversation: ItemListConversation) => {
        const selected = {...selectedConversations};
        if (Object.keys(selected).includes(conversation._id)) {
            delete selected[conversation._id];
        } else {
            selected[conversation._id] = conversation;
        }
        setSearchTerm("");
        setSelectedConversations(selected);
    };

    const removeSelectedConversation = (_id: string) => {
        const selected = {...selectedConversations};
        delete selected[_id];
        setSelectedConversations(selected);
    };

    const forwardMessagesToConversation = () => {
        shareMessageToConversation({
            conversationsID: Object.keys(selectedConversations),
            messagesID: Object.keys(shareMessage)
        }).then((data) => {
            const messsageIds : string[] = [];
            data.forEach(mess => {
                mess.results.forEach(res => {
                    messsageIds.push(res._id)
                })
            })
            console.log({
                conversationsID: Object.keys(selectedConversations),
                messagesID: messsageIds
            })
            socket.emit('CHATTING_CSS_SHARE_MESSAGE', {
                conversationsID: Object.keys(selectedConversations),
                messagesID: messsageIds
            });
        });

        setSelectedConversations({});
        dispatch(dismissShare({}));
    };

    return (
        <Transition appear show={isOpenShare} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto share-message"
                onClose={() => dispatch(dismissShare({}))}
                initialFocus={focusElementRef}
            >
                <div ref={focusElementRef} className="min-h-screen flex items-center justify-center z-51 share-message">
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
                        <div className={"max-w-[521px] min-w-[420px] rounded-md shadow-lg bg-white py-[22px] z-51"}>
                            <div className={"flex w-full items-center px-[22px]"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => dispatch(dismissShare({}))}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    <input
                                        onChange={event => setSearchTerm(event.target.value)}
                                        className={"w-full focus:outline-none"}
                                        placeholder={"Gửi tới"}
                                    />
                                </div>
                                <button
                                    disabled={Object.keys(selectedConversations).length <= 0}
                                    onClick={() => forwardMessagesToConversation()}
                                    className={"h-[32px] rounded-md text-primary font-semibold disabled:bg-transparent disabled:text-gray-500"}
                                >
                                    Gửi
                                </button>
                            </div>
                            <div
                                className={"px-[22px] mt-[15px] w-full flex flex-wrap"}
                            >
                                {
                                    _map(Object.values(selectedConversations), conversation => (
                                        <SelectedShareConversationItem key={conversation._id} conversation={conversation} removeSelectedConversation={removeSelectedConversation}/>
                                    ))
                                }
                            </div>
                            <div className={"max-h-[500px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                <div className={"px-[5px]"}>
                                    {
                                        _map(listConversations.filter(conversation => conversation._id !== currentChat), conversation => (
                                            <div key={conversation._id} className={"relative"}>
                                                <SearchChatItem
                                                    avatarClassname={"w-[40px] h-[40px]"}
                                                    avatarClassnameMap={{
                                                        "group_1": {
                                                            imgWidth: "w-full h-full",
                                                            groupPosition: [""]
                                                        },
                                                        "group_2": {
                                                            imgWidth: "w-[32px] h-[32px] absolute",
                                                            groupPosition: [
                                                                "bottom-0 left-0 z-2",
                                                                "top-0 right-0 z-1",
                                                            ]
                                                        },
                                                        "group_3": {
                                                            imgWidth: "w-[26px] h-[26px] absolute",
                                                            groupPosition: [
                                                                "bottom-0 left-12px z-3",
                                                                "top-0 left-0 z-2",
                                                                "top-0 right-0 z-1",
                                                            ]
                                                        },
                                                        "group_4": {
                                                            imgWidth: "w-[24px] h-[24px] absolute",
                                                            groupPosition: [
                                                                "bottom-0 left-0 z-4",
                                                                "top-0 left-0 z-3",
                                                                "top-0 right-0 z-2",
                                                                "bottom-0 right-0 z-1"
                                                            ]
                                                        }
                                                    }}
                                                    itemClickAction={chat => {
                                                        handleAddConversation(chat)
                                                    }}
                                                    chat={conversation}
                                                />
                                                <div className={"absolute inset-y-0 right-0 h-full px-[10px] flex items-center justify-center transition-opacity " + (Object.keys(selectedConversations).includes(conversation._id) ? "opacity-100": "opacity-0")}>
                                                    <img src={CheckIcon} alt={'------'} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                    {
                                        hasListConversationNextPage &&
                                        <button
                                            onClick={() => nextPageListConversations()}
                                            className={"rounded-lg w-full flex flex-col items-center py-[15px] px-[10px] justify-center text-primary font-semibold"}>
                                            Xem thêm
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
};

export default ShareMessage;