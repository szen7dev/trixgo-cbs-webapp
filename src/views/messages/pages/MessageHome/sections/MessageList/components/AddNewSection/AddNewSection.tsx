import React, {FC, Fragment, useCallback, useContext, useEffect, useRef, useState} from "react";
import {AddNewChatGroupContext} from "../HeaderMessageList";

import {map as _map} from "lodash";
import Close from "assets/icons/Close";
import {useUserSystem} from "services/hooks/users/useUserSystem";
import {Dialog, Transition} from "@headlessui/react";
import {MessageContext, populates} from "../../../../../../shareComponents/layouts/MessagesLayoutV2";
import {CreateConversationPayload} from "typings/apis/messages/listConversation";
import {UseListConversation} from "services/hooks/messages/useListConversation";

export const AddNewSection:FC = () => {
    const {setCurrentChat,socketRef} = useContext(MessageContext)
    const socket = socketRef.current;
    const focusElementRef = useRef<HTMLDivElement>(null);

    const {createConversation} = UseListConversation();
    const {setShowAddNew, showAddNew} = useContext(AddNewChatGroupContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [paramsConversation, setParamsConversation] = useState<CreateConversationPayload>({
        name: "",
        description: "",
        isPrivate: true,
        membersID: []
    })
    const [selectedFriends, setSelectedFriends] = useState<{[key: string]: any}>({});

    const params = {limit: 10, select: 'fullname bizfullname email phone image', populates: '{"path": "company", "select": "name"}', keyword: searchTerm}
    const {data, hasNextPage, fetchNextPage} = useUserSystem(params, showAddNew);

    const createNewConversation = async () => {
        createConversation(paramsConversation).then(data => {
            setShowAddNew(false);
            setParamsConversation({
                name: "",
                description: "",
                isPrivate: true,
                membersID: []
            });
            // socket.emit('CHATTING_CSS_NEW_CONVERSATION',{conversationID: data._id})
            socket.emit('CHATTING_CSS_GET_INFO_CONVERSATION', {
                conversationID: data._id,
                populates
            });
            setCurrentChat(data._id);
            window.location.hash = `#${data._id}`
        });
    }

    const checkDisableCondition = useCallback(() => {
        if (paramsConversation.isPrivate) {
            return paramsConversation.membersID.length < 1
        } else {
            return paramsConversation.membersID.length <= 1 || paramsConversation.name.length <= 0
        }
    }, [paramsConversation])

    useEffect(() => {
        if (Object.values(selectedFriends).length > 1) {
            setParamsConversation(oldValue => {
                return {
                    ...oldValue,
                    isPrivate: false,
                    name: ''
                }
            })
        } else {
            setParamsConversation(oldValue => {
                return {
                    ...oldValue,
                    isPrivate: true
                }
            })
        }
    },[selectedFriends])

    const handleAddFriendToConversation = (value: boolean, friend: any) => {
        const selected = {...selectedFriends};
        if (value) {
            selected[friend._id] = friend;
        } else {
            delete selected[friend._id];
        }
        setSearchTerm("");
        setSelectedFriends(selected);
        setParamsConversation(oldValue => {
            return {
                ...oldValue,
                membersID: Object.keys(selected)
            }
        })
    }

    const removeSelectedFriend = (_id: string) => {
        const selected = {...selectedFriends};
        delete selected[_id];
        setSelectedFriends(selected);
        setParamsConversation(oldValue => {
            return {
                ...oldValue,
                membersID: Object.keys(selected)
            }
        })
    }

    return (
        <Transition appear show={showAddNew} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto share-message"
                onClose={() => setShowAddNew(false)}
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
                        <div className={"w-[462px] rounded-md shadow-lg bg-white py-[22px] z-51"}>
                            <div className={"flex w-full items-center px-[22px]"}>
                                <button
                                    className={"w-[32px] h-[32px] rounded-md mr-[10px]"}
                                    onClick={() => setShowAddNew(false)}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Nhóm mới
                                </div>
                                <button
                                    disabled={checkDisableCondition()}
                                    onClick={() => createNewConversation()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <div className={"w-full px-[20px] mt-[30px] group relative z-5 " + (paramsConversation.isPrivate?"hidden":"block")}>
                                <label className={"absolute -top-2 left-8 bg-white group-focus:text-primary group-hover:text-primary text-gray-300 z-15"}>Group Name</label>
                                <input
                                    className={"add-group-name relative w-full focus:outline-none group-hover:border-primary group-focus:border-primary border border-gray-300 h-[50px] rounded-lg px-[16px]"}
                                    value={paramsConversation.name}
                                    onChange={e => setParamsConversation(oldValue => {
                                        return {
                                            ...oldValue,
                                            name: e.target.value
                                        }
                                    })}
                                />
                            </div>
                            <div
                                className={"border-b border-gray-200 py-[15px] px-[20px] w-full flex flex-wrap"}
                            >
                                {
                                    _map(Object.values(selectedFriends), friend => (
                                        <div key={friend._id} className={"flex items-center bg-gray-100 rounded-full pr-3 mr-2 mb-1"}>
                                            <img className={"w-[30px] h-[30px] rounded-full overflow-hidden"} alt={friend.bizfullname||friend.fullname} src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`}/>
                                            <div className={"flex-1 mx-2"}>{friend.bizfullname||friend.fullname}</div>
                                            <Close onClick={() => removeSelectedFriend(friend._id)}/>
                                        </div>
                                    ))
                                }
                                <input
                                    type={"text"}
                                    className={"focus:outline-none"}
                                    placeholder={"Thêm người"}
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className={"max-h-[500px] min-h-[500px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                <div className={"px-[5px]"}>
                                    {
                                        _map(data, friend => (
                                            <div key={friend._id} className={"flex items-center py-3 hover:bg-gray-100"}>
                                                <input
                                                    onChange={event => handleAddFriendToConversation(event.target.checked, friend)}
                                                    className="form-check-input mx-4"
                                                    type="checkbox"
                                                    id={`friend-${friend._id}`}
                                                    defaultChecked={Object.values(selectedFriends).includes(friend._id)}
                                                />
                                                <label className={"flex-1 flex items-center"} htmlFor={`friend-${friend._id}`}>
                                                    <img className={"w-[44px] h-[44px] rounded-full overflow-hidden"} alt={friend.bizfullname||friend.fullname} src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`}/>
                                                    <div className={"ml-4"}>{friend.bizfullname||friend.fullname}</div>
                                                </label>
                                            </div>
                                        ))
                                    }
                                    {
                                        hasNextPage&&
                                        <div className={"flex items-center justify-center mb-5"}>
                                            <button
                                                onClick={() => fetchNextPage()}
                                                className={"text-primary text-center"}
                                            >
                                                Xem thêm
                                            </button>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}
