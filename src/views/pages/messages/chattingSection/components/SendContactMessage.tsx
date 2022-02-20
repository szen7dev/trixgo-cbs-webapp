import React, {FC, Fragment, useCallback, useContext, useRef, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import Close from "assets/icons/Close";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "redux/reducer";
import {dismissSendContactMessage} from "redux/reducer/messages/ContactMessage";
import {map as _map} from "lodash";
import {v4 as uuidv4} from "uuid";
import {appendFakeMessageToConversation} from "redux/reducer/messages/ListMessage";
import {useUser} from "services/hooks/useUser";

type Props = {
    context: any
}
const SendContactMessage:FC<Props> = ({context}) => {
    const dispatch = useDispatch();
    const {isOpenSendContact, conversationId} = useSelector((state: RootState) => state.contactMessage.data);
    const focusElementRef = useRef<HTMLDivElement>(null);
    const currentUser = localStorage.getItem("currentUser")??"{}";
    const profile = JSON.parse(currentUser);
    const profileId = profile?._id;

    const [searchTerm, setSearchTerm] = useState('');
    const [pageParam, setPageParam] = useState('');
    const params = {limit: 10, select: 'fullname email phone image', lastestID: pageParam, keyword: searchTerm}
    const { listFriends, nextCursor } = useUser(params, pageParam);
    const [selectedFriends, setSelectedFriends] = useState<{[key: string]: any}>({});

    const {socketRef} = useContext(context);
    const socket = socketRef.current;

    const handleAddFriendToConversation = (value: boolean, friend: any) => {
        const selected = {...selectedFriends};
        if (value) {
            selected[friend._id] = friend;
        } else {
            delete selected[friend._id];
        }
        setSearchTerm("");
        setSelectedFriends(selected);
    }

    const forwardMessagesToConversation = () => {
        Object.keys(selectedFriends).forEach(friendId => {
            const message: any = {
                tmpid: uuidv4(),
                conversationID: conversationId,
                sender: {
                    _id: profileId
                },
                type: 7,
                usersAssigned: [friendId]
            };
            dispatch(appendFakeMessageToConversation({
                conversationId: conversationId,
                messageId: message.tmpid,
                messageData: {
                    ...message,
                    _id: message.tmpid,
                    createAt: new Date(),
                    consversation: conversationId,
                    sender: {
                        _id: profileId,
                    },
                    usersAssigned: [selectedFriends[friendId]]
                }
            }));
            socket.emit('CHATTING_CSS_SEND_MESSAGE', message);
        })
        setSelectedFriends({});
        dispatch(dismissSendContactMessage({}));
        socket.emit('CHATTING_CSS_GET_LIST_CONVERSATION', { conversationID: conversationId, select: JSON.stringify({ sender:"bizfullname" }) });
    };

    return (
        <Transition appear show={isOpenSendContact} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto share-message"
                onClose={() => dispatch(dismissSendContactMessage({}))}
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
                                    onClick={() => dispatch(dismissSendContactMessage({}))}
                                >
                                    <Close/>
                                </button>
                                <div className={"flex-1 text-left text-lg font-bold"}>
                                    Tin nhắn danh bạ
                                </div>
                                <button
                                    disabled={Object.keys(selectedFriends).length <= 0}
                                    onClick={() => forwardMessagesToConversation()}
                                    className={"h-[36px] w-[105px] rounded-md bg-primary text-white disabled:bg-gray-300"}
                                >
                                    Xác nhận
                                </button>
                            </div>
                            <div
                                className={"border-b border-gray-200 py-[15px] px-[20px] w-full flex flex-wrap"}
                            >
                                {
                                    _map(Object.values(selectedFriends), friend => (
                                        <div key={friend._id} className={"flex items-center bg-gray-100 rounded-full pr-3 mr-2 mb-1"}>
                                            <img className={"w-[30px] h-[30px] rounded-full overflow-hidden"} alt={friend.bizfullname||friend.fullname} src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`}/>
                                            <div className={"flex-1 mx-2"}>{friend.bizfullname||friend.fullname}</div>
                                        </div>
                                    ))
                                }
                                <input
                                    type={"text"}
                                    className={"focus:outline-none"}
                                    placeholder={"Thêm người"}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className={"max-h-[500px] min-h-[500px] mt-[15px] no-webkit-scrollbar overflow-auto"}>
                                <div className={"px-[5px]"}>
                                    {
                                        _map(listFriends, friend => (
                                            <div key={friend._id} className={"flex items-center px-[18px] py-[10px] hover:bg-gray-100 rounded-md"}>
                                                <label className={"flex-1 flex items-center"} htmlFor={`friend-${friend._id}`}>
                                                    <img className={"w-[44px] h-[44px] rounded-full overflow-hidden"} alt={friend.bizfullname||friend.fullname} src={`${process.env.REACT_APP_URL_S3_USER}/${friend.image}`}/>
                                                    <div className={"ml-4"}>{friend.bizfullname||friend.fullname}</div>
                                                </label>
                                                <input
                                                    onChange={event => handleAddFriendToConversation(event.target.checked, friend)}
                                                    className="form-check-input mx-4"
                                                    type="checkbox"
                                                    id={`friend-${friend._id}`}
                                                    defaultChecked={Object.values(selectedFriends).includes(friend._id)}
                                                />
                                            </div>
                                        ))
                                    }
                                    {
                                        nextCursor&&
                                        <div className={"flex items-center justify-center mb-5"}>
                                            <button
                                                onClick={() => setPageParam(nextCursor)}
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
};

export default SendContactMessage;