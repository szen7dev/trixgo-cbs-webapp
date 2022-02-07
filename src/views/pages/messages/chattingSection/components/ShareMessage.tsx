import React, {FC, Fragment, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissShare} from "redux/reducer/messages/ShareMessage";
import {UseListConversation} from "services/hooks/messages/useListConversation";
import {map as _map} from "lodash";
import SearchChatItem from "../../list/components/SearchUserConversation/searchChatItem";

const ShareMessage:FC = () => {
    const dispatch = useDispatch();
    const {isOpenShare, shareMessage} = useSelector((state: RootState) => state.shareMessage.data);
    const focusElementRef = useRef<HTMLDivElement>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const paramsListConversation = {limit: 10, keyword: searchTerm};
    const {listConversations, nextPageListConversations, hasListConversationNextPage, createConversation} = UseListConversation(paramsListConversation);

    const closeShare = () => {
        console.log('asdasd')
        // dispatch(dismissShare({}))
    }

    return (
        <Transition appear show={isOpenShare} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto share-message"
                onClose={closeShare}
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
                        <Dialog.Overlay className="fixed inset-0 bg-secondary-gray bg-opacity-50 transition-opacity" />
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
                        <div className={"max-w-[521px] min-w-[420px] rounded-md shadow-lg bg-white p-[22px] z-51"}>
                            <div className={"flex w-full items-center"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={closeShare}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>

                                </div>
                                <button
                                    onClick={() => console.log('asdasd')}
                                    className={"w-[95px] h-[32px] rounded-md bg-primary text-white"}
                                >
                                    Gửi
                                </button>
                            </div>
                            <div className={"max-h-[500px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                <div className={"px-[5px]"}>
                                    {
                                        _map(listConversations, conversation => (
                                            <SearchChatItem
                                                avatarClassname={"w-[40px] h-[40px]"}
                                                itemClickAction={chat => {
                                                    console.log(chat)
                                                }}
                                                chat={conversation} key={conversation._id}/>
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